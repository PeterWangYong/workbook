# 基础知识

## 元素选择器

### 全部选择

```css
* {
  color: red;
}
```

### 标签选择器

```css
h1 {
}
h1,
h2 {
}
```

### 类选择器

```css
.success {
}
```

### ID 选择器

```css
#content {
}
```

### 结构选择器

1. 后代选择器

   ```css
   main article h2 {
   }
   ```

2. 父子选择器

   ```css
   main article > h2 {
   }
   ```

3. 兄弟选择器

   ```css
   article h1 ~ h2 {
   }
   ```

4. 紧邻兄弟选择器

   ```css
   article h1 + h2 {
   }
   ```

### 属性选择器

```css
h1[title] {
}
h1[title][id] {
} /*有title和id两个属性*/
h1[title='hello'] {
}
h1[title^='hello'] {
} /*以hello开头*/
h1[title$='hello'] {
} /*以hello结尾*/
h1[title*='hello'] {
} /*存在hello就可以*/
h1[title~='hello'] {
} /*存在hello且必须是个单词, hi, hello world, hello两侧有空格*/
h1[title|='hello'] {
} /* 为hello或者hello-xxx */
```

### 伪类选择器

```css
a:link {
}
a:visited {
}
a:hover {
}
a:active {
}

input:focus {
}
input:hover {
}
input:active {
}

div:target {
} /* 点击锚点触发时，触发的目标样式 */

:root {
} /* 选择html页面 */
li:empty {
  display: none;
} /* 空元素设置 */

/* 结构伪类选择器 */
article :first-child {
} /* article第一个子元素 */
article > :first-child {
}
article h1:first-child {
} /* 第一个元素且为h1 */
article h1:first-of-type {
} /* 第一个h1元素 */
article :last-child {
}
article:last-child {
}

/* 伪类是对前面选择器的修饰 */

article :only-child {
} /* 存在唯一元素 */
article > h1:only-of-type {
}

/* 根据元素编号 */
article :nth-child(1) {
}
article > :nth-child(2) {
}
article :nth-child(n) {
}
article :nth-child(2n) {
}
article :nth-child(2n-1) {
}
article :nth-child(odd) {
}
article :nth-child(even) {
}
article h1:nth-of-type(2) {
}

main > ul li:nth-last-child(2) {
}
main > ul li:nth-last-child(-n + 2) {
}
article > h1:nth-last-child(1) {
}
article > h1:nth-last-of-type(1) {
}

/* 排除部分元素 */
main > ul li:nth-child(-n + 3):not(:nth-child(2)) {
}

/* 表单伪类 */
input:disabled {
} /* 禁用 */
input:enabled {
} /* 启用 */
input:checked + label {
} /* 选中 */
input:required {
} /* 必填 */
input:optional {
} /* 非必填 */
input:valid {
} /* 验证有效 */
input:invalid {
} /* 验证无效 */

/* 伪元素 */
p::first-letter {
}
p::first-line {
}
span::after {
}
span::before {
  content: 'xxx';
}
/* 获取属性 */
h2::before {
  content: attr(data-title);
}

/* 伪类和伪元素的区别在于前者的效果可以通过CSS实现（添加class），后者的效果必须添加额外元素才能实现。 */
```

### 选择器权重

1. 权重值

   ```css
   /*
   id    								0100
   class,属性选择器				 0010
   标签，伪元素  					0001
   * 										0000
   行内样式		 					 1000
   
   权重可以叠加
   */

   /* 11 */
   body .title {
     color: red;
   }
   ```

2. 强制权重

   ```css
   .title {
     color: red !important;
   }
   ```

3. 继承没有权重

   子元素继承父元素的样式，继承样式没有权重。

   通配符的权重为 0，但是大于继承的权重。（因为继承没有权重，权重为 NULL）

## 文本修饰

### 字体

```css
h2 {
  font-family: 'Helvetica Neua', Arial, 'Noto Sans';
}
```

```css
@font-face {
  font-family: 'houdunren';
  src: url('SourceHanSansSC-Heavy.otf') format('opentype'), url('SourceHanSansSC-Light.otf')
      format('opentype');
}

h2 {
  font-family: houdunren;
}

/* format 标识类型 */
```

### 字重和字号

```css
h2 {
  font-weight: normal; /* bold 700 400 */
  font-size: small; /* large 14px 100% 300% (百分比相对于父元素字体大小）1em 相当于100% */
}
```

### 颜色与行高

```css
h2 {
  color: red; /* #dddddd #ddd rgb(255,0,0) rgba(255,0,0,0.5) */
}
p {
  line-height: 1.5em; /* 20px */
}
```

### 倾斜

```css
h2 {
  font-style: italic;
}
```

### 组合定义

```css
h2 {
  font: bold italic 45px/1.5em 'Courier New'; /* 字体和大小必须有 */
}
```

### 大小写转换

```css
h2 {
  font-variant: small-caps; /* uppercase lowercase capitalize */
}
```

### 文本线条

```css
h2 {
  text-decoration: underline; /* overline line-through none */
}
```

### 文本阴影

```css
h2 {
  text-shadow: #ddd 5px 5px 1px; /* 水平偏移5px，垂直偏移5px 模糊量 1px */
}
```

