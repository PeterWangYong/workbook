# 视图函数

##  定义视图

```python
from django.http import HttpResponse
import datetime

def current_datetime(request):
    now = datetime.datetime.now()
    html = "<html><body>It is now %s.</body></html>" % now
    return HttpResponse(html)
```

1. 第一个参数必须是HttpRequest对象
2. 除少数情况，必须返回一个HttpResponse对象



## 返回错误响应

### 返回HttpResponseNotFound

```python
from django.http import HttpResponse, HttpResponseNotFound

def my_view(request):
    # ...
    if foo:
        return HttpResponseNotFound('<h1>Page not found</h1>')
    else:
        return HttpResponse('<h1>Page was found</h1>')
```

HttpResponseNotFound是HttpResponse的子类，只是错误码不同。

### 抛出Http404异常

```python
from django.http import Http404
from django.shortcuts import render
from polls.models import Poll

def detail(request, poll_id):
    try:
        p = Poll.objects.get(pk=poll_id)
    except Poll.DoesNotExist:
        raise Http404("Poll does not exist")
    return render(request, 'polls/detail.html', {'poll': p})
```

使用raise Http404("Poll does not exist")的方式，django会自动返回标准错误页面

### 定义404.html模板

定义404.html放在template目录，当DEBUG=False将会生效。



### 自定义错误处理视图

```python
handler400 = 'mysite.views.my_custom_bad_request_view'
handler403 = 'mysite.views.my_custom_permission_denied_view'
handler404 = 'mysite.views.my_custom_page_not_found_view'
handler500 = 'mysite.views.my_custom_error_view'
```

配置在URLconf中



## 异步视图

```python
import datetime
from django.http import HttpResponse

async def current_datetime(request):
    now = datetime.datetime.now()
    html = '<html><body>It is now %s.</body></html>' % now
    return HttpResponse(html)
```

使用python async语法，启动ASGI服务器。

## 视图装饰器

### 允许的Http方法

```python
from django.views.decorators.http import require_http_methods

@require_http_methods(["GET", "POST"])
def my_view(request):
    # I can assume now that only GET or POST requests make it this far
    # ...
    pass

  # 其他Decorator
  # require_GET(), require_POST(), require_safe()[GET,HEAD]
```

### 条件方法

缓存「浏览器缓存或者缓存服务器」通过两个步骤实现缓存和更新：

1. 如果缓存超时，则发起“条件请求”
2. 条件请求：首先校验“If-Modified-Since”和“If-None-Match”，分别校验文档修改时间”Last-Modified“和文档实体标签（相当于文档的指纹）”Etag“

Django中允许自定义last-modified和etag，使用condition装饰器

```python
def latest_entry(request, blog_id):
    return Entry.objects.filter(blog=blog_id).latest("published").published
  

@condition(last_modified_func=latest_entry)
def front_page(request, blog_id):
    ...
```

condition装饰器将会在Response Header中自动添加”ETag和Last-Modified“「请求方法需要为GET或者HEAD」

django同时还提供了快捷方法：

```python
etag(etag_func)
last_modified(last_modified_func)
```

注意不要同时使用etag和last_modified这两个装饰器，因为后一个会覆盖前一个，如果需要同时配置应该使用condition。

### 文档压缩

```python
from django.views.decorators.gzip import gzip_page()
```

### Vary头部

Vary的意思是”多样性“，也是用于缓存服务的。由于不同的客户端可能需要的数据不一样，对于缓存服务器而言就需要根据不同请求的请求头来决定要返回的数据。

Vary是Response Header中的一个字段，内容来自Request Header的Key，比如`Vary: Accept-Encoding,User-Agent`，缓存服务器会将Vary一起缓存，Vary中不同的Request Header组合就可以表示不同的请求来源和需求，缓存服务器根据Vary的内容「即各请求头的值」决定要返回的数据。

```python
from django.views.decorators.vary import vary_on_headers

@vary_on_headers('User-Agent')
def my_view(request):
    ...
```

vary_on_headers设置要使用哪几个Request header作为缓存返回的依据。

相应的，django也提供了针对cookie的快捷方式，因为根据cookie进行判断比较常用：

```python
@vary_on_cookie
def my_view(request):
    ...

@vary_on_headers('Cookie')
def my_view(request):
    ...
```

### 缓存超时控制

`Cache-Control`Response Header用于控制缓存的超时时间

```python
from django.views.decorators.cache import cache_control
```

也可以使用`never_cache`设置`Cache-Control: max-age=0, no-cache, no-store, must-revalidate, private`



## 文件上传

