# DOM



## document

### createDocumentFragment

创建文档片段：文档片段是一个容器，用于临时存放dom节点，然后依次性将这些节点挂载到DOM树上（不包括容器本身）

因为文档片段存在于**内存中**，并不在DOM树中，所以将子元素插入到文档片段时不会引起页面[回流](https://developer.mozilla.org/zh-CN/docs/Glossary/Reflow)（对元素位置和几何上的计算）。因此，使用文档片段通常会带来更好的性能。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <ul id="ul"></ul>
    <script>
      var ul = document.querySelector('#ul')
      var frag = document.createDocumentFragment()

      var l1 = document.createElement('li')
      l1.textContent = 'content one'
      frag.appendChild(l1)

      var l2 = document.createElement('li')
      l2.textContent = 'content two'
      frag.appendChild(l2)

      ul.appendChild(frag)
    </script>
  </body>
</html>
```

![image-20201221190549288](https://gitee.com/PeterWangYong/blog-image/raw/master/images/image-20201221190549288.png)