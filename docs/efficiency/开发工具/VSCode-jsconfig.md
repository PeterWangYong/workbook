# jsconfig.json

## 介绍

jsconfig.json用于vscode读取并优化js项目的使用体验。

jsconfig.json继承自tsconfig.json，所以有些属性不生效。

jsconfig.json所在目录为JS项目根目录。

> https://segmentfault.com/a/1190000018013282
>
> https://code.visualstudio.com/docs/languages/jsconfig

## include

指明哪些文件是源代码，用于提升代码检索、提示的性能

```json
{
  "include": [
    "src/**/*",
  ]
}  

```

## exclude

指明哪些文件不是源代码

```json
{
  "exclude": [
    "node_modules"
  ]
}
```

> include和exclude中的路径都相对于jsconfig.json的位置

## compilerOptions

指明JS语言开发选项

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "./src/*"
      ]
    },
  }
}
```

### baseUrl

基础目录，compilerOptions中的相对路径都基于该路径

### paths

指定路径别名（相对于baseUrl， "./src/*"，这里的.指的是baseUrl)