# Nodemon

## nodemon介绍



## nodemon执行其他命令

```js
{
  "name": "test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "nodemon --watch *.ts --exec \"ts-node\" app.ts"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "ts-node": "^9.0.0",
    "typescript": "^4.1.2"
  }
}
```

