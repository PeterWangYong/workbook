# MetaClass元类

## 所有class是type类的对象

```python
# 所有类都是type的实例
print(type(object))
# <class 'type'>

# 类的创建等于type进行实例化
class Test:
    pass

test = Test()
print(test)

Test1 = type("Test", (), {})
test1 = Test1()
print(test1)

# <class 'type'>
# <__main__.Test object at 0x7fe8386462e0>
# <__main__.Test object at 0x7fe83860feb0>
```

> 为避免无限回溯，type类是其自身的实例
>
> type是object的子类，object是type的实例
>
> 这两个是很神奇的「鸡生蛋蛋生鸡」的关系，无法用python代码描述，很好奇背后是如何实现的



## metaclass同时也是type类的子类

元类是type的子类，因而可以作为制造类的工厂。

元类通过`__init__`方法定制实例即普通类，元类可以做到类装饰器能做到的所有事情。

元类、类装饰器、函数装饰器都可以归为元编程，他们都可以对目标对象的属性进行操作。

```python
class MetaTest(type):
    def __init__(cls, name, bases, cls_attrs):
        super().__init__(name, bases, cls_attrs)
        print(f"class name is {name}")


class Test(metaclass=MetaTest):
    pass


test = Test()

# output:
# class name is Test
```

因为类的创建本质是type的实例化，元类作为type的子类可以重写init方法，因而当我们指定元类时，即使用元类代替type进行实例化。