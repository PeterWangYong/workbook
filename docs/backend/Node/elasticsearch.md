# ElasticSearch

## 什么是es？

## 为什么使用es？

## es部署

### 虚机部署

1. 调整内核参数

   - 最大文件打开数

     ```bash
     vim /etc/security/limits.conf
     	midware soft nofile 65536
     	midware hard nofile 65536
     su - midware
     ulimit -n
     ```

   - 虚拟映射内存

     ```bash
     sysctl -w vm.max_map_count=262144
     vim /etc/sysctl.conf
     	vm.max_map_count=262144
     sysctl vm.max_map_count
     ```

     

2. 修改配置文件

   - elasticsearch.yml

     ```bash
     cluster.name: mwops-elasticsearch
     	node.name: node1
     	path.data: /data/es/data/node1
     	path.logs: /data/es/logs/node1
     network.host: 0.0.0.0
     http.port: 9200
     gateway.recover_after_nodes: 1
     ```

   - jvm.options

     ```bash
     -Xms6g
     -Xmx6g
     # 可用内存的一半
     ```

3. 启动

   ```bash
   ./bin/elasticsearch -d
   ```

   

