# PostgreSQL

## 安装部署

```bash
# CentOS7 X64
yum install https://download.postgresql.org/pub/repos/yum/reporpms/EL-7-x86_64/pgdg-redhat-repo-latest.noarch.rpm
yum install postgresql12
yum install postgresql12-server
/usr/pgsql-12/bin/postgresql-12-setup initdb
systemctl enable postgresql-12
systemctl start postgresql-12
```



## 命令行工具

### 数据库操作

- 创建数据库

  ```bash
  export PATH=$PATH:/usr/local/pgsql/bin/
  createdb
  ```
  
- 连接数据库

  ```bash
  # 如果不指定数据库，默认进入用户同名数据库
  psql -h localhost -p 5432 -U postgre mydb
  ```

- 删除数据库

  ```bash
  dropdb dbname
  ```

### 内置命令

```
\h 	SQL帮助文档
\? 	内置命令文档
\q	退出数据库	
\i 	执行SQL文件
\c  切换数据库
\dt	列出数据表
\du 列出角色
\l	列出数据库
\cd 更改工作目录
```

## SQL语句

### 数据库操作

```sql
# 创建数据库
CREATE DATABASE dbname;
# 删除数据库
DROP DATABASE [IF EXISTS] dbname;
# 用户授权
grant all privileges on database test02 to test02_user
```

