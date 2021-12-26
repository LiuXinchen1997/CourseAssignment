package Adapter;

public class TestProductAdapter {
	public static void main(String[] args) {
		ProductOperation operation;
		
		// Class.forName内需要输入的是 完整的类路径
		operation = (ProductOperation)XMLUtil.getBean("product"); // 通过反射获取对象
		
		Product[] products = new Product[3]; // 构建测试数据
		products[0] = new Product(15);
		products[1] = new Product(20);
		products[2] = new Product(10);
		
		int[] sortedPrices = operation.sort(products); // 使用正确的接口对测试数据进行排序
		System.out.println("经过排序之后的商品价格为:");
		display(sortedPrices);
		System.out.println();
		
		System.out.println("查找价格为15的商品的编号为:");
		System.out.println(operation.search(products, 15)); // 使用正确的接口对测试数据进行查找
	}
	
	public static void display(int[] prices) {
		for (int i = 0; i < prices.length; i++) {
			System.out.print(prices[i] + " ");
		}
		System.out.println();
	}
}



class Product {
	private int price;

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public Product(int price) {
		super();
		this.price = price;
	}
}


interface ProductOperation {
	public int[] sort(Product[] products);
	public int search(Product[] products, int price);
}

class ProductAdapter implements ProductOperation { // 商品适配器类 实现商品价格管理接口，这里商品价格管理类仅是一个接口
	private QuickSort sortObj = new QuickSort(); //商品适配器类 将快排算法类作为自己的成员对象
	private BinarySearch searchObj = new BinarySearch(); //商品适配器类 将二分查找类作为自己的成员对象
	
	@Override
	public int[] sort(Product[] products) { // 实现排序算法接口方法，这里在内部直接调用快排算法类中的排序接口
		int[] scores = new int[products.length];
		for (int i = 0; i < products.length; i++) {
			scores[i] = products[i].getPrice();
		}
		
		return sortObj.quickSort(scores); // 调用快排算法类中的排序接口
	}

	@Override
	public int search(Product[] products, int price) { // 实现查找算法接口方法，这里在内部直接调用二分查找类中的查找接口
		int[] prices = new int[products.length];
		for (int i = 0; i < products.length; i++) {
			prices[i] = products[i].getPrice();
		}
		
		return searchObj.binarySearch(prices, price); // 调用查找算法类中的查找接口
	}
}
