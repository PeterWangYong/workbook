# GitLab

## 什么是GitLab？

## 为什么使用GitLab？

## 安装部署

### docker-compose部署

1. docker-compose.yml

   ```yaml
   version: '2.3'
   
   services:
     redis:
       restart: always
       image: redis:5.0.9
       command:
       - --loglevel warning
       volumes:
       - /data/gitlab/redis:/var/lib/redis:Z	# redis数据
   
     postgresql:
       restart: always
       image: sameersbn/postgresql:11-20200524
       volumes:
       - /data/gitlab/postgresql:/var/lib/postgresql:Z	# postgresql数据
       environment:
       - DB_USER=gitlab
       - DB_PASS=password
       - DB_NAME=gitlabhq_production
       - DB_EXTENSION=pg_trgm
   
     gitlab:
       restart: always
       image: sameersbn/gitlab:13.2.2
       depends_on:
       - redis
       - postgresql
       ports:
       - "10080:80"
       - "10022:22"
       volumes:
       - /data/gitlab/gitlab:/home/git/data:Z	# gitlab数据
       healthcheck:
         test: ["CMD", "/usr/local/sbin/healthcheck"]
         interval: 5m
         timeout: 10s
         retries: 3
         start_period: 5m
       environment:
       - DEBUG=false
   
       - DB_ADAPTER=postgresql
       - DB_HOST=postgresql
       - DB_PORT=5432
       - DB_USER=gitlab
       - DB_PASS=password
       - DB_NAME=gitlabhq_production
   
       - REDIS_HOST=redis
       - REDIS_PORT=6379
   
       - TZ=Asia/Shanghai	# 时区
       - GITLAB_TIMEZONE=Asia/Shanghai # 时区
   
       - GITLAB_HTTPS=false
       - SSL_SELF_SIGNED=false
   
       - GITLAB_HOST=centos.vm.com  # GitLab显示的仓库克隆地址
       - GITLAB_PORT=10080
       - GITLAB_SSH_PORT=10022
       - GITLAB_SECRETS_DB_KEY_BASE=long-and-random-alphanumeric-string
       - GITLAB_SECRETS_SECRET_KEY_BASE=long-and-random-alphanumeric-string
       - GITLAB_SECRETS_OTP_KEY_BASE=long-and-random-alphanumeric-string
   
       - GITLAB_ROOT_PASSWORD=password			# 登录密码
       - GITLAB_ROOT_EMAIL=root@example.com	# 对应root账号的邮箱
   
       - GITLAB_BACKUP_SCHEDULE=daily
       - GITLAB_BACKUP_TIME=01:00
       - GITLAB_BACKUP_EXPIRY=604800  # 保留最近7天的备份
   ```

2. 启动容器

   ```bash
   docker-compose up -d
   ```

> 参考资料：https://github.com/sameersbn/docker-gitlab

