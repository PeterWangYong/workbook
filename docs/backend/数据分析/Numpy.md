# Numpy

Numpy不仅是 Python 中使用最多的第三方库，而且还是 SciPy、Pandas 等数据科学的基础库。它所提供的数据结构比 Python 自身的“更高级、更高效”，可以这么说，NumPy 所提供的数据结构是 Python 数据分析的基础。

## 数组

为什么要用 NumPy 数组结构而不是 Python 本身的列表 list？这是因为列表 list 的元素在系统内存中是分散存储的，而 NumPy 数组存储在一个均匀连续的内存块中。这样数组计算遍历所有的元素，不像列表 list 还需要对内存地址进行查找，从而节省了计算资源。



### ndarray对象

ndarray 实际上是多维数组的含义。在 NumPy 数组中，**维数称为秩（rank）**，一维数组的秩为 1，二维数组的秩为 2，以此类推。在 NumPy 中，每一个线性的数组称为一个轴（axes），其实秩就是描述轴的数量。



#### 创建数组

```python
import numpy as np
a = np.array([1, 2, 3])
b = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
b[1,1]=10
print(a.shape)
print(b.shape)
print(a.dtype)
print(b)

# 通过函数 shape 属性获得数组的大小，通过 dtype 获得元素的属性

"""
(3,)
(3, 3)
int64
[[ 1  2  3]
 [ 4 10  6]
 [ 7  8  9]]
"""
```

#### 结构数组

```python
import numpy as np
persontype = np.dtype({
    'names':['name', 'age', 'chinese', 'math', 'english'],
    'formats':['S32','i', 'i', 'i', 'f']})
peoples = np.array([("ZhangFei",32,75,100, 90),("GuanYu",24,85,96,88.5),
       ("ZhaoYun",28,85,92,96.5),("HuangZhong",29,65,85,100)],
    dtype=persontype)
ages = peoples[:]['age']
chineses = peoples[:]['chinese']
maths = peoples[:]['math']
englishs = peoples[:]['english']
print np.mean(ages)
print np.mean(chineses)
print np.mean(maths)
print np.mean(englishs)

"""
28.25
77.5
93.25
93.75
"""
```

首先在 NumPy 中是用 dtype 定义的结构类型，然后在定义数组的时候，用 array 中指定了结构数组的类型 dtype=persontype，这样你就可以自由地使用自定义的 persontype 了。比如想知道每个人的语文成绩，就可以用 chineses = peoples[:][‘chinese’]，当然 NumPy 中还有一些自带的数学运算，比如计算平均值使用 np.mean。



### ufunc 运算

ufunc 是 universal function 的缩写，是不是听起来就感觉功能非常强大？确如其名，它能对数组中每个元素进行函数操作。NumPy 中很多 ufunc 函数计算速度非常快，因为都是采用 C 语言实现的。

#### 连续数组

```python
x1 = np.arange(1,11,2) # 初始值 终值 步长
x2 = np.linspace(1,9,5) # 初始值 终值 元素个数
print(x1, x2)

# [1 3 5 7 9] [1. 3. 5. 7. 9.]
```



#### 算数运算

通过 NumPy 可以自由地创建等差数组，同时也可以进行加、减、乘、除、求 n 次方和取余数。

```python
x1 = np.arange(1,11,2)
x2 = np.linspace(1,9,5)
print(np.add(x1, x2))
print(np.subtract(x1, x2))
print(np.multiply(x1, x2))
print(np.divide(x1, x2))
print(np.power(x1, x2))
print(np.remainder(x1, x2)) # 同np.mod(x1, x2)
```



#### 统计函数

##### 最大值、最小值

```python
import numpy as np
a = np.array([[1,2,3], [4,5,6], [7,8,9]])
print np.amin(a)
print np.amin(a,0)
print np.amin(a,1)
print np.amax(a)
print np.amax(a,0)
print np.amax(a,1)
```

amin() 用于计算数组中的元素沿指定轴的最小值。对于一个二维数组 a，amin(a) 指的是数组中全部元素的最小值，amin(a,0) 是延着 axis=0 轴的最小值，axis=0 轴是把元素看成了[1,4,7], [2,5,8], [3,6,9]三个元素（**按列查询**），所以最小值为[1,2,3]，amin(a,1) 是延着 axis=1 轴的最小值，axis=1 轴是把元素看成了[1,2,3], [4,5,6], [7,8,9]三个元素（**按行查询**），所以最小值为[1,4,7]。同理 amax() 是计算数组中元素沿指定轴的最大值。



##### 最大值与最小值之差

```python
a = np.array([[1,2,3], [4,5,6], [7,8,9]])
print np.ptp(a)
print np.ptp(a,0)
print np.ptp(a,1)
```



##### 百分位数

```python
a = np.array([[1,2,3], [4,5,6], [7,8,9]])
print np.percentile(a, 50)
print np.percentile(a, 50, axis=0)
print np.percentile(a, 50, axis=1)
```

percentile() 代表着第 p 个百分位数，这里 p 的取值范围是 0-100，如果 p=0，那么就是求最小值，如果 p=50 就是求平均值，如果 p=100 就是求最大值。同样你也可以求得在 axis=0 和 axis=1 两个轴上的 p% 的百分位数。



##### 中位数、平均数

```python

a = np.array([[1,2,3], [4,5,6], [7,8,9]])
#求中位数
print np.median(a)
print np.median(a, axis=0)
print np.median(a, axis=1)
#求平均数
print np.mean(a)
print np.mean(a, axis=0)
print np.mean(a, axis=1)
```



##### 加权平均值

```python
a = np.array([1,2,3,4])
wts = np.array([1,2,3,4])
print np.average(a)
print np.average(a,weights=wts)
```

average() 函数可以求加权平均，加权平均的意思就是每个元素可以设置个权重，默认情况下每个元素的权重是相同的，所以 np.average(a)=(1+2+3+4)/4=2.5，你也可以指定权重数组 wts=[1,2,3,4]，这样加权平均 np.average(a,weights=wts)=(1*1+2*2+3*3+4*4)/(1+2+3+4)=3.0。



##### 标准差、方差

```python
a = np.array([1,2,3,4])
print np.std(a)
print np.var(a)
```

方差的计算是指每个数值与平均值之差的平方求和的平均值，即 mean((x - x.mean())** 2)。标准差是方差的算术平方根。在数学意义上，代表的是一组数据离平均值的分散程度。所以 np.var(a)=1.25, np.std(a)=1.118033988749895。



### 排序

```python
a = np.array([[4,3,2],[2,4,1]])
print np.sort(a)
print np.sort(a, axis=None)
print np.sort(a, axis=0)  
print np.sort(a, axis=1)  
```

排序是算法中使用频率最高的一种，也是在数据分析工作中常用的方法，计算机专业的同学会在大学期间的算法课中学习。那么这些排序算法在 NumPy 中实现起来其实非常简单，一条语句就可以搞定。这里你可以使用 sort 函数，sort(a, axis=-1, kind=‘quicksort’, order=None)，默认情况下使用的是快速排序；在 kind 里，可以指定 quicksort、mergesort、heapsort 分别表示快速排序、合并排序、堆排序。同样 axis 默认是 -1，即沿着数组的最后一个轴进行排序，也可以取不同的 axis 轴，或者 axis=None 代表采用扁平化的方式作为一个向量进行排序。另外 order 字段，对于结构化的数组可以指定按照某个字段进行排序。