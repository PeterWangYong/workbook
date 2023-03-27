# Kong

## 虚拟机部署

> 依赖：epel，postgresql 9.5+

```shell
# version: 2.0.3
# require: root用户或sudo权限

# 下载安装包
yum localinstall kong-2.0.3.el7.amd64.rpm

# 创建日志目录
mkdir -p /data/kong/logs

# 更改配置文件
cd /etc/kong
cp kong.conf.default kong.conf
vim kong.conf

proxy_access_log = /data/kong/logs/access.log
proxy_error_log = /data/kong/logs/error.log
admin_access_log = /data/kong/logs/admin_access.log
admin_error_log = /data/kong/logs/admin_error.log

admin_listen = 0.0.0.0:8011 reuseport backlog=16384, 127.0.0.1:8454 http2 ssl reuseport backlog=16384

database = postgres             # Determines which of PostgreSQL or Cassandra
                                 # this node will use as its datastore.
                                 # Accepted values are `postgres`,
                                 # `cassandra`, and `off`.

pg_host = localhost             # Host of the Postgres server.
pg_port = 5432                  # Port of the Postgres server.
#pg_timeout = 5000               # Defines the timeout (in ms), for connecting,
                                 # reading and writing.

pg_user = kong                  # Postgres user.
pg_password = kong                  # Postgres user's password.
pg_database = kong  

# 用于存在代理时获得原始IP地址
trusted_ips = 0.0.0.0/0,::/0
real_ip_header = X-Forwarded-For
real_ip_recursive = on

######### 可选（为admin端口添加basic认证）#################

# 配置admin代理
vim /usr/local/share/lua/5.1/kong/templates/nginx.lua

 server {
      server_name kong_proxy;
      listen 0.0.0.0:8001;

      location / {
        auth_basic "kong admin basic auth";
        auth_basic_user_file htpasswd;
        proxy_pass http://127.0.0.1:8011/;
      }
    }

# 添加认证文件
vim /usr/local/kong/htpasswd
admin:$apr1$1K2qHU6i$sektI//LNe7o3lVm8GGEU.
# 原密码
# admin:kong_admin1qaz@WSX
# HTTP Header
# Authorization / Basic YWRtaW46a29uZ19hZG1pbjFxYXpAV1NY

##########################################################

# 初始化数据库表
kong migrations bootstrap

# 启动Kong
kong start
# 重启Kong
kong restart
# 检查健康状态
kong health
```

## Konga 部署

### 虚拟机部署

> 依赖 NodeJS8+

```bash
git clone https://github.com/pantsel/konga.git
cd konga
npm i

# 修改配置，如果没有.env则按照默认配置
cp .env_example .env

npm start // 开发模式
npm run production // 生产模式
```

### 容器部署

```sh
docker run -d --name konga \
-p 1337:1337 \
-e "NODE_ENV=production" \
-e "TOKEN_SECRET=secret" \
pantsel/konga
```

