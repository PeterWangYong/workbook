# Redis

## Redis介绍

## Redis部署

### docker-compose.yml

```yml
version: '3' 

services:
    redis-test:
        image: 'redis'
        restart: 'always'
        container_name: 'redis-test'
        ports:
            - 15001:6379
        volumes:
            - /data/redis/data:/data
        command: ['redis-server', '--requirepass', '123456']
```

## 工具

### AnotherRedisDesktopManager

### 命令行

## Node 整合

### 安装依赖

```bash
yarn add redis bluebird
```

### index.js

```js
const REDIS = {
  host: 'centos.vm.com',
  port: 15001,
  password: '123456',
}

export default {
  REDIS,
}
```

### RedisConfig.js

```js
import redis from 'redis'
import { promisifyAll } from 'bluebird'
import config from './index'

const options = {
  host: config.REDIS.host,
  port: config.REDIS.port,
  password: config.REDIS.password,
  detect_buffers: true,
  retry_strategy: function (options) {
    if (options.error && options.error.code === 'ECONNREFUSED') {
      // End reconnecting on a specific error and flush all commands with
      // a individual error
      return new Error('The server refused the connection')
    }
    if (options.total_retry_time > 1000 * 60 * 60) {
      // End reconnecting after a specific timeout and flush all commands
      // with a individual error
      return new Error('Retry time exhausted')
    }
    if (options.attempt > 10) {
      // End reconnecting with built in error
      return undefined
    }
    // reconnect after
    return Math.min(options.attempt * 100, 3000)
  },
}

// const client = redis.createClient(options)
const client = promisifyAll(redis.createClient(options))

client.on('error', err => {
  console.log('Redis Client Error: ' + err)
})
const setValue = (key, value) => {
  if (typeof value === 'undefined' || value === null || value === '') {
    return
  }
  if (typeof value === 'string') {
    client.set(key, value)
  } else if (typeof value === 'object') {
    // { key1: value1, key2: value2 }
    // Object.keys(value) => [key1, key2]
    Object.keys(value).forEach(item => {
      client.hset(key, item, value[item], redis.print)
    })
  }
}

// v8 promisify method use util, must node > 8
// const { promisify } = require('util')
// const getAsync = promisify(client.get).bind(client)
// const hgetallAsync = promisify(client.hgetall).bind(client)

const getValue = key => {
  return client.getAsync(key)
}

const getHValue = key => {
  // bluebird async
  return client.hgetallAsync(key)
}
const delValue = key => {
  client.del(key, (err, res) => {
    if (res === 1) {
      console.log('delete successfully')
    } else {
      console.log('delete redis key error:' + err)
    }
  })
}

export { client, getValue, getHValue, setValue, delValue }
```

