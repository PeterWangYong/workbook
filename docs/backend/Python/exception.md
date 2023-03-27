# 异常处理

## 错误与异常

通常来说，程序中的错误至少包括两种，一种是语法错误，另一种则是异常。

所谓语法错误，你应该很清楚，也就是你写的代码不符合编程规范，无法被识别与执行，比如下面这个例子：

```python
if name is not None
    print(name)
```

If 语句漏掉了冒号，不符合 Python 的语法规范，所以程序就会报错invalid syntax。

而异常则是指程序的语法正确，也可以被执行，但在执行过程中遇到了错误，抛出了异常，比如下面的 3 个例子：

```python
10 / 0
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ZeroDivisionError: integer division or modulo by zero

order * 2
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
NameError: name 'order' is not defined

1 + [1, 2]
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: unsupported operand type(s) for +: 'int' and 'list'
```

它们语法完全正确，但显然，我们不能做除法时让分母为 0；也不能使用未定义的变量做运算；而让一个整型和一个列表相加也是不可取的。

于是，当程序运行到这些地方时，就抛出了异常，并且终止运行。例子中的ZeroDivisionError NameError和TypeError，就是三种常见的异常类型。

## 处理异常

### 使用try...except捕获异常

```python
try:
    s = input('please enter two numbers separated by comma: ')
    num1 = int(s.split(',')[0].strip())
    num2 = int(s.split(',')[1].strip())
    ...
except ValueError as err:
    print('Value Error: {}'.format(err))
except IndexError as err:
    print('Index Error: {}'.format(err))
except:
    print('Other error')

print('continue')
...
```

可以在 except 后面省略异常类型，这表示与任意异常相匹配（包括系统异常等）

## 自定义异常

```python
class MyInputError(Exception):
    """Exception raised when there're errors in input"""
    def __init__(self, value): # 自定义异常类型的初始化
        self.value = value
    def __str__(self): # 自定义异常类型的string表达形式
        return ("{} is invalid input".format(repr(self.value)))
    
try:
    raise MyInputError(1) # 抛出MyInputError这个异常
except MyInputError as err:
    print('error: {}'.format(err))
    
# error: 1 is invalid input
```

