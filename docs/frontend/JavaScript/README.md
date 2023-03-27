# 基础知识

## 原始类型

### String

```js
// 创建
let hd = new String('houdunren')
let content = '后盾人'

// 类型转换
typeof（99 + ''） // string
String(99)
const num = 99
num.toString()

// 转义
\t \n \\ \' \"

// 字符串连接
'a' + 'b'
'a' += 'b'

// 模板字符串
`${name} good`   // 使用变量
`${show()} good` // 使用表达式
`${arr.map(item => `${item.title}`)}` // 嵌套使用

// 标签模板 定义标签函数，然后调用函数
function tag(strings, ...values) {
  console.log(strings)
  console.log(values)
}
tag `hello ${name}`

// 长度
'houdunren'.length

// 大小写
'houdunren'.toUpperCase()
'houdunren'.toLowerCase()

// 移除空白
'  houdunren'.trim()
' houdunren '.trimLeft()
' houdunren '.trimRight()

// 单个字符
'houdunren'.charAt(3)
'houdunren'[3]

// 截取字符串 slice
let hd = 'houdunren.com'
hd.slice(3)
hd.substr(3)
hd.substring(3)

hd.slice(3, 6)
hd.substring(3, 6)
hd.substring(3, 0) // hou 较小的作为起始位置
hd.substr(3, 6) // dunren  6为字符数

hd.slice(3, -1) // dunren.co
hd.slice(-2) // om
hd.substring(3, -9) // hou -9转为0
hd.substr(-3, 2) // co

// 查询字符串
hd.indexOf('o')
hd.indexOf('o', 3)

hd.lastIndexOf('o')
hd.lastIndexOf('o', 7)

hd.search('com')
hd.search(/\.com/i)

hd.includes('o')
hd.includes('o', 11)

hd.startsWith('h')
hd.startsWIth('o', 1)

hd.endsWith('com')
hd.endsWith('o', 2) // 2为查找的结束位置

// 替换字符串
hd.replace('houdunren', 'hdcms') // 默认只替换一次
'2023/02/12'.replace(/\//g/, '-') // 全局替换需要正则
"object".replace("o", () => "a")

// 重复生成
'*'.repeat(3)

// 分隔
'hdcms'.split('')
'1,2,3'.split(',')
```

### Number

```js
// 声明
new Number(3)
let num = 99

// 整数判断
Number.isInteger(1.2)

// NaN 表示无效数值
let res = 2 / 'houdunren'
Number.isNaN(res)
Object.is(res, NaN)

// 类型转换
Number()
parseInt()
parseFloat()
typeof ('123' * 1)

// 舍入操作
;(16.556).toFixed(2) // 16.56 四舍五入

// 浮点精度处理 推荐使用数学计算库 mathjs decimal.js
let num = 0.1 + 0.2
num.toFixed(1)
```

### Boolean

```js
// 声明
new Boolean(true)
let hd = true

// 隐式转换
1 == true // true转换为1
'1' == true  // 都首先转换为1,然后比较
[] == false // 都转换为0，然后比较

// 显式转换
!!''
!!0
!!null
Boolean('')
```

### Symbol

#### 声明

Symbol 用于防止属性名冲突而产生的，比如向第三方对象添加属性时。

Symbol 的值是唯一的，独一无二的不会重复的。

Symbol 不可以添加属性

```javascript
let hd = Symbol()
```

#### 描述参数

```javascript
let hd = Symbol('name')
console.log(hd)
console.log(hd.description)

Symbol.for() // 根据描述获得Symbol对象，如果不存在则创建，创建的Symbol会在系统中登记 {des: Symbol ... }
Symbol.keyFor() // 根据Symbol对象返回系统中登记的描述信息
```

#### 作为对象属性

```javascript
let obj = {
  [symbol]: 'hello',
}
```

#### 迭代

Symbol 不能使用 for/in,for/of 遍历操作。

可以使用 Object.getOwnPropertySymbols 获取所有 Symbol 属性。

也可以使用 Reflect.ownKeys(obj)获取所有属性包括 Symbol。

如果对象属性不想被遍历，可以使用 Symbol 保护。

### undefined

当声明的变量还未被初始化时，变量的默认值为 undefined，表示“缺少值”，就是此处应该有一个值，但是还没有定义。undefined 是预定义的全局变量，他的值就是“未定义”。

### null

null 是 JavaScript 语言的关键字，他表示一个特殊值，常用来描述“空值”。对 null 执行 typeof 运算，结果返回字符串“object”，这个最初是 JavaScript 设计的一个缺陷，后来渐渐被大家接受，可以理解为 object 的占位符。表示尚未存在的对象，常用来表示函数企图返回一个不存在的对象，Null 表示“没有对象”，即该处不应该有值。

## Array

