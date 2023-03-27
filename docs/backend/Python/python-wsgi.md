# Python 编写WSGI应用

WSGI的全称是Web Server Gateway Interface，翻译过来就是Web服务器网关接口。具体的来说，WSGI是一个规范，定义了Web服务器如何与Python应用程序进行交互，使得使用Python写的Web应用程序可以和Web服务器对接起来。

WSGI协议分为两部分，分别为WSGI Server和WSGI Application，WSGI Server负责接受客户端请求、解析请求、并按照协议规范将请求转发给WSGI Application，同时负责接受WSGI Application的响应并发送给客户端；WSGI Application负责接受由WSGI Server发送过来的请求，实现业务处理逻辑，并将标准的响应发回给WSGI Server。

WSGI Application需要满足三个条件：

1. 应用程序需要是一个可调用的对象
2. 可调用对象接收两个参数
3. 可调用对象要返回一个值，这个值是可迭代的

```python
from http import HTTPStatus
from wsgiref.simple_server import make_server

def application(environ, start_response):
    status = "{status.value} {status.phrase}".format(status=HTTPStatus.OK)
    headers = [('Content-Type', 'text/plain')]
    start_response(status,headers) 
    return ["hello world".encode('utf-8')]

if __name__ == '__main__':
    httpd = make_server('', 8080, application)
    print('server running on 0.0.0.0:8080')
    httpd.serve_forever()
```