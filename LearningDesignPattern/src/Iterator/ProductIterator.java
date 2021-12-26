package Iterator;

import java.util.List;

//商品迭代器：具体迭代器
class ProductIterator implements AbstractIterator {
	private ProductList productList; // 在迭代器类中维护一个聚合类对象的引用，便于对聚合类进行各种遍历操作
	private List<Object> products;
	private int cursor1;  // 定义一个游标，用于记录正向遍历的位置
	private int cursor2;  // 定义一个游标，用于记录逆向遍历的位置
	public ProductIterator(ProductList list) {
		this.productList = list;
		this.products = productList.getObjects(); // 获取集合对象
		cursor1 = 0; //设置正向遍历游标的初始值
		cursor2 = products.size() -1; // 设置逆向遍历游标的初始值
	}
	
	// 以下是使用迭代器对聚合类的各种访问
	public void next() { // 将游标向后移动一个，用于正序遍历
		if(cursor1 < products.size()) {
			cursor1++;
		}
	}
	
	public boolean isLast() { // 判断是否是最后一个了
		return (cursor1 == products.size());
	}
	
	public void previous() { // 将游标向前移动一个，用于逆序遍历
		if (cursor2 > -1) {
			cursor2--;
		}
	}
	
	public boolean isFirst() { // 判断是否是第一个了
		return (cursor2 == -1);
	}
	
	public Object getNextItem() { // 获得下一个元素，通过游标获得
		return products.get(cursor1);
	} 
	
	public Object getPreviousItem() { // 获得上一个元素，通过游标获得
		return products.get(cursor2);
	} 	
}