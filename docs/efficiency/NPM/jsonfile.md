# JSON文件读取



## 基本介绍



[jsonfile](https://www.npmjs.com/package/jsonfile)用于读取JSON文件。



## 安装



```shell
npm install --save jsonfile
```





## API



### readFile(filename, [options], callback)



### readFileSync(filename, [options])

```js
const jsonfile = require('jsonfile')

const file = './data.json'
const obj = jsonfile.readFileSync(file)
```



### writeFile(filename, obj, [options], callback)



### writeFile(filename, obj, [options])



