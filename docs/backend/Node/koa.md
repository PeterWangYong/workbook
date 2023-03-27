# Koa

## 什么是Koa？

## 为什么使用Koa？

## 基本使用

```javascript
import Koa from 'koa'
const app = new Koa()

app.use(ctx => {
  ctx.body = 'Hello World'
})

app.listen(3000)
```

## 中间件

### 基本定义

```js
module.exports = async function(ctx, next) {
  console.log('pv', ctx.path)
  await next()
}
```

### 常用中间件

- koa-body
- @koa/cors
- koa-combine-routers
- koa-compose
- koa-helmet
- koa-json
- koa-router
- koa-static

### koa-body

```bash
const koaBody = require('koa-body')
app.use(koaBody())
router.get('/', ctx => {
	console.log(ctx.request.body)
})
```



### koa-generator

```bash
npm i -g koa-generator
koa2 project

cd koa2-learn && npm install
npm run dev
```

### koa-router

```js
const router = require('koa-router')()
router.prefix('/users')
router.get('/', async(ctx, next) => {
  ctx.body = "hello world"
})
return router

app.use(router.routes(), router.allowedMethods())
```

## cookie和session

```js
ctx.cookies.set('pvid', Math.random())
ctx.cookies.get('pvid')
```

## 文件下载

```js
router.get('/download', async (ctx) => {
  ctx.set({
    'Content-Type': 'application/octet-stream',
    'Content-Deposition': 'attachment;filename=FileName.txt',
  });

  const fileStream = fs.createReadStream(
    path.resolve(__dirname, '../file.txt')
  );

  ctx.body = fileStream;
});
```



