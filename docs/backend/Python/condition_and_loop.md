# 条件与循环



## 条件语句

![img](https://gitee.com/PeterWangYong/blog-image/raw/master/images/949742df36600c086c31e399ce515f45.png)

## 循环语句

### enumerate

当我们同时需要索引和元素时，还有一种更简洁的方式，那就是通过 Python 内置的函数 enumerate()。用它来遍历集合，不仅返回每个元素，并且还返回其对应的索引。

```python
l = [1, 2, 3, 4, 5, 6, 7]
for index, item in enumerate(l): 
    if index < 5: 
        print(item)
```

### for和while的效率问题

下面的while循环：

```python
i = 0
while i < 1000000:
    i += 1
```

和等价的for循环:

```python
for i in range(0, 1000000):
    pass
```

究竟谁的效率高？

要知道，range() 函数是直接由 C 语言写的，调用它速度非常快。而 while 循环中的“i += 1”这个操作，得通过 Python 的解释器间接调用底层的 C 语言；并且这个简单的操作，又涉及到了对象的创建和删除（因为 i 是整型，是 immutable，i += 1 相当于 i = new int(i + 1)）。所以，显然，for 循环的效率更胜一筹。

## 列表推导

```python
[expression1 if condition else expression2 for item in iterable]
```

而如果没有 else 语句，则需要写成：

```python
[expression for item in iterable if condition]
```

