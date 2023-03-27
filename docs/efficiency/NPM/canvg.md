# canvg



## 介绍

将svg转换为canvas

## 安装

```bash
npm install canvg -S
```

## 使用

```js
svg2canvas() {
  let svgElem = document.querySelectorAll('#header-image svg')
  svgElem.forEach(async function (node) {
    //获取svg的父节点
    let parentNode = node.parentNode;
    //获取svg的html代码
    let svg = node.outerHTML.trim();
    //创建一个<canvas>，用于放置转换后的元素
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const v = await Canvg.from(ctx, svg)
    v.start()
    //删除svg元素
    parentNode.removeChild(node);
    //增加canvas元素
    parentNode.appendChild(canvas);
  })
}
```