```javascript
// 声明
new Array(1,'houdun', 3)
new Array(3)
const array = ['hdcms', 1]
const array2 = [[1,2], ['hdcms', 'houdun']]
// array2[0][1]
Array.of(1,2,3)
Array.from('abc')

// 类型检测
Array.isArray([1,2,3])

// 长度
const hd = ['houdun', 2]
hd.length

// 展开语法
[...'abc']
[1,2,...[4,5,6]]
[1,2].push(...[3,4])

// 解构赋值
let [name, age] = ['zhuli', 20]
let [a, ...b] = [1, 2, 3]  // b = [2, 3]
let [,b] = [1, 2] // b = 2
let [name, age = 22] = ['zhuli'] // age = 22
function hd([a,b]) {console.log(a,b)}
hd([1,2])

// 索引访问
arr[0]
arr[arr.length] = 1

// 追加元素
arr.push(1,2) // 从后面添加
arr.push(...[1,2])
arr.unshift(1,2) // 从前面添加

// 删除元素
arr.pop() // 从后面删除
arr.shift() // 从前面删除
arr.length = arr.length - 1

// 填充
Array(4).fill(1) // [1,1,1,1]
[1,2,3,4].fill('houdun', 1, 2) // 填充指定位置

// 切片
[1,2,3].slice(1,2) // [2]
[1,2,3].slice() // [1,2,3]

// splice 添加 删除 替换
[1,2,3].splice(1,1,4) // [1,4,3] 从index=1开始删除1个并插入4

// 清空
user = []
user.length = 0
user.splice(0, user.length)

// 合并
[1,2,3].join('-')
[1,2].concat([3,4]) // [1,2,3,4]
[...[1,2], ...[3,4]] // [1,2,3,4]

// 内部复制
[1,2,3].copyWithin(1, 2, 3) // [1,3,3]

// 查询
let arr = [1,2,3,4,2]
arr.indexOf(2)
arr.indexOf(2,3) // 指定开始位置

arr.lastIndexOf(2) //从后向前查找
arr.lastIndexOf(2, 3)

arr.includes(2)

arr.find(function(item){
  return item === 1
})
arr.findIndex(function(item) {
  return item === 1
})

// 排序  原地算法
arr.reverse()
arr.sort()
arr.sort((v1, v2) => v1 - v2)  // 升序
arr.sort((v1, v2) => v2 - v1)  // 降序

// 遍历
[1,2,3].forEach((item, index, array) => {})
for (const key in arr) {console.log(arr[key])}
for (const item of arr) {console.log(item)}
arr.entries.next()
for (const [key, value] of arr.entries) {}


// 迭代器
arr.keys()
arr.values()
arr.entries()

// 流处理
arr.every((item,index,array) => {})
arr.some((item,index,array) => {})
arr.filter((item,index,array) => {})
arr.map((item,index,array) => {})
arr.reduce((prev, cur, index, array) => {}, 0)
arr.reduceRight((prev, cur, index, array) => {}, 0)
```

## Set

### 声明

```javascript
new Set([1, 2])
```

### 添加元素

```javascript
const hd = new Set()
hd.add('houdunren')
```

### 访问

```javascript
hd.size
hd.values()
```

### 存在

```javascript
hd.has('hdcms')
```

### 删除

```javascript
hd.delete('hdcms')
```

### 清空

```javascript
hd.clear()
```

### 数组转换

```javascript
Array.from(hd)
[...hd]
```

### 数组去重

```javascript
;[...new Set(arr)]
```

### 遍历

```javascript
hd.values()
hd.keys()
hd.entries()
```

### 交集

```javascript
let a = new Set([1, 2, 3])
let b = new Set([3, 4, 5])
let res = new Set([...a].filter((item) => b.has(item)))
```

### 差集

```javascript
let a = new Set([1, 2, 3])
let b = new Set([3, 4, 5])
let res = new Set([...a].filter((item) => !b.has(item)))
```

### 并集

```javascript
let a = new Set([1, 2, 3])
let b = new Set([3, 4, 5])
let res = new Set([...a, ...b])
```

### WeakSet

成员只能是对象。

添加到 WeakSet 的对象不增加引用计数。

如果引用计数为 0， 垃圾回收时，WeakSet 中的对象自动删除。

WeakSet 无法遍历。

适合临时存放一组对象，避免内存泄漏。

场景：存储 DOM 节点，避免当节点移除时出现内存泄漏。

## Map

### Map

Map 是一组键值对的结构，用于解决以往不能用对象作为键的问题。

函数、对象、基本类型都可以作为键或值。

### 声明

```javascript
new Map([
  ['houdun', 'ren'],
  [1, 2],
])
```

### 添加

```javascript
map.set(obj, 'value').set('name', 'zhuli')
```

### 访问

```javascript
map.size
map.get()
```

### 存在

```javascript
map.has()
```

### 删除

```javascript
map.delete()
```

### 清空

```javascript
map.clear()
```

### 遍历

```javascript
map.keys()
map.values()
map.entries()
for .. of
map.forEach((value,key) => {})
```

### 数组转换

```javascript
[...hd]
[...hd.entries()]
[...hd.keys()]
[...hd.values()]
```

### WeakMap

键必须是对象类型

WeakMap 对键名是弱引用

垃圾回收不考虑 WeakMap 的键名

不可 forEach(),keys(),values(),entries(),size 等

当键的外部引用删除时，希望自动删除数据时使用 WeakMap

```javascript
new WeakMap()
map.set()
map.delete()
map.has()
```

## Math

```js
// 最大最小值
Math.min(1, 2, 3)
Math.max(1, 2, 3)
Math.max.apply(Math, [1, 2, 3])

// 舍入处理
Math.ceil(1.11)
Math.floor(1.55)
Math.round(1.5)

// 随机值
Math.random() // [0,1)
Math.floor(Math.random() * 5) // [0, 5)
```