### 文本溢出与空白(空格/换行)

```css
h2 {
  white-space: pre; /* pre-wrap pre-line nowrap*/
  overflow: hidden;
  text-overflow: ellipsis;
}
```

### 文本对齐和缩进

```css
p {
  text-indent: 1em;
  text-align: center; /* left right */
  vertical-align: middle; /* top bottom 60px */
}
```

### 字符间距

```css
h2 {
  letter-spacing: 20px;
  word-spacing: 30px;
}
```

### 排版模式

```css
p {
  writing-mode: vertical-lr; /* vertical-rl 从右到左 horizontal-tb 水平从上到下*/
}
```

## 表格列表

### 表格标题

```css
<caption > 课程介绍</caption > table caption {
  background: red;
  color: #fff;
  caption-side: top;
}
```

### 表格背景与颜色

```css
table {
  background: red;
  background: url(houdunren.jpg);
  background-size: 100% 100%;
}
table thead {
  background: red;
}
table tbody {
  background: red;
}
table tbody tr:first-child {
  background: red;
}
table tr td {
  background: red;
}
```

### 表格间距

```css
table {
  /* border-spacing: 0px; */
  border-collapse: collapse;
  border: solid 1px #ddd;
}
```

### 空单元格

```css
table {
  empty-cells: hide;
}
```

### 无边框

```css
table {
  border: none;
  border-collapse: collapse;
}
table td {
  border: none;
  border-right: solid 1px #ddd;
  border-top: solid 1px #ddd;
  padding: 10px;
}
table td:last-child {
  border-right: none;
}

table tr:last-child td {
  border-bottom: solid 1px #ddd;
}
```

### CSS 定制表格

```css
<article
  class='table'
  > <nav
  > 课程介绍</nav
  > <section
  > <ul
  > <li
  > 编号</li
  > </ul
  > </section
  > <section
  > </section
  > <section
  > </section
  > </article
  > .table {
  display: table;
  nav {
    display: table-caption;
  }
  section {
    &:nth-of-type(1) {
      display: table-header-group;
    }
    &:nth-of-type(2) {
      display: table-row-group;
    }
    &:nth-of-type(3) {
      display: table-footer-group;
    }
    ul {
      display: table-row;
      li {
        display: table-cell;
      }
    }
  }
}
```

### 列表符号

```css
ul {
  list-style-type: decimal;
}
ul {
  list-style-type: none;
}
ul {
  list-style-image: url(xj-small.png);
}
ul {
  list-style-image: linear-gradient(45deg, red, green);
}
```

### 多图背景控制列表符号

```css
li {
  background-image: url(xj-small.png), url(houdunren.jpg);
  background-repeat: no-repeat, repeat;
  background-size: 10px 10px, 100%;
  background-position: 0px 5px, 0 0;
  text-indent: 20px;
}
```

## 背景和渐变

### 背景颜色和图片

```css
article {
  background-color: red; /* #ddd rgba（255, 0, 0, 0.5) */
  background-clip: content-box; /* padding-box border-box */
}

article {
  background-image: url(houdunren.jpg);
  height: 500px;
}
```

### 背景重复与滚动

```css
article {
  background-image: url(xj-small.png);
  background-repeat: repeat-x; /* repeat repeat-y no-repeat space */
  background-attachment: fixed; /* 背景固定，不随内容滚动 */
}
```

### 背景重复与尺寸定制

```css
article {
  background-image: url(xj-small.png);
  background-position: center; /* top left, bottom left, 50% 50%, 0 100px, -50px 100px*/
  background-size: 100% 100%; /* 宽100% 高100% , 300px 100px, 300px auto, cover, contain*/
}
```

### 多个背景

```css
article {
  background-image: url(xj-small.png), url(bg.png);
  background-position: top left, center;
  background-repeat: no-repeat, repeat;
}

article {
  background: red url(sj-small.png) no-repeat center;
}
```

### 盒子阴影

```css
div {
  box-shadow: 10px 10px 10px rgba(100, 100, 100, 1);
  /*向右偏移 向下偏移 模糊度 颜色 */
}
```

### 元素背景渐变色

```css
article {
  background: linear-gradient(red, green, blue);
  background: linear-gradient(90deg, red, green, blue);
  background: linear-gradient(to right, red, green, blue);
  /* to left, to top right, to bottom right */
}

/* 径向渐变 */
article {
  background: radial-gradient(red, green, blue);
  background: radial-gradient(100px, 100px, red, green, blue);
  background: radial-gradient(at top left, red, green, blue);
  background: radial-gradient(at 50% 100%, red, green, blue);
}
```

### 渐变标识位

```css
article {
  background: linear-gradient(90deg, red 50%, green 60%);
}
```

### 渐变中间点

```css
article {
  background: linear-gradient(90deg, red, 0%, green);
}
```

### 渐变重复

```css
article {
  background: repeating-linear-gradient(
    90deg,
    blue 25px,
    yellow 25px,
    25px,
    red 50px
  );
}
```

## 盒子模型

### 外边距

