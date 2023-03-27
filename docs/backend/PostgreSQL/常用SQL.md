# 常用 SQL

## 创建用户和数据库

```sql
su - postgres
psql

postgres=# create user <username> with password '<password>'; -- 创建用户
postgres=# create database <database> owner <username>; -- 创建数据库
postgres=# grant all on database <database> to <username>; -- 授权数据库权限
```

## 创建表

```sql
create table posts (
    id serial primary key,
    title varchar(255) not null,
    content text check(length(content) > 8),
    is_draft boolean default TRUE,
    is_del boolean default FALSE,
    created_date timestamp default 'now'
);

-- 说明
/*
约束条件：

not null:不能为空
unique:在所有数据中值必须唯一
check:字段设置条件
default:字段默认值
primary key(not null, unique):主键，不能为空，且不能重复
*/
```

## 新增数据

```sql
insert into [tablename] (field, ...) values (value, ...)
```

