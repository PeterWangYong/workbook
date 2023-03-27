# 协程



## 什么是协程？

协程是实现并发编程的一种方式。

诚然，多线程有诸多优点且应用广泛，但也存在一定的局限性：比如，多线程运行过程容易被打断，因此有可能出现 race condition 的情况；再如，线程切换本身存在一定的损耗，线程数不能无限增加，因此，如果你的 I/O 操作非常 heavy，多线程很有可能满足不了高效率、高质量的需求。

## async / await



## 任务Tasks



## Asyncio

事实上，Asyncio 和其他 Python 程序一样，是单线程的，它只有一个主线程，但是可以进行多个不同的任务（task），这里的任务，就是特殊的 future 对象。这些不同的任务，被一个叫做 event loop 的对象所控制。你可以把这里的任务，类比成多线程版本里的多个线程。

值得一提的是，对于 Asyncio 来说，它的任务在运行时不会被外部的一些因素打断，因此 Asyncio 内的操作不会出现 race condition 的情况，这样你就不需要担心线程安全的问题了。



## 来自fluent_python的部分

### 协程的四种状态

'GEN_CREATED', 'GEN_RUNNING', 'GEN_SYSPENDED', 'GEN_CLOSED'分别：

创建等待执行，正在执行，在yield表达式处暂停，执行结束

> 当前状态可以使用inspect.getgeneratorstate(...)函数确定