```css
.div1 {
  margin: 30px 40px 60px 100px; /* 上右下左 */
}

.div2 {
  margin-left: 100px;
  margin-right: 40px;
}

.div3 {
  margin: 0 auto;
  /* margin-left: auto; */
  /* margin-right: auto; */
}

.div4 {
  margin-left: -50px;
  margin-right: -50px;
}
```

### 内边距

```css
div {
  padding: 10px 20px 30px 40px;
}
/* padding-left, padding-right */
```

### 尺寸限制

```css
div {
  box-sizing: border-box;
  width: 300px;
  height: 300px;
}
```

### 边框样式

```css
.div {
  border-style: double;
  border-width: 2px;
  border-color: red;
}

.div2 {
  border-top-style: solid;
  border-top-width: 2px;
  border-top-color: red;
}

.div3 {
  border-top: double 10px red;
}

.div4 {
  border: solid 1px blue;
}
```

### 圆角

```css
.div {
  border-radius: 30px 40px 80px 100px;
}

.div2 {
  border-top-left-radius: 30px;
  border-top-right-radius: 50px;
}

.div3 {
  border-radius: 50%;
}
```

### 轮廓线

```css
article {
  outline-style: double;
  outline-style: 30px;
  outline-color: #ddd;
}

div {
  outline: solid 20px #ddd;
}

input:focus {
  outline: none;
}

/* 轮廓线不占用空间 */
```

### 元素显示隐藏

```css
h2 {
  display: none; /* block */
}

div > a {
  display: block;
  text-decoration: none;
}

ul > li {
  display: inline-block; /* inline-block 可以设置宽高 */
}

div {
  visibility: hidden; /* 隐藏时保留空间位 */
}
```

### overflow 溢出隐藏

```css
.div {
  overflow: scroll; /* 滚动条 */
}

.div2 {
  overflow: auto; /* 内容可以装下不显示滚动条，装不下显示滚动条 */
}

.div3 {
  overflow: hidden; /* 溢出隐藏 */
  white-space: nowrap;
  text-overflow: ellipsis;
}
```

### 尺寸控制

```css
div {
  width: 300px;
  height: 300px;
  /* min-width min-height max-width max-height */
}

img {
  max-width: 90%;
  min-width: 50%;
}
```

### 填充可用空间

```css
div {
  height: -webkit-fill-available;
}
```

### 根据内容自适应尺寸

```css
div {
  width: fit-content; /* max-content min-content */
}
```

## 浮动

### 文档流与浮动空间丢失

```css
div:nth-of-type(1) {
  border: solid 1px red;
  float: left;
}
div:nth-of-type(2) {
  background: blue;
}
```

```css
div:nth-of-type(1) {
  border: solid 1px red;
  float: left;
}
div:nth-of-type(2) {
  background: blue;
  float: left;
}
```

### 浮动方向

```css
div:nth-of-type(1) {
  border: solid 1px red;
  float: left;
}
div:nth-of-type(2) {
  background: blue;
  float: right;
}
```

### 元素浮动后转为行级块元素

```css
div {
  float: left;
}
span {
  float: left;
}
```

### 清除浮动对元素的影响

```css
div.red {
  float: left;
}
div.blue {
  clear: left;
}
```

```css
div.red {
  float: right;
}
div.blue {
  clear: right;
}
```

```css
div.red {
  float: left;
}
div.green {
  float: right;
}
div.blue {
  clear: both;
}
```

### 使用空元素或伪元素撑开父级元素

```css
<main > <div > </div > <article > </article > </main div {
  float: left;
}
article {
  clear: both;
}
```

```css
<main > <div > </div > </main div {
  float: left;
}

main::after {
  content: '';
  clear: both;
}
```

### 使用 overflow 触发 BFC 撑开父元素

```css
<main > <div > </div > </main > div {
  float: left;
}

main {
  overflow: hidden; /* auto */
}
```

### 环绕距离控制

```css
<p
  > <div
  class=shape
  > </div
  > xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  </p
  > p
  .shape {
  width: 100px;
  height: 100px;
  float: left;
  border: solid 1px red;
  margin: 30px;
  shape-outside: border-box; /* padding-box margin-box content-box */
}
```

### 浮动显示区域形状

```css
<p
  > <div
  class=shape
  > </div
  > xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  </p
  > p
  .shape {
  width: 100px;
  height: 100px;
  float: left;
  border: solid 1px red;
  margin: 30px;
  shape-outside: border-box; /* padding-box margin-box content-box */
  clip-path: circle(50% at 100% 0);
  clip-path: ellipse(50%, 100%); /* 椭圆 */
  clip-path: polygon(50% 0, 100% 100%, 0 100%); /* 多边形 */
}
```

### 按形状环绕

```css
p .shape {
  clip-path: polygon(50% 0, 100% 100%, 0 100%);
  shape-outside: polygon(50% 0, 100% 100%, 0 100%);
}
```

### 按图片环绕

```
p img {
	shape-outside: url(xj.png);
}
```

## 定位

### 相对定位

```css
p img {
  width: 30px;
  height: 30px;
  position: relative;
  top: 10px;
  left: 10px; /* right bottom */
}
/* 保留位置 */
```

### 绝对定位

```css
p img {
  position: absolute;
  top: 10px;
  left: 10px;
}
/* 不保留位置 */
/* 默认相对于页面 */
/* 如果父元素有定位属性，则相对于父元素 */
```

