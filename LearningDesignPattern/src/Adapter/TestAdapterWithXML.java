package Adapter;

public class TestAdapterWithXML {
	public static void main(String[] args) throws Exception {
		ScoreOperation operation;
		
		// Class.forName内需要输入的是 完整的类路径
		operation = (ScoreOperation)XMLUtil.getBean("className");
		
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
