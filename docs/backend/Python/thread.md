# 多线程

## 线程概念

线程是程序的执行单元，共享一个进程的资源。线程调度由CPU控制，代码无法控制。

线程的状态：创建-就绪-运行-阻塞-结束



## 线程基础

### 创建线程

```python
import threading
import time


def func():
    time.sleep(5)
    print("hello world")


thread = threading.Thread(target=func, name="thread-1", args=(), daemon=True)


if __name__ == "__main__":
    print("start main")
    thread.start()
    print("end main")
```

1. target：目标函数
2. name：线程命名
3. args：函数参数
4. daemon：是否在后台执行，默认为False

如果线程在后台运行，则进程不会等待该线程，当进程关闭后，所有后台线程将被强制结束。如果放在前台运行，则进程会等待所有前台线程结束后再结束。



### 通过子类创建线程

```python
import threading
import time


class CustomThread(threading.Thread):
    def __init__(self):
        super().__init__()

    def run(self):
        time.sleep(5)
        print("hello world")


thread = CustomThread()

if __name__ == "__main__":
    print("start main")
    thread.start()
    print("end main")
```

1. 继承threading.Thread实现自定义线程类
2. 注意使用super调用父类初始化方法
3. 使用run方法定义执行体



### 线程配置

1. 是否后台执行

   ```python
   thread.daemon
   thread.isDaemon()
   thread.setDaemon(False)
   ```

2. 线程命名

   ```python
   thread.name
   thread.getName()
   thread.setName('thread-1')
   ```

### 启动线程

```python
thread.start()
```

线程只能启动一次，启动多次会报错

### 线程等待

```python
if __name__ == "__main__":
    print("start main")
    thread.start()
    thread.join(3)
    print("end main")
```

1. 主线程等待3s后打印end main

### 其他接口

1. 线程是否存活

   ```python
   thread.is_alive()
   ```

2. 当前运行线程的个数

   ```python
   threading.active_count()
   ```

3. 获取当前线程和线程ID

   ```python
   threading.current_thread()
   # 未启动的线程ID为None
   threading.current_thread().ident
   ```

4. 线程栈设置

   ```python
   if __name__ == "__main__":
       print("start main")
       thread.start()
       # 查看线程栈大小，默认为0，表示采用系统默认值
       print(threading.stack_size())
       # 设置线程栈大小
       threading.stack_size(1024 * 1024 * 2)
       print(threading.stack_size())
       print("end main")
   ```

5. 获得主线程

   ```python
   threading.main_thread()
   ```

6. 线程列表

   ```python
   threading.enumerate()
   ```



## 线程安全

线程安全是指程序在单线程和多线程环境下执行是否能得到相同的结果。

线程安全通常涉及到共享资源的访问及由此产生的竞争（竞态条件）。

举个例子：

```python
import threading
import time

num = 0


def func():
    global num
    for i in range(10):
        num += 1
        print(num)
        time.sleep(1)


t1 = threading.Thread(target=func)
t2 = threading.Thread(target=func)

if __name__ == "__main__":
    t1.start()
    t2.start()

```

执行结果：

2
2
4
4
6
7
8
9

...

结果中出现的2，2，4，4等就说明线程安全出了问题，t1和t2可能同时拿到了num=1，然后还没等加1就发生了线程切换，导致num本来应该等于3，结果等于2。

解决线程安全的关键是对共享资源进行保护，常用方法是加锁。

### threading.Lock

```python
import threading
import time

num = 0
# 创建一把锁
lock = threading.Lock()


def func():
    global num
    for i in range(10):
        # 给资源加锁
        lock.acquire()
        num += 1
        print(num)
        # 释放锁
        lock.release()
        time.sleep(1)


t1 = threading.Thread(target=func)
t2 = threading.Thread(target=func)

if __name__ == "__main__":
    t1.start()
    t2.start()
```

可以使用with语法进一步优化：

```python
def func():
    global num
    for i in range(10):
        with lock:
            num += 1
            print(num)
        time.sleep(1)
```

### threading.RLock

RLock和Lock在使用上类似，但有两个显著的区别：

1. RLock可以获取多次，释放多次「释放次数必须和获取次数相同」，但只能在同一个线程内多次acquire。

2. RLock只能由当前获取锁的线程释放「Lock则可以由任意线程释放」

   

## 线程同步

多线程本身是异步行为，线程间执行顺序无法保证，所谓线程同步就是通过一些方法使得多个线程可以按顺序执行。

### Lock线程锁

```python
import threading
from collections import deque

queue = deque()
read_lock = threading.Lock()
write_lock = threading.Lock()


def read_num():
    while True:
        read_lock.acquire()
        i = queue.popleft()
        print(f"read num {i}")
        write_lock.release()


def write_num():
    for i in range(10):
        write_lock.acquire()
        queue.append(i)
        print(f"write num {i}")
        read_lock.release()


read_thread = threading.Thread(target=read_num)
write_thread = threading.Thread(target=write_num)

if __name__ == "__main__":
    read_lock.acquire()
    read_thread.start()
    write_thread.start()
```

