# Promise

## 回调函数Promise化

现在的JS异步编程，通常都会使用async/await模式，但要支持这个模式,await后面必须是一个Promise对象。
因而对于现存的很多基于回调模式的API，我们需要将其Promise化来实现“类同步”调用。

比如我们要将SetTimeout进行Promise化

```javascript
function PromiseSetTimeout(handler, timeout) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            handler()
            resolve()  // 核心就是这一步
        }, timeout)
    })
}
```

异步调用的问题：我不知道什么时候调用完成
解决方案：
1. 你调用完成后帮我执行剩下的逻辑
2. 你调用完成后告诉我，我自己执行剩下的逻辑

 第二种方式更有利于将异步过程同步化，毕竟对我来说要做的就是等待然后执行下面的逻辑
 要实现“你调用完成告诉我”，我们需要一个中间容器接收这个“信号”和返回值，Promise就是这个容器
 要实现将回调Promise化，本质就是在回调函数中将“调用方”传入的参数(返回值)和调用完成的“信号”存入Promise容器
 在JS中由于闭包的存在，任何地方执行回调函数都能够影响外部变量，因而可以方便的更改Promise的状态，实现Promise化

- 链式调用

```javascript
PromiseSetTimeout(() => {
    console.log("time out");
}, 2000).then(data => {
    console.log("then function after 2000ms");
})
```

- async/await调用

```javascript
async function test() {
    const ret = await PromiseSetTimeout(() => {
        console.log("time out");
    }, 2000)
    console.log("then function after 2000ms")
}

test()
```



## 手写Promise

1. 类初始化

   - promise状态
   - promise返回值

   ```js
   class Promise {
     constructor(executor) {
       this.PromiseState = 'pending' // 存储promise状态
       this.PromiseResult = null // 存储promise结果
     }
   }
   ```

2. 执行器函数

   - 内部函数：resolve, reject 修改promise状态并保存值
   - 执行器函数：executor为同步执行，如果内部抛出异常则promise状态为rejected

   ```js
   class Promise {
     constructor(executor) {
       this.PromiseState = 'pending'; // 存储promise状态
       this.PromiseResult = null; // 存储promise结果
   
       // 修改promise状态为成功
       const resolve = (data) => {
         // 如果状态已经改变，则不再改变
         if (this.PromiseState !== 'pending') return;
         // 如果状态未改变则改变状态并保存值
         this.PromiseState = 'fulfilled';
         this.PromiseResult = data;
       }
   
       // 修改promise状态为失败
       const reject = (data) => {
         // 如果状态已经改变，则不再改变
         if (this.PromiseState !== 'pending') return;
         // 如果状态未改变则改变状态并保存值
         this.PromiseState = 'rejected';
         this.PromiseResult = data;
       }
   
       // 执行器函数为同步执行
       // 如果执行过程中抛出异常则promise状态为失败
       try {
         executor(resolve, reject);
       } catch (error) {
         reject(error);
       }
     }
   }
   ```

