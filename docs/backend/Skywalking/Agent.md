# Agent

## 一、Java Agent

### 1. 在Kubernetes中使用java-agent

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: java-service-a
spec:
  volumes:
    - name: skywalking-agent
      emptyDir: {}

  initContainers:
    - name: agent-container
      image: apache/skywalking-java-agent:8.7.0-alpine
      volumeMounts:
        - name: skywalking-agent
          mountPath: /agent
      command: ['/bin/sh']
      args: ['-c', 'cp -R /skywalking/agent /agent/']

  containers:
    - name: java-service-a
      image: admin/java-service-a:1.0.0
      volumeMounts:
        - name: skywalking-agent
          mountPath: /skywalking
      env:
        - name: JAVA_TOOL_OPTIONS
          value: '-javaagent:/skywalking/agent/skywalking-agent.jar'
        - name: NACOS_SERVER_ADDR
          value: <nacos-server>:8848
        - name: SW_AGENT_COLLECTOR_BACKEND_SERVICES
          value: <skywalking-oap-server>:11800
        - name: SW_AGENT_NAME
          value: java-service-a
      ports:
        - name: http
          containerPort: 8081
          hostPort: 8081
  hostNetwork: true
```

