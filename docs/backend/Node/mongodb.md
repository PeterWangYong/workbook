# MongoDB

## 什么是MongoDB？

## 为什么使用MongoDB？

### 优势

面向开发者的易用+高效数据库

- 简单直观：以自然的方式来建模，以直观的方式来与数据库交互。
- 结构灵活：弹性模式从容响应需求的频繁变化。
- 快速开发：做更多的事，写更少的代码。
- JSON结构和对象模型接近，开发代码量低。
- JSON动态模型意味着更容易响应新的业务需求。
- 复制集提供99.999%高可用。
- 分片架构支持海量数据和无缝扩容。

## 安装部署

### docker-compose部署

1. docker-compose.yml

   ```yaml
   version: '3.1'
   services:
     mongo:
       image: mongo
       restart: always
       environment:
         MONGO_INITDB_ROOT_USERNAME: root
         MONGO_INITDB_ROOT_PASSWORD: password
       ports:
         - 27017:27017
       volumes:
         - /data/mongodb/db:/data/db
   ```

2. 启动容器

   ```bash
   docker-compose up -d
   ```

### 本地安装

```bash
mkdir -p /data/db
cd /app
curl -O https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-rhel70-4.2.1.tgz 
tar xf mongodb-linux-x86_64-rhel70-4.2.1.tgz
export PATH=$PATH:/app/mongodb-linux-x86_64-rhel70-4.2.1/bin
mongod --dbpath /data/db --port 27017 --logpath /data/db/mongod.log --fork –bind_ip 0.0.0.0
```

### 使用mongo-shell连接数据库

```bash
mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]
```

## 常用命令

### 数据库操作

```bash
show dbs 
use mock # 如果数据库不存在则创建数据库
show collections
db.createCollection(name, options) # 创建集合
db # 当前数据库
db.collection.drop()
db.dropDatabase()
```

### 查询

```bash
db.<collection>.find() # 查询所有
db.collection.find().pretty()
db.<c>.find({"year": 1975}) # 单条件查询
db.<c>.find({"year": 1989, "title": "Batman"}) # and查询
db.<c>.find({$and: [{"title": "Batman"}, ...]}) # and的另一种形式
db.<c>.find({$or: [{"title": "", ...}]}) # or查询
db.<c>.find({"title": /^B/}) # 正则表达式查询
db.collection.find({"category": "action"}, {"_id": 0, title: 1})
```

### 新增

```bash
db.<collection>.insertOne(<JSON>)
db.<collection>.insertMany([<JSON1>, <JSON2>..])
```

### 修改

```bash
db.coll.updateOne({name: "apple"}, {$set: {from: "China"}})
db.coll.updateMany({name: "apple"}, {$set: {from: "China"}})
```

### 删除

```bash
db.coll.remove({a: 1})
db.coll.remvoe({}) # 删除所有记录
db.coll.remove() # 报错
```

## mongoose