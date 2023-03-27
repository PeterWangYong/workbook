# 代理模式与AOP开发

### 第一章 代理模式

了解 AOP 之前，首先了解代理模式。

代理模式指的是：通过代理类为原始类添加额外功能。

代理模式的好处：利于原始类的维护。

> 对于通用的额外功能，比如日志、事务等，如果硬编码在 Service 中，那么当额外功能发生了改变，所有 Service 都要修改，不利于维护。
>
> 代理的本质是构造一个代理类将原始功能和额外功能整合，而后调用代理类而非原始类，是一种非侵入式的功能扩展方式。

###第二章 静态代理模式

既然代理模式的本质是构造一个代理类整合原始功能和额外功能，那么我们就需要真的通过编码为每一个 Service 构造相应的代理类。

#### 1. 构造原始类型

- 定义 UserService 接口

  ```java
  public interface UserService {
    void login(String username, String password);
    void register(User user);
  }
  ```

- 定义 UserServiceImpl 实现类

  ```java
  @Service
  public class UserServiceImpl implements UserService {

    @Override
    public void login(String username, String password) {
      System.out.println("login succeed !");
    }

    @Override
    public void register(User user) {
      System.out.println("register succeed !");
    }
  }
  ```

#### 2. 构造代理类型

- 定义 UserServiceProxy 代理类

  ```java
  @Service
  public class UserServiceProxy implements UserService {

    @Autowired
    private UserService userServiceImpl;

    @Override
    public void login(String username, String password) {
      System.out.println("--- do something before ---");
      userServiceImpl.login(username, password);
    }

    @Override
    public void register(User user) {
      System.out.println("--- do something before ---");
      userServiceImpl.register(user);
    }
  }
  ```

#### 3. 调用代理类型

- 测试 UserServiceProxy 代理类

  ```java
  @SpringBootTest
  public class UserServiceProxyTest {

    @Autowired
    UserService userServiceProxy;

    @Test
    void loginTest() {
      userServiceProxy.login("admin", "123456");
    }

    @Test
    void registerTest() {
      userServiceProxy.register(new User());
    }
  }
  ```

静态代理是代理模式最简单直接的方式，但静态代理的问题也很多：

1. 需要手动编写代理类，文件过多不便于管理
2. 虽然不需要维护原始类，但我们需要维护代理类
3. 代理类和原始类实现同一个接口，在注入的时候需要加以区分，不利于解耦合

### 第三章 动态代理模式

由于静态代理仍然存在维护性问题，动态代理模式应运而生。

Java 中的动态代理基于“动态字节码”技术，开发者只需提供接口、实现类、额外功能以及相应额外功能在什么位置执行的配置，系统就会自动创建代理类并直接写入 JVM 虚拟机。

Java 中存在两种动态代理机制：JDK 动态代理和 CGLib 动态代理。

####1. JDK 动态代理

从静态代理的开发我们可以总结出代理开发三要素：

```markdown
1. 原始类
2. 代理类
3. 原始类和代理类实现相同的接口
```

基于这三个要素，Java 提供了 JDK 动态代理实现，接下来我们尝试使用一下。

```java
@SpringBootTest
public class JDKProxyTest {

  @Autowired
  UserService userService;

  @Test
  void mainTest() {
    InvocationHandler handler = new InvocationHandler() {
      @Override
      public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        // 这里写入额外功能
        System.out.println("--- jdk proxy before ---");
        // 这里只需要填入不同的原始类对象就可以实现不同对象的代理
        Object ret = method.invoke(userService, args);
        return ret;
      }
    };
    // JDK动态代理创建并返回了代理对象
    UserService userServiceProxy = (UserService) Proxy.newProxyInstance(JDKProxyTest.class.getClassLoader(), userService.getClass().getInterfaces(), handler);
    userServiceProxy.login("username", "123456");
  }
}
```

从代码中看，我们从始至终没有创建过代理类，但 JDK 动态代理根据我们的配置自动创建了代理类并返回了代理对象。

