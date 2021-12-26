# 适配器模式

@(设计模式)

-------------------

## 一、几点感想

1. 通过适配器来协调这两个原本不兼容的结构。
  **对象适配器**的实现 UML类图结构如下所示：![Alt text](./1508755510747.png)
    - Target（目标抽象类）：目标抽象类定义客户所需接口，可以是一个抽象类或接口，也可以是具体类。
    - Adapter（适配器类）：适配器可以调用另一个接口，作为一个转换器，对Adaptee和Target进行适配，适配器类是适配器模式的核心，在对象适配器中，它通过继承Target并关联一个Adaptee对象使二者产生联系。
    - Adaptee（适配者类）：适配者即被适配的角色，它定义了一个已经存在的接口，这个接口需要适配，适配者类一般是一个具体类，包含了客户希望使用的业务方法，在某些情况下可能没有适配者类的源代码。
    - 总结来说就是：Adaptee类就是被适配的类，也就是说这个类的代码一般都是已经存在的，但是接口不符合我们要使用的要求，即功能都实现好了，但是因为接口问题，我们还用不了。而Target类就是客户需要使用的接口，也就是目标接口，也就是我们能够使用的接口。所以这时，Adapter类的作用就是将 Adaptee类接口转化为Target类接口。

1. 在适配器模式中，我们通过增加一个新的适配器类来解决接口不兼容的问题，使得原本没有任何关系的类可以协同工作。
  根据适配器类与适配者类的关系不同，适配器模式可分为对象适配器和类适配器两种。
    - 在对象适配器模式中，适配器与适配者之间是关联关系；
    - 在类适配器模式中，适配器与适配者之间是继承（或实现）关系。在实际开发中，对象适配器的使用频率更高，**以上的类图就是对象适配器的实现**。

1. 对象适配器模式的 进一步阐释：根据对象适配器模式结构图，在对象适配器中，客户端需要调用`request()`方法，而适配者类Adaptee没有该方法，但是它所提供的`specificRequest()`方法却是客户端所需要的。为了使客户端能够使用适配者类，需要提供一个包装类Adapter，即适配器类。这个包装类包装了一个适配者的实例，从而将客户端与适配者衔接起来，在适配器的`request()`方法中调用适配者的`specificRequest()`方法。因为适配器类与适配者类是关联关系（也可称之为委派关系），所以这种适配器模式称为对象适配器模式。

1. 对象适配器 简单的伪代码实现：

```java
class Adapter extends Target {
    private Adaptee adaptee; //维持一个对适配者对象的引用

    public Adapter(Adaptee adaptee) {
        this.adaptee=adaptee;
    }

    public void request() {
        adaptee.specificRequest(); //转发调用
    }
}
```

## 二、对象适配器 应用案例

1. **案例描述**
  之前有一个已经写好的算法库（包括快速排序和二分查找算法），现在需要开发一个教务系统的成绩管理子系统，能够对学生的成绩进行排序与查找操作。原算法库代码是现成的，现在分数管理系统所调用的接口也是规定好的（面向接口编程）。所以，现在要做的唯一一件事情就是 使用 对象适配器 对两者进行适配。

1. **UML类图**
  ![Alt text](./1508757339993.png)

1. **解决方案**

```java
//抽象成绩操作类：目标接口
interface ScoreOperation {
    public int[] sort(int array[]); //成绩排序
    public int search(int array[],int key); //成绩查找
}

//快速排序类：适配者
class QuickSort {
    public int[] quickSort(int array[]) {
        sort(array, 0, array.length-1);
        return array;
    }

    public void sort(int array[],int p, int r) {
        int q = 0;
        if (p < r) {
            q = partition(array, p, r);
            sort(array, p, q-1);
            sort(array, q+1, r);
        }
    }

    public int partition(int[] a, int p, int r) {
        int x = a[r];
        int j = p - 1;
        for (int i = p; i <= r - 1; i++) {
            if (a[i]<=x) {
                j++;
                swap(a, j, i);
            }
        }
        swap(a, j+1, r);
        return j + 1;
    }

    public void swap(int[] a, int i, int j) {
        int t = a[i];
        a[i] = a[j];
        a[j] = t;
    }
}

//二分查找类：适配者
class BinarySearch {
    public int binarySearch(int array[],int key) {
        int low = 0;
        int high = array.length -1;
        while(low <= high) {
            int mid = (low + high) / 2;
            int midVal = array[mid];
            if(midVal < key) {
                low = mid +1;
            }
            else if (midVal > key) {
                high = mid -1;
            }
            else {
                 return 1; //找到元素返回1  
            }
        }
        return -1;  //未找到元素返回-1
    }
}

//操作适配器：适配器
class OperationAdapter implements ScoreOperation {
    private QuickSort sortObj; //定义适配者QuickSort对象
    private BinarySearch searchObj; //定义适配者BinarySearch对象

    public OperationAdapter() {
        sortObj = new QuickSort();
        searchObj = new BinarySearch();
    }

    public int[] sort(int array[]) {
         return sortObj.quickSort(array); //调用适配者类QuickSort的排序方法
    }

    public int search(int array[],int key) {
        return searchObj.binarySearch(array,key);
        //调用适配者类BinarySearch的查找方法
    }
}
```

