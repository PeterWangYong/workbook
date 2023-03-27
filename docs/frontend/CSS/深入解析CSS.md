# 深入解析CSS



## 相对单位

### 自定义属性（CSS变量）

1. 定义：

   ```css
   :root {
   	--main-font: Helvetica, Arial, sans-serif;
   }
   ```

   > 变量前面必须有两个连字符，用来跟CSS属性区分，剩下的部分可以随意命名
   >
   > 变量必须在一个声明块里声明，这里使用了:root选择器，因此该变量可以在整个网页中使用

2. 使用

   ```css
   p {
     font-family: var(--main-font);
     color: var(--brand-color, blue);
   }
   ```

   > 调用函数var()就能使用该变量
   >
   > var()函数接收第二个参数用于指定备用值，如果第一个参数指定的变量未定义则使用第二个值
   >
   > 如果var()函数计算出来的是一个非法值，则对应的属性设置为初始值（即使有备用值）

## 盒模型

### 元素宽度的问题

1. 避免魔术数值

   不要使用调试得出的不可解释的数值，比如由于内边距的存在无法实现70%,30%并列展示，于是通过调试将30%改为26%等

   建议使用`calc(30%-3em)`的方式

2. 调整盒模型

   默认的`width,height`指的是内容宽高，不包含`border和padding`，这通常会违反直觉

   可以调整盒模型：

   ```css
   .main {
     box-sizing: border-box;
   }
   ```

   调整后`width,height`就包含`border和padding`了

3. 全局设置border-box

   可以通过设置全局border-box一次解决盒模型的问题

   ```css
   :root {
     box-sizing: border-box;
   }
   
   *,
   ::before,
   ::after {
     box-sizing: inherit;
   }
   ```

   对于所有元素，强行让其继承父元素的`box-sizing`配置，当遇到一些第三方组件时，可以修改组件的父级元素恢复`box-sizing:content-box;`

4. 给列之间添加间隔

   对于两列布局，之间添加间隔可以使用em配合`calc()`计算调整后的宽度

   ```css
   .sidebar {
     float: left;
     width: calc(30% - 1.5em);
     margin-left: 1.5em;
   }
   ```

### 元素高度的问题

> 通常最好避免给元素指定明确的宽高，因为普通文档流是根据有限的宽度和无限的高度设计的

1. 控制溢出行为

   ```css
   .panel {
   	overflow: hidden; /* visible（默认值）hidden scroll auto */
   }
   /* overflow-x overflow-y */
   ```

2. 百分比高度的备选方案

   - 等高列

   - CSS表格布局

     通过CSS表格布局实现等高列

     ```css
     <!DOCTYPE html>
     <head>
       <style>
         :root {
           box-sizing: border-box;
         }
     
         *,
         ::before,
         ::after {
           box-sizing: inherit;
         }
     
         body {
           background-color: #eee;
           font-family: Helvetica, Arial, sans-serif;
         }
     
         header {
           color: #fff;
           background-color: #0072b0;
           border-radius: 0.5em;
         }
     		
     		/* border-spacing 也会作用于表格外边缘，使其无法与头部左右对齐 
     			 这里使用负外边距进行修复
     		*/
         .wrapper {
           margin-left: -1.5em;
           margin-right: -1.5em;
         }
     		
     		/* 设置container容器为表格布局*/
         .container {
           display: table;
           width: 100%;
           border-spacing: 1.5em 0; /* 设置单元格间距 水平1.5em 垂直0 */
         }
     		/* 设置两列为单元格,表格每列默认等高 */
         .main {
           display: table-cell;
           width: 70%;
           background-color: #fff;
           border-radius: 0.5em;
         }
     		/* 设置两列为单元格,表格每列默认等高 */
         .sidebar {
           display: table-cell;
           width: 30%;
           padding: 1.5em;
           background-color: #fff;
           border-radius: 0.5em;
         }
       </style>
     </head>
     
     <body>
       <header>
         <h1>Franklin Running Club</h1>
       </header>
       <div class="wrapper">
         <div class="container">
           <main class="main">
             <h2>Come join us!</h2>
             <p>
               The Franklin Running club meets at 6:00pm every Thursday at the town
               square. Runs are three to five miles, at your own pace.
             </p>
           </main>
           <aside class="sidebar">
             <div class="widget"></div>
             <div class="widget"></div>
             <div class="gizmo"></div>
           </aside>
         </div>
       </div>
     </body>
     ```

   - Flexbox实现等高列

     > 建议使用Flex布局而不是表格布局

     

     ```css
         .container {
           display: flex; /* 设置弹性布局 */
         }
     
         .main {
           width: 70%;
           background-color: #fff;
           border-radius: 0.5em;
         }
     
         .sidebar {
           width: 30%;
           padding: 1.5em;
           margin-left: 1.5em; /* 会自动调整宽度 */
           background-color: #fff;
           border-radius: 0.5em;
         }
     ```

3. 使用min-height和max-height

   min-height允许设置一个最小高度，如果内容太多，元素自己可以扩展高度。

   max-height允许设置一个最大高度，如果达到这个界限，元素就不再增高，内容会溢出。

   类似属性：min-width, max-width

4. 垂直居中内容

   - vertical-align 声明只会影响**行内元素**或者**table-cell**元素
   - 最简单的做法是设置相同的上下内边距
   - 使用Flex布局
   - 将行高设置和容器高度一样（一行文字）
   - 绝对定位（知道容器高度）
   - 绝对定位结合变形（不知道容器高度）

### 负外边距

1. 左边或顶部的负外边距，元素会向左或向上移动
2. 右边或底部的负外边距，元素不会移动，而是将后面的元素拉过来

### 外边距折叠

当顶部和底部的外边距相邻时，就会重叠，产生单个外边距，折叠外边距的大小等于相邻外边距中的最大值

### 容器内的元素间距

1. 容器的内边距和第一个元素的外边距会产生叠加，导致不匀称。可以使用**相邻兄弟选择器**只给第一个元素以外的其他元素添加外边距：

   ```css
       .sidebar {
         width: 30%;
         padding: 1.5em;
         margin-left: 1.5em;
         background-color: #fff;
         border-radius: 0.5em;
       }
   
       .button-link {
         display: block;
         padding: 0.5em;
         color: #fff;
         background-color: #0090c9;
         text-align: center;
         text-decoration: none;
         text-transform: uppercase;
       }
   		/* 使用相邻兄弟选择器只给除第一个元素以外的其他元素添加外边距 */
       .button-link + .button-link {
         margin-top: 1.5em;
       }
   ```

2. 猫头鹰选择器

   **相邻兄弟选择器**推广到所有元素则形成`* + *`选择器，形似猫头鹰

   ```css
       body * + * {
         margin-top: 1.5em;
       }
   ```

## 理解浮动

### 浮动的设计初衷

### 容器折叠和清除浮动

1. 理解容器折叠
   - 浮动元素不同于普通文档流元素，浮动元素的高度不会加到父元素当中
   - `clear:both`让该元素移动到浮动元素的下面，而不是侧面
2. 理解清除浮动

## 网格布局

### 替代语法

1. 命名的网格线

   `grid-column: col 2 / span 2` 表示 从第二个col网格线开始，跨越两个轨道

2. 

