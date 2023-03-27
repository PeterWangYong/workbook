# 拖拽API

H5定义了一组拖拽事件及事件对象，用于描述拖拽行为。

## 可拖动属性

- draggable="true" | "false"

  ```html
  <div draggable="true"></div>
  ```

  > <img>默认可拖动

## 事件

- drag: 在拖动过程中持续触发

- dragstart：拖动开始时触发

- dragend：拖动结束时触发

- dragenter: 拖动进入目标区域触发

- dragleave: 拖动离开目标区域触发（dragexit类似，已废弃）

- dragover: 拖动在目标区域内持续触发（默认行为：阻止drop事件触发）

- drop: 放置时触发（默认行为：尝试打开链接）

  > 不同浏览器实现不同，有时候不去preventDefault也没问题，但建议统一preventDefault()

## 事件对象：DragEvent

### dataTransfer属性

dataTransfer属性用于存储拖动相关的数据，这个对象在不同的DragEvent之间是共享的。

- setDragImage(img | element, xOffset, yOffset) 配置拖拽显示的图像，默认会自动生成
  - img | element： image,canvas 或者其他可视化元素
  - xOffset：鼠标距离图像左上角水平偏移
  - yOffset：鼠标距离图像左上角垂直偏移
- setData(format, data) 添加拖拽元素相关的数据,dataTransfer可以理解为一个Mapping容器
  - format: 数据类型，本质是字符串，理解为KEY
  - data: 数据值，字符串，可以填入拖拽元素的ID等，便于后续获取该元素

- getData(format) 获取拖拽元素相关的数据
  - format: 数据类型，本质是字符串，理解为KEY
- clearData(format) 清空拖拽元素相关的数据
  - format: 数据类型，本质是字符串，理解为KEY

## 拖拽示例

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      * {
        padding: 0;
        margin: 0;
      }

      body {
        height: 100vh;
        width: 100vw;
        display: grid;
        grid-template-columns: 200px auto 200px;
      }

      body > * {
        height: 100%;
      }

      .left,
      .middle,
      .right {
        border: solid 1px #333;
      }

      img {
        width: 150px;
      }
    </style>
  </head>
  <body>
    <div class="left" ondrop="drop(event)" ondragover="dragOver(event)">
      <img id="img1" src="./images/cat.jpg" ondragstart="dragstart(event)" />
      <h1 id="h11" draggable="true" ondragstart="dragstart(event)">hello</h1>
    </div>
    <div class="middle" ondragover="dragOver(event)" ondrop="drop(event)"></div>
    <div class="right" ondrop="drop(event)" ondragover="dragOver(event)"></div>
    <script>
      function dragstart(e) {
        // setDragImage如无必要可以不设置
        let img = document.getElementById('img1')
        e.dataTransfer.setDragImage(img, 20, 20)
        // 传入拖拽对象的信息
        e.dataTransfer.setData('Data', e.target.id)
      }

      function dragOver(e) {
        // 默认行为会阻止drop事件触发
        e.preventDefault()
      }

      function drop(e) {
        // 默认行为会打开链接（浏览器实现不同，这里防御式编程）
        e.preventDefault()
        let data = e.dataTransfer.getData('Data')
        // DOM元素移动
        e.target.appendChild(document.getElementById(data))
      }
    </script>
  </body>
</html>

```

## 拖动时隐藏原来位置上的元素

```css
.hide {
  transition: 0.01s; /* 一定要有过渡，否则无法获取拖动图像 */
  transform: translateX(-9999px);
}
```

```js
// dragstart
e.addEventListener('dragstart', ev => {
  ev.target.classList.add('hide')
})

// drop
const e = main.querySelelctor('#rect')
e.classList.remove('hide')
```

https://stackoverflow.com/questions/36379184/html5-draggable-hide-original-element



## 修正元素左上角坐标

我们需要根据鼠标在拖动元素和放置元素的相对位置计算出元素左上角的坐标（绝对定位）

```js
// dragstart
e.addEventListener('dragstart', ev => {
  ev.dataTransfer.setData('innerOffsetX', ev.offsetX);
  ev.dataTransfer.setData('innerOffsetY', ev.offsetY);
})

// drop
const e = main.querySelector(`#rect`);
const innerOffsetX = parseInt(
  event.dataTransfer.getData('innerOffsetX')
);
const innerOffsetY = parseInt(
  event.dataTransfer.getData('innerOffsetY')
);
e.style.left = `${event.offsetX - innerOffsetX}px`;
e.style.top = `${event.offsetY - innerOffsetY}px`;

// offsetX/Y 鼠标相对于事件触发元素的坐标
```

