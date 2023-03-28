# Java项目如何使用Nacos

## 项目介绍

设计三个服务: 

- java-service-a
- java-service-b
- java-service-c

其中:

- java-service-a要调用java-service-b
- java-service-b要调用java-service-c

微服务架构中，所有服务的IP和端口都是变化的，无法事先确定，因此需要Nacos实现服务发现（服务注册）。

## 添加依赖包

这里以java-service-a为例，进行代码说明。

我们的项目是springboot项目，首先需要在pom.xml中添加依赖。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.7.10</version>
    <relativePath /> <!-- lookup parent from repository -->
  </parent>
  <groupId>com.example</groupId>
  <artifactId>demo</artifactId>
  <version>0.0.1-SNAPSHOT</version>
  <name>demo</name>
  <description>Demo project for Spring Boot</description>
  <properties>
    <java.version>11</java.version>
  </properties>
  <dependencies>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
      <groupId>
        org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-webflux</artifactId>
    </dependency>
		
    <!-- 这里是nacos依赖包 -->
    <dependency>
      <groupId>com.alibaba.cloud</groupId>
      <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
      <version>2021.0.1.0</version>
    </dependency>

    <dependency>
      <groupId>
        org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-test</artifactId>
      <scope>test</scope>
    </dependency>
  </dependencies>

  <build>
    <plugins>
      <plugin>
        <groupId>
          org.springframework.boot</groupId>
        <artifactId>spring-boot-maven-plugin</artifactId>
      </plugin>
    </plugins>
  </build>

</project>
```

## 添加配置

我们需要在application.properties中添加配置

```properties
server.port=8081
# 这两个配置分别设置：服务名 和 nacos地址
spring.application.name=java-service-a 
spring.cloud.nacos.discovery.server-addr=${NACOS_SERVER_ADDR}
```

### 服务注册和获取

spring项目可以通过注解实现服务注册和获取。

```java
package com.example.demo;

import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.cloud.client.ServiceInstance;

@SpringBootApplication
@RestController
@EnableDiscoveryClient  // 2. 这个注解实现服务注册
public class DemoApplication {

  // 1. 创建Nacos客户端
  @Autowired
  private DiscoveryClient discoveryClient;

  public static void main(String[] args) {
    SpringApplication.run(DemoApplication.class, args);
  }

  @GetMapping("/")
  public String hello() {
		
    // 3. 服务获取
    List<ServiceInstance> instanceList = discoveryClient.getInstances("java-service-b");
    ServiceInstance instance = instanceList.get(0);
    String url = String.format("http://%s:%s", instance.getHost(), instance.getPort());

    // 创建WebClient实例
    WebClient webClient = WebClient.create();

    // 发起GET请求
    String response = webClient.get()
        .uri(url)
        .retrieve()
        .bodyToMono(String.class)
        .block();

    // 打印响应结果
    return String.format("java service A response succeed!<br>%s", response);
  }
```

