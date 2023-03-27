# 限流与防抖

## 限流

在JS中，如果一个事件频繁触发（比如用户疯狂点击按钮）并且处理函数处理耗时还比较长，那么就容易造成性能问题。

限流函数是针对这类问题的优化方式之一，它要求两次事件处理必须大于某个间隔时间，简而言之就是加了一层判断。

限流函数(throttle:节流阀)的核心在于内部维护了一个“上次执行时间点”，通过比较当前执行时间与上次执行时间的差值判断是否“频繁”，是否执行。限流函数本身是一个装饰函数，修饰了事件处理器之后返回一个新的闭包函数。经过限流函数处理之后，事件触发的频率就被限制为预先传入的interval之上了。

下面用代码实现一个限流函数：

```js
function throttle(fn, interval) {
  // 维护上次执行的时间
  let last = 0;

  return function () {
    const context = this;
    const args = arguments;
    const now = Date.now();
    // 根据当前时间和上次执行时间的差值判断是否频繁
    if (now - last >= interval) {
      last = now;
      fn.apply(context, args);
    }
  };
}
```

使用限流函数：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
    />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>
  <body>
    <button>click me</button>
    <script src="./throttle.js"></script>
    <script>
      const button = document.querySelector("button");
      button.addEventListener(
        "click",
        // 使用限流函数修饰事件处理器
        throttle((event) => {
          console.log("button click");
        }, 2000)
      );
    </script>
  </body>
</html>
```



## 防抖

防抖函数也是一种限流函数，但要特殊一些。最典型的场景是表单输入，如果我们要在表单中监听input事件（比如远程搜索），那用户在输入的时候也会频繁触发，但这里使用throttle函数不行，因为我们需要等待用户停止输入一段时间后才能确认用户输入的值，所以要定义一个新的限流函数，叫做防抖函数。

防抖(防反跳)函数的核心是内部使用定时器并维护定时器返回的ID值,如果持续触发则不断clearTimeout()并重新发起setTimeout()，通过这种方式等待事件触发完毕，然后进行延时处理。

下面用代码实现一个防抖函数：

```js
function debounce(fn, delay) {
  // 记录定时器返回的ID
  let timer = null;

  return function () {
    const context = this;
    const args = arguments;
    // 当有事件触发时清除上一个定时任务
    if (timer) {
      clearTimeout(timer);
    }
    // 重新发起一个定时任务
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
}
```

使用防抖函数：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
    />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>
  <body>
    <input type="text" />
    <script src="debounce.js"></script>
    <script>
      const input = document.querySelector("input");
      input.addEventListener(
        "input",
        debounce((event) => {
          console.log("input finish");
        }, 2000)
      );
    </script>
  </body>
</html>
```

> 这些常用的函数可以参考lodash库

## 总结

限流函数和防抖函数都是为了应对“事件处理的速度跟不上事件触发的速度”这样的场景而产生的优化函数。

限流(throttle)要求两次事件处理之间必须有一个间隔时间，防抖(debounce)要求最后一个事件触发完毕后再执行。