### 通过定位设置尺寸

```css
div {
  position: absolute;
  left: 200px;
  top: 0;
  right: 0;
  bottom: 0;
}
/* 如果没有设置尺寸，则定位可以帮助设置 */
```

### 控制元素居中定位

```css
article {
  width: 400px;
  height: 400px;
  border: solid 1px green;
  position: relative;
}

div {
  width: 200px;
  height: 200px;
  border: solid 1px red;
  position: absolute;
  left: 100px;
  top: 100px;
}

div {
  width: 200px;
  height: 200px;
  border: solid 1px red;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -100px;
  margin-top: -100px;
}
```

### 元素层级

```css
div {
  position: relative;
  z-index: -1;
}
```

### 固定定位

```css
main header {
  position: fixed; /*  相对于页面来定位 */
  left: 0px;
  top: 0px;
}
```

### 粘性定位

```css
h2 {
  position: sticky;
  top: 0px;
}
```

## 弹性布局

### 弹性盒子

使用弹性布局，首先要将父盒子定义为弹性盒子。

display: flex

> display: inline-flex 行级弹性盒子,类似 inline-block

### 弹性元素

弹性盒子内的元素称为”弹性元素“。

弹性布局实际上就是要对弹性元素的排列做各种设置。

### 排列方向

flex-direction: row / row-reverse / column / column-reverse

> 默认是 row（从左向右）

### 溢出换行

flex-wrap: wrap / wrap-reverse

> 如果不添加溢出换行，默认溢出是元素自动调整宽高以适应。

### 组合设置

flex-flow: row wrap

> 同时设置 flex-direction 和 flex-wrap。

### 主轴与交叉轴

主轴由元素的排列方向决定即 flex-direction。

> 如果 flex-direction 为 row 则主轴为水平从左向右，为 row-reverse 则主轴为水平从右向左。
>
> 如果 flex-direction 为 column 则主轴为垂直从上往下，为 column-reverse 则主轴为垂直从下往上。

交叉轴由元素的换行方向决定即 flex-wrap。

> 如果 flex-flow: row wrap 则 主轴水平，交叉轴垂直从上往下；flex-flow: row wrap-reverse 则 主轴水平，交叉轴垂直从下往上。
>
> 如果 flex-flow: column wrap 则主轴垂直，交叉轴水平从左向右；flex-flow: column wrap 则主轴垂直，交叉轴水平从右向左。

主轴和交叉轴对应于当前元素排列方向和换行方向。

### 主轴的排列方式

主轴的排列方式表示元素在主轴上从哪开始到哪儿结束以及是否均匀分布

justify-content: flex-start / flex-end / center / space-between / space-around / space-evenly

> 默认为 flex-start 即 靠在的主轴的开始端（比如主轴从左向右，则靠在左边）
>
> flex-start 即 靠在的主轴的结束端（比如主轴从左向右，则靠在右边）
>
> center 即 居中排布
>
> space-between 即 两侧的元素靠两边，中间的元素均匀分布
>
> space-around 即 每个元素的两边都有相同的间距
>
> space-evenly 即 元素均匀分布（两侧元素不靠两边）

### 交叉轴的对齐和排列

如前文所说，交叉轴始终和主轴垂直，并且起点和终点由 flex-wrap 决定。交叉轴的排列方式类似于主轴，但部分属性值不同。

交叉轴的排列有两个属性：align-items,align-content。align-items 表示元素整体的对齐方式,align-content 表示元素在交叉轴的排列方式。

align-items: flex-start / flex-end / center / stretch

> flex-start,flex-end,center 表示元素整体对齐方式
>
> stretch 即 如果弹性元素本身没有宽高，则在交叉轴方向进行拉伸充满容器

align-content: flex-start/ flex-end / center / space-between / space-around / space-evenly

> align-content 和主轴排列方式相同。
>
> align-content 只有存在 flex-wrap 属性时才生效。

### 单个元素的交叉轴控制

align-items 表示整体元素的对齐方式，同时也可以对单个元素进行控制。

align-self:flex-start / flex-end /stretch

> align-self 的效果和 align-items 类似只是作用于单个弹性元素

### 主轴基准尺寸

主轴基准尺寸定义了弹性元素的宽高并且优先级高于元素自身的宽高。

flex-basis: 100px

### 元素可用空间的分配

如果元素无法占满整行或整列，那么可以对剩余空间进行分配实现元素拉伸填充满整个空间。

flex-grow: 1

> flex-grow 表示剩余空间分得几份，如果有两个 div 元素分别 flex-grow:1, flex-grow:2 且剩余空间为 300px，则第一个 div 分得(300/3)*1=100px，第二个 div 分得(300/3)*2=200px;
>
> flex-grow 是作用在主轴上的。

### 元素缩小比例

如果元素在一行或一列放不下且没有换行，默认情况下元素会等比例缩小，但是我们可以控制单个元素缩小的比例。

flex-shrink: 1

> flex-shrink 表示缩小的比例，但和 flex-flow 不同不能直接按照“要缩小的总像素”进行切分，而是通过一个公式：（200 / (1\*200+2\*400))\*1\*200【假设“要缩小的总像素”为 200px，两个 div 宽度为 200px,400px;缩小比例为:1,2，则计算结果为第一个 div 要缩小的像素】

