# lunar-calendar



## 介绍

获取农历信息

## 安装

```bash
npm install lunar-calendar -S
```

## 使用

```js
import { solarToLunar } from 'lunar-calendar';

function getDate() {
  const date = new Date(+new Date() + 8 * 3600 * 1000);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const _date = date.getDate();

  const data = solarToLunar(year, month, _date);
  return {
    year: `${year}`,
    month: month < 10 ? `0${month}` : `${month}`,
    date: _date < 10 ? `0${_date}` : `${_date}`,
    week: `星期${['日', '一', '二', '三', '四', '五', '六'][date.getDay()]}`,
    week_english: date.toDateString().split(' ')[0],
    term: data.term,
    lunar: `${data.lunarMonthName}${data.lunarDayName}`,
  };
}

```

