# Mysql基础



## 版本

```bash
mysql -V
```

## 登录登出

```bash
mysq -u root -p -h 127.0.0.1 -P 3306
> exit;
> quit;
```

## 修改提示符

```bash
mysql>prompt \u@\h \d>
PROMPT set to '\u@\h \d>'
root@localhost hadoop_hive>
```

> \D 完整日期
>
> \d 当前数据库
>
> \h 主机名
>
> \u 当前用户

## 版本日期用户

```mysql
select version();
select now();
select user();
```

