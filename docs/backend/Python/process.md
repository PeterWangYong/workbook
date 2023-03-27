# 进程



## 进程池

```python
import time
import concurrent.futures


def run(ident):
    time.sleep(5)
    print(f"{ident} is running")


if __name__ == "__main__":
    with concurrent.futures.ProcessPoolExecutor() as executor:
        executor.map(run, [1, 2, 3, 4, 5])
```

> 这里我们通常省略参数 workers，因为系统会自动返回 CPU 的数量作为可以调用的进程数





