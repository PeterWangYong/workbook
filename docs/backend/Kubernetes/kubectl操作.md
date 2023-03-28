# kubectl操作

### kubectl run

Create and run a particular image in a pod.

```sh
kubectl run nginx --image=nginx
```

### kubectl delete

Delete resources by filenames, stdin, resources and names, or by resources and label selector.

```sh
kubectl delete pod nginx
```

### kubectl describe

Show details of a specific resource or group of resources.

```sh
kubectl describe pod nginx
```

### kubectl get

Display one or many resources.

```sh
kubectl get pod nginx -o wide
```

### kubectl explain

描述资源对象所需要的字段

```sh
kubectl explain pod
```