3. then方法

   - 校验onResolved,onRejected是否为函数

   - then方法返回一个promise，并根据onResolved，onRejected执行结果调整promise状态
   - then方法中onResolved，onRejected函数为异步执行
   - 如果then执行时promise的状态还未改变，则保存onResolved,onRejected函数留待执行器executor中resolve或reject函数执行时执行

   ```js
   class Promise {
     constructor(executor) {
       this.PromiseState = 'pending'; // 存储promise状态
       this.PromiseResult = null; // 存储promise结果
       this.callbacks = []; // 保存then中添加的回调方法
   
       // 修改promise状态为成功
       const resolve = (data) => {
         // 如果状态已经改变，则不再改变
         if (this.PromiseState !== 'pending') return;
         // 如果状态未改变则改变状态并保存值
         this.PromiseState = 'fulfilled';
         this.PromiseResult = data;
         // 执行then中保存下来的回调
         this.callbacks.forEach((item) => {
           item.onResolved();
         });
       };
   
       // 修改promise状态为失败
       const reject = (data) => {
         // 如果状态已经改变，则不再改变
         if (this.PromiseState !== 'pending') return;
         // 如果状态未改变则改变状态并保存值
         this.PromiseState = 'rejected';
         this.PromiseResult = data;
         // 执行then中保存下来的回调
         this.callbacks.forEach((item) => {
           item.onRejected();
         });
       };
   
       // 执行器函数为同步执行
       // 如果执行过程中抛出异常则promise状态为失败
       try {
         executor(resolve, reject);
       } catch (error) {
         reject(error);
       }
     }
   
     // then方法
     then(onResolved, onRejected) {
       // 校验onResolved，onRejected是否为函数
       if (typeof onResolved !== 'function') {
         onResolved = value => value
       }
       if (typeof onRejected !== 'function') {
         onRejected = error => {
           throw error
         }
       }
       // then的返回值为一个Promise
       return new Promise((resolve, reject) => {
         // then返回的Promise状态需要根据onResolved和onRejected的返回结果而定
         const callback = (func) => {
           // 捕获函数执行时抛出的异常（由于异步执行，executor处的trycatch无法捕获）
           try {
             const result = func(this.PromiseResult);
             if (result instanceof Promise) {
               result.then(
                 (value) => {
                   resolve(value);
                 },
                 (error) => {
                   reject(error);
                 }
               );
             } else {
               resolve(result);
             }
           } catch(error) {
             reject(error);
           }
         };
         // 如果promise状态已经改变，则异步执行回调
         // 真实情况下会将回调加入微任务队列，这里用宏任务模拟
         if (this.PromiseState === 'fulfilled') {
           setTimeout(() => {
             callback(onResolved);
           });
         }
         if (this.PromiseState === 'rejected') {
           setTimeout(() => {
             callback(onRejected);
           });
         }
         // 如果promise状态还未改变，则先保存
         // 这些方法会在执行器函数中resolve或reject方法执行时执行
         if (this.PromiseState === 'pending') {
           this.callbacks.push({
             onResolved: () => {
               setTimeout(() => {
                 callback(onResolved);
               });
             },
             onRejected: () => {
               setTimeout(() => {
                 callback(onRejected);
               });
             },
           });
         }
       });
     }
   }
   ```

4. catch方法

   - catch方法底层仍是then方法

   ```js
     // catch方法
     catch(onRejected) {
       return this.then(undefined, onRejected);
     }
   ```

5. resolve方法

   - resolve方法返回一个promise
   - 如果传入的数据是promise则直接返回，否则返回一个成功状态的promise

   ```js
     // resolve方法
     static resolve(data) {
       // 如果传入Promise则直接返回
       if (data instanceof Promise) {
         return data;
       } else {
         return new Promise((resolve) => {
           resolve(data);
         });
       }
     }
   ```

6. reject方法

   - reject方法始终返回一个失败的promise，并且值就是传入的数据

   ```js
     // reject 方法
     static reject(data) {
       return new Promise((_, reject) => {
         reject(data);
       });
     }
   ```

7. all方法

   - all用于判断多个promise是否均为成功
   - 如果多个promise都成功则返回成功的promise，返回值为传入promise的返回值数组
   - 如果有一个promise失败，则返回失败的promise，返回值为失败的promise的返回值

   ```js
     // all方法
     static all(promises) {
       let count = 0;
       let arr = [];
       return new Promise((resolve, reject) => {
         for (let i = 0; i < promises.length; i++) {
           promises[i].then(
             (value) => {
               count++;
               arr[i] = value;
               if (count === promises.length) {
                 resolve(arr);
               }
             },
             (error) => {
               reject(error);
             }
           );
         }
       });
     }
   ```

8. race方法

   - race用于多个promise竞争执行
   - 如果其中一个promise成功，则返回成功的promise，返回值为成功promise的返回值
   - 如果其中一个promise失败，则返回失败的promise，返回值为失败promise的返回值

   ```js
     // race方法
     static race(promises) {
       return new Promise((resolve, reject) => {
         for (let i = 0; i < promises.length; i++) {
           promises[i].then(
             (value) => {
               resolve(value);
             },
             (error) => {
               reject(error);
             }
           );
         }
       });
     }
   ```

   