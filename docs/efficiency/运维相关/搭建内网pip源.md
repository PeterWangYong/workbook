# 搭建内网pip源



## 下载依赖包

```bash
pip install pip2pi

# 创建目录
mkdir ~/pypi

# 下载依赖包
pip2tgz ~/pypi -r requirements.txt

# 建立索引，该命令会创建simple文件夹
dir2pi ~/pypi
```



## 启动服务



### 使用pypiserver

```bash
pip install pypiserver
pypi-server -p 8080 ~/pypi
```

### 使用nginx

```bash
vim /etc/nginx/conf.d/default.conf

location / {
	root /usr/share/nginx/html/pypi;
	autoindex on;
	# autoindex_exact_size off; 文件大小
	# autoindex_localtime on; 文件时间
	# limit_rate_after 5m; 5分钟后限制速率；
	# limit_rate 200k; # 速率限制为200k/s
}
```



## 修改pip源

### 临时修改

```bash
pip install -i http://localhost:8080/simple/ django
```

### 永久修改

```bash
vim ~/.pip/pip.conf

[global]
index-url = https://localhost:8080/simple/
[install]
trusted-host=localhost
```

