# ejs

ejs是javascript的模板引擎。

官方文档很详细，优先参考官方文档。

> 参考文档： https://ejs.bootcss.com/

# 安装

`npm install ejs`

# 标签

- `<% %>` 执行JS语句

- `<%= %>`变量模板，仅支持JS表达式

  > 对html标签做转义，同vue中{{}}

- `<%- %>`变量模板，仅支持JS表达式

  > 不对html标签做转义，同vue中v-html

- `<%# %>`注释标签

- `<%% %>`输出<%字符串

- `<%_ %>`删除标签前面的空格

- `<% _%>`删除标签后面的空格

- `<% -%>`删除标签后面的换行符



# API

- render

  ```js
  ejs.render(str, data, options);
  // => 输出渲染后的 HTML 字符串
  ```

  ```js
  const ejs = require('ejs')
  const html = ejs.render("<%= name %>", {name: 'diana'})
  console.log(html)
  ```

- renderFile

  ```js
  ejs.renderFile(filename, data, options, function(err, str){
      // str => 输出渲染后的 HTML 字符串
  });
  ```

  ```js
  const ejs = require('ejs')
  ejs.renderFile("index.ejs", {name: 'diana'}, {}, (err, html) => {
    console.log(html)
  })
  ```

- compile

  ```js
  let template = ejs.compile(str, options);
  template(data);
  // => 输出渲染后的 HTML 字符串
  ```

  ```js
  const ejs = require('ejs')
  const template = ejs.compile("<%= name %>")
  const html = template({name: 'diana'})
  console.log(html)
  ```

  

# Options

Options由于没有实践经验，故引用官方文档内容。

- `cache` 缓存编译后的函数，需要指定 `filename`
- `filename` 被 `cache` 参数用做键值，同时也用于 include 语句
- `context` 函数执行时的上下文环境
- `compileDebug` 当值为 `false` 时不编译调试语句
- `client` 返回独立的编译后的函数
- `delimiter` 放在角括号中的字符，用于标记标签的开与闭
- `debug` 将生成的函数体输出
- `_with` 是否使用 `with() {}` 结构。如果值为 `false`，所有局部数据将存储在 `locals` 对象上。
- `localsName` 如果不使用 `with` ，localsName 将作为存储局部变量的对象的名称。默认名称是 `locals`
- `rmWhitespace` 删除所有可安全删除的空白字符，包括开始与结尾处的空格。对于所有标签来说，它提供了一个更安全版本的 `-%>` 标签（在一行的中间并不会剔除标签后面的换行符)。
- `escape` 为 `<%=` 结构设置对应的转义（escape）函数。它被用于输出结果以及在生成的客户端函数中通过 `.toString()` 输出。(默认转义 XML)。
- `outputFunctionName` 设置为代表函数名的字符串（例如 `'echo'` 或 `'print'`）时，将输出脚本标签之间应该输出的内容。
- `async` 当值为 `true` 时，EJS 将使用异步函数进行渲染。（依赖于 JS 运行环境对 async/await 是否支持）

# include

include指令用于导入模板片段，本质是JS函数。

```ejs
<%# header.ejs %>

<%= title %>
```

```ejs
<%# index.ejs %>

<%- include('header', {title: 'test'}) %>
<%= name %>
```



# delimiter

默认分隔符是”%“，可以自定义分隔符。

```js
const ejs = require('ejs')
ejs.delimiter = '?'
const html = ejs.render("<?= name ?>", {name: 'diana'})
```