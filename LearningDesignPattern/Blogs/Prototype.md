# 原型模式

----------------

## 一、几点感想

1. 通过一个原型对象复制克隆出多个一模一样的对象，称之为原型模式。使用原型实例指定创建对象的种类，并且通过拷贝这些原型创建新的对象。
1. UML类图：
  ![Alt text](./1509586752215.png)
1. 典型代码实现
   具体原型类

```java
class ConcretePrototype implements Prototype
{
    private String  attr; //成员属性

    public void  setAttr(String attr)
    {
        this.attr = attr;
    }

    public String  getAttr()
    {
        return this.attr;
    }

    public Prototype  clone() //克隆方法
    {
        Prototype  prototype = new ConcretePrototype(); //创建新对象
        prototype.setAttr(this.attr);
        return prototype;
    }
}
```

客户端

```java
Prototype obj1  = new ConcretePrototype();
obj1.setAttr("Sunny");
Prototype obj2  = obj1.clone();
```

原型模式是一种“另类”的创建型模式，创建克隆对象的工厂就是原型类自身，工厂方法由克隆方法来实现。

1. 几点注意事项：
    - 在Java中，实现Cloneable接口的类中，实现clone方法时，注意一定不要使用`this.clone()`，而要去使用`super.clone()`，否则会进入死循环的。
    - Java语言提供的Cloneable接口和Serializable接口的代码非常简单，它们都是空接口，这种空接口也称为标识接口，标识接口中没有任何方法的定义，其作用是告诉JRE这些接口的实现类是否具有某个功能，如是否支持克隆、是否支持序列化等。

1. 深拷贝与浅拷贝
    - 在Java中实现深拷贝的方法：

```java
public WeeklyLog deepClone() throws  IOException, ClassNotFoundException, OptionalDataException
{
    //将对象写入流中
    ByteArrayOutputStream bao=new  ByteArrayOutputStream();
    ObjectOutputStream oos=new  ObjectOutputStream(bao);
    oos.writeObject(this);

    //将对象从流中取出
    ByteArrayInputStream bis=new ByteArrayInputStream(bao.toByteArray());
    ObjectInputStream ois=new  ObjectInputStream(bis);
    return  (WeeklyLog)ois.readObject();
}
```

1. 原型管理器：原型管理器(Prototype Manager)是将多个原型对象存储在一个集合中供客户端使用，它是一个专门负责克隆对象的工厂，其中定义了一个集合用于存储原型对象，如果需要某个原型对象的一个克隆，可以通过复制集合中对应的原型对象来获得。
  ![Alt text](./1509592422787.png)
  实现简单实现举例：

```java
//原型管理器（使用饿汉式单例实现）
class  PrototypeManager
{
    //定义一个Hashtable，用于存储原型对象
    private Hashtable ht=new Hashtable();
    private static PrototypeManager pm =  new PrototypeManager();

    //为Hashtable增加公文对象
    private  PrototypeManager()
    {
        ht.put("far",new  FAR());
        ht.put("srs",new  SRS());
    }

    //增加新的公文对象
    public void addOfficialDocument(String  key,OfficialDocument doc)
    {
        ht.put(key,doc);
    }

    //通过浅克隆获取新的公文对象
    public OfficialDocument  getOfficialDocument(String key)
    {
        return  ((OfficialDocument)ht.get(key)).clone();
    }

    public static PrototypeManager  getPrototypeManager()
    {
        return pm;
    }
}
```
