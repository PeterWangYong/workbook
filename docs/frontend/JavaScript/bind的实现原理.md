# bind的实现原理



> bind通过闭包缓存this

## bind的用法

我们通常使用`Function.prototype.bind`解决this指向问题，通过bind我们可以获得一个新的函数，这个函数中的this指向为我们指定的那个对象。

```js
function f() {
  console.log(this.name)
}

const person = {
  name: 'zhuli',
}

const newFunc = f.bind(person)

console.log(newFunc === f) // false
f() // undefined
newFunc() // zhuli
```



## bind通过闭包实现代理和缓存

bind返回一个新的函数，这个函数在调用时`this`永远指向绑定的对象，那么疑问是：

**this只存在于调用时产生的执行上下文，怎么能提前指定呢？**

bind的实现原理如下：

```js
Function.prototype._bind = function (scope) {
  const fn = this
  return function () {
    return fn.apply(scope, arguments)
  }
}

function f() {
  console.log(this.name)
}

const person = {
  name: 'zhuli',
}

const newFunc = f._bind(person)

f() // undefined
newFunc() // zhuli
```

bind的核心实现是通过闭包实现对原函数的代理执行，通过将`scope`上下文对象和`fn`原函数缓存在自由变量中，保证不论什么时候访问函数都可以获得指定的`this`。

## React中bind的绑定

```react
class Dialog extends React.Component {
  constructor(props) {
    super(props)
    // 这里通过bind绑定this到方法中
    // 返回的方法实际是对原方法的代理：return function() {return fn.apply(xxx)}
    this.handleClick = this.handleClick.bind(this)
  }
	
  // 类语法中没有箭头函数的定义，这里定义的都是普通函数
  // 类似Dialog.prototype.handleClick = function () {}
  // 现在有试验性的语法：handleClick = () => {}，提前绑定this
  // 猜测这种语法也类似上面的bind操作
  handleClick() {
    console.log(this)
  }

  render() {
    // 由于render方法被Dialog对象调用，所以这里也可以改成：
    // onClick={() => this.handleClick()}
    // 由于箭头函数本身没有this，所以会通过静态作用域回到定义处按照作用域链向上寻找
    return (
      <div>
        <button onClick={this.handleClick}>按钮</button>
      </div>
    )
  }
}

ReactDom.render(<Dialog></Dialog>, document.getElementById('root'))
```