### 元素组合定义

flex-grow,flex-shrink,flex-basis 可以组合定义为 flex。

flex: 1 1 100px;

> 等同于 flex-grow:1; flex-shrink:1; flex-basis: 100px;

### 元素的排列顺序

可以通过 order 属性控制弹性元素的顺序

order: 1

> order 默认数值为 0，数值越大越往后排

### 对文本进行弹性布局

弹性布局对文本节点也可以生效。

```html
<!-- 水平垂直居中 -->
<style>
  article {
    width: 200px;
    height: 200px;
    border: solid 2px red;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
</style>

<article>hello</article>
```

### 多级菜单布局案例

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
        display: flex;
        flex-direction: column;
        background-color: #eee;
      }

      main {
        flex: 1;
      }

      footer {
        height: 50px;
        background-color: #ccc;
        display: flex;
      }

      footer section {
        display: flex;
        flex-direction: column-reverse;
        flex: 1;
        border-right: solid 1px #bbb;
      }

      footer section:last-child {
        border-right: none;
      }

      footer section h4 {
        flex: 0 0 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
      }

      footer section ul {
        display: flex;
        flex-direction: column;
        margin: 5px;
        border: solid 1px #bbb;
        border-radius: 10px;
      }

      footer section ul li {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 0 0 50px;
        border-bottom: solid 1px #bbb;
        cursor: pointer;
      }

      footer section ul li:last-child {
        border-bottom: none;
      }
    </style>
  </head>
  <body>
    <main></main>
    <footer>
      <section>
        <h4>教程</h4>
        <ul>
          <li>Java</li>
          <li>CSS</li>
        </ul>
      </section>
      <section>
        <h4>问答</h4>
      </section>
      <section>
        <h4>直播</h4>
      </section>
    </footer>
  </body>
</html>
```

![img](https://gitee.com/PeterWangYong/blog-image/raw/master/images/1192583-20200502105843462-738093522.png)

## 栅格布局

### 声明栅格容器

```css
article {
  width: 300px;
  height: 300px;
  border: solid 5px silver;
  display: grid; /* inline-grid */
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(3, 1fr);
}

div {
  width: 100px;
  height: 100px;
  background: blueviolet;
  box-sizing: border-box;
}
```

### 栅格绘制基础知识

```css
article {
  width: 300px;
  height: 300px;
  border: solid 5px silver;
  display: grid;
  grid-template-rows: 100px 100px 100px;
  grid-template-columns: 100px 100px 100px;
  /* grid-template-columns: 50px 50px 50px; */
  /* grid-template-columns: 20% 20% 20% 20% 20%;*/
}
```

### 重复绘制栅格结构

```css
article {
  width: 300px;
  height: 300px;
  border: solid 5px silver;
  display: grid;
  grid-template-rows: repeat(2, 50%);
  /* grid-template-rows: repeat(2, 100px, 50px); */ /* 绘制4行：100 50 100 50 */
  grid-template-columns: repeat(5, 20%);
}
```

### 自动填充与按比例划分栅格

```css
article {
  width: 300px;
  height: 300px;
  border: solid 5px silver;
  display: grid;
  grid-template-rows: repeat(auto-fill, 100px);
  grid-template-columns: repeat(auto-fill, 100px);
  grid-template-rows: repeat(3, 1fr); /* 3等分，每一个占一份*/
  grid-template-rows: 1fr 2fr 1fr;
  grid-template-columns: 1fr 2fr 1fr;
}
```

### minmax 控制尺寸波动范围

```css
article {
  width: 300px;
  height: 300px;
  border: solid 5px silver;
  display: grid;
  grid-template-rows: repeat(2, minmax(50px, 100px));
  grid-template-columns: repeat(5, 1fr);
}
```

### 用栅格间距控制留白

```css
article {
  width: 300px;
  height: 300px;
  border: solid 5px silver;
  display: grid;
  grid-template-rows: repeat(2, minmax(50px, 100px));
  grid-template-columns: repeat(5, 1fr);
  row-gap: 10px; /* 行间距 */
  column-gap: 10px; /* 列间距 */
  gap: 20px 10px; /* 行20px, 列10px */
  gap: 20px; /* 行列均为20px */
}
```

###根据栅格线编号放置元素

```css
div:first-child {
  grid-row-start: 1;
  grid-column-start: 1;
  grid-row-end: 2;
  grid-column-end: 4;
}
```

### 栅格线命名

```css
article {
  width: 300px;
  height: 300px;
  border: solid 5px silver;
  display: grid;
  grid-template-rows: [r1-start] 100px [r1-end r2-start] 100px [r2-end r3-start] 100px [r3-end];
  grid-template-columns: [c1-start] 100px [c1-end c2-start] 100px [c2-end c3-start] 100px [c3-end];
}

div:first-child {
  grid-row-start: r1-start;
  grid-column-start: c1-end;
  grid-row-end: r1-end;
  grid-column-end: c2-end;
}
```

### 重复栅格的命名技巧

```css
article {
  width: 300px;
  height: 300px;
  border: solid 5px silver;
  display: grid;
  grid-template-rows: repeat(3, [r-start] 1fr [r-end]);
  grid-template-columns: repeat(3, [c-start] 1fr [c-end]);
}

