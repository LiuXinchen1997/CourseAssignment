package Iterator;

import java.util.*;

public class Client {
	public static void main(String args[]) {
		List<Object> products = new ArrayList<>();
		products.add("1号产品");
		products.add("2号产品");
		products.add("3号产品");
		products.add("4号产品");
		products.add("5号产品");
		products.add("6号产品");
		AbstractObjectList list;
		AbstractIterator iterator;
		list = new ProductList(products); //创建聚合类对象
		iterator = list.createIterator(); //创建迭代器对象
		// 下面使用创建的迭代器对象对聚合类进行便利访问
		System.out.println("正向遍历：");
		while(!iterator.isLast()) {
			System.out.println(iterator.getNextItem());
			iterator.next();
		}
		System.out.println();	
		System.out.println("*************************");
		System.out.println("逆向遍历：");
		while(!iterator.isFirst()) {
			System.out.println(iterator.getPreviousItem());
			iterator.previous();
		}
	}
}