1. **案例拓展**
   接下来可以将配置信息放到xml文件中，通过读取xml文件，并使用Java的反射机制来创建适配器对象。
   引入XML工具类：

```java
package Adapter;

import javax.xml.parsers.*;
import org.w3c.dom.*;
import org.xml.sax.SAXException;
import java.io.*;
public class XMLUtil {
//该方法用于从XML配置文件中提取具体类类名，并返回一个实例对象
    public static Object getBean() {
        try {
            //创建文档对象
            DocumentBuilderFactory dFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder builder = dFactory.newDocumentBuilder();
            Document doc;
            doc = builder.parse(new File("F:\\Code\\Java\\EclipseWorkspace\\DesignPattern\\src\\Adapter\\config.xml"));

            //获取包含类名的文本节点
            NodeList nl = doc.getElementsByTagName("className");
            Node classNode=nl.item(0).getFirstChild();
            String cName=classNode.getNodeValue();

            //通过类名生成实例对象并将其返回
            Class c = Class.forName(cName);
            Object obj = c.newInstance();
            return obj;
        }
        catch(Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
```

引入XML文件：

```xml
<?xml version="1.0"?>
<config>
     <className>OperationAdapter</className>
</config>
```

最后编写客户类 用来调用所生成的适配器对象：

```java
public class TestAdapterWithXML {
    public static void main(String[] args) throws Exception {
        ScoreOperation operation;

        // Class.forName内需要输入的是 完整的类路径
        operation = (ScoreOperation)XMLUtil.getBean();

        int[] score = {3,2,6,1,9,5};
        operation.sort(score);
        display(score);
    }

    public static void display(int[] a) {
        if (a == null) return;

        for (int i = 0; i < a.length; i++) {
            System.out.print(a[i] + " ");
        }
        System.out.println();
    }
}
```

## 三、其他种类适配器 的几点遐想

1. 类适配器模式和对象适配器模式最大的区别在于适配器和适配者之间的关系不同，对象适配器模式中适配器和适配者之间是关联关系，而类适配器模式中适配器和适配者是继承关系。
  ![Alt text](./1508763145257.png)

1. 根据类适配器模式结构图，适配器类实现了抽象目标类接口Target，并继承了适配者类，在适配器类的`request()`方法中调用所继承的适配者类的`specificRequest()`方法，实现了适配。

```java
class Adapter extends Adaptee implements Target {
    public void request() {
        specificRequest();
    }
}
```

1. 双向适配器：在对象适配器的使用过程中，如果在适配器中同时包含对目标类和适配者类的引用，适配者可以通过它调用目标类中的方法，目标类也可以通过它调用适配者类中的方法，那么该适配器就是一个双向适配器。
  在这种时候，Target类和Adaptee类已经没有什么区别了，本质上来说两者是完全一样的了，相互适配对方。
  ![Alt text](./1508763411902.png)

```java
class Adapter implements Target,Adaptee {
    //同时维持对抽象目标类和适配者的引用
    private Target target;
    private Adaptee adaptee;

    public Adapter(Target target) {
        this.target = target;
    }

    public Adapter(Adaptee adaptee) {
        this.adaptee = adaptee;
    }

    public void request() {
        adaptee.specificRequest();
    }

    public void specificRequest() {
        target.request();
    }
}
```

实际过程中，很少使用双向适配器。

1. 缺省适配器：当不需要实现一个接口所提供的所有方法时，可先设计一个抽象类实现该接口，并为接口中每个方法提供一个默认实现（空方法），那么该抽象类的子类可以选择性地覆盖父类的某些方法来实现需求，它适用于不想使用一个接口中的所有方法的情况，又称为单接口适配器模式。
  ![Alt text](./1508763652928.png)

## 四、总结与体会

1. 适配器模式常作为一种补偿模式，或者说是一个“补救模式”。

## 五、参考文献

[1] 设计模式 刘伟 CSDN博客
[2] 设计模式之禅[M].
