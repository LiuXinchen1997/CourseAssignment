package Iterator;

import java.util.ArrayList;
import java.util.List;

//抽象聚合类
public abstract class AbstractObjectList { // 抽象聚合类
	protected List<Object> objects = new ArrayList<Object>(); // 聚合类中实际上就是维护了一个容器

	public AbstractObjectList(List<Object> objects) {
		this.objects = objects;
	}
	
	public void addObject(Object obj) { // 向聚合类中增加一个元素
		this.objects.add(obj);
	}
	
	public void removeObject(Object obj) { // 向聚合类中移除一个元素
		this.objects.remove(obj);
	}
	
	public List<Object> getObjects() { // 获取聚合类中的容器对象
		return this.objects;
	}
	
// 声明创建迭代器对象的抽象工厂方法
	public abstract AbstractIterator createIterator(); // 重点：用于创建获得相应的迭代器对象
}