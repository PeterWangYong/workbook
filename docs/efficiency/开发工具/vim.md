# Vim

## 什么是Vim？

## Vim基础命令

### 打开文件

- vim filename
- :e filename


### 移动光标

- hjkl 左上下由
- w e 按单词向后移动
- b 按单词向前移动
- W E 按广义单词向后移动
- B 按广义单词向前移动
- 0 移至行首
- $ 移至行尾
- {} 段落移动
- f t 定位到某个字符

### 保存文件

- w filename 另存为新文件

### 新增

- I 从行首新增
- A 从行尾新增

### 修改

- cw ce 向后删除一个单词
- c2w c2e 向后删除两个单词
- cb 向前删除一个单词
- c2b 向前删除两个单词
- cl / s 向右删除一个字母
- ch 向左删除一个字母
- cc / S 删除一行
- 2cc 删除两行
- C 删除到行尾

> 基本规则：修改命令 + 数字 + 移动命令

### 删除

- dw de 删除一个单词
- dW dE 删除一个广义单词
- d2w d2e 删除两个单词
- d2W d2E 删除两个广义单词
- dl 向右删除一个字符
- dh 向左删除一个字符
- dd 删除一行
- 2dd 删除两行

> 广义单词和狭义单词：广义单词只空格分隔的所有字符，狭义单词指字母数字下划线组成的单词。

- D 删除到行尾

### 撤销

- u 撤销
- ctrl+r 重做

### 命令行模式

- ctrl+p ctrl+n 查看历史命令
- ctrl+b ctrl+e 命令开头或结尾
- ctrl+f 打开命令行编辑窗口

### 窗口分隔

- sp filename 上下分隔窗口
- vs filename 水平分隔窗口

### 命令映射

- map 递归映射（可以映射自定义命令）
- noremap 非递归映射（只能映射系统命令）



## Vim的推荐配置

```
" base 
syntax on
set encoding=utf-8

" view 
set number
set linebreak
set scrolloff=5
set laststatus=2

" indent 
set nofoldenable
set autoindent
set shiftwidth=4 
set softtabstop=4 
set expandtab

" search 
set hlsearch
set incsearch
set ignorecase
set smartcase

" edit 
set nobackup
set undodir=~/.vim/undodir
set noswapfile
set noerrorbells
set autoread
set wildmenu
set wildmode=longest:list,full

" map
inoremap ( ()<ESC>i
inoremap [ []<ESC>i
inoremap { {}<ESC>i
inoremap {<CR> {}<ESC>i<CR><ESC>O<TAB>
inoremap < <><ESC>i
inoremap ' ''<ESC>i
inoremap " ""<ESC>i
inoremap <C-F> <RIGHT>
inoremap <C-B> <LEFT>
inoremap <C-O> <ESC>o

" NERDTree 
inoremap <C-H> <ESC><C-W>h
noremap <C-H> <ESC><C-W>h
inoremap <C-L> <ESC><C-W>l
noremap <C-L> <ESC><C-W>l
```

