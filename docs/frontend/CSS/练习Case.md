# 练习Case

## ContactUs

### 设计图

![image-20201222162309399](https://gitee.com/PeterWangYong/blog-image/raw/master/images/image-20201222162309399.png)

### 实现代码

https://codepen.io/peterwangyong/pen/PoGJYyj

### box-shadow

[MDN-box-shadow](https://developer.mozilla.org/zh-cn/docs/web/css/box-shadow)

阴影

```css
/* x偏移量 | y偏移量 | 阴影颜色 */
box-shadow: 60px -16px teal;

/* x偏移量 | y偏移量 | 阴影模糊半径 | 阴影颜色 */
box-shadow: 10px 5px 5px black;

/* x偏移量 | y偏移量 | 阴影模糊半径 | 阴影扩散半径 | 阴影颜色 */
box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
```

### outline

[MDN-outline](https://developer.mozilla.org/zh-CN/docs/Web/CSS/outline)

轮廓，绘制于元素内容周围，不占据空间（不同于border）

```css
/*  样式 | 宽度 | 颜色  */
outline: solid 3px green;
```

### background: none

透明

```css
.input {
  background: none;
}
```

### input:focus

点击伪类

```css
.input:focus {
  border-bottom: solid 1px #333;
}
```

### transition

[MDN-transition](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition)

过渡效果

```css
.input {
  transition: all 0.5s;
}
```

### 字体图标库

font-awesome

```html
<link rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css"
/>

<div class="footer">
  <div class="tel">
    <i class="fa fa-phone"></i>
    <span class="text">001 1023 567</span>
  </div>
  <div class="mail">
    <i class="fa fa-envelope-o"></i>
    <span class="text">contact@company.com</span>
  </div>
</div>
```

## Portfolio

### 设计图

![image-20201223140941730](https://gitee.com/PeterWangYong/blog-image/raw/master/images/image-20201223140941730.png)

### 实现代码

https://codepen.io/peterwangyong/pen/VwKMweP

### :root

伪类，匹配文档的根元素，对于html而言，:root表示`<html>`元素

```css
:root {
  box-sizing: border-box;
}

/* 表示class为dark的根元素 */
.dark:root {
  
}
```

### css var()

引用自定义属性值，自定义属性必须以`--`开头，并且必须定义在当前选择器或者父级选择器内（自动继承）

```css
:root {
  --custom-color: #eee;
}

span {
  color: var(--custom-color);
}
```

### @import url

从远端引入css资源

```css
@import url('https://fonts.googleapis.com/css?family=DM+Sans:400,500,700&display=swap')
```

### object-fit

`object-fit`CSS属性指定可替换元素的内容应该如何适应外部固定宽高的容器。

**可替换元素**指那些展现效果不由CSS来控制的元素，比如`<video>/<img>`等

MDN[文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-fit)

在这个案例中用于头像的处理：

未使用前：

![image-20201224144834547](https://gitee.com/PeterWangYong/blog-image/raw/master/images/image-20201224144834547.png)

使用`object-fit:cover`后：

![image-20201224144926507](https://gitee.com/PeterWangYong/blog-image/raw/master/images/image-20201224144926507.png)

常用取值包括：

```css
object-fit: contain /* 缩放，保持纵横比 */
object-fit: cover /* 填充，保持纵横比，多余部分裁剪 */
object-fit: fill /* 填充，拉伸以适应容器 */
```

