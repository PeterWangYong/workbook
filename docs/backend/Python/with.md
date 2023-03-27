# With 上下文

## 什么是上下文管理器？

在任何一门编程语言中，文件的输入输出、数据库的连接断开等，都是很常见的资源管理操作。但资源都是有限的，在写程序时，我们必须保证这些资源在使用过后得到释放，不然就容易造成资源泄露，轻者使得系统处理缓慢，重则会使系统崩溃。



为了解决这个问题，不同的编程语言都引入了不同的机制。而在 Python 中，对应的解决方式便是上下文管理器（context manager）。上下文管理器，能够帮助你自动分配并且释放资源，其中最典型的应用便是 with 语句。所以，上面代码的正确写法应该如下所示：



```python
for x in range(10000000):
    with open('test.txt', 'w') as f:
        f.write('hello')
```



这样，我们每次打开文件“test.txt”，并写入‘hello’之后，这个文件便会自动关闭，相应的资源也可以得到释放，防止资源泄露。当然，with 语句的代码，也可以用下面的形式表示：



```python
f = open('test.txt', 'w')
try:
    f.write('hello')
finally:
    f.close()
```



另外一个典型的例子，是 Python 中的 threading.lock 类。举个例子，比如我想要获取一个锁，执行相应的操作，完成后再释放，那么代码就可以写成下面这样：



```python
some_lock = threading.Lock()
some_lock.acquire()
try:
    ...
finally:
    some_lock.release()
```



而对应的 with 语句，同样非常简洁：



```python
some_lock = threading.Lock()
with somelock:
    ...
```



我们可以从这两个例子中看到，with 语句的使用，可以简化了代码，有效避免资源泄露的发生。



## 上下文管理器的实现



### 基于类的上下文管理器

了解了上下文管理的概念和优点后，下面我们就通过具体的例子，一起来看看上下文管理器的原理，搞清楚它的内部实现。这里，我自定义了一个上下文管理类 FileManager，模拟 Python 的打开、关闭文件操作：



```python
class FileManager:
    def __init__(self, name, mode):
        print('calling __init__ method')
        self.name = name
        self.mode = mode 
        self.file = None
        
    def __enter__(self):
        print('calling __enter__ method')
        self.file = open(self.name, self.mode)
        return self.file


    def __exit__(self, exc_type, exc_val, exc_tb):
        print('calling __exit__ method')
        if self.file:
            self.file.close()
            
with FileManager('test.txt', 'w') as f:
    print('ready to write to file')
    f.write('hello world')
    
## 输出
calling __init__ method
calling __enter__ method
ready to write to file
calling __exit__ method
```



需要注意的是，当我们用类来创建上下文管理器时，必须保证这个类包括方法`__enter__()`和方法`__exit__()`。其中，方法`__enter__()`返回需要被管理的资源，方法`__exit__()`里通常会存在一些释放、清理资源的操作，比如这个例子中的关闭文件等等。



而当我们用 with 语句，执行这个上下文管理器时：

```python
with FileManager('test.txt', 'w') as f:
    f.write('hello world')
```



下面这四步操作会依次发生：方法`__init__()`被调用，程序初始化对象 FileManager，使得文件名（name）是"test.txt"，文件模式 (mode) 是'w'；方法`__enter__()`被调用，文件“test.txt”以写入的模式被打开，并且返回 FileManager 对象赋予变量 f；字符串“hello world”被写入文件“test.txt”；方法`__exit__()`被调用，负责关闭之前打开的文件流。



因此，这个程序的输出是：



```python
calling __init__ method
calling __enter__ method
ready to write to file
calling __exit__ meth
```



另外，值得一提的是，方法`__exit__()`中的参数“exc_type, exc_val, exc_tb”，分别表示 exception_type、exception_value 和 traceback。当我们执行含有上下文管理器的 with 语句时，如果有异常抛出，异常的信息就会包含在这三个变量中，传入方法`__exit__()`。



因此，如果你需要处理可能发生的异常，可以在`__exit__()`添加相应的代码，比如下面这样来写：



```python
class Foo:
    def __init__(self):
        print('__init__ called')        

    def __enter__(self):
        print('__enter__ called')
        return self
    
    def __exit__(self, exc_type, exc_value, exc_tb):
        print('__exit__ called')
        if exc_type:
            print(f'exc_type: {exc_type}')
            print(f'exc_value: {exc_value}')
            print(f'exc_traceback: {exc_tb}')
            print('exception handled')
        return True
    
with Foo() as obj:
    raise Exception('exception raised').with_traceback(None)

# 输出
__init__ called
__enter__ called
__exit__ called
exc_type: <class 'Exception'>
exc_value: exception raised
exc_traceback: <traceback object at 0x1046036c8>
exception handled
```

这里，我们在 with 语句中手动抛出了异常“exception raised”，你可以看到，`__exit__()`方法中异常，被顺利捕捉并进行了处理。不过需要注意的是，如果方法`__exit__()`没有返回 True，异常仍然会被抛出。因此，如果你确定异常已经被处理了，请在`__exit__()`的最后，加上“return True”这条语句。



### 基于生成器的上下文管理器

诚然，基于类的上下文管理器，在 Python 中应用广泛，也是我们经常看到的形式，不过 Python 中的上下文管理器并不局限于此。除了基于类，它还可以基于生成器实现。接下来我们来看一个例子。



比如，你可以使用装饰器 contextlib.contextmanager，来定义自己所需的基于生成器的上下文管理器，用以支持 with 语句。还是拿前面的类上下文管理器 FileManager 来说，我们也可以用下面形式来表示：



```python
from contextlib import contextmanager

@contextmanager
def file_manager(name, mode):
    try:
        f = open(name, mode)
        yield f
    finally:
        f.close()
        
with file_manager('test.txt', 'w') as f:
    f.write('hello world')
```



这段代码中，函数 file_manager() 是一个生成器，当我们执行 with 语句时，便会打开文件，并返回文件对象 f；当 with 语句执行完后，finally block 中的关闭文件操作便会执行。



你可以看到，使用基于生成器的上下文管理器时，我们不再用定义`__enter__()`和`__exit__()`方法，但请务必加上装饰器 @contextmanager，这一点新手很容易疏忽。



讲完这两种不同原理的上下文管理器后，还需要强调的是，基于类的上下文管理器和基于生成器的上下文管理器，这两者在功能上是一致的。只不过，基于类的上下文管理器更加 flexible，适用于大型的系统开发；而基于生成器的上下文管理器更加方便、简洁，适用于中小型程序。

