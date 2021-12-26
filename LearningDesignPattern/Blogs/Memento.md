# 备忘录模式

@(设计模式)

## 一、几点感想

1. 备忘录模式比较简单，只有三个角色——原发器、备忘录、保管员。
    - 原发器主要就是用来 保存当前状态的（当前状态自然是包括了需要备份的内容和不需要备份的内容）。原发器的职责有：1、有选择地将需要备份的内容保存到备忘录对象中进行保存。2、从保管员处获得之前 某一时刻 备忘的内容，并将当前内容撤销成之前备忘的内容。
    - 备忘录角色 就是用来存储需要备忘的内容的。
    - 保管员角色 就是用来保存之前每一时刻的备忘内容的。所以，可想而知，保管员角色内部应该是有一个专门用于存放备忘录对象的容器。保管员的职责只要有：1、接收一个新的备忘录对象，并将其加到容器中。2、获取容器中的某一备忘录对象，并将其返回出去。保管员只是起保管的作用，并不能对备忘录对象的内部数据进行操纵。

## 二、代码实现

1.备忘录角色

```java
class Memento {
    public int version;
    String state;

    public Memento(String state) {
        this.state = state;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }
}
```

2.原发器角色

```java
class Originator { //保存当前状态
    String state;

    public Memento createMemento() {
        return new Memento(state);
    }

    public void restore(Memento m) {
        this.state = m.getState();
    }

    @Override
    public String toString() {
        return state;
    }
}
```

1. 保管员角色

```java
class Caretaker {
    LinkedList<Memento> mementos = new LinkedList<>();
    int latestVersion;

    public void saveMemento(Memento m) {
        m.version = ++latestVersion;
        mementos.add(m);
    }

    public Memento get(int version) {
        for (Memento memento : mementos) {
            if (memento.version == version) {
                return memento;
            }
        }

        return null;
    }

    public Memento getLast() {
         return mementos.getLast();
    }
}
```

1. 客户端

```java
public class Demo {
    public static void main(String[] args) {
        Caretaker ct = new Caretaker();
        Originator o = new Originator();
        o.state = "state1";
        ct.saveMemento(o.createMemento());

        o.state = "state2";
        ct.saveMemento(o.createMemento());

        o.state = "state3";

        System.out.println(o);

        o.restore(ct.get(1));
        System.out.println(o);

        o.restore(ct.getLast());
        System.out.println(o);
    }
}
```
