# TypeScript

## 文档介绍

TypeScript是JavaScript的超集，所以JS支持的TS都支持，实际打包时通常将源码转为JS代码进行执行。

本文档重点记录TypeScript独有的特性。



## 安装和配置

```shell
npm install -D typescript
```

```shell
tsc --init
```



## 运行TypeScript

### 使用tsc编译为JS

```shell
tsc app.ts
```

### 使用ts-node直接运行TS代码

```shell
npx ts-node app.ts 
```

### 配合nodemon实现自动运行

```js
nodemon --watch *.ts --exec ts-node app.ts
```