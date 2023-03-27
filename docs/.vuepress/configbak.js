const fs = require('fs')
const path = require('path')

const nav = {
  frontend: '前端',
  backend: '后端',
  efficiency: '效率',
  project: '项目',
}

const themeConfig = {
  nav: [],
  sidebar: {},
}

function deepCheck(path) {
  const children = fs.readdirSync(path, { withFileTypes: true })
  if (Array.isArray(children)) {
    return children.reduce((pre, cur) => {
      cur.path = `${path}/${cur.name}`
      if (cur.isDirectory()) {
        return [...pre, cur, ...deepCheck(cur.path)]
      } else {
        return [...pre, cur]
      }
    }, [])
  }
}

function checkSidebar(link) {
  if (!themeConfig.sidebar[link]) {
    themeConfig.sidebar[link] = ['']
  }
  return themeConfig.sidebar[link]
}

function genThemeConfig(dir_name) {
  dir_path = path.resolve(__dirname, '..', dir_name)
  const items = []
  res = deepCheck(dir_path)
  res.forEach(item => {
    const link = item.path.replace('/Users/wangyong/blog/docs', '')
    text = path.basename(link)
    console.log(text)
    if (item.isDirectory()) {
      items.push({
        text,
        link,
      })
      checkSidebar(link)
    } else if (!['README.md', '.DS_Store'].includes(text)) {
      dir = path.dirname(link)
      base = path.basename(link, '.md')
      sidebarArray = checkSidebar(dir)
      sidebarArray.push(base)
    }
  })
  themeConfig.nav.push({
    text: nav[dir_name],
    items,
  })
}

Object.keys(nav).forEach(item => {
  genThemeConfig(item)
})

console.log(themeConfig)

module.exports = {
  title: '皮特王同学',
  description: '建立技术掌控，解决语言问题',
  base: '/',
  themeConfig: {
    nav: [
      {
        text: '前端',
        items: [
          {
            text: 'HTML',
            link: '/frontend/html/',
          },
          {
            text: 'CSS',
            link: '/frontend/css/',
          },
          {
            text: 'Javascript',
            link: '/frontend/javascript/',
          },
          {
            text: '浏览器',
            link: '/frontend/browser/',
          },
        ],
      },
      {
        text: '后端',
        items: [
          {
            text: 'Node',
            link: '/backend/node/',
          },
          {
            text: 'Python',
            link: '/backend/python/',
          },
          {
            text: 'Django',
            link: '/backend/django/',
          },
          {
            text: '操作系统',
            link: '/backend/os/',
          },
          {
            text: '计算机网络',
            link: '/backend/network/',
          },
          {
            text: 'MySQL',
            link: '/backend/mysql/',
          },
        ],
      },
      {
        text: '效率',
        items: [
          {
            text: '工作流',
            link: '/efficiency/workflow/',
          },
          {
            text: '模块',
            link: '/efficiency/module/',
          },
          {
            text: '代码片段',
            link: '/efficiency/snippet/',
          },
          {
            text: '采坑日记',
            link: '/efficiency/bug/',
          },
        ],
      },
      {
        text: '项目',
        items: [
          {
            text: '知乎',
            link: '/project/zhihu/',
          },
        ],
      },
    ],
    sidebar: {
      '/frontend/html/': [''],
      '/frontend/css/': [''],
      '/frontend/javascript/': [
        '',
        'vue',
        'https',
        'throttle',
        'closure',
        'promise',
      ],
      '/backend/node/': ['', 'mongodb', 'koa', 'express'],
      '/backend/python/': [
        '',
        'decorator',
        'global',
        'python-wsgi',
        'thread',
        'process',
        'with',
        'excel',
      ],
      '/backend/django/': [
        '',
        'field-lookup',
        'model',
        'query-expression',
        'url',
        'view',
      ],
      '/backend/os/': ['', 'memory'],
      '/backend/network/': [],
      '/backend/mysql/': ['', 'ddl'],
      '/efficiency/workflow/': [
        '',
        'docker',
        'gitlab',
        'jenkins',
        'vim',
        'webpack',
        'babel',
        'deploy',
        'pypiserver',
      ],
      '/efficiency/npm/': ['', 'ejs', 'axios'],
      '/efficiency/snippet/': ['', 'base', 'performance'],
      '/efficiency/bug/': ['', 'pycharm-start-failed'],
      '/project/zhihu/': [''],
    },
    sidebarDepth: 2,
    repo: 'PeterWangYong/techBook',
    repoLabel: 'GitHub',
    lastUpdated: '上次更新',
  },
}
