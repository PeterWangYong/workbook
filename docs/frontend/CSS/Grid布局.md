# Grid布局

> http://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html

## 绘制网格

### 声明网格

```css
display: grid; /* 块状元素 */
display: inline-grid; /* 行内元素 */
```

### 网格大小

```css
grid-template-columns: 100px 100px 100px;
grid-template-rows: 100px 100px 100px;

grid-template-columns: 33.33% 33.33% 33.33%;
grid-template-rows: 33.33% 33.33% 33.33%;

grid-template-columns: 1fr 1fr 1fr; /* fr: fraction 片段，分数 */
grid-template-rows: 1fr 1fr 1fr;

grid-template-columns: 150px 1fr 1fr; /* 混合使用 */
grid-template-rows: 150px 1fr 1fr;

grid-template-columns: 100px auto 100px; /* auto: 自动调整 */
grid-template-rows: 100px auto 100px;

grid-template-columns: repeat(3, 1fr); /* 1fr 1fr 1fr */
grid-template-rows: repeat(3, 100px); /* 100px 100px 100px */

grid-template-columns: repeat(3, 1fr 2fr);  /* 1fr 2fr 1fr 2fr 1fr 2fr */
grid-template-rows: repeat(3, 100px 200px); /* 100px 200px 100px 200px 100px 200px */

/* 自动调整网格数量，根据元素数量、容器宽高自动调整 */
grid-template-columns: repeat(auto-fill, 100px); 
grid-template-rows: repeat(auto-fill, 100px); 

/* minmax(min, max) 不小于min, 不大于1fr */
grid-template-columns: 1fr 1fr minmax(100px, 1fr); 
grid-template-rows: 1fr 1fr minmax(100px, 1fr);
```

### 网格线

```css
/* 添加网格线 */
grid-template-columns: [c1] 100px [c2] 100px [c3] auto [c4];
grid-template-rows: [r1] 100px [r2] 100px [r3] auto [r4];

/* 允许多个名字 */
grid-template-columns: [c1 first-column] 100px [c2] 100px [c3] auto [c4];
grid-template-rows: [r1] 100px [r2] 100px [r3] auto [r4];
```

### 网格间距

```css
row-gap: 20px;
column-gap: 20px;
gap: 20px 20px; /* row-gap, column-gap */
```

### 网格单元

```css
grid-template-columns: 100px 100px 100px;
grid-template-rows: 100px 100px 100px;
/* 定义每个单元格的名字 */
/* 同时生成了网格线名字 [area]-start [area]-end */
/* 不需要使用的单元格，使用 . 表示 */
grid-template-areas: 'a . c'
                     'd e f'
                     'g h i';
```

> `grid-template`属性是`grid-template-columns`、`grid-template-rows`和`grid-template-areas`这三个属性的合并简写形式。
>
> `grid`属性是`grid-template-rows`、`grid-template-columns`、`grid-template-areas`、 `grid-auto-rows`、`grid-auto-columns`、`grid-auto-flow`这六个属性的合并简写形式。
>
> 从易读易写的角度考虑，不推荐简写形式

### 元素排列规则

```css
grid-auto-flow: row; /* 默认先行后列 */
grid-auto-flow: column; /* 先列后行 */
grid-auto-flow: row dense; /* dense: 剩下元素密集分布 */
grid-auto-flow: column dense; /* dense: 剩下元素密集分布 */
```

> 代码参考：[dense](https://jsbin.com/helewuy/edit?css,output)

### 网格布局

网格整体在容器中的布局

```css
justify-content: start | end | center | stretch | space-around | space-between | space-evenly;
align-content: start | end | center | stretch | space-around | space-between | space-evenly;  
place-content: <align-content> <justify-content>
```

1. start：对齐容器起始边框
2. end: 对齐容器结束边框
3. center: 容器内部居中
4. stretch: 拉伸占满容器
5. space-around: 每一列（行）两侧间隔相等，列（行）间距离是列（行）与边框距离两倍
6. space-between: 列（行）间间距相等，但与容器边框没有间隔
7. space-evenly: 列(行)之间、列(行)与容器边框之间间距相同

### 元素布局

单元格内元素布局

```css
justify-items: start | end | center | stretch;
align-items: start | end | center | stretch;
place-items: <align-items> <justify-items>;
```

- start：对齐单元格的起始边缘。
- end：对齐单元格的结束边缘。
- center：单元格内部居中。
- stretch：拉伸，占满单元格的整个宽度（默认值）。

### 溢出网格

如果元素多于网格数量，浏览器会自动生成多余网格

```css
grid-auto-rows: 50px; /* 新增行的行高 */
grid-auto-columns: 50px;  /* 新增列的列宽 */
```



## 使用网格

### 网格占位

```css
grid-row-start: 1;     /* 行 开始网格线 */
grid-row-end: 3;       /* 行 结束网格线 */
grid-column-start: 1;  /* 列 开始网格线 */
grid-column-end: 3;    /* 列 结束网格线 */

/* 使用命名网格线 */
grid-column-start: header-start; 
grid-column-end: header-end;

/* 左边线距离右边线跨越2个网格 */
grid-column-start: span 2;

/* 简写 */
grid-row: <start-line> / <end-line>;
grid-column: <start-line> / <end-line>;

/* 也可以使用span关键字 */
grid-row: 1 / span 2;
grid-column: 1 / span 2;

/* 省略则默认跨一个网格 */
grid-column: 1;
grid-row: 1;

/* 指定单元格区域 */
grid-area: e;

/* 也可以作为简写 */
grid-area: <row-start> / <column-start> / <row-end> / <column-end>;
```

### 元素布局

```css
justify-self: start | end | center | stretch;
align-self: start | end | center | stretch;
place-self: <align-self> <justify-self>;
```