div:first-child {
  grid-row-start: r-start 1; /* 第一行的开始 */
  grid-column-start: c-start 1; /* 第一列的开始 */
  grid-row-end: r-end 1;
  grid-column-end: c-end 3;
}
```

### 根据偏移量定位元素

```css
div:first-child {
  grid-row-start: 2;
  grid-column-start: 2;
  grid-column-end：span 3; /* 占（偏移）3行 */
  grid-row-end: span 1;  /* 占（偏移）1行 */
}
```

### 元素定位简写

```css
div:first-child {
  grid-row: 3/4;
  grid-column: 3/4;
  /* grid-row: 1/span 2; */
  /* grid-column: 1/span 3; */
}
```

### 使用栅格区域部署元素

```css
div:first-child {
  grid-area: 1/1/2/4;
  /* grid-area: r 2/c 2/r 3/c 3; */
}
```

```css
article {
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-rows: 60px 1fr 60px;
  grid-template-columns: 60px 1fr;
  grid-template-areas: 'header header' 'nav main' 'footer footer';
}
header,
nav,
main,
footer {
  background: blueviolet;
  background-clip: content-box;
  padding: 10px;
}

header {
  grid-area: header;
}

nav {
  grid-area: nav;
}

main {
  grid-area: main;
}

footer {
  grid-area: footer;
}
```

### 栅格区域中系统自动命名栅格线

```css
article {
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-rows: 60px 1fr 60px;
  grid-template-columns: 60px 1fr;
  grid-template-areas: 'header header' 'nav main' 'footer footer';
}
/* 系统自动命名栅格线 header-start header-start header-end header-end */

header {
  grid-area: header-start/header-start/main-end/main-end;
}
```

### 使用区域占位符优化布局

```css
article {
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-rows: 60px 1fr 60px;
  grid-template-columns: 60px 1fr;
  grid-template-areas: '. .' '. .' 'footer footer'; /* 用不上的名字使用 . 占位 */
}
```

### 栅格流动处理机制

```css
article {
  width: 300px;
  height: 300px;
  border: solid 5px silver;
  display: grid;
  grid-template-rows: repeat(2, minmax(50px, 100px));
  grid-template-columns: repeat(5, 1fr);
  grid-auto-flow: column; /* 默认row */
  grid-auto-flow: row dense; /* dense 自动将空间填满 */
}
```

### 栅格整体对齐方式

```css
article {
  width: 300px;
  height: 300px;
  border: solid 5px silver;
  display: grid;
  grid-template-columns: repeat(4, 60px);
  justify-content: end; /* start center space-around space-evenly space-between*/ /* 水平 */
  align-content: center; /* 垂直 */
}
```

### 栅格内元素的整体控制技巧

```css
article {
  width: 400px;
  height: 300px;
  border: solid 5px silver;
  display: grid;
  grid-template-columns: repeat(4, 100px);
  justify-items: start; /* end center stretch(默认) */
  align-items: stretch; /* start end center */
}
```

### 栅格元素独立控制对齐方式

```css
div:first-child {
  justify-self: end;
  align-self: start;
}
```

### 组合简写栅格对齐方式

```css
article {
  width: 400px;
  height: 300px;
  border: solid 5px silver;
  display: grid;
  grid-template-columns: repeat(4, 100px);
  place-content: center space-between; /* 栅格整体对齐 */
  place-items: start end; /* 栅格内元素对齐 行 列*/
}

div:first-child {
  place-self: center end; /* 元素单独控制 */
}
```

## 过渡

### 过渡

```css
div {
  transition: 2s;
}
```

> 有中间值的属性会产生过渡效果：200-400， 201，202，203....

### 过渡状态分别控制

```css
div {
  transition: 2s;
}

div:hover {
  transition: 200ms;
}
```

### 过渡属性

```css
div {
  transition-property: background; /* 只让背景过渡 */
  /* transition-property: background,width,border; */
  transition-duration: 2s;
}
```

### transitionend 事件

当动画结束的时候会触发该事件

```javascript
const div = document.querySelector('div')
div.addEventListener('transitionend', (event) => {})
```

### 过渡时间

```css
div {
  transition-duration: 2s, 300ms; /* 如果过渡时间少于过渡属性，那么会从头再次获取过渡时间 */
  transition-property: background, width;
}
```

###控制运行轨迹

```css
div {
  transition-timing-function: ease; /* 默认值 */  /* linear ease-in ease-out ease-in-out */
  /* transition-timing-function: cubic-bezier(.78,0,.18,1)

}
```

### 步进过渡

```css
div {
  transition-timing-function: steps(3, start); /* 分三步 */
}
```

### step-end 和 step-start

```css
div {
  transition-timing-function: step-end; /* 等同于steps(1, end) */ /* step-start */
}
```

### transition-delay 延时过渡

```css
div {
  transition-delay: 1s;
}

div {
  transition-delay: 1s 200ms; /* 如果延时时间少于过渡属性，那么会从头再次获取延时时间 */
  transition-property: background, width, height, border-radius;
}
```

### transition 组合设置

```css
div {
  transition: all linear 2s 1s;
}

