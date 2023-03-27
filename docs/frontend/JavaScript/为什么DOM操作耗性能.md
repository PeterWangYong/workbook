# 为什么DOM操作耗性能



DOM操作的性能损耗至少有两个地方：

1. 进行DOM操作的时候上下文切换

2. DOM操作引起的页面重绘

## 上下文切换

浏览器它的js和dom是共用一个线程。操作dom的时候，要先把js转成dom的数据结构，然后再切换到dom引擎，然后再把结果返回来再启动js引擎，这就叫上下文切换，这操作很耗性能的。

## 页面重绘

修改DOM结构、数据、样式会触发浏览器重绘。

```html
<script>
  const times = 1000000
  // 操作普通JS对象
  let body = JSON.parse(JSON.stringify(document.body))
  console.time('json')
  for (let i = 0; i < times; i++) {
    body.a = i
  }
  console.timeEnd('json') // 2.018798828125 ms

  // 操作DOM对象，涉及上下文转换
  console.time('dom')
  for (let i = 0; i < times; i++) {
    document.body.a = i
  }
  console.timeEnd('dom') // 20.330078125 ms

  // 操作DOM对象，涉及重绘
  console.time('redraw')
  for (let i = 0; i < times; i++) {
    document.body.innerHTML = i
  }
  console.timeEnd('redraw') // 3490.2548828125 ms
</script>
```

