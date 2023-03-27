# Kafka

如果要入门大数据，kafka 算是一个很好的入口。kafka 作为数据管道和存储设施在大数据系统中无所不在，本文基于官方文档对 kafka 进行一次学习和梳理。

## 介绍

### 消息系统

Kafka 是一个消息系统，它是分布式的，大吞吐量的消息系统。

#### 整合了点对点和发布订阅两种模式

传统的消息系统如 ActiveMQ 通常具备两种模式：点对点模式和发布订阅模式。点对点模式的特点是：消息只能被一个消费者所消费，这种模式下可以通过增加消费者实现负载均衡；发布订阅模式的特点是：消息可以同时让多个消费者消费，这种模式下可以实现批量分发，但无法实现负载均衡。

传统消息系统的结构：Producer -> Broker -> Consumer。这种结构只能同时实现点对点或发布订阅两种模式中的一种。那么是否有办法可以同时实现两种模式呢？

Kafka 通过在结构上增加了一层 ConsumerGroup 同时实现了两种模式：Producer -> Broker -> ConsumerGroup -> Consumer。Broker 对于 Group 是发布订阅模式，不同的 Group 可以独立重复消费 Kafka 中的数据，但 Group 对于 Consumer 是点对点模式，每一个 Consumer 只能排他性地消费属于自己的数据。

#### 如何实现分布式

Kafka 是分布式的消息系统，这保证了 Kafka 具备大吞吐，高容错的特性。分布式的本质是将计算和数据分散到不同的机器上进行处理，首先说一下数据部分，也就是消息。分布式的数据管理往往离不开两个东西：分片和副本，分片是为了负载均衡，副本是为了高可用，高容错，同时副本之间还会存在主从关系。

Kafka 自然也不例外，Kafka 将一个 Topic 分为多个 partition(分区)，每一个 partition 都有自己的一个或多个副本(replica)，具体多少取决于副本因子(replication-factor)。partition 的副本分散在集群的多台机器上同时其中一个副本是 leader，其他的副本是 follower，leader 负责消息的读写，follower 负责从 leader 同步数据，这些副本分布和主从关系全部存储在 zookeeper 上。

#### 消息的无序和有序

有了 partition 和副本，一个 topic 上的读写任务就被分配到不同的 leader-partition 上，即不同的机器上，但与此同时生产者发送消息到 topic 也需要分别写入不同的 partition，因而整体上 topic 里面的消息是无序的，因为分散在不同 partition 上的消息无法保证顺序，但每一个 partition 中的消息是有序的，所以如果想要保证 Topic 消息有序，那么该 Topic 只能存在一个 partition。

默认情况下 Topic 使用轮询的方式将消息分发到不同的 partition 上，当然用户也可以指定按照某种 hash 方式分发消息到 partition 上。每一条消息进入 partition 时被打上一个编号：offset，同时消息内容顺序写入数据文件：commit-log，partition 中写入的消息既不可修改也不可回退。于是，生产者发送到 Topic 的消息就被分散到整个集群中等待消费者消费。

#### 如何消费消息

如同前文所说，Kafka 的消息消费需要通过 ConsumerGroup 和 Consumer 两个部分，Group 负责从 Topic 中接收消息并按照 Consumer 的数量以 Partition 为单位进行分配，Group 还会监控 Consumer 的状态，一旦某个 Consumer 挂掉了，Group 会剔除该 Consumer 并将他的 partition 分配给其他的 Consumer 进行消费。

Kafka 中 ConsumerGroup 是一个有状态的对象，每一个 partition 会在 zookeeper 中维护不同 Group 上次消费到的 offset 便于下次继续消费，类似于/consumers/group/offsets/topic/partition。如果我们在消费时没有指定 Group 则使用默认的 Group，所以如果要保证消费的完整性就要保证每次使用相同的 Group。至于 Group 中的 Consumer 则是无状态的对象，或多或少或增或减都不会影响消息的消费顺序。

### 数据存储

不同于 ActiveMQ，Kafka 中的消息会在过期(retention-period)之前会一直保留，不会随着消费而删除。因而对于 Kafka 中的消息我们可以多次重复消费，这就让 Kafka 成为了很好的数据存储设施。同时由于分布式的设计，Kafka 的数据存储量可以不断横向扩容。

