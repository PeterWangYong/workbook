# Location处理指令



## root和index

```sh
location / {
  root /usr/share/nginx/html;
  index index.html;
}
```

- root定义页面的根目录

- 匹配到的路径将被解释为目录的文件路径

  ```sh
  http://xxx/user.html    =>   /usr/share/nginx/html/user.html
  ```

- index定义路径位置指向目录，比如`/base/`，后面多一个'/'代表目录（没有指向任何目录下文件时）默认使用的文件

  ```sh
  http://xxx/base/    => /usr/share/nginx/html/base/index.html
  ```

## try_files

```sh
location / {
	root /usr/share/nginx/html;
	try_files $uri $uri/ /index.html;
}
```

- try_files用于返回指定文件，至少要有两个参数，最后一个参数为文件寻找失败之后重定向的路径，前面的参数全部为root下的文件路径。

- 文件路径参数如果最后没有`/`表示是文件路径，如果后面有`/`则表示目录路径，默认会返回该目录下的index.html。

- 有了`try_files`参数后`index`参数会失效。

- 可以填入$uri表示当前匹配的路径,参数`$uri`后面没有`/`则表示文件，即便`$uri`自己有`/`如`/base/user/`这种也表示文件。

- 为了兼容`$uri/`这种情况（因为`$uri`里面可能也有`/`)，如果我们要指定一个目录路径，则需要添加`//`才可以，比如`/alias//`才能返回从`/usr/share/nginx/html/alias/index.html`。

- $uri表示`http://localhost:8000/base/index.html`的`/base/index.html`部分。

- try_files 最后一个参数为重定向的路径，如果没有匹配到文件则重定向至`http://localhost:8000/index.html`。

- try_files 最后一个参数也可以是`=code`这种形式，表示如果没有找到文件则返回相应的状态码。

  ```sh
  location / {
  	root /usr/share/nginx/html;
  	try_files $uri $uri/ =500;
  }
  # 如果没有找到文件则返回500状态码
  ```

## proxy_pass

```sh
location /base {
  proxy_pass http://12.34.56.78:8000;
}

// http://xxx/base/user
```

- proxy_pass 后面的地址没有路径部分时，则将完整匹配路径传递给代理服务器

  ```sh
  http://12.34.56.78:8000/base/user
  ```
  
  ```
  location /base {
    proxy_pass http://12.34.56.78:8000/other;
  }
  
  // http://xxx/base/user
  ```
  
- proxy_pass 后面的地址有路径部分时，则将路径中前缀后面的部分传递给代理服务器

  ```sh
  http://12.34.56.78:8000/other/user # 将 /user 凭借在代理服务器后面
  ```

- 通常当proxy_pass后面路径尾巴存在`/`时，location 后面的路径需要在尾巴后面也要添加一个`/`防止字符串拼接时出现两个`/`

  ```sh
  location /base/ {
    proxy_pass http://12.34.56.78:8000/;
  }
  ```

- **对于正则匹配，proxy_pass后面不能有路径部分，否则会报错。** 因为正则匹配不是严格的前缀匹配，路径没法切割。

## return

```
location / {
	default_type text/html;
  return 200 'root';
}
```

- return用于直接返回值
- 在有return存在的情况下，只会返回return后面的值

