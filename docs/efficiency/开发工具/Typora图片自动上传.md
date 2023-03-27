# Typora图片自动上传

> 本文介绍：
>
> 1. 使用PicGo+Gitee构建图床
> 2. 配置Typora自动图片上传

## PicGo图床工具

PicGo是一款图床管理工具，用于图片上传下载查看，支持多种后台。

[官方站点](https://molunerfinn.com/PicGo/)

[下载地址](https://github.com/Molunerfinn/picgo/releases)

![image-20201211143731218](https://gitee.com/PeterWangYong/blog-image/raw/master/images/image-20201211143731218.png)

## 安装GItee图床插件

![image-20201211143631556](https://gitee.com/PeterWangYong/blog-image/raw/master/images/image-20201211143631556.png)

## 配置Gitee仓库

### 新建仓库

![image-20201211143949509](https://gitee.com/PeterWangYong/blog-image/raw/master/images/image-20201211143949509.png)

### 获取私有Token

Token用于授权第三方操作仓库

![image-20201211144100788](https://gitee.com/PeterWangYong/blog-image/raw/master/images/image-20201211144100788.png)

![image-20201211144150595](https://gitee.com/PeterWangYong/blog-image/raw/master/images/image-20201211144150595.png)

点击生成新令牌

![image-20201211144301073](https://gitee.com/PeterWangYong/blog-image/raw/master/images/image-20201211144301073.png)

提交后即可生成新令牌



## 配置PicGo图床

![image-20201211144709192](https://gitee.com/PeterWangYong/blog-image/raw/master/images/image-20201211144709192.png)



## 配置Typora自动上传图片

![image-20201211145030587](https://gitee.com/PeterWangYong/blog-image/raw/master/images/image-20201211145030587.png)

### 验证图片上传

![image-20201211145141242](https://gitee.com/PeterWangYong/blog-image/raw/master/images/image-20201211145141242.png)

配置完成，使用时只要保证PicGo程序打开便可以在插入图片时自动上传并替换地址。