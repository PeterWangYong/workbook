# Axios

## 什么是Axios？

基于Promise的HTTP客户端



## 安装

```shell
npm install axios
```



## API

### axios(config)

```js
axios({
  method: 'post', 
  url: '/user/12345',
  data: {
		firstName: 'Fred',
    secondName: 'Flintstone'
  },
  headers: {
    Authorization: 'Bearer xxxx'
  }
}).then(response => {})
```



## 注意事项

### x-www-form-urlencoded

```js
const qs = require('qs')
router.get('/tools', async ctx => {
  const res = await axios.post(
    '/login/',
    // 要进行特殊编码
    qs.stringify({ user_name: 'ywnlpt', user_passwd: 'T09vbzAwMDA=\n' }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  )
  ctx.body = res.data
})
```

### 302错误无法捕获

这不是axios的问题，XMLHttpRequest本身就会自动对重定向请求做转发，所以你是不可能拿到的。