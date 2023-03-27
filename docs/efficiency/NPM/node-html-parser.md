# node-html-parser



## 介绍

node环境下解析HTML页面



## 安装

```bash
npm install node-html-parser -S
```



## 使用

```js
import getHtml from '../api';
import { parse } from 'node-html-parser';

async function getBgImage() {
  try {
    const html = await getHtml();
    const dom = parse(html);
    const imageSrc = dom.querySelector('.fp-one-imagen').getAttribute('src');
    return imageSrc;
  } catch (err) {
    return err;
  }
}
```





