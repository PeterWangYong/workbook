# 理解BFC

>  10 分钟理解 BFC 原理 - 林东洲的文章 - 知乎 https://zhuanlan.zhihu.com/p/25321647

BFC全称**块级格式化上下文(Block Formatting Context )**

具有BFC特性的元素可以看作是隔离的容器，容器内的元素不会在布局上影响到外面的元素。

## 触发BFC

只要元素满足下面任一条件即可触发 BFC 特性：

- body 根元素
- 浮动元素：float 除 none 以外的值
- 绝对定位元素：position (absolute、fixed)
- display 为 inline-block、table-cells、flex
- overflow 除了 visible 以外的值 (hidden、auto、scroll)

## BFC特性及应用

1. 同一个 BFC 下外边距会发生折叠

2. BFC 可以包含浮动的元素（清除浮动）

   - 默认浮动会脱离文档流，无法撑起父容器高度。
   - 如果触发父容器的BFC，那么容器将包裹浮动元素，获得高度。

3. BFC 可以阻止元素被浮动元素覆盖

   - 默认浮动元素会覆盖在兄弟元素之上，但文字不被覆盖，于是会产生文字环绕效果。

   - 如果触发兄弟元素的BFC，则兄弟元素不被浮动元素所覆盖，而是左右并列。

   - 可以通过这种方式实现两列布局。

     ```html
     <!DOCTYPE html>
     <html lang="en">
       <head>
         <meta charset="UTF-8" />
         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
         <title>Document</title>
         <style>
           body {
             width: 200px;
             height: 200px;
             border: solid 1px green;
           }
           
           .left {
             float: left;
             border: solid 1px red;
           }
     
           .right {
             /* 触发BFC */
             overflow: hidden; 
             border: solid 1px blue;
           }
         </style>
       </head>
       <body>
         <div class="left">hello world</div>
         <div class="right">not bad</div>
       </body>
     </html>
     ```

     

   

