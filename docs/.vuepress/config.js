const fs = require('fs');
const path = require('path');

const nav = {
  frontend: '前端',
  backend: '后端',
  efficiency: '效率',
  project: '项目',
};

const themeConfig = {
  nav: [],
  sidebar: {},
};

function deepCheck(path) {
  const children = fs.readdirSync(path, { withFileTypes: true });
  if (Array.isArray(children)) {
    return children.reduce((pre, cur) => {
      cur.path = `${path}/${cur.name}`;
      if (cur.isDirectory()) {
        return [...pre, cur, ...deepCheck(cur.path)];
      } else {
        return [...pre, cur];
      }
    }, []);
  }
}

function checkSidebar(link) {
  link = `${link}/`;
  if (!themeConfig.sidebar[link]) {
    themeConfig.sidebar[link] = [''];
  }
  return themeConfig.sidebar[link];
}

function genThemeConfig(dir_name) {
  dir_path = path.resolve(__dirname, '..', dir_name);
  const items = [];
  res = deepCheck(dir_path);
  res.forEach((item) => {
    // const link = item.path.replace('/Users/wangyong/Documents/workbook/docs', '');
    const link = item.path.replace('/home/runner/work/workbook/workbook/docs', '');
    text = path.basename(link);
    if (item.isDirectory()) {
      items.push({
        text,
        link: `${link}/`,
      });
      checkSidebar(link);
    } else if (!['README.md', '.DS_Store'].includes(text)) {
      dir = path.dirname(link);
      base = path.basename(link, '.md');
      sidebarArray = checkSidebar(dir);
      sidebarArray.push(base);
    }
  });
  themeConfig.nav.push({
    text: nav[dir_name],
    items,
  });
}

Object.keys(nav).forEach((item) => {
  genThemeConfig(item);
});

// console.log(themeConfig.nav[1].items);
// console.log(themeConfig.sidebar);

module.exports = {
  title: '皮特王同学',
  description: '天地人和，君子勿劳',
  base: '/',
  themeConfig: {
    ...themeConfig,
    sidebarDepth: 2,
    repo: 'PeterWangYong/workbook',
    repoLabel: 'GitHub',
    lastUpdated: '上次更新',
  },
};
