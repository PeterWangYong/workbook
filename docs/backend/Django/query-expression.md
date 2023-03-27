# 查询表达式

## F()

An `F()` object represents the value of a model field or annotated column. 

F(field)表示field字段的值，但Django并不会真的从数据库中获取值。

```python
# Tintin filed a news story!
reporter = Reporters.objects.get(name='Tintin')
reporter.stories_filed += 1 # 先从数据库获取value保存到内存，然后+1
reporter.save()
```

```python
from django.db.models import F
reporters = Reporters.objects.filter(name='Tintin')
# 构建一个SQL语句<update reporter set stories_filed = stories_filed + 1 where name = 'Tintin'>
reporters.update(stories_filed=F('stories_filed') + 1)
```

好处：1. 直接在数据库中进行计算 2.减少查询次数 3. 避免竞态条件（因为save或update时才会执行,利用数据库的行锁)

```python
from django.db.models import F
Entry.objects.filter(number_of_comments__gt=F('number_of_pingbacks'))
```

## Func()

执行数据库函数

```python
queryset.annotate(field_lower=Func(F('field'), function='LOWER'))
```

Func本身是是个类，可以继承创建子类

```python
class Lower(Func):
    function = 'LOWER'

queryset.annotate(field_lower=Lower('field'))
```

数据库函数： https://docs.djangoproject.com/en/3.1/ref/models/database-functions/



## Aggregate()

执行数据库聚合函数，作为其他的聚合函数的父类，比如Sum(),Count()...

```python
from django.db.models import Aggregate

class Sum(Aggregate):
    # Supports SUM(ALL field).
    function = 'SUM'
    template = '%(function)s(%(all_values)s%(expressions)s)'
    allow_distinct = False

    def __init__(self, expression, all_values=False, **extra):
        super().__init__(
            expression,
            all_values='ALL ' if all_values else '',
            **extra
        )
```



## Value()

