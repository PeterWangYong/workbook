# 装饰器

## 函数式编程

python中一切都是对象，函数也是对象。

函数参数和返回值可以是对象的引用，因而函数可以作为函数的参数和返回值。

接收函数作为参数或返回值的函数称作高阶函数。

## 语法糖

语法糖是编程语言中的一种特殊语法，旨在让代码更可读，简化程序员的工作。

## 函数装饰器

函数装饰器本质是一个高阶函数，通过接收一个函数，返回一个新的函数实现「装饰」功能。

一个校验装饰器：

```python
from functools import wraps

def check_int(func):
    @wraps(func)
    def wrap(num):
        if type(num) != int:
            raise TypeError("num is not int")
        return func(num)

    return wrap


@check_int
def add_one(num):
    return 1 + num


if __name__ == "__main__":
    print(add_one(10))
```

1. check_int是一个高阶函数，由于接收和返回一个函数，因而也是一个装饰器
2. @xxx是一个语法糖
3. 使用functools.wraps来保留原函数的签名

## 类装饰器

```python
class Decorator:
    def __init__(self, func):
        self.func = func

    def __call__(self, *args, **kwargs):
        print("decorator running")
        return self.func(*args, **kwargs)


@Decorator
def func():
    print("func running")


func()
# 经过装饰，func实际上已经是Decorator的实例了
print(type(func))
```



## 装饰器的嵌套

```python
@decorator1
@decorator2
@decorator3
def func():
    ...
    
# 它的执行顺序从里到外，所以上面的语句也等效于下面这行代码：

decorator1(decorator2(decorator3(func)))
```



## 装饰器的用途

### 身份认证

```python
import functools

def authenticate(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        request = args[0]
        if check_user_logged_in(request): # 如果用户处于登录状态
            return func(*args, **kwargs) # 执行函数post_comment() 
        else:
            raise Exception('Authentication failed')
    return wrapper
    
@authenticate
def post_comment(request, ...)
    ...
 
```

### 日志记录

```python
import time
import functools

def log_execution_time(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        res = func(*args, **kwargs)
        end = time.perf_counter()
        print('{} took {} ms'.format(func.__name__, (end - start) * 1000))
        return res
    return wrapper
    
@log_execution_time
def calculate_similarity(items):
    ...
```

### 输入检查

```python
import functools

def validation_check(input):
    @functools.wraps(func)
    def wrapper(*args, **kwargs): 
        ... # 检查输入是否合法
    
@validation_check
def neural_network_training(param1, param2, ...):
    ...
```



### 缓存

使用lru_cache，根据参数缓存值，如果参数相同则返回缓存中的值，否则调用函数进行计算。

```python
import time
import random
from functools import lru_cache


@lru_cache(maxsize=20)
def get_num(start, end):
    time.sleep(2)
    return random.randint(start, end)


t1 = time.time()
get_num(10, 20)
get_num(10, 20)
get_num(10, 20)
t2 = time.time()
print("cost: ", t2 - t1)

t1 = time.time()
get_num(10, 30)
get_num(10, 40)
get_num(10, 50)
t2 = time.time()
print("cost: ", t2 - t1)

# output:
# cost:  2.000396966934204
# cost:  6.0049521923065186
```