这里面重点关注：

```java
Proxy.newProxyInstance(ClassLoader loader,Class<?>[] interfaces,InvocationHandler h)
```

- ClassLoader loader：JVM 中需要使用类加载器创建类的 Class 对象，然后才可以 new 创建实例。默认情况下每一个类都会被分配一个 ClassLoader，由于我们是动态生成代理类，没有类文件，这里需要手动传入一个 ClassLoader，比如传入 JDKProxyTest 类的 ClassLoader。

- Class<?>[] interfaces：传入原始类实现的接口

- InvocationHandler h：通过一个 handler 实现原始方法和额外功能的定义和调用。

  ```java
  public interface InvocationHandler {
  	public Object invoke(Object proxy, Method method, Object[] args) throws Throwable;
  }
  ```

  - Object proxy：表示代理对象，可以忽略
  - Method method：原始方法
  - Object[] args：原始方法的参数

通过上述代码的编写，我们就可以为 JDK 动态代理提供必需的参数和配置用于生成代理类。

#### 2. CGLib 动态代理

代理类需要实现原始类所拥有的所有方法来迷惑调用者，要达成这个目的通常用两种方式：

- 实现相同的接口
- 继承原始类

JDK 动态代理使用的是第一种方式，需要传入原始类所实现的所有接口。

但实际上，不是所有的类都会有相应的接口定义，如果我们要代理一个没有接口的类型，那么 JDK 动态代理就无法使用了，此时 CGLib 动态代理就可以派上用场了。

CGLib 动态代理通过 extends 继承原始类的方式保证方法代理的完整性。

```java
@SpringBootTest
public class CGLibProxyTest {

  @Autowired
  UserService userService;

  @Test
  void mainTest() {

    MethodInterceptor interceptor = new MethodInterceptor() {
      @Override
      public Object intercept(Object o, Method method, Object[] args, MethodProxy methodProxy) throws Throwable {
        System.out.println("--- cglib proxy before ---");
        Object ret = method.invoke(userService, args);
        return ret;
      }
    };

    Enhancer enhancer = new Enhancer();
    enhancer.setClassLoader(CGLibProxyTest.class.getClassLoader());
    enhancer.setSuperclass(userService.getClass());
    enhancer.setCallback(interceptor);

    UserService userServiceProxy = (UserService) enhancer.create();
    userServiceProxy.login("admin", "123456");
  }
}
```

我们看到 CGLib 动态代理整个的使用方式和 JDK 动态代理差不多，除了 JDK 动态代理需要传入`userService.getClass().getInterfaces()`，而 CGLib 动态代理需要传入`userService.getClass()`。

从上述对于动态代理的描述和编码我们可以看到：

动态代理可以解决静态代理存在的维护性问题，因为整个过程中我们根本不需要创建代理类文件。

###第四章 SpringAOP 编程

AOP 叫做面向切面编程，类似的有 POP 面向过程编程，OOP 面向对象编程。

面向切面编程的定义是：以切面为基本单位的程序开发，通过切面间的彼此协同，相互调用完成程序的构建。

#### 1. 什么是切面？

类似 OOP 中我们要问什么是对象，AOP 中我们首先要明白什么是切面。

<img src="https://img2020.cnblogs.com/blog/1192583/202005/1192583-20200529223629106-999390370.png" style="float:left">

切面由**额外功能和切入点**两个部分组成，从动态代理开发中我们发现需要将额外功能添加到原始类的不同方法调用的前后，这实际上就是在定义切面的额外功能部分。

定义好了额外功能，我们要决定将额外功能添加到哪些方法上，这些需要被代理的原始方法就是**切入点**。

回过头看上面的图，比如我们需要在 UserService 类和 OrderService 类中所有方法执行前打印日志，那么我们要定义的额外功能就是打印日志，切入点就是这两个类中的所有方法。从图上看我们发现日志是一条线，但由于类对象描述的是三维空间中的一个实体，所以从三维空间来看，这些额外功能几乎就是从这些由方法构成的实体类中横切出来的一个面，在这个面上，额外功能都是一致的，而每个被切入的类方法不同。

