# 字符串

## 字符串的不可变性



## 使用+=打破不可变性

```python
s1 = 'hello'
s1 += ' world'
print(s1)

# "hello world"
```

自从 Python2.5 开始，每次处理字符串的拼接操作时（str1 += str2），Python 首先会检测 str1 还有没有其他的引用。如果没有的话，就会尝试原地扩充字符串 buffer 的大小，而不是重新分配一块内存来创建新的字符串并拷贝。

