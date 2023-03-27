#!/usr/bin/env sh

# 自定义提交信息
message=$1

# 确保脚本抛出遇到的错误
set -e

# 变量定义
# DIST='docs/.vuepress/dist'

# 源文档发布
git add -A
git commit -m "$message"
# git push https://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@github.com/PeterWangYong/techBook.git master
git push https://gitee.com/PeterWangYong/tech-book.git master

# 生成静态文件
# npm run build

# 添加README
# cp README.md $DIST

# 进入生成的文件夹
# cd $DIST

# 静态页面发布
# git init
# git add -A
# git commit -m 'deploy'


# 发布到 https://<USERNAME>.github.io/<REPO>
# git push -f https://github.com/PeterWangYong/techBook.git master:gh-pages
# git push -f https://gitee.com/PeterWangYong/tech-book.git master:gh-pages
# git push -f https://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@github.com/PeterWangYong/peterwangyong.github.io.git master
# git push -f https://gitee.com/PeterWangYong/PeterWangYong.git master
