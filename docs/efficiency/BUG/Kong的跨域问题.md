# Kong的跨域问题



## 现象

通过Kong调用接口时发现有跨域问题，经检查发现如下事实：

1. Kong的CORS插件正常
2. 直接访问后端接口正常
3. 浏览器报错为"Provisional headers are shown"

## 问题

发现Kong的路由方法中没有添加"OPTIONS"方法，导致预检(preflight)方法发不过去，浏览器没能收到结果于是拒绝了请求（CORS）。Kong的CORS插件只是修改了预检后的结果，如果OPTIONS方法发不过去，插件也就不会生效。