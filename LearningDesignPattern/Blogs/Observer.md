# 观察者模式

@(设计模式)

----------------

## 一、几点感想

1. 观察目标和观察者。观察目标的状态/属性等发生改变时，其对应的观察者的状态/属性/行为等也需要发生改变。这就是 观察者模式。
1. 一个观察目标可以对应多个观察者，而且这些观察者之间可以没有任何相互联系，可以根据需要增加和删除观察者，使得系统更易于扩展。
1. 观察者模式中几种角色：
    - 目标角色：被观察的角色。在类的内部定义了一个观察者角色的集合，提供了一系列方法用于增加和删除对其观察的 观察者角色。当然其内部也有一个notify方法用于通知对其观察的每一个观察者。
    - 观察者角色：对观察目标角色的改变做出反应。其内部有update方法用于编写 更新数据啦等 做出反应的行为。
    - 具体观察者类：在具体观察者中维护一个**指向具体目标对象的引用**，它存储具体观察者的有关状态，这些状态需要和具体目标的状态保持一致；它实现了在抽象观察者Observer中定义的`update()`方法。通常在实现时，可以调用具体目标类的`attach()`方法将自己添加到目标类的集合中或通过`detach()`方法将自己从目标类的集合中删除。
    - 在ConcreteObserver与ConcreteSubject之间有时候还存在关联或依赖关系，在ConcreteObserver中定义一个ConcreteSubject实例，通过该实例获取存储在ConcreteSubject中的状态。如果ConcreteObserver的`update()`方法不需要使用到ConcreteSubject中的状态属性，则可以对观察者模式的标准结构进行简化，在具体观察者ConcreteObserver和具体目标ConcreteSubject之间无须维持对象引用。
    - 以上在具体类之间建立 关联/依赖 会非常大地破坏开闭原则。当新增一个具体目标类的时候，需要修改原有的观察者类的代码。但是如果原有的观察者类无需关联新增的具体目标类，则系统的扩展性是不受影响的。

```java
//一点代码
//抽象目标类
import java.util.*;
abstract class Subject {
    //定义一个观察者集合用于存储所有观察者对象
protected ArrayList observers<Observer> = new ArrayList();

//注册方法，用于向观察者集合中增加一个观察者
    public void attach(Observer observer) {
    observers.add(observer);
}

    //注销方法，用于在观察者集合中删除一个观察者
    public void detach(Observer observer) {
    observers.remove(observer);
}

    //声明抽象通知方法
    public abstract void notify();
}

//具体目标类
class ConcreteSubject extends Subject {
    //实现通知方法
    public void notify() {
        //遍历观察者集合，调用每一个观察者的响应方法
        for(Object obs:observers) {
            ((Observer)obs).update();
        }
    }
}

//抽象观察者类
interface Observer {
    //声明响应方法
    public void update();
}

//具体观察者类
class ConcreteObserver implements Observer {
    //实现响应方法
    public void update() {
        //具体响应代码
    }
}
```

## 二、模式的应用

1. 观察者模式应用非常广泛，我们所熟知的 Java中的 GUI框架awt等的事件模型就是基于观察者模式的。
  在DEM模型中，目标角色（如界面组件）负责发布事件，而观察者角色（事件处理者）可以向目标订阅它所感兴趣的事件。当一个具体目标产生一个事件时，它将通知所有订阅者。事件的发布者称为事件源(Event Source)，而订阅者称为事件监听器(Event Listener)，在这个过程中还可以通过事件对象(Event Object)来传递与事件相关的信息，可以在事件监听者的实现类中实现事件处理，因此事件监听对象又可以称为事件处理对象。事件源对象、事件监听对象（事件处理对象）和事件对象构成了Java事件处理模型的三要素。事件源对象充当观察目标，而事件监听对象充当观察者。以按钮点击事件为例，其事件处理流程如下：
    - 如果用户在GUI中单击一个按钮，将触发一个事件（如ActionEvent类型的动作事件），JVM将产生一个相应的ActionEvent类型的事件对象，在该事件对象中包含了有关事件和事件源的信息，此时按钮是事件源对象；
    - 将ActionEvent事件对象传递给事件监听对象（事件处理对象），JDK提供了专门用于处理ActionEvent事件的接口ActionListener，开发人员需提供一个ActionListener的实现类（如MyActionHandler），实现在ActionListener接口中声明的抽象事件处理方法`actionPerformed()`，对所发生事件做出相应的处理；
    - 开发人员将ActionListener接口的实现类（如MyActionHandler）对象注册到按钮中，可以通过按钮类的`addActionListener()`方法来实现注册；
    - JVM在触发事件时将调用按钮的`fireXXX()`方法，在该方法内部将调用注册到按钮中的事件处理对象的`actionPerformed()`方法，实现对事件的处理。
