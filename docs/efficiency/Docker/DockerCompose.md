# DockerCompose



## 介绍

docker-compose可以批量定义和管理容器

## 安装部署

1. 下载 docker-compose

   ```bash
   curl -L https://get.daocloud.io/docker/compose/releases/download/1.26.2/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
   ```

2. 给予执行权限

   ```bash
   chmod +x /usr/local/bin/docker-compose
   ```

3. 测试安装是否成功

   ```bash
   docker-compose --version
   ```

> 参考文档：http://get.daocloud.io/#install-compose



## 配置文件

docker-compose.yml 用于配置 docker-compose 要管理的容器信息。

以安装 mongodb 为例：

```yaml
version: '3.1'
services:
	mongo:
		image: mongo
    	restart: always
    	environment:
			MONGO_INITDB_ROOT_USERNAME: root
        	MONGO_INITDB_ROOT_PASSWORD: password
    	ports:
			- 27017:2701
		volumes:
			- /data/mongodb/db:/data/db
```



## 常用命令

1. up 创建和启动容器

   ```bash
   docker-compose up -d
   # -d 后台运行容器
   ```

[options]:

- -d: 后台运行容器