### 流处理平台

Kafka 不满足于只作为数据管道和存储设施，还提供了一系列用于流处理的接口，便于开发者实时处理管道中的数据，这个功能可以玩一下，但不如 SparkStreaming，Storm，Flink 等专业流处理系统全面。

## 使用 Kafka

### 启动服务

#### 启动 Zookeeper

Kafka 作为分布式系统依赖 zk 保存状态数据，kafka 自带了 zookeeper

```bash
cd kafka_2.12-2.5.0
nohup ./bin/zookeeper-server-start.sh config/zookeeper.properties &> /dev/null &
```

#### 启动单个 Kafka

```bash
cd kafka_2.12-2.5.0
nohup ./bin/kafka-server-start.sh config/server.properties &> /dev/null &
```

#### 启动 Kafka 集群

Kafka 集群是通过 ZK 构建的，所以启动集群即启动多个 Kafka 实例，这些实例的配置中 zk 地址相同。

```bash
cd kafka_2.12-2.5.0
cp config/server.properties config/server-1.properties
cp config/server.properties config/server-2.properties
```

```properties
vim config/server-1.properties
	broker.id=1
	listeners=PLAINTEXT://0.0.0.0:9093
	log.dirs=/tmp/kafka-logs-1

vim config/server-2.properties
	broker.id=2
	listeners=PLAINTEXT://0.0.0.0:9094
	log.dirs=/tmp/kafka-logs-2
```

broker.id 保证在集群中唯一，log.dirs 为消息数据存储路径

### 控制台客户端

#### 管理脚本

- 列出集群中所有的 topic

  ```
  ./bin/kafka-topics.sh --list --bootstrap-server localhost:9092
  ```

- 创建一个 topic

  ```
  ./bin/kafka-topics.sh --create --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1 --topic test1
  ```

- 查看 topic 详情

  ```
  ./bin/kafka-topics.sh --describe --bootstrap-server localhost:9092 --topic test1
  	Topic: test1	PartitionCount: 1	ReplicationFactor: 1	Configs: segment.bytes=1073741824
  	Topic: test1	Partition: 0	Leader: 0	Replicas: 0	Isr: 0
  ```

  Topic 详情中第一行是 Topic 的总体信息：Topic，partition 数量，副本数量，segment.bytes: commit-log 的单文件最大存储量

  第二行以后为每一个 partition 的详情：Topic，Partition 编号，当前 Leader-Partition 编号，所有副本 partition 编号，保持同步状态的副本 partition 数量(ISR: in-sync)

  > 通常如果文件很大，我们就需要将其拆分为多个小文件。kafka 中一个 partition 中的数据对应一个 commit-log 目录，目录中存在多个 segment 文件将消息数据分隔存储。

#### 生产者消费者

```sh
./bin/kafka-console-producer.sh --bootstrap-server localhost:9092 --topic test1
./bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic test1 --from-beginning
# 默认consumer从latest位置开始消费，添加--from-beginning开始消费
./bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic test1 --group 1
# 可以给消费者指定一个group，这样同一个group下的consumer可以从上次消费的offset位置继续消费
# 如果不指定group则会分配一个默认的group，每次默认从partition的末端开始消费
```

#### 连接器

连接器的作用在于连接上游数据源将数据写入 kafka，连接下游数据源将 kafka 中的数据写入进去。

不同类型的数据源对应存在不同的 connector，我们需要根据数据源类型选择相应的 connector。

```bash
echo -e "hello\nworld" >> test.txt
./bin/connect-standalone.sh config/connect-standalone.properties config/connect-file-source.properties config/connect-file-sink.properties
# 三份配置文件：
# 第一份对应connect，connect是一个接口用于调用connector，里面指定了kafka地址以及如何序列化
# 第二份对应source connector，用于配置文件名，topic名称，以及使用的Connector Class类型
# 第三份对应output connector，用于配置文件名，topic名称，以及使用的Connector Class类型
# 结果：本地出现文件：test.sink.txt， topic：connect-test中存在写入的数据
```
