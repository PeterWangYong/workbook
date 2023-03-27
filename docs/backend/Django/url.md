# 路由

## 路由匹配

```python
from django.urls import path

from . import views

urlpatterns = [
    path('articles/2003/', views.special_case_2003),
    path('articles/<int:year>/', views.year_archive),
    path('articles/<int:year>/<int:month>/', views.month_archive),
    path('articles/<int:year>/<int:month>/<slug:slug>/', views.article_detail),
]
```

`articles/<int:year>/`year为路径参数，int为转换器，不需要/articles，因为每个url都有

路径匹配不包含domain，query_parameters，method，比如

`https://www.example.com/myapp/?page=3`只匹配`myapp/`部分，注意myapp后面的/也纳入匹配

urlpatterns为规定变量，必须是path()或re_path()序列

## 路径参数格式

1. str: 默认，匹配除路径分隔符'/'之外的字符串
2. int：匹配0和正整数
3. slug：以连字符或下划线连接的ASCII 字符或数字 
4. uuid：连字符连接的小写ASCII字符或数字，返回UUID实例
5. path：任何非空字符串，包括路径分隔符'/'

## 自定义格式转换器

### 定义converter

一个converter是一个类，包括以下几个要点：

```python
class FourDigitYearConverter:
    regex = '[0-9]{4}'

    def to_python(self, value):
        return int(value)

    def to_url(self, value):
        return '%04d' % value
```

1. regex类属性
2. to_python方法
3. to_url方法

### 通过register_converter()注册

```python
from django.urls import path, register_converter

from . import converters, views

register_converter(converters.FourDigitYearConverter, 'yyyy')

urlpatterns = [
    path('articles/2003/', views.special_case_2003),
    path('articles/<yyyy:year>/', views.year_archive),
    ...
]
```



## 使用正则表达式re_path()

### 命名分组

```python
from django.urls import path, re_path

from . import views

urlpatterns = [
    path('articles/2003/', views.special_case_2003),
    re_path(r'^articles/(?P<year>[0-9]{4})/$', views.year_archive),
    re_path(r'^articles/(?P<year>[0-9]{4})/(?P<month>[0-9]{2})/$', views.month_archive),
    re_path(r'^articles/(?P<year>[0-9]{4})/(?P<month>[0-9]{2})/(?P<slug>[\w-]+)/$', views.article_detail),
]
```

格式`(?P<name>pattern)`

pattern将作为str传递给name

### 嵌套参数

```python
from django.urls import re_path

urlpatterns = [
    re_path(r'^blog/(page-(\d+)/)?$', blog_articles),                  # bad
    re_path(r'^comments/(?:page-(?P<page_number>\d+)/)?$', comments),  # good
]
```

`?:page-(?P<page_number>\d+)`捕获page_number参数，不捕获page-xxx



## 指定默认参数

```python
# URLconf
from django.urls import path

from . import views

urlpatterns = [
    path('blog/', views.page),
    path('blog/page<int:num>/', views.page),
]

# View (in blog/views.py)
def page(request, num=1):
    # Output the appropriate page of blog entries, according to num.
    ...
```

当匹配第一个路由时，num使用默认值



## 错误处理

当匹配不到路由或程序出现异常，Django自动触发异常处理视图

错误处理必须配置在 root URLconf中，通过4个变量指定：

```python
handler400 = 'mysite.views.my_custom_bad_request_view'
handler403 = 'mysite.views.my_custom_permission_denied_view'
handler404 = 'mysite.views.my_custom_page_not_found_view'
handler500 = 'mysite.views.my_custom_error_view'
```

默认配置

```python
handler400 = 'django.views.defaults.bad_request'
handler403 = 'django.views.defaults.permission_denied'
handler404 = 'django.views.defaults.page_not_found'
handler500 = 'django.views.defaults.server_error'
```



##  嵌套路由

```python
from django.urls import include, path

urlpatterns = [
    # ... snip ...
    path('community/', include('aggregator.urls')),
    path('contact/', include('contact.urls')),
    # ... snip ...
]
```

include后面可以是一个模块，模块内有urlpatterns属性，也可以是一个list或者tuple。

### 路径参数向下传递

```python
# In settings/urls/main.py
from django.urls import include, path

urlpatterns = [
    path('<username>/blog/', include('foo.urls.blog')),
]

# In foo/urls/blog.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.blog.index),
    path('archive/', views.blog.archive),
]
```

username将向下传递到included URLconf



## 传递额外参数

```python
from django.urls import path
from . import views

urlpatterns = [
    path('blog/<int:year>/', views.year_archive, {'foo': 'bar'}),
]
```

当请求 `/blog/2005/`时，django会访问`views.year_archive(request, year=2005, foo='bar')`

如果路径参数和额外参数发生了冲突，则取额外参数

### 额外参数向下传递

```python
# main.py
from django.urls import include, path

urlpatterns = [
    path('blog/', include('inner'), {'blog_id': 3}),
]

# inner.py
from django.urls import path
from mysite import views

urlpatterns = [
    path('archive/', views.archive),
    path('about/', views.about),
]
```

同路径参数一样，额外参数也会向下传递



## 路由别名

为了防止模板或代码中对url进行硬编码，django支持为每个url提供一个别名。

```python
from django.urls import path

from . import views

urlpatterns = [
    #...
    path('articles/<int:year>/', views.year_archive, name='news-year-archive'),
    #...
]
```

`name='news-year-archive'`即为别名

```html
<a href="{% url 'news-year-archive' 2012 %}">2012 Archive</a>
{# Or with the year in a template context variable: #}
<ul>
{% for yearvar in year_list %}
<li><a href="{% url 'news-year-archive' yearvar %}">{{ yearvar }} Archive</a></li>
{% endfor %}
</ul>
```

在template中使用`url` 模板tag解析别名

```python
from django.http import HttpResponseRedirect
from django.urls import reverse

def redirect_to_year(request):
    # ...
    year = 2006
    # ...
    return HttpResponseRedirect(reverse('news-year-archive', args=(year,)))
```

在代码中使用`reverse`方法解析别名



## 命名空间

由于不同的应用可能使用相同的路由别名，为了防止冲突，需要给不同的include添加命名空间。

命名空间分为两种：

1. 实例命名空间

   ```python
   from django.urls import include, path
   
   urlpatterns = [
       path('author-polls/', include('polls.urls', namespace='author-polls')),
       path('publisher-polls/', include('polls.urls', namespace='publisher-polls')),
   ]
   ```

   在include中指定

2. 应用命名空间

   ```python
   from django.urls import path
   
   from . import views
   
   app_name = 'polls'
   urlpatterns = [
       path('', views.IndexView.as_view(), name='index'),
       path('<int:pk>/', views.DetailView.as_view(), name='detail'),
       ...
   ]
   ```

   使用app_name变量指定

django会优先使用instance namespace，如果没有则使用application namespace。