#### 2. AOP 的底层原理

AOP 编程的本质是动态代理编程，在 SpringAOP 中默认使用 JDK 动态代理，我们也可以通过配置调整为 CGLib 动态代理。所以说 AOP 面向切面编程本质上是由代理模式开发而逐渐衍生出来的一种范式。

从上述对两种动态代理方式的编码来看，我们自己去调用动态代理底层接口开发是比较麻烦的，SpringAOP 通过对底层接口的封装降低了开发者的使用难度，这就是使用框架的好处。

#### 3. 基于注解模式开发

SpringAOP 提供了两种模式进行开发，一种是通过实现接口定义**额外功能**，然后通过配置文件定义**切入点**和组装**切面**，另一种是基于 AspectJ 提供的注解模式进行开发，可以实现在一个切面类中同时定义额外功能和切入点。

由于配置文件的模式逐渐被淘汰，本文中只介绍基于注解的开发模式。

- 引入依赖

  ```xml
  		<!-- 基于SpringBoot -->
  		<dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-aop</artifactId>
      </dependency>
  ```

- 定义原始类

  ```java
  @Service
  public class UserServiceImpl implements UserService {

    @Override
    public void login(String username, String password) {
      System.out.println("login succeed !");
    }

    @Override
    public void register(User user) {
      System.out.println("register succeed !");
    }
  }
  ```

- 定义切面类

  ```java
  @Aspect
  @Component
  public class MyAspect {
    @Around("execution(* *..UserServiceImpl.*(..))")
    public Object log(ProceedingJoinPoint joinPoint) throws Throwable {
      System.out.println("--- log before ---");
      Object ret = joinPoint.proceed();
      System.out.println("--- log after ---");
      return ret;

  }
  ```

- 测试

  ```java
  @SpringBootTest
  public class UserServiceTest {

    // 注意：这里我们虽然引用的是原始类接口，但spring已经自动为我们创建并注入了代理类对象
    @Autowired
    UserService userService;

    @Test
    void loginTest() {
      userService.login("admin", "123456");
    }

    @Test
    void registerTest() {
      userService.register(new User());
    }
  }
  ```

这里注意几个点：

- ProceedingJoinPoint joinPoint：这个很像 Method method，实际上我们定义的 log 方法最终会被用在动态代理底层接口的调用中。
- @Aspect 注解：声明切面类
- @Component 注解：Spring 在底层需要调用切面方法，这里要加入容器
- @Around 注解：当我们想要在原始方法的前、后、前后甚至异常时执行额外功能时使用该注解，这个注解和 log 方法的声明是对应的，定义了这个注解调用方才会传入 ProceedingJoinPoint joinPoint 参数。这个注解是最为强大的，其他的@Before,@After 等都是针对该注解使用方式的简化，本文暂不介绍。

#### 4. 切点表达式

在上文中的`@Around("execution(* *..UserServiceImpl.*(..))")`中"execution(xxx)"用于定义切点，execution 是切点函数，括号内是切点表达式。类似@Around 和@Before,@After 的关系，execution 也是切点函数中最强大的，相应的它的切点表达式也是功能最丰富的。

切点表达式用于描述要切入的方法声明，整体分为三部分：

