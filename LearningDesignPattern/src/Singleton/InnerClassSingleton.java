package Singleton;

public class InnerClassSingleton {
	private InnerClassSingleton() {
	}
	
	private static class HolderClass {
		private final static InnerClassSingleton instance = new InnerClassSingleton();
	}
	
	public static InnerClassSingleton getInstance() {
		return HolderClass.instance;
	}
	
	public static void main(String[] args) {
		InnerClassSingleton s1, s2;
		s1 = InnerClassSingleton.getInstance();
		s2 = InnerClassSingleton.getInstance();
		System.out.println(s1 == s2);
	}
}