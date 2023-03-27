# Git

## 保存 https 账号密码

```bash
git config --local credential.helper store
```

## 基本命令

### 配置

```bash
git config --global user.name 'peterwang'
git config --global user.email 'peterwang@gmail.com'
git config --global --list

git config --local user.name 'peterwang'
git config --local user.email 'wangyong@shsnc.com'
git config --local --list
```

### 文档相关

```bash
git add readme
git commit -m 'add readme'
git status
# 变更文件名
git mv readme readme.md
# 清空暂存区和工作目录的变更
git reset --hard
```



### 查看历史

```bash
git log
# 简单查看历史
git log --oneline
# 查看最近两次
git log -n2
# 查看所有分支最近4个分支
git log --oneline --all -n4
```



### 分支相关

```bash
# 基于cfca916版本号创建并切换分支temp
git checkout -b temp cfca916
# 从远程feature分支创建本地分支命名为feature
git branch feature origin/feature
# 从远程feature分支创建本地feature分支并切换
git checkout --track origin/feature
# 查看本地分支详细信息
git branch -vv
```



### 远程仓库

```bash
# 添加远程仓库
git remote add origin https://github.com/xxx
# 查看远程仓库
git remote -v
# 推送并新建上游分支
git push -u origin master
# 查看远程仓库
git remote show origin
# 从远程仓库拉取本地没有的数据，比如分支数据
git fetch origin
# 推送本地feature分支到远程feature分支
git push origin feature
```



### 帮助文档

```bash
# 查看帮助文档
git help log
git help --web log
```



