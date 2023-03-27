# Location规则

> 参考：https://blog.csdn.net/agonie201218/article/details/92795522



## 匹配符

- **=**    精确匹配
- **^~**  字符匹配
- **~**    正则匹配，区分大小写
- **~\***   正则匹配，不区分大小写

## 匹配顺序

### 精确匹配

- 首先进行精确匹配

  ```sh
  location = /hello/world/ {
  	default_type text/html;
  	return 200 'hello world exact';
  }
  ```

- 匹配成功后，停止向下匹配

### 字符匹配

- 其次进行字符匹配

  ```sh
  location ^~ /hello/world/ {
  	default_type text/html;
  	return 200 'hello world';
  }
  ```

- 字符匹配为前缀匹配

- 字符匹配之间按字符串长度决定匹配顺序，字符串越长，优先级越高

  ```sh
  location ^~ /hello/world/ {
  	default_type text/html;
  	return 200 'hello world';
  }
  
  location ^~ /hello/world/1 {
  	default_type text/html;
  	return 200 'hello world 1';
  }
  
  # 第二个字符串更长，先匹配第二个，再匹配第一个
  ```

- 匹配成功后，停止向下匹配

### 正则匹配

- 再次为正则匹配

- 正则匹配之间按照书写顺序决定匹配顺序（不管是否大小写敏感）

  ```sh
  location ~ /hello/world {
  	default_type text/html;
  	return 200 'hello world case';
  }
  
  location ~* /hello/world {
  	default_type text/html;
  	return 200 'hello world no case';
  }
  
  # 按书写顺序，首先匹配第一个，再匹配第二个
  ```

- 匹配成功后，停止向下匹配



### 默认匹配

- 最后是默认匹配

- 默认匹配为前缀匹配，同样匹配字符

- 默认匹配也是按照字符串长度决定匹配顺序

  ```sh
  location /hello/world/ {
  	default_type text/html;
  	return 200 'hello world';
  }
  
  location /hello/world/1 {
  	default_type text/html;
  	return 200 'hello world 1';
  }
  
  # 第二个字符串更长，先匹配第二个，再匹配第一个
  ```

  