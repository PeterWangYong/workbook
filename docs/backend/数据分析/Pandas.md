# Pandas

Pandas 可以说是基于 NumPy 构建的含有更高级数据结构和分析能力的工具包。

两个核心数据结构：Series 和 DataFrame ，他们分别代表着一维的序列和二维的表结构。基于这两种数据结构，Pandas 可以对数据进行导入、清洗、处理、统计和输出。

## 数据结构

### Series

**Series 是个定长的字典序列**。说是定长是因为在存储的时候，相当于两个 ndarray，这也是和字典结构最大的不同。因为在字典的结构里，元素的个数是不固定的。

Series 有两个基本属性：index 和 values。在 Series 结构中，index 默认是 0,1,2,……递增的整数序列，当然我们也可以自己来指定索引，比如 index=[‘a’, ‘b’, ‘c’, ‘d’]。

```python
from pandas import Series, DataFrame
x1 = Series([1,2,3,4])
x2 = Series(data=[1,2,3,4], index=['a', 'b', 'c', 'd'])
x3 = Series({'a':1, 'b':2, 'c':3, 'd':4})
print(x1)
print(x2)
print(x3)

"""
0    1
1    2
2    3
3    4
dtype: int64
a    1
b    2
c    3
d    4
dtype: int64
a    1
b    2
c    3
d    4
dtype: int64
"""
```



### DataFrame

DataFrame 类型数据结构类似数据库表。

它包括了行索引和列索引，我们可以将 DataFrame 看成是由相同索引的 Series 组成的字典类型。

```python
from pandas import Series, DataFrame
data = {'Chinese': [66, 95, 93, 90,80],'English': [65, 85, 92, 88, 90],'Math': [30, 98, 96, 77, 90]}
df1= DataFrame(data)
# index为行索引 columns为列索引
df2 = DataFrame(data, index=['ZhangFei', 'GuanYu', 'ZhaoYun', 'HuangZhong', 'DianWei'], columns=['English', 'Math', 'Chinese'])
print(df1)
print(df2)

"""
   Chinese  English  Math
0       66       65    30
1       95       85    98
2       93       92    96
3       90       88    77
4       80       90    90
            English  Math  Chinese
ZhangFei         65    30       66
GuanYu           85    98       95
ZhaoYun          92    96       93
HuangZhong       88    77       90
DianWei          90    90       80
"""
```



## 数据导入和导出

Pandas 允许直接从 xlsx，csv 等文件中导入数据，也可以输出到 xlsx, csv 等文件，非常方便。

```python
import pandas as pd
from pandas import Series, DataFrame
score = DataFrame(pd.read_excel('data.xlsx'))
score.to_excel('data1.xlsx')
print score
```



## 数据清洗

```python
data = {'Chinese': [66, 95, 93, 90,80],'English': [65, 85, 92, 88, 90],'Math': [30, 98, 96, 77, 90]}
df2 = DataFrame(data, index=['ZhangFei', 'GuanYu', 'ZhaoYun', 'HuangZhong', 'DianWei'], columns=['English', 'Math', 'Chinese'])

```

### 删除不必要的行或列

```python
df2 = df2.drop(columns=['Chinese']) # 删除Chinese列
df2 = df2.drop(index=['ZhangFei']) # 删除zhangfei行
```

### 重命名列

```python
df2.rename(columns={'Chinese': 'YuWen', 'English': 'Yingyu'}, inplace = True)
```

### 去掉重复的行

```python
df2 = df2.drop_duplicates() # 去除重复行
```

### 更改数据格式

```python
import numpy as np
df2['Chinese'].astype('str') 
df2['Chinese'].astype(np.int64) 
```

### 删除空格和特殊符号

```python
#删除左右两边空格
df2['Chinese']=df2['Chinese'].map(str.strip)
#删除左边空格
df2['Chinese']=df2['Chinese'].map(str.lstrip)
#删除右边空格
df2['Chinese']=df2['Chinese'].map(str.rstrip)
# 删除$符号
df2['Chinese']=df2['Chinese'].str.strip('$')
```

### 大小写转换

```python
#全部大写
df2.columns = df2.columns.str.upper()
#全部小写
df2.columns = df2.columns.str.lower()
#首字母大写
df2.columns = df2.columns.str.title()
```

### 查找空值

```python
df.isnull() # 哪个值是空值
df.isnull().any() # 哪一列有空值
```



### 使用apply函数

apply 函数是 Pandas 中自由度非常高的函数，使用频率也非常高。

```python
# 转大写
df['name'] = df['name'].apply(str.upper)

# 自定义函数：将原来值*2
def double_df(x):
           return 2*x
df1[u'语文'] = df1[u'语文'].apply(double_df)
```



## 数据统计

### 常用统计函数

- `count()` 统计个数，空值NaN不计算
- `describe()` 一次性输出多个统计指标，包括：count，mean，std，min，max等
- `min()` 最小值
- `max()` 最大值
- `sum()` 总和
- `mean()` 平均值
- `median()` 中位数
- `var()` 方差
- `std()` 标准差
- `argmin()` 统计最小值的索引位置
- `argmax()` 统计最大值的索引位置
- `idxmin()` 统计最小值的索引值
- `idxmax()` 统计最大值的索引值



## 数据表合并

有时候我们需要将多个渠道源的多个数据表进行合并，一个 DataFrame 相当于一个数据库的数据表，那么多个 DataFrame 数据表的合并就相当于多个数据库的表合并。

```python
df1 = DataFrame({'name':['ZhangFei', 'GuanYu', 'a', 'b', 'c'], 'data1':range(5)})
df2 = DataFrame({'name':['ZhangFei', 'GuanYu', 'A', 'B', 'C'], 'data2':range(5)})
```



### 基于指定列进行连接

```python
df3 = pd.merge(df1, df2, on='name')
```



### inner内连接

```python
df3 = pd.merge(df1, df2, how='inner')
```

inner 内链接是 merge 合并的默认情况，inner 内连接其实也就是键的交集，在这里 df1, df2 相同的键是 name，所以是基于 name 字段做的连接

### left左连接

```python
df3 = pd.merge(df1, df2, how='left')
```

左连接是以第一个 DataFrame 为主进行的连接，第二个 DataFrame 作为补充。

### right右连接

```python
df3 = pd.merge(df1, df2, how='right')
```

右连接是以第二个 DataFrame 为主进行的连接，第一个 DataFrame 作为补充。

### outer外连接

```python
df3 = pd.merge(df1, df2, how='outer')
```

外连接相当于求两个 DataFrame 的并集。



## 使用SQL处理数据

在 Python 里可以直接使用 SQL 语句来操作 Pandas。

**介绍个工具：pandasql**，pandasql 中的主要函数是 `sqldf`，它接收两个参数：一个 SQL 查询语句，还有一组环境变量 globals() 或 locals()。这样我们就可以在 Python 里，直接用 SQL 语句中对 DataFrame 进行操作，举个例子：

```python
import pandas as pd
from pandas import DataFrame
from pandasql import sqldf, load_meat, load_births
df1 = DataFrame({'name':['ZhangFei', 'GuanYu', 'a', 'b', 'c'], 'data1':range(5)})
pysqldf = lambda sql: sqldf(sql, globals())
sql = "select * from df1 where name ='ZhangFei'"
print pysqldf(sql)

"""
   data1      name
0      0  ZhangFei
"""
```

