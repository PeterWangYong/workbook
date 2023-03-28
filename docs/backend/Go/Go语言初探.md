# Go语言初探



## 环境变量

- GOPATH：工作目录
- GOROOT：GO安装目录
- GOBIN：go install 要安装到的目录，默认是`$GOPATH/bin`
- GOOS：要编译的操作系统，linux/windows/darwin
- GOARCH: 要编译的处理器架构，386/amd64/arm64

##常用命令

- go build 构建
- go install 构建并安装到GOBIN
- go env 查看所有环境变量
- go get 获取模块
- get publish 发布模块

## 标准库

- fmt
- strings
- errors

## 控制结构

- if
- for
- switch：switch/case/default/fallthrough

## 集合类型

- Array：for range
- Slice：make()/append()
- Map：make()/map[string]int{"a":10}/delete()/for range/len()



## 函数

- 私有函数：首字母小写 ，公有函数：首字母大写

## 方法

- 同函数，但多了一个接收者
- 值接收者/指针接收者

## 结构体

- type person struct {}
- 初始化：p := person{}

## 接口

- type Stringer interface {}
- 隐式实现

## 错误处理

- errors
- panic异常，中断程序运行 / recover

## defer



