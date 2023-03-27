# 技巧

## flatten Object

如果我们需要将对象的键值进行扁平化处理，则可以通过递归和reduce累计的方式来完成。

```js
// flatten object
const flattenObject = (obj, prefix = '') => {
  const pre = prefix.length > 0 ? `${prefix}.` : ''
  return Object.keys(obj).reduce((acc, cur) => {
    if (
      typeof obj[cur] === 'object' &&
      obj[cur] !== null &&
      Object.keys(obj[cur]).length > 0
    ) {
      // Object.assign()将多个对象的键值复制给目标对象
      Object.assign(acc, flattenObject(obj[cur], pre + cur))
    } else {
      acc[pre + cur] = obj[cur]
    }
    return acc
  }, {})
}

// {a: {b: {c: 1}}, d: 2} => {'a.b.c': 1, d: 1}
console.log(flattenObject({ a: { b: { c: 1 } }, d: 2 }))
```

## unflatten Object

对象扁平化的逆过程，不需要递归，使用reduce累计，使用split进行字符串拆分，使用JSON.parse获得对象。

```js
const unflattenObject = (obj) => {
  return Object.keys(obj).reduce((acc, cur) => {
    if (cur.indexOf('.') !== -1) {
      const keys = cur.split('.')
      Object.assign(
        acc,
        JSON.parse(
          '{' +
            keys
              .map((v, i) => (i !== keys.length - 1 ? `"${v}": {` : `"${v}":`))
              .join('') +
            obj[cur] +
            '}'.repeat(keys.length)
        )
      )
    } else {
      acc[cur] = obj[cur]
    }
    return acc
  }, {})
}

// {'a.b.c': 1, d: 1} => {a: {b: {c: 1}}, d: 2}
console.log(unflattenObject({ 'a.b.c': 1, d: 2 }))
```

