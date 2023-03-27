# 兼容eslint和prettier



## eslint和prettier

eslint针对javascript做格式和语法的检查，prettier主要用于格式化，但格式化的文件类型相比eslint --fix来说要多一些。通常prettier的格式和eslint的格式会产生冲突，造成prettier格式化后eslint大量报错，所以我们需要配置使得格式上按照prettier为准，eslint专门做语法检查。



## eslint-config-prettier和eslint-plugin-prettier

项目创建完成后，package.json的开发依赖如下：

![](https://gitee.com/PeterWangYong/blog-image/raw/master/images/1192583-20200624091233813-1278947884.png)

其中@vue/eslint-config-prettier是一组规则，引入到.eslintrc.js的extends数组中用于eslint格式检查时兼容prettier的格式。

![](https://gitee.com/PeterWangYong/blog-image/raw/master/images/1192583-20200624091353564-1706650840.png)

而eslint-plugin-prettier则用于执行eslint --fix时自动执行prettier的格式化



## 添加prettier.config.js

现在代码的格式就以prettier为准，我们可以通过新建prettier.config.js文件进行格式调整：

```js
vim prettier.config.js

module.exports = {
  singleQuote: true,
  semi: false
}
```

