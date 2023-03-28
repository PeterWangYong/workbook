# Go项目如何使用Nacos

## 项目介绍

设计三个服务: 

- go-service-a
- go-service-b
- go-service-c

其中:

- go-service-a要调用go-service-b
- go-service-b要调用go-service-c

微服务架构中，所有服务的IP和端口都是变化的，无法事先确定，因此需要Nacos实现服务发现（服务注册）。

## 服务注册和获取

这里以go-service-a为例，进行代码说明。

我们的项目包含一个nacos包和main包，其中nacos包负责服务的注册和获取逻辑的封装。

```go
package nacos

import (
	"fmt"
	"log"
	"net"
	"os"
	"strconv"
	"strings"

	"github.com/nacos-group/nacos-sdk-go/clients"
	"github.com/nacos-group/nacos-sdk-go/clients/naming_client"
	"github.com/nacos-group/nacos-sdk-go/common/constant"
	"github.com/nacos-group/nacos-sdk-go/model"
	"github.com/nacos-group/nacos-sdk-go/vo"
)

// 1. 创建 Nacos 客户端
func getServiceClient() naming_client.INamingClient {

	nacos_server_addr := os.Getenv("NACOS_SERVER_ADDR")
	nacos_server_addr_list := strings.Split(nacos_server_addr, ":")
	nacosIp := nacos_server_addr_list[0]
	nacosPort, err := strconv.ParseUint(nacos_server_addr_list[1], 10, 64)
	serverConfigs := []constant.ServerConfig{
		{
			IpAddr: nacosIp,
			Port:   nacosPort,
		},
	}
	clientConfig := constant.ClientConfig{
		NamespaceId:         "public", // Nacos 命名空间 ID
		TimeoutMs:           5000,
		NotLoadCacheAtStart: true,
		LogDir:              "/tmp/nacos/log",
		CacheDir:            "/tmp/nacos/cache",
	}
	serviceClient, err := clients.CreateNamingClient(map[string]interface{}{
		"serverConfigs": serverConfigs,
		"clientConfig":  clientConfig,
	})
	if err != nil {
		panic(err)
	}

	return serviceClient
}

// 2. 服务注册
func RegisterNacos(serviceName string, port int) {

	serviceClient := getServiceClient()
	ip, err := getLocalIP()
	if err != nil {
		panic(err)
	}
	instance := vo.RegisterInstanceParam{
		Ip:          ip,
		Port:        uint64(port),
		ServiceName: serviceName,
		Weight:      10,
		Enable:      true,
		Healthy:     true,
		Ephemeral:   true,
		Metadata: map[string]string{
			"version": "1.0.0",
		},
	}
	_, err = serviceClient.RegisterInstance(instance)
	if err != nil {
		panic(err)
	}
	log.Println("service registered successfully.")
}

// 3. 服务获取
func GetInstance(serviceName string) *model.Instance {

	serviceClient := getServiceClient()
	groupName := "DEFAULT_GROUP"
	instance, err := serviceClient.SelectOneHealthyInstance(vo.SelectOneHealthInstanceParam{
		ServiceName: serviceName,
		GroupName:   groupName,
	})

	if err != nil {
		panic(err)
	}
	return instance
}

// 工具函数：获取本地 IP 地址
func getLocalIP() (string, error) {
	addrs, err := net.InterfaceAddrs()
	if err != nil {
		return "", err
	}
	for _, addr := range addrs {
		if ipNet, ok := addr.(*net.IPNet); ok && !ipNet.IP.IsLoopback() {
			if ipNet.IP.To4() != nil {
				return ipNet.IP.String(), nil
			}
		}
	}
	return "", fmt.Errorf("no local IP address found")
}
```

## 使用nacos包

```go
package main

import (
	"demo/nacos"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
)

func main() {
	port := 8001
	serviceName := "go-service-a"
  // 注册服务，传入服务名称和端口
	nacos.RegisterNacos(serviceName, port)
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
    // 获取服务，传入要获取的服务名称
		instance := nacos.GetInstance("go-service-b")
		resp, err := http.Get(fmt.Sprintf("http://%s:%d/", instance.Ip, instance.Port))
		if err != nil {
			fmt.Fprint(w, err)
			return
		}
		defer resp.Body.Close()

		body, err := ioutil.ReadAll(resp.Body)
		if err != nil {
			fmt.Fprint(w, err)
			return
		}

		fmt.Fprint(w, "go service A response succeed!\n"+string(body))
	})
	go func() {
		if err := http.ListenAndServe(fmt.Sprintf(":%d", port), nil); err != nil {
			log.Fatalf("failed to start server: %v", err)
		}
	}()
	log.Printf("server started at http://localhost:%d", port)
	select {}
}
```