## Date

```js
// 声明
new Date() // date object
Date() // date string
Date.now() // 时间戳 number
new Date('2020-12-12 03:05:02')
new Date(2020, 4, 5, 1, 22, 16)

// 类型转换
let hd = new Date()
hd * 1
Number(hd)
hd.valueOf()
hd.getTime()
let timestamp = Date.now()
new Date(timestamp)

// 格式化输出
let time = new Date()`${time.getFullYear()}-${time.getMonth()}-${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`

// 使用moment.js
moment().format('YYYY-MM-DD HH:mm:ss')
moment('2020-02-18 09:22:15').format('YYYY-MM-DD HH:mm:ss')
moment()
  .add(10, 'days')
  .format('YYYY-MM-DD hh:mm:ss')

// 本地时间获取
new Date(+new Date() + 8 * 3600 * 1000);
```

## 正则表达式

### 基础知识

正则表达式是用于匹配字符串中字符组合的模式，在 JS 中，正则表达式也是对象。

### 字面量

使用`//`包裹的字面量创建方式是推荐的做法，但它不能在其中使用变量。

```js
const hd = 'houdunren.com'
console.log(/u/.test(hd))
```

### 对象创建

当正则需要动态创建时使用对象方式。

```js
const hd = 'houdunren.com'
const str = 'u'
const reg = new RegExp(str)
console.log(reg.test(hd))
```

## 原型与继承

### 原型对象

每个函数都有一个 prototype 对象，函数创建的对象将继承该 prototype 对象（`__proto__`）

函数的 prototype 对象默认包含：

- constructor 指向函数自己
- `__proto__`指向 Object 实例

```javascript
Object.setPrototypeOf()
Object.getPropertypeOf()
```

### 原型检测

```javascript
// 检测构造函数的prototype属性是否出现在实例对象的原型链上
user instanceof User

// 检测一个对象是否在另一个对象的原型链中
b.isPrototype(a) // b是否是a的原型
```

### 属性遍历

```javascript
// in 检测对象及其原型链是否具有该属性
'name' in user

// hasOwnProperty 检测对象自身是否具有该属性
user.hasOwnProperty('name')

// for/in 会遍历对象及其原型链上的属性（enumerable=true）
```

### Object.create()

```javascript
// 创建对象并指定原型，第二个参数指定对象自己的属性
const user = { name: 'zhuli' }
const a = Object.create(user, {
  age: {
    value: 22,
    enumerable: false,
  },
})
console.log(a.name)
console.log(a.age)
```

### 构造函数

构造函数在被 new 时把构造函数的 prototype 赋值给新对象。

对象本身的属性将覆盖原型链中的同名属性。

### 继承与多态

当对象中没有属性时，JS 会从原型上获取该属性，这就是继承在 JS 中的实现。

### 原型继承

```javascript
function extend(sub, sup) {
  sub.prototype = Object.create(sup.prototype)
  sub.prototype.constructor = sub
}
function User() {}
function Person() {}
extend(User, Person) // 让User继承Person
```

### 对象工厂

```js
function User(name, age) {
  this.name = name
  this.age = age
}

function Factory(name, age) {
  const instance = Object.create(User.prototype)
  User.call(instance, name, age)
  return instance
}
// 这就是new的内部原理
```

### Mixin 模式

JS 中只支持单继承模式，如果一个对象要使用多个其他对象的方法，可以使用 Mixin 模式，核心是使用 Object.assign()进行方法合并。

```js
function User() {}
const a = {
  work() {
    console.log('work')
  },
}
const b = {
  __proto__: a,
  eat() {
    super.work()
    console.log('eat')
  },
}
// 将a,b的引用赋给了User.prototype，当调用b的eat方法时，super指向b自己的原型，因为JS是静态作用域。
Object.assign(User.prototype, a, b)
const user = new User()
user.eat()
```

## 类

### 基础知识

为了和其他语言继承形态一致，JS 提供了 class 关键词用于模拟传统的 class，但底层实现机制依然是原型继承。

class 只是语法糖为了让类的声明与继承更加简洁清晰。

### 声明

```js
// 类声明
class User {
  show() {}
  get() {}
}

// 赋值表达式
let Article = class {}
```

### 构造函数

```js
class User {
  constructor(name) {
    this.name = name
    // 对象方法
    this.show = function()
  }
  // 原型方法
  getName() {}
}

// 如果不设置constructor则自动添加
  constructor(...args) {
    super(...args)
  }
```

### 原理分析

类其实是函数

```js
class User {}
console.log(typeof User) // function
console.log(User === User.prototype.constructor) // true
```

### 属性定义

```js
class User {
  // 对象属性
  age = 22
  constructor(name) {
    // 对象属性
    this.name = name
  }
}
```

### 类与函数差异

class 是使用函数声明类的语法糖，但也有些区别

- class 中定义的方法不能枚举
- class 默认使用 strict 严格模式执行

```js
class User {
  show() {
    function test() {
      console.log(this) // undefined
    }
    test()
  }
}
// 注意点：直接调用test() 等同于 window.test()
// 在严格模式下window.test() 中this不绑定window对象
```

### 静态属性

静态属性即为类设置的属性，而不是为对象设置。

在 class 中为属性添加 static 关键字即声明为静态属性。

静态属性只有类本身可以访问到

```js
class User {
  static name = 'zhuli'
}
console.log(User.name) // zhuli
console.log(new User().name) // undefined
```

### 静态方法

指通过类访问不能通过对象访问的方法，比如系统的 Math.round()就是静态方法。

一般来讲方法不需要对象属性参与计算就可以定义为静态方法。

在 class 内声明的方法前使用 static 定义的方法即是静态方法。

### 访问器

使用访问器对对象的属性进行访问控制。

- 使用访问器可以管控属性，有效的防止属性的随意修改
- 访问器就是在函数前加上 get/set 修饰

```js
class User {
  get age() {
    return this._age
  }
  set age(value) {
    this._age = value
  }
}

// 访问器属性同时赋给对象和对象原型
```

### 访问控制

JS 中没有访问修饰符的概念，即不存在语法层面的访问控制

一般约定：普通属性 public \_属性 protected #属性 private

但只是约定，调用者依然可以访问到

有几种方式实现私有属性：

```js
// Symbol：任意两次new Symbol的值不同
const symbol = Symbol()
class User {
  constructor(name) {
    this[symbol] = {
      name,
    }
  }
  get name() {
    return this[symbol].name
  }
}
const user = new User('zhuli')
console.log(user.name)

// WeakMap: WekMap可以使用对象作为key
const data = new WeakMap()
class User {
  constructor(name) {
    data.set(this, {
      name,
    })
  }
  get name() {
    return data.get(this).name
  }
}
const user = new User('zhuli')
console.log(user.name)
```

### super

既要调用原型对象的方法，又不想改变 this 的指向，需要使用 super 关键词

```js
const person = {
  name: 'person.name',
  show() {
    console.log(this.name)
  },
}
const user = {
  __proto__: person,
  name: 'user.name',
  show() {
    // person.name  由于此时原型对象中的this是原型自己(this.__proto__)
    // this.__proto__.show();
    // 两级继承时可以手动改变this的指向
    this.__proto__.show.call(this)
  },
}
user.show()

const person = {
  name: 'person.name',
  show() {
    console.log(this.name)
  },
}
const user = {
  __proto__: person,
  name: 'user.name',
  show() {
    // 多级继承时，由于this始终指向admin,则this.__proto__指向user而不是person
    // this.__proto__.show.call(this)
    // 当然可以为了admin.show()手动调整，但显然这样做的适应性很差
    // 如果user.show()则会报错
    // this.__proto__.__proto__.show.call(this)
  },
}
const admin = {
  __proto__: user,
  name: 'admin.name',
  show() {
    this.__proto__.show.call(this)
  },
}
admin.show()

// 使用super既能调用原型方法，又不破坏this的指向
const person = {
  name: 'person.name',
  show() {
    console.log(this.name)
  },
}
const user = {
  __proto__: person,
  name: 'user.name',
  show() {
    super.show()
  },
}
const admin = {
  __proto__: user,
  name: 'admin.name',
  show() {
    super.show()
  },
}
admin.show()
```

## Function

### 函数

函数是将复用的代码块封装起来的模块，在 JS 中函数还有其他语言不具有的特性。

### 声明

```javascript
let hd = new Function('title', 'console.log(title)')
hd('name')

function hd(title) {
  console.log(title)
}
hd('name')

const user = {
  name: '',
  getName: function() {
    return this.name
  },
  setName(value) {
    this.name = value
  },
}
user.setName('houdun')
user.getName()
```

### 立即执行

```javascript
;(function() {
  console.log('hd')
})()
```

### 函数提升

```javascript
console.log(hd())
function hd() {
  return 'hd'
}

// 赋值声明方式不会提升
let hd = function() {
  return 'hd'
}
```

### 形参实参

形参是在函数声明时设置的参数，实参指在调用函数时传递的参数。

形参数量大于实参时，没有传参的形参值为 undefined。

实参数量大于形参时，多余的实参将忽略并不会报错。

```javascript
function sum(n1, n2) {
  return n1 + n2
}
console.log(sum(2)) // NaN
```

### 默认参数

```javascript
function sum(n1, n2 = 3) {
  return n1 + n2
}
console.log(sum(2)) // 5
```

默认参数要放在最后面。

### arguments

arguments 是函数获得的所有参数的集合

箭头函数不支持 arguments

```javascript
function hd(name, age) {
  console.log(arguments)
}
hd('zhuli', 28)
```

建议使用不定参数

```javascript
function hd(...args) {
  console.log(args)
}
```

### 箭头函数

```javascript
() => {return 1 + 3}
() => 1 + 3
(a, b) => a + b
item => item.value
```

### 递归调用

递归指函数内部调用自身的方式。

主要用于数量不确定的循环操作

注意边界条件

```javascript
function factorial(num = 3) {
  return num === 1 ? num : num * factorial(--num)
}
factorial(5)
```

### 回调函数

在某个时刻被其他函数调用的函数称为回调函数。

### 不定参数

使用展开语法接收多个参数并封装为数组

```javascript
function hd(name, ...args) {
  console.log(args)
}
```

### this 绑定规则

function(){}在运行时（被调用的时候）会基于绑定规则动态进行 this 绑定

有两点强调：

- this 是在运行时绑定的，不是定义时
- 要看 this 的指向，关键在于看函数调用的位置和方式

根据函数调用位置和方式不同，有四种绑定策略

1. 默认绑定
   如果直接调用函数，则将 this 绑定到全局对象，在 Node 中是 global，在浏览器中是 window

```javascript
function foo() {
  console.log(this)
}

// 运行时绑定
foo()
```

2. 隐式绑定
   如果有上下文对象调用函数，则将 this 绑定到上下文对象

```javascript
const obj = {
  foo: function() {
    console.log(this)
  },
}

// 运行时绑定
obj.foo()
```

3. 显式绑定
   通过调用函数的 call,apply,bind 方法进行绑定

```javascript
function foo() {
  console.log(this)
}
const obj = { a: 1 }

// 运行时绑定
foo.call(obj)
foo.apply(obj)
foo.bind(obj)()
```

4. new 绑定
   new 的过程也叫函数的“构造调用”，经历了以下几个步骤： 1. 创建一个空对象 obj 2. 将对象 obj 的 Prototype 关联到构造函数的 Prototype 3. 将对象绑定到构造函数的 this 4. 如果构造函数没有返回对象，则返回对象 obj

```javascript
function Foo() {
  console.log(this)
}

// 运行时绑定
foo = new Foo()
```

### 箭头函数

**function(){} 和 () => {} 的最大区别在于前者会在运行时绑定 this 对象，后者不会**

由于 function(){}在运行时在内部自动绑定 this 对象，则不会访问外部作用域 this
由于() => {}不能自动绑定 this 对象，则只能访问外部作用域 this

如果要使用动态绑定的 this，则使用 function(){}
如果要使用外部作用域的 this，则使用() => {}

> 估计 ES6 就是因为 function(){}总是自动绑定 this 造成嵌套 function 时需要 let self = this,然后需要在内层 function 使用 self.xxx 调用外层 this,才新添加了一个不会自动绑定 this 的函数：箭头函数 () => {}

### 改变 this 绑定

```javascript
// apply / call 将对象绑定到this
// apply用数组传参，call需要分别传参
function show(age) {
  console.log(this.name, age)
}
const user1 = {
  name: 'zhuli',
}
const user2 = {
  name: 'john',
}
show.apply(user1, [18])
show.call(user2, 18)

// bind绑定this对象并返回一个新函数

function hd() {
  console.log(this)
}
let hd2 = hd.bind({ name: 1 })
hd2()
```

## Object

### 基础知识

#### OOP

对象是属性和方法的集合，将复杂功能隐藏在内部，只开放给外部少量方法，更改对象内部的复杂逻辑不会对外部调用造成影响，即封装。

继承是通过代码复用减少冗余代码。

根据不同形态的对象产生不同结果即多态。

#### 声明

```javascript
// 字面量 系统内部使用new Object()创建
let obj = {
  name: 'houdunren',
  get() {
    return this.name
  },
}
```

#### 属性管理

```javascript
let user = {
  name: 'zhuli',
  'my-age': 22,
}

// 访问属性
user.name
user['name']
user['my-age'] // 属性名不是合法的变量名必须使用[]

// 设置属性
user.show = function() {}

// 删除属性
delete hd.show

// 检测自身属性
obj.hasOwnProperty('name')

// 在对象及其原型链上检测
'name' in obj

// Object.assign设置属性
const hd = { name: 'zhuli' }
Object.assign(hd, { age: 22 })
console.log(hd)

// 计算属性
const user = {
  [1 + 2]: 'a',
}
console.log(user) // {3:'a'}
```

### 展开语法

```javascript
let hd = { name: 'zhuli' }
let info = { ...hd, age: 20 }
```

#### 对象转换

对象计算时，根据情况调用 toString,valueOf 等方法

```javascript
// 内部自定义Symbol.toPrimitive方法用来处理所有的转换场景
let hd = {
  name: 'zhuli',
  [Symbol.toPrimitive]: function() {
    return 3
  },
  valueOf() {
    return 4
  },
  toString() {
    return this.name
  },
}
console.log(hd + 3) // 6
```

#### 解构赋值

解构是一种更简洁的赋值特性，可以理解为分解一个数据的结构。

```javascript
let { name: n, age: a } = { name: 'zhuli', age: 22 }
console.log(n, a)

// 如果属性名与变量相同可以省略属性定义
let { name, age } = { name: 'zhuli', age: 22 }
console.log(name, age)

// 函数返回值
const hd = function() {
  return { name: 'zhuli', age: 22 }
}
let { name, age } = hd()

// 函数参数
const hd = function({ name, age }) {
  console.log(name, age)
}
hd({ name: 'zhuli', age: 22 })

// 赋值部分变量
let [, age] = ['zhuli', 22]
let { name } = { name: 'zhuli', age: 22 }

// 嵌套解构
const {
  name,
  lesson: { title },
} = { name: 'zhuli', lesson: { title: 'JS' } }
console.log(title)

// 默认值
const [name, age = 22] = ['zhuli']
console.log(name, age) // zhuli 22
const { name, age = 22 } = { name: 'zhuli' }
console.log(name, age) // zhuli 22
```

### 简洁定义

```javascript
const name = 'zhuli'
const age = 22

const user = { name, age }
console.log(user) // {name: 'zhuli', age: 22}
```

### 遍历对象

```javascript
const user = {
  name: 'zhuli',
}
Object.keys(user) // ['name']
Object.values(user) // ['zhuli']
Object.entries(user) // [['name', 'zhuli']]

for (const key in user) {
  console.log(key) // name
}

// 数组是可迭代对象，对象不是（在没有设置的情况下）
for (const key of Object.keys(user)) {
}
for (const value of Object.values(user)) {
}
for (const [key, value] of Object.entries(user)) {
}
```

### 对象拷贝

```javascript
// 浅拷贝
const user = {name: 'zhuli'}
Object.assign({}, user)
{...user}

// 深拷贝 JS中使用递归实现深拷贝
const user = {
  name: 'zhuli',
  parents: {
    mama: '祝英台',
    baba: '梁山伯'
  }
}
function copy(obj) {
  const res = {}
  for (const [k, v] of Object.entries(obj)) {
    res[k] = typeof v === 'object' ? copy(v) : v
  }
  return res
}
const user2 = copy(user)
user2.parents.mama = '朱丽叶'
console.log(user2.parents.mama) // 朱丽叶
console.log(user.parents.mama)  // 祝英台
```

### 工厂函数

```javascript
function user(name) {
  return {
    name,
    show() {
      console.log(this.name)
    },
  }
}
const user1 = user('zhuli')
```

### 构造函数

```javascript
function User(name) {
  this.name = name
  this.show = function() {
    console.log(this.name)
  }
}
const user1 = new User('zhuli')

// 如果构造函数中返回一个对象，则该对象为实例对象
function User(name) {
  this.name = name
  this.show = function() {
    console.log(this.name)
  }
  // 注意要返回一个非空对象才会覆盖
  return new String('success')
}
// String {"success"}
console.log(new User('zhuliye'))

// 内置构造
new Number(99)
new String('zhuli')
new Boolean(true)
new Date()
new RegExp('\\d+')
new Object()
new Function(
  'name',
  `
	console.log(name)
`
)
```

### 闭包实现私有方法

```javascript
// JS中没有私有方法，但我们可以通过闭包实现私有方法（函数）
function User(name) {
  this.name = name
  //
  const getName = function() {
    return name
  }
  this.show = function() {
    console.log(getName())
  }
}
const user = new User('zhuliye')
user.show()
```

###属性描述符

```javascript
// 查看描述符
Object.getOwnPropertyDescriptor(user, 'name')
Object.getOwnPropertyDescriptors(user)

// 四种描述符：configurable, enumerable,writable,value

// 修改描述符
Object.defineProperty(user, 'name', {
  value: 'zhuli',
  writable: false,
  enumerable: false,
  configurable: false,
})
Object.defineProperties(user, {
  name: { value: xx, writable: xx },
  age: { value: xx, writable: xx },
})

// 禁止添加属性
Object.preventExtensions(user)

// 判断能否添加属性
Object.isExtensible(user)

// 封闭一个对象 不允许添加且configurable=false
Object.seal(user)

// 判断对象是否封闭
Object.isSealed(user)

// 冻结一个对象 不允许添加且configurable,writable都为false
Object.freeze(user)

// 判断对象是否冻结
Object.isFrozen(user)
```

### 访问器属性

```javascript
const user = {
  name: 'zhuli',
  get age() {
    return this._age
  },
  set age(value) {
    this._age = value
  },
}
```

### 访问器描述符

```javascript
function User(name) {
  const data = { name }
  Object.defineProperties(this, {
    name: {
      get() {
        return data.name
      },
      set(value) {
        data.name = value
      },
    },
  })
}
const user = new User('zhuli')
console.log(user.name)
```

### 代理模式

```javascript
// 代理是一种非侵入式的功能扩展的模式，js中使用Proxy实现静态代理

// get/set 代理一个对象
const user = { name: 'zhuli' }
const proxy = new Proxy(user, {
  get(obj, property) {
    return obj[property] + '***'
  },
  set(obj, property, value) {
    obj[property] = value
  },
})
console.log(proxy.name) // zhuli***

// apply 代理一个函数
function hd() {
  console.log('main')
}
const proxy = new Proxy(hd, {
  apply(func, obj, args) {
    console.log('before')
    func.apply(obj, args)
    console.log('after')
  },
})
proxy()
```

## JSON

```javascript
// 序列化
const user = { name: 'zhuli', age: 22 }
// 序列化user对象，只保留name字段，前面添加4个tab缩进
// 字段是支持深度递归的
JSON.stringify(user, ['name'], 4)
// 序列化user对象，只保留name字段，前面添加一个前导字符*
JSON.stringify(user, ['name'], '*')

// 自定义JSON格式
const user = {
  name: 'zhuli',
  age: 22,
  toJSON() {
    return {
      name: this.name,
    }
  },
}
JSON.stringify(user)

// 反序列化
JSON.parse('{"name": "zhuli"}')

// 二次处理  key是支持深度的递归的
JSON.parse('{"name": "zhuli"}', (key, value) => {
  if (key === 'name') {
    return `beautiful ${value}`
  }
  return value
})
```

## 垃圾回收机制

当我们在函数内部引入一个变量或函数时，系统都会开辟一块内存空间，还会将这块内存的引用计数器进行初始化，初始化为 0。

如果外部有全局变量或程序引用了这块空间，则引用计数器会自动进行+1 操作。

当函数执行完毕后，变量计数器重新归零，系统会运行垃圾回收机制，将函数运行产生的数据销毁。

如计数器不是 0，则不会清除数据。

这个过程就称之为”JS 的垃圾回收机制“。

## BOM

BOM 浏览器对象模型。

window 是浏览器中的 Global 对象。

top 对象始终指向最外层的框架，也就是浏览器窗口。

### location 对象

location 是最有用的 BOM 对象之一，它提供了与当前窗口中加载的文档有关的信息，还提供了一些导航功能。事实上，location 对象是很特别的一个对象，因为它既是 window 对象的属性，也是 document 对象的属性；换句话说，window.location 和 document.location 引用的是同一个对象。location 对象的用处不只表现在它保存着当前文档的信息，还表现在它将 URL 解析为独立的片段，让开发人员可以通过不同的属性访问这些片段。

```javascript
location.assign()
location.href = ''
location.hash
location.search
location.hostname
location.pathname
location.port

location.replace()
location.reload()
```

### history 对象

history 对象保存着用户上网的历史记录，从窗口被打开的那一刻算起。因为 history 是 window 对象的属性，因此每个浏览器窗口、每个标签页乃至每个框架，都有自己的 history 对象与特定的 window 对象关联。

```javascript
history.go(-1)
history.go(1)
history.go(2)
history.go('wrox.com')
history.back()
history.forward()
history.length
```

## DOM

DOM 文档对象模型。

### Node 类型

```javascript
nodeType
nodeName
nodeValue

childNodes NodeList(不是Array的实例)
childNodes[0]
childNodes.item(1)

parentNode
previousSibling
nextSibling

firstChild
lastChild

hasChildNodes()
ownerDocument

appendChild()
insertBefore()
replaceChild()
removeChild()
cloneNode()
normalize()
```

### document 类型

```javascript
document.documentElement
document.body
document.doctype
document.title
document.URL
document.domain
document.referrer

document.getElementById()
document.getElementsByTagName() - HTMLCollection

hc[0]
hc.item(0
hc.namedItem('myImg')
hc['myImg']

document.getElementsByName()


document.write()
document.writeln()
document.open()
document.close()

```

### Element 类型

```javascript
let div = document.getElementById('myDiv')
div.tagName
div.nodeName
div.id
div.className
div.title
div.lang
div.dir

div.getAttribute('id')
div.setAttribute()
div.removeAttribute()

div.attributes - NamedNodeMap

nnm.getNamedItme()
nnm.removeNamedItem()
nnm.setNamedItem()
nnm.item()

document.createElement()
document.body.appendChild(div)
```

### Text 类型

```javascript
let text = div.firstChild()
text.nodeType
text.nodeName
text.nodeValue / text.data
text.parentNode
text.length

text.appendData()
text.deleteData()
text.replaceData()
text.splitText()
text.substringData()

document.createTextNode()
// 一般情况下，每个元素只有一个文本子节点。不过，在某些情况下也可能包含多个文本子节点；如果两个文本节点是相邻的同胞节点，那么这两个节点中的文本就会连起来显示，中间不会有空格。
```

### Comment 类型

```javascript
document.createComment()
```

### Attr 类型

```
let attr = document.createAttribute()
attr.value
attr.name
attr.specified
element.setAttributeNode(attr)
element.getAttributeNode()
```

## 事件

JavaScript 与 HTML 之间的交互是通过事件实现的。事件，就是文档或浏览器窗口中发生的一些特定的交互瞬间。可以使用侦听器来预定事件，以便事件发生时执行相应的代码。

### 事件流

事件流描述的是从页面中接收事件的顺序。IE 的事件流是事件冒泡流，而 Netscape Communicator 的事件流是事件捕获流。

- 事件冒泡

  事件冒泡即事件开始时由最具体的元素接收，然后逐级向上传播到较为不具体的节点。

  所有现代浏览器都支持事件冒泡。

- 事件捕获

  事件捕获的思想是不太具体的节点应该更早收到事件，而最具体的节点应该最后接收到事件。

  老版本的浏览器不支持事件捕获，建议使用事件冒泡，有特殊需要时再使用事件捕获。

事件流包括三个阶段：事件捕获阶段、处于目标阶段和事件冒泡阶段。

### 事件处理程序

事件就是用户或浏览器自身执行的某种动作。注入 click,load 和 mouseover 都是事件的名字。而响应某个事件的函数就叫做事件处理程序（事件侦听器）。事件处理程序的名字以”on“开头。因此，click 事件的事件处理程序就是 onclick，load 事件的处理程序就是 onload。

```javascript
<button onclick="">
btn.onclick = function() {}
addEventListener("click", function() {})
removeEventListener()
```

### 事件对象

在触发 DOM 上的某个事件时，会产生一个事件对象 event，这个对象中包含着所有与事件有关的信息。

```javascript
event.bubbles
event.cancelable
event.currentTarget
event.defaultPrevented
event.detail
event.eventPhase
event.preventDefault()
event.stopImmediatePropagation()
event.stopPropagation()
event.target
event.isTrusted
event.type
event.view
```

### 事件类型

```javascript
// UI事件: load,unload,resize,scroll
// 焦点事件：blur,focus
// 鼠标事件：click,dblclick,mousedown,mouseenter,mouseleave,mousemove,mouseout,mouseover,mouseup
// 键盘事件：keydown,keypress,keyup,textInput
```

### 事件委托(代理)

对”事件处理程序过多"问题的解决方案就是事件委托。事件委托利用了事件冒泡，只指定一个事件处理程序，就可以管理某一类型的所有事件。例如 click 事件会一直冒泡到 document 层次，也就是说，我们可以为整个页面指定一个 onclick 事件处理程序,而不必给每个可单击的元素分别添加事件处理程序。

在父子级元素中，如果子元素很多且每个子元素都要监听相同的事件且事件处理函数的逻辑也相同，那么可以选择将监听过程放到父级元素，通过事件流中的捕获和冒泡进行触发，然后根据 event.target 获得目标触发元素。

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
    <ul id="list">
      <li>hello world 1</li>
      <li>hello world 2</li>
      <li>hello world 3</li>
    </ul>
    <script>
      const ul = document.querySelector('#list')
      // 在父级监听事件，通过捕获冒泡获得子元素事件，这就是事件代理。
      ul.addEventListener('click', (event) => {
        console.log(event.target)
      })
    </script>
  </body>
</html>
```

上述代码中，我们想要监听 li 的点击事件，但是如果 li 元素很多那么为每一个 li 元素绑定事件会造成很大的开销，所以选择在 ul 上绑定事件，减少开销。

> 事件代理就是一种编程思路，本质上还是要理解事件流的三个阶段：捕获阶段，目标阶段，冒泡阶段。

### 自定义事件

JS 中我们可以自定义事件并通过自己派发自己监听的方式使用自定义事件完成元素之间的联动。

通常父子级元素之间可以通过事件流中捕获冒泡过程进行联动，但同级元素之间想要事件联动，就可以使用自定义事件。

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
    <div id="one">Hello One</div>
    <div id="two">Hello Two</div>
    <div id="three">Hello Three</div>
    <script>
      const one = document.getElementById('one')
      const two = document.getElementById('two')
      const three = document.getElementById('three')
      // 自定义事件对象
      const myEvent = new Event('myEvent')
      // two和three元素监听自定义事件
      two.addEventListener('myEvent', (event) => {
        console.log(event.target)
      })
      three.addEventListener('myEvent', (event) => {
        console.log(event.target)
      })
      // 点击one元素,two和three元素在内部派发自定义事件
      one.addEventListener('click', () => {
        // 派发事件使用dispatchEvent方法
        two.dispatchEvent(myEvent)
        three.dispatchEvent(myEvent)
      })
    </script>
  </body>
</html>
```

## super 关键字

JS 中 super 关键词是用来调用原型对象的属性和方法的，本文分析使用 super 关键词的必要性

### this 指向导致的原型调用问题

JS 中存在多种”this 绑定“方式，最核心的就是”调用绑定“，即`xxx.show()`，那么 show 方法中的 this 就指向 xxx。

> 如果直接 show()，那么实际上在浏览器中是 window.show()，this 就指向 window。

通常 this 绑定在基于原型链的方法调用下是没有问题的，无论调用的方法是否来自于原型。
但是，在继承的场景下，如果需要**手动调用原型方法**，比如`this.__proto__.show()`，那么 show 方法中的 this 就会指向 this.**proto**，即原型对象自己。

```js
const person = {
  name: 'person.name',
  show() {
    console.log(this.name)
  },
}
const user = {
  __proto__: person,
  name: 'user.name',
  show() {
    // person.name  由于此时原型对象中的this是原型自己(this.__proto__)
    this.__proto__.show()
  },
}
user.show()
```

这里就会产生冲突，因为我们希望即便手动调用原型，this 的指向仍然是对象本身而不是原型。

> super 关键字就可以解决这种问题，既可以调用原型方法同时又不改变 this 指向。

### 通过 call 方法解决 this 指向问题

当然我们可以使用 call 方法重新定义 this 指向。

```js
const person = {
  name: 'person.name',
  show() {
    console.log(this.name)
  },
}
const user = {
  __proto__: person,
  name: 'user.name',
  show() {
    // 使用call方法重新定义this指向
    this.__proto__.show.call(this)
  },
}
user.show()
```

但是`this.__proto__.show.call()`在多级继承中就不生效了。

```js
const person = {
  name: 'person.name',
  show() {
    console.log(this.name)
  },
}
const user = {
  __proto__: person,
  name: 'user.name',
  show() {
    // 多级继承时，由于this始终指向admin,则this.__proto__指向user而不是person
    // this.__proto__.show.call(this)
    // 当然可以为了admin.show()手动调整，但显然这样做的适应性很差
    // 如果user.show()则会报错
    // this.__proto__.__proto__.show.call(this)
  },
}
const admin = {
  __proto__: user,
  name: 'admin.name',
  show() {
    this.__proto__.show.call(this)
  },
}
admin.show()
```

所以，手动修改 this 的指向既繁琐又不灵活，JS 于是提供了 super 关键词实现这些功能。
