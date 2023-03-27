# html2canvas



## 介绍

将html转换为canvas图片

## 安装

```bash
npm install html2canvas -S
```

## 使用

```js
handleDownload() {
  html2canvas(document.querySelector('#header-image'), {
    useCORS: true,
  }).then(canvas => {
    // document.body.appendChild(canvas)
    // 下载图片
    const url = canvas.toDataURL('image/png')
    const a = document.createElement('a')
    a.download = `${this.date.year}${this.date.month}${this.date.date}.jpg`
    a.href = url
    const event = new MouseEvent('click');
    a.dispatchEvent(event);
  })
} 
```

