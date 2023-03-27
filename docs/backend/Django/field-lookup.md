# 字段条件表达式

## Field Lookups

一组特殊的的关键字参数，用于QuerySet的方法，比如filter,exclude,get，作用同SQL中的where子句。

基本格式：`field__lookuptype=value`（双下滑线）

```python
Entry.objects.filter(pub_date__lte='2006-01-01')
# 同where子句
SELECT * FROM blog_entry WHERE pub_date <= '2006-01-01';
```

## 内置lookuptype

1. exact：（默认）`Entry.objects.get(id__exact=14)` 

2. iexact: 同exact，但不区分大小写

3. contains：`Entry.objects.get(headline__contains='Lennon')` 同 `SELECT ... WHERE headline LIKE '%Lennon%';`

4. icontains: 同contains，但不区分大小写

5. in：接受iterable对象 `Entry.objects.filter(id__in=[1, 3, 4])` 同 `SELECT ... WHERE id IN (1, 3, 4);`

6. gt:  `Entry.objects.filter(id__gt=4)` 同 `SELECT ... WHERE id > 4;`

7. gte

8. lt

9. lte

10. startswith: 以xx开头`Entry.objects.filter(headline__startswith='Lennon')` 同 `SELECT ... WHERE headline LIKE 'Lennon%';`

11. istartswith: 同startswith, 但不区分大小写

12. endswith: 以xx结尾

13. iendswith

14. range：在xx范围内

    ```python
    import datetime
    start_date = datetime.date(2005, 1, 1)
    end_date = datetime.date(2005, 3, 31)
    Entry.objects.filter(pub_date__range=(start_date, end_date))
    ```

    同

    ```sql
    SELECT ... WHERE pub_date BETWEEN '2005-01-01' and '2005-03-31';
    ```

15. date: 将value转换为date类型

    ```python
    Entry.objects.filter(pub_date__date=datetime.date(2005, 1, 1))
    Entry.objects.filter(pub_date__date__gt=datetime.date(2005, 1, 1))
    ```

16. year: 取date的year部分

    ```python
    Entry.objects.filter(pub_date__year=2005)
    Entry.objects.filter(pub_date__year__gte=2005)
    ```

    同

    ```sql
    SELECT ... WHERE pub_date BETWEEN '2005-01-01' AND '2005-12-31';
    SELECT ... WHERE pub_date >= '2005-01-01';
    ```

17. iso_year

18. month

19. day

20. week

21. week_day: 1(星期日）- 7（星期六）

22. iso_week_day: 1(星期一) - 7（星期日）

23. quarter：季度（1-4）

24. time: `Entry.objects.filter(pub_date__time=datetime.time(14, 30))`

25. hour

26. minute

27. second

28. isnull: `Entry.objects.filter(pub_date__isnull=True)` 同 `SELECT ... WHERE pub_date IS NULL;`

29. regex: `Entry.objects.get(title__regex=r'^(An?|The) +')` 同 `SELECT ... WHERE title REGEXP BINARY '^(An?|The) +'; -- MySQL`

30. iregex: 同 regex，但不区分大小写

## 自定义lookuptype

PASS
