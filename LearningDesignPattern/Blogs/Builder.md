# 建造者模式

-------------

## 一、几点感悟

1. 建造者模式为客户端返回的是一个由多个部件组成的复杂产品。比如如何将一系列零件组装成一辆完整的汽车，就是建造者模式需要解决的问题。

1. 建造者模式一步一步创建一个复杂的对象，它允许用户只通过指定复杂对象的类型和内容就可以构建它们，用户不需要知道内部的具体构建细节。

1. UML类图及关系如下所示:
  ![Alt text](./1508764239671.png)
    - Builder（抽象建造者）：它为创建一个产品Product对象的各个部件指定抽象接口，在该接口中一般声明两类方法，一类方法是`buildPartX()`，它们用于创建复杂对象的各个部件；另一类方法是`getResult()`，它们用于返回复杂对象。Builder既可以是抽象类，也可以是接口。
    - Product（产品角色）：它是被构建的复杂对象，包含多个组成部件，具体建造者创建该产品的内部表示并定义它的装配过程。
    - Director（指挥者）：指挥者又称为导演类，它负责安排复杂对象的建造次序，指挥者与抽象建造者之间存在关联关系，可以在其`construct()`建造方法中调用建造者对象的部件构造与装配方法，完成复杂对象的建造。**客户端一般只需要与指挥者进行交互，在客户端确定具体建造者的类型，并实例化具体建造者对象**（也可以通过配置文件和反射机制），然后通过指挥者类的构造函数或者Setter方法将该对象传入指挥者类中。

1. 客户端只需要知道具体建造者的类型，即可通过指挥者类调用建造者的相关方法，返回一个完整的产品对象。

```java
class Product  {
       private  String partA; //定义部件，部件可以是任意类型，包括值类型和引用类型
       private  String partB;
       private  String partC;
       //partA的Getter方法和Setter方法省略
       //partB的Getter方法和Setter方法省略
       //partC的Getter方法和Setter方法省略
}

abstract class Builder {
     //创建产品对象
       protected  Product product = new Product();

       public  abstract void buildPartA(); // 对产品的局部A进行构建
       public  abstract void buildPartB();
       public  abstract void buildPartC();

      //返回产品对象
       public  Product getResult() {
              return  product;
       }
}

// 指挥者类
class Director {
       private  Builder builder;

       public  Director(Builder builder) {
              this.builder=builder;
       }

       public  void setBuilder(Builder builder) {
              this.builder=builer;
       }

     //产品构建与组装方法
       public Product construct() {
              builder.buildPartA(); // 在这里可以控制产品构建的顺序
              builder.buildPartB();
              builder.buildPartC();
              return builder.getResult();
       }
}
```

客户端代码：

```java
......
Builder  builder = new ConcreteBuilder(); //可通过配置文件实现，生成不同的建造者类
Director director = new  Director(builder); //注入到指挥者类中
Product product = director.construct();
......
```

1. 与抽象工厂模式的区别
  建造者模式返回一个完整的复杂产品，而抽象工厂模式返回一系列相关的产品。
  如果将抽象工厂模式看成一个汽车配件生产厂，生成不同类型的汽车配件，那么建造者模式就是一个汽车组装厂，通过对配件进行组装返回一辆完整的汽车。

## 二、应用案例

1. UML类图
  ![Alt text](./1508912573790.png)
  ActorController充当指挥者，ActorBuilder充当抽象建造者，HeroBuilder、AngelBuilder和DevilBuilder充当具体建造者，Actor充当复杂产品。

## 三、Director类的拓展

1. 可以省略 Direct。为了简化结构，可以将Director和抽象构造者Builder进行合并，在Builder中提供逐步构建复杂对象的construct()方法。
  所以ActorBuilder的写法有以下两种形式：

```java
abstract class ActorBuilder
{
       protected static Actor actor = new  Actor();

       public  abstract void buildType();
       public  abstract void buildSex();
       public  abstract void buildFace();
       public  abstract void buildCostume();
       public  abstract void buildHairstyle();

       public static Actor  construct(ActorBuilder ab)
       {
              ab.buildType();
              ab.buildSex();
              ab.buildFace();
              ab.buildCostume();
              ab.buildHairstyle();
              return actor;
       }
}
```

```java
abstract class ActorBuilder
{
       protected  Actor actor = new Actor();

       public  abstract void buildType();
       public  abstract void buildSex();
       public  abstract void buildFace();
       public  abstract void buildCostume();
       public  abstract void buildHairstyle();

       public Actor construct()
       {
              this.buildType();
              this.buildSex();
              this.buildFace();
              this.buildCostume();
              this.buildHairstyle();
              return actor;
       }
}
```

但是如果AbstractBuilder类本身就很复杂时，就不应该再将construct方法引入其中了，因为这会过分增加AbstractBuilder类的职责，不符合单一职责原则。所以最好还是引入Director类会比较好。

1. 钩子方法的引入。建造者模式除了逐步构建一个复杂产品对象外，还可以通过Director类来更加精细地控制产品的创建过程，例如增加一类称之为钩子方法(HookMethod)的特殊方法来控制是否对某个buildPartX()的调用。
  钩子方法的返回类型通常为boolean类型，方法名一般为isXXX()，钩子方法定义在抽象建造者类中。
