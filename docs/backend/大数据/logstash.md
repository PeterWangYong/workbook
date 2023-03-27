# Logstash

## 使用http收集日志送Kafka

### 安装Logstash
```shell
tar xf logstash-7.7.0.tar.gz
# 检查JAVA_HOME
echo $JAVA_HOME
${JAVA_HOME}/bin/java -version
```

### 新增配置文件
```shell
cd logstash-7.7.0/config
vim kong_log.conf

input {
  http {
    id => "kong_log_http_1"
    port => 7000
    codec => json
  }
}
output {
  kafka {
    topic_id => "konglogs"
    bootstrap_servers => "192.168.2.130:9093" // 多个servers间用逗号隔开，如"192.168.2.130:9092,192.168.2.131:9092"
    codec => json
  }
}

```


### 启动logstash
```shell
cd logstash-7.7.0
./bin/logstash -f ./config/kong_log.conf
# 启动到后台
nohup ./bin/logstash -f ./config/kong_log.conf &> /dev/null &
```