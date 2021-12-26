# 单例模式

@(设计模式)

----------------------

## 一、几点感想

1. 确保某一个类只有一个实例，而且自行实例化并向整个系统提供这个实例，这个类称为单例类，它提供全局访问的方法。单例模式是一种对象创建型模式。

1. 通过三步来保证TaskManager类对象的唯一性（实现一个最简单的单例模式）：
    1. 禁止类的外部直接使用new来创建对象，因此需要将TaskManager的构造函数的可见性改为private。
    `private TaskManager() {...}`
    1. 外部不能创建对象了，可以在TaskManager类的内部创建并保存这个唯一实例，需要在TaskManager类的内部定义一个静态的TaskManager类型的私有成员变量。
    `private static TaskManager tm = null;`
    1. 增加一个public静态方法getInstance用于从类的外部获取上面的唯一实例。

```java
public TaskManager getInstance() {
  if (tm == null) {
    tm = new TaskManager();
  }
  return tm;
}
```

1. 单例模式分为 懒汉式单例 和 饿汉式单例两种。以下分别采用懒汉式和饿汉式两种方式，对类A进行单例化。
  懒汉式单例

```java
class A {
  private A() {}
  private static A a = null; //先不急着创建 单例对象

  public static A getInstance() {
    if (a == null) {
      a = new A();
    }
    return a;
  }
}
```

  饿汉式单例

```java
class A {
  private A() {}
  private static A a = new A();

  public static A getInstance() {
    return a;
  }
}
```

1. 单例模式的内部类实现（集成了饿汉式和懒汉式单例模式的优点）

```java
public class InnerClassSingleton {
  private InnerClassSingleton() {
  }

  private static class HolderClass {
    private final static InnerClassSingleton instance = new InnerClassSingleton();
  }

  public static InnerClassSingleton getInstance() {
    return HolderClass.instance;
  }

  public static void main(String[] args) {
    InnerClassSingleton s1, s2;
    s1 = InnerClassSingleton.getInstance();
    s2 = InnerClassSingleton.getInstance();
    System.out.println(s1 == s2);
  }
}
```
