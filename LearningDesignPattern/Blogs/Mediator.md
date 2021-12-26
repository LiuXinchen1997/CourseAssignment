# 中介者模式

@(设计模式)

-------------

## 一、几点感想

1. **迪米特法则**：一个软件实体应该尽可能少地与其他实体发生相互作用关系。
  简单来说就是，不要和陌生人说话，只和你的直接朋友进行通信。
  朋友包括以下几种：
    - 当前对象本身(this)；
        - 以参数形式传入到当前对象方法中的对象；
        - 当前对象的成员对象；
        - 如果当前对象的成员对象是一个集合，那么集合中的元素也都是朋友；
        - 当前对象所创建的对象。
      这样做的好处就是，当一个对象状态改变的时候，不会给太多其他的对象带来影响。
      在将迪米特法则运用到系统设计中时，要注意下面的几点：在类的划分上，应当尽量创建松耦合的类，类之间的耦合度越低，就越有利于复用，一个处在松耦合中的类一旦被修改，不会对关联的类造成太大波及；在类的结构设计上，每一个类都应当尽量降低其成员变量和成员函数的访问权限；在类的设计上，只要有可能，一个类型应当设计成不变类；在对其他类的引用上，一个对象对其他对象的引用应当降到最低。

1. 中介者模式就是迪米特法则的一个典型应用。如果在一个系统中对象之间存在多对多的相互关系，我们可以将对象之间的一些交互行为从各个对象中分离出来，并集中封装在一个中介者对象中，并由该中介者进行统一协调，这样对象之间多对多的复杂关系就转化为相对简单的一对多关系。

1. 终结者模式的简单代码实现：

- 抽象中介者类：

```java
abstract class Mediator {
    protected ArrayList<Colleague> colleagues; //用于存储同事对象

    //注册方法，用于增加同事对象
    public void register(Colleague colleague) {
        colleagues.add(colleague);
    }

    //声明抽象的业务方法
    public abstract void operation();
}
```

- 具体中介者类

```java
class ConcreteMediator extends Mediator {
    //实现业务方法，封装同事之间的调用
    public void operation() {
        ......
        ((Colleague)(colleagues.get(0))).method1(); //通过中介者调用同事类的方法
        ......
    }
}
```

在operation方法中调用了同事类对象。

- 抽象同事类

```java
abstract class Colleague {
    protected Mediator mediator; //维持一个抽象中介者的引用

    public Colleague(Mediator mediator) {
         this.mediator=mediator;
    }

    public abstract void method1(); //声明自身方法，处理自己的行为

    //定义依赖方法，与中介者进行通信
    public void method2() {
         mediator.operation();
    }
}
```

- 具体同事类
  在具体同事类中去实现抽象同事类的相关方法。