div {
  transition: border-radius linear 2s 0s, background ease 2s 2s;
}
```

## 变形动画

### 坐标轴

X Y Z

### translate 控制二维移动

```css
transform: translateX(200px);
transform: translateX(100%); /* 基于自己的宽度 */
transform: translateY(100px);
transform: translateY(-100px);
transition: 1s;
transform: translateX(100%) translateY(100px);

transform: translate(100%, 100px);
```

### translate3d 控制 3D 移动

```css
perspective(900px);
translateZ(10px);
translate3d(0%,0%,0px);
rotateY(45deg);
rotateX
rotateZ
```

### 2D 缩放

```css
scaleX(1);
scaleY(2);
scale(2,.5);
transform-origin: left top;
```

### 3D 缩放

```css
scaleZ(3);
scale3d(2,1,1)
```

### 滤镜模糊

```css
filter: blur(10px);
filter: none;
```

### 旋转与透视

> 旋转是转到多少度

```css
rotateX(45deg)
perspective(900px)
rotateY(45deg)
rotateZ(360deg)

```

### 平面 2d 旋转

```css
rotate(360deg)
```

### rotate3d 旋转

```css
rotate3d(1, 0, 0, 95deg)
```

### 倾斜

```css
transform: skewX(45deg)
transform: skewY(45deg)
transform: skew(-45deg, 45deg)
```

### 2D 变形参考点

```css
transform: rotate(45deg)
transform: skewY(45deg)
transform-origin: left top
transform-origin: 0 0
transform-origin: 100% 100%
transform-origin: 200% 200%
```

### 3D 变形参考点

```css
transform-origin: left bottom 100px;
```

### 透视

```css
transform: perspective(900px)   /* 观察元素自身 */
perspective: 900px /* 只观察子元素 */
```

### 三维空间

```css
transform-style: preserve-3d;
```

### 调整透视视角

```css
perspective-origin: left center;
perspective-origin: -1000px 200px;
```

### 背面元素隐藏效果

```css
backface-visibility: hidden;

/* 或者为父元素添加transform-style: preserve-3d; */
```

## 帧动画

### 关键帧

```css
div {
  animation-name: hd;
  animation-duration: 2s;
}

@keyframes hd {
  from {
    background: white;
  }

  to {
    background: red;
  }
}
```

```css
@keyframes hd {
  0% {
    background: white;
  }

  25% {
    transform: scale(2);
  }

  65% {
    transform: scale(1);
  }

  100% {
    background: red;
  }
}
```

### 帧顺序与起始终点帧特性

```css
@keyframes hd {
  /* 如果不设置起始终点帧，系统默认使用原始样式定义开始或终点帧 */
  100% {
    background: red;
  }
}
```

### 移动的小方块

```css
main {
  width: 400px;
  height: 400px;
  border: solid 1px #ddd;
}

div {
  width: 100px;
  height: 100px;
  background: #f1c40f;
  animation-name: hd;
  animation-duration: 2s; /* 动画持续时间 */
}

@keyframes hd {
  25% {
    transform: translateX(300px);
  }
  50% {
    transform: translate(300px, 300px);
  }

  75% {
    transform: translateY(300px);
  }
}
```

### 同时声明关键帧

```css
@keyframes hd {
  25% {
    transform: translateX(300px);
    /* background: red; */
  }
  50% {
    transform: translate(300px, 300px);
    background: yellow;
  }

  75% {
    transform: translateY(300px);
    /* background: red; */
  }
  25%,
  75% {
    background: red;
    border-radius: 50%;
  }
}
```

### 多个动画使用与时间配置

```css
div {
  width: 100px;
  height: 100px;
  background: #f1c40f;
  animation-name: translate, background, radius;
  animation-duration: 4s 2s; /* radius 执行 4s，按顺序 4 2 4 2 4 2 ... */
}
```

### 属性重叠对动画的影响

```css
div {
  width: 100px;
  height: 100px;
  background: #f1c40f;
  animation-name: translate, background, radius;
  animation-duration: 4s 2s; /* radius 执行 4s，按顺序 4 2 4 2 4 2 ... */
}
/* 如果background和translate出现相同的属性，那么取background，谁在后面谁的优先级高 */
```

### 多动画控制移动端引导背景页

```css
main {
  width: 100vw;
  height: 100vh;
  background: red;
  transform: scale(0);
  animation-name: scale;
  animation-duration: 2s;
  animation-fill-mode: forwards; /* 停在最后一帧 */
}

