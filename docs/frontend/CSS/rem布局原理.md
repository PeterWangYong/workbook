# rem布局原理

> Rem布局的原理解析 - 颜海镜的文章 - 知乎 https://zhuanlan.zhihu.com/p/30413803
>
> 使用CSS3 REM 和 VW 打造等比例响应式页面的便捷工作流 - JailBreak的文章 - 知乎 https://zhuanlan.zhihu.com/p/23968868

rem全称是font sze of the root element，表示根元素的字体大小。

rem的核心特性是可以实现统一缩放。

在使用rem布局时关键在于两点：

## 如何根据视口自动调整rem大小

- 使用媒体查询

  ```css
  @media only screen and (min-width: 500px) {
          html {
            font-size: 20px;
          }
        }
  
  @media only screen and (min-width: 600px) {
          html {
            font-size: 24px;
          }
        }
  ```

- 使用JS事件监听视口变化

  ```js
  var documentElement = document.documentElement;
  
  function callback() {
      var clientWidth = documentElement.clientWidth;
      // 屏幕宽度大于780，不在放大
      clientWidth = clientWidth < 780 ? clientWidth : 780;
      documentElement.style.fontSize = clientWidth / 10 + 'px';
  }
  
  document.addEventListener('DOMContentLoaded', callback);
  window.addEventListener('orientationchange' in window ? 'orientationchange' : 'resize', callback);
  ```

- 使用vw/vh等单位

  ```css
  html {
  	font-size: 2vw;
  }
  ```

## 如何实现px到rem的转换

- 使用sass/less预编译器

  ```scss
  $ue-width: 640; /* ue图的宽度 */
  
  @function px2rem($px) {
    @return #{$px/$ue-width*100}rem;
  }
  
  p {
    width: px2rem(100);
  }
  ```

  