![](https://img2020.cnblogs.com/blog/1192583/202005/1192583-20200529224334921-1004757171.png)

- 第一部分是方法修饰符+返回类型
- 第二部分是包名+类名+方法名
- 第三部分是参数类型

通过对这三个部分的描述我们可以唯一确定一个方法：

- `* *..UserServiceImpl.*(..)`：不管修饰符和返回值，所有包中的 UserServiceImpl 类中的所有方法

  > 前面的..表示忽略包的层级，后面的..表示不论是否有参数，不论有几个参数，不论参数类型是什么

- `* login(..)`：不管修饰符和返回值，所有包所有类中的 login 方法

- ```
  * login(String, String)：不管修饰符和返回值，所有包所有类中的存在两个参数并且类型都为String的login方法
  ```

> 由于通过切点表达式来定义切点相对比较繁琐并且不好维护，这里就不再赘述，后续推荐使用基于注解的方式来定义切点。

#### 5. 切点函数

上文中的 execution 是基于切点表达式使用的最强大的切点函数，其他的比如 args，within 都是基于 execution 的简化写法，不再赘述。

这里着重介绍一个切点函数：@annotation ， 这个函数允许我们自定义注解然后通过注解的形式定义切点，真正实现了指哪儿打哪儿的感觉。

- 自定义注解

  ```java
  @Target(ElementType.METHOD)
  @Retention(RetentionPolicy.RUNTIME)
  public @interface Tx {}
  ```

- 定义切面

  ```java
  @Aspect
  @Component
  public class MyAspect {
    @Around("@annotation(com.peter.aop.annotation.Tx)")
    public Object tx(ProceedingJoinPoint joinPoint) throws Throwable {
      System.out.println("--- tx before ---");
      Object ret = joinPoint.proceed();
      System.out.println("--- tx after ---");
      return ret;
    }
  }
  ```

- 在原始方法 login 上添加注解

  ```java
  @Service
  public class UserServiceImpl implements UserService {

    @Override
    @Tx
    public void login(String username, String password) {
      System.out.println("login succeed !");
    }

    @Override
    public void register(User user) {
      System.out.println("register succeed !");
    }
  }
  ```

- 测试

  ```java
  @SpringBootTest
  public class UserServiceTest {

    @Autowired
    UserService userService;

    // 只有login方法添加了事务Tx操作
    @Test
    void loginTest() {
      userService.login("admin", "123456");
    }

    @Test
    void registerTest() {
      userService.register(new User());
    }
  }
  ```

#### 6. Spring 工厂如何创建代理对象

在上文我写了一个注释，我们使用@Autowired 注入 Bean 的时候，Spring 给我们注入的是代理对象，那么原始对象去哪里了？Spring 如何做到自动创建代理对象的呢？

这个问题涉及到 SpringBean 的生命周期。在 SpringBean 完成初始化操作之后会调用 BeanPostProcessor 接口中的 postProcessAfterInitialization 方法（如果有实现类并加入了容器），Spring 在这里创建了动态代理对象并替换掉容器中的原始对象，所以我们拿到的也就是代理对象了。

#### 7. AOP 开发的一个坑

在 AOP 编程中，如果我们在一个代理方法中直接调用了另一个代理方法，那么实际上另一个代理方法中的额外功能是不生效的，比如：

```java
  @Override
  @Tx
  public void login(String username, String password) {
    System.out.println("login succeed !");
    this.register(new User());
  }
```

此时，register 方法不会执行额外功能。实际上这是正常的，因为这个方法是在原始方法 login 内部执行的，自然使用的是原始对象。如果想要在内部使用代理 register 方法，则需要从工厂中独立获取代理对象，然后通过代理对象执行代理方法。

```java
@Service
public class UserServiceImpl implements UserService {

  @Autowired
  private UserService userService;

  @Override
  @Tx
  public void login(String username, String password) {
    System.out.println("login succeed !");
//    this.register(new User());
    this.userService.register(new User());
  }


  @Override
  public void register(User user) {
    System.out.println("register succeed !");
  }
}
```

我们通过在原始对象中注入并调用代理对象的方式实现对代理方法的调用。

### 第五章 总结

AOP 简单说就是通过代理类为原始类添加额外功能，好处是便于原始类的维护。

AOP 是一个很重要的开发思想，既能将分散在各处的额外功能统一管理又能在需要的时候灵活的切入原始方法（切入点）组装成代理类进行功能扩展。

IOC 解决了对象间解耦的问题，AOP 解决功能间解耦的问题，两者本质上都是为了实现 OCP，高内聚低耦合。

> 源码：https://github.com/PeterWangYong/blog-code/tree/master/aop