1. 使用Lock的acquire阻塞实现等待，通过release实现通知，这里的关键是Lock可以在其他线程release。
2. 代码中使用两把锁实现写一个读一个的效果。

### Condition条件变量

Condition条件变量专门用于处理线程同步的问题

```python
import threading
from collections import deque


queue = deque()
read_cond = threading.Condition()
write_cond = threading.Condition()


def read_num():
    while True:
        with read_cond:
            read_cond.wait()

        i = queue.popleft()
        print(f"read num {i}")

        with write_cond:
            write_cond.notify_all()


def write_num():
    for i in range(10):
        with write_cond:
            write_cond.wait()

        queue.append(i)
        print(f"write num {i}")

        with read_cond:
            read_cond.notify_all()


read_thread = threading.Thread(target=read_num)
write_thread = threading.Thread(target=write_num)

if __name__ == "__main__":
    read_thread.start()
    write_thread.start()
    with write_cond:
        write_cond.notify_all()
```

1. Condition内部存在一个_waiters队列用于存储处于阻塞状态的Lock，由于wait和notify,notify_all等需要操作_waiters资源，所以Condition内部基于RLock实现线程安全。因而当wait和notify,notify_all前都需要加锁，代码中使用with实现。

2. wait和notify的本质仍然是基于Lock的acquire阻塞，release释放的原理，但condition的好处在于维护了一个Queue，可以实现一对多的线程同步操作。

3. wait源码分析：

   ```python
   def wait(self, timeout=None):
     # 是否线程安全
     if not self._is_owned():
       raise RuntimeError("cannot wait on un-acquired lock")
   
     # 获得Lock，基于 _thread.allocate_lock()
     waiter = _allocate_lock()
     # 第一次acquire
     waiter.acquire()
     # 添加到waiters队列
     self._waiters.append(waiter)
     ...
     try:    # restore state no matter what (e.g., KeyboardInterrupt)
       if timeout is None:
         # 第二次acquire实现线程阻塞
         waiter.acquire()
         gotit = True
         else:
           if timeout > 0:
             gotit = waiter.acquire(True, timeout)
             else:
               gotit = waiter.acquire(False)
               return gotit
   ```

4. notify源码分析：

   ```python
   def notify(self, n=1):
     	# 是否线程安全
       if not self._is_owned():
           raise RuntimeError("cannot notify on un-acquired lock")
       # 拿到waiters队列并通过切片获取前n个Lock
       all_waiters = self._waiters
       waiters_to_notify = _deque(_islice(all_waiters, n))
       if not waiters_to_notify:
           return
       for waiter in waiters_to_notify:
         	# 通过Lock.release()释放锁使得之前「第二次acquire」得以执行
           waiter.release()
           try:
               all_waiters.remove(waiter)
           except ValueError:
               pass
   
   def notify_all(self):
     	# release所有Lock
       self.notify(len(self._waiters))
   ```

### Semaphore信号量

```python
import threading
import time
from collections import deque


queue = deque()
sem = threading.Semaphore(10)


def task():
    print(f"thread {threading.current_thread().ident} running ...")
    time.sleep(5)


def producer():
    for i in range(100):
        sem.acquire()
        thread = threading.Thread(target=task)
        thread.start()


producer()
```

1. Lock和Semaphore的区别在于Lock只能由一个线程acquire，而Semaphore可以由多个线程同时acquire。
2. Semaphore内部基于Condition同时维护了一个value用于计数，当acquire时value-1，release时value+1。
3. Semaphore在Condition的基础上增加了计数的功能，这里举的例子就是使用信号量控制启动的线程数量。

### Event事件

```python
import threading
import time
from collections import deque


queue = deque()
event = threading.Event()


def task():
    while True:
        event.wait()
        print(f"thread {threading.current_thread().ident} running ...")
        time.sleep(1)


for i in range(2):
    task_thread = threading.Thread(target=task)
    task_thread.start()

event.set()
print(event.is_set())
time.sleep(5)
event.clear()
print(event.is_set())
```

1. Event内部基于Condition以及wait和notify_all方法，但额外添加了一个flag用于随时触发和取消事件，更加灵活。
2. event.set() 用于触发事件，event.wait()用于监听事件。
3. event.is_set()用于查看时间是否被触发。
4. event.clear()用于清除事件。

### 综述

我们看线程同步的这几种方式本质都是基于Lock的，Lock是语言的原生机制（C语言实现），其他的Conditon，Semaphore和Event都是在Lock的基础上针对不同的场景派生而来。

## 线程池

```python
import time
import concurrent.futures


def run(ident):
    time.sleep(5)
    print(f"{ident} is running")


with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:
    executor.map(run, [1, 2, 3, 4, 5])
```