@keyframes scale {
  25% {
    transform: scale(0.5);
  }

  50% {
    transform: scale(1);
  }

  75% {
    transform: scale(0.5);
  }

  100% {
    transform: scale(1);
  }
}
```

### 动画属性中间值

```css
/* 不是所有属性都可以动画，需要有中间值，比如：长度，颜色等 */
div {
  width: 100px;
  height: 100px;
  background: yellow;
  animation-name: scale;
  animation-duration: 2s;
  border: solid 2px #ddd;
}
@keyframes scale {
  to {
    width: 300px;
    height: 300px;
    border: solid 30px #fff;
    /* border: double 30px #fff   double无法渐变，因为solid和double之间没有中间值 */
  }
}
```

### 动画播放次数

```css
div {
  width: 100px;
  height: 100px;
  background: yellow;
  animation-name: scale, background, radius;
  animation-duration: 2s;
  border: solid 2px #ddd;
  animation-iteration-count: 2, 1, 1; /* 动画播放次数 scale 2次 background 1次 radius 1次*/
  /* animation-iteration-count: infinite; 无限执行 */
}
```

### “心动”案例

```css
body {
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.heart {
  width: 200px;
  height: 200px;
  background: red;
  position: relative;
  transform: rotate(45deg) scale(0.5);
  animation-name: hd;
  animation-duration: 2s;
  animation-iteration-count: 4;
}

@keyframes hd {
  25% {
    transform: rotate(45deg) scale(1);
  }

  50% {
    transform: rotate(45deg) scale(0.5);
  }

  75% {
    transform: rotate(45deg) scale(1);
  }

  85% {
    transform: rotate(45deg) scale(0.5);
  }

  to {
    transform: rotate(45deg) scale(1);
  }
}

.heart::before {
  content: '';
  background: red;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  position: absolute;
  left: -50%;
}

.heart::after {
  content: '';
  background: red;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  position: absolute;
  top: -50%;
}
```

### 动画方向

从 0 - 100 ， 瞬间到 0

从 100 - 0 ， 瞬间回到 100

从 0 - 100，慢慢回到 0

从 100 - 0，慢慢回到 100

```css
ul {
  list-style: none;
  width: 400px;
  height: 200px;
  display: flex;
}

li {
  flex: 1;
  color: red;
}

i.fa {
  font-size: 3em;
  animation-name: hd;
  animation-duration： 1s;
  animation-iteration-count: infinite;
  position: absolute;
  animation-direction: normal; /* normal(0-100) 默认 reverse(100-0) alternate(0-100再慢慢回到0) alternate-reverse(100-0再慢慢回到100)
}

@keyframes hd {
  to {
    transform: scale(3);
  }
}

```

### 弹跳小球

```css
body {
  width: 100vw;
  height: 100vh;
  background: #34495e;
  display: flex;
  justify-content: center;
  align-items: center;
}

.ball {
  width: 100px;
  height: 100px;
  background: radial-gradient(at center, #e67e22, #e74c3c);
  border-radius: 50%;
  animation-name: ball;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-direction: alternate-reverse;
}

section {
  width: 300px;
  height: 40px;
  background: rgba(0, 0, 0, 0.3);
  position: absolute;
  transform: translateY(50px);
  z-index: -1;
  border-radius: 50%;
  filter: blur(5px);
  animation-name: shadow;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-direction: alternate-reverse;
}

@keyframes shadow {
  to {
    width: 300px;
    height: 20px;
    filter: blur(35px);
    background: rgba(0, 0, 0, 0.1);
  }
}

@keyframes ball {
  to {
    transform: translateY(-300px);
  }
}
```

### 延迟属性

```css
div {
  animation-name: hd;
  animation-duration: 4s;
  animation-delay: 2s; /* 过两秒后开始执行动画 */
}
```

### 贝塞尔曲线控制动画速率

```css
li {
  animation-timing-function: ease; /* ease-in-out ease-out ease-in linear */
}

li {
  animation-timing-function: cubic-bezier(0.26, 0.53, 1, 0.3);
}
```

### 步进动画

```css
div {
  animation-timing-function: steps(4, start); /* steps(4, end) */
}
div {
  animation-timing-function: step-start; /* step-end step(1, start) step(1, end) */
}
```

### 动画播放和暂停

```css
div:hover {
  animation-play-state: paused; /* running */
}
```

### 动画填充模式

```css
li {
  animation-fill-mode: backwards; /* 执行前使用初始帧 */
}

li {
  animation-fill-mode: forwards; /* 执行结束后定在结束帧 */
}

li {
  animation-fill-mode: normal; /* （默认）执行前是原始状态，然后起始帧，然后结束帧 */
}

li {
  animation-fill-mode: both; /* 执行前是初始帧，执行后定在结束帧（兼顾backwards和forwards) */
}
```

### 组合定义

```css
li {
  animation: hd 2s; /* 必须要有名称和时间 */
  animation: hd 2s 1s; /* 1s延时 */
  animation: hd backwards 2s 2s; /* 可以写8个属性 */
}
```

## CSS 去除图片和父元素底部间隙

### 场景

由于行内元素默认 vertical-align 按照基线(base-line)对齐，而父元素的 border-bottom 对应着行内元素的底线(bottom)，所以默认情况下图片会与父元素产生底部间隙。

![](https://gitee.com/PeterWangYong/blog-image/raw/master/images/1192583-20200703145253593-921808376.png)

### 去除间隙

1. vertical-align 按照 bottom 对齐

   ```css
   img {
     vertical-align: bottom;
   }
   ```

2. img 变为 block 元素

   ```css
   img {
     display: block;
   }
   ```

3. 浮动 img
   ```css
   div {
     overflow: hidden; /* 父元素触发BFC撑开 */
   }
   img {
     float: left;
   }
   ```
