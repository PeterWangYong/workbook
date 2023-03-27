# 代码性能

## memoize

对于一些耗时比较久或者调用比较频繁的函数，如果入参和返回值总是一一对应的，同样的入参必定产生同样的返回值，那么可以缓存函数执行的结果，后续再次执行时直接返回该结果。

```js
// memoize

const memoize = (fn) => {
  const cache = new Map()
  const cached = function (val) {
    return cache.has(val)
      ? cache.get(val)
      : cache.set(val, fn.call(this, val)) && cache.get(val)
  }
  cached.cache = cache
  return cached
}

function findNoEmpty(array) {
  array.find((val) => !!val)
}

const _array = Array(1999).fill(1, 1998)

// 不使用函数缓存 66ms
console.time('findNoEmpty')
for (let i = 0; i < 2000; i++) {
  findNoEmpty(_array)
}
console.timeEnd('findNoEmpty')

// 使用函数缓存 0.3ms
console.time('findNoEmptyCached')
const findNoEmptyCached = memoize(findNoEmpty)
for (let i = 0; i < 2000; i++) {
  findNoEmptyCached(_array)
}
console.timeEnd('findNoEmptyCached')
```

