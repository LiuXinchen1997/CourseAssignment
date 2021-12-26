package Singleton;

public class Singleton1 {
	public static void main(String[] args) {
		TaskManager tm = TaskManager.getInstance();
		TaskManager tm2 = TaskManager.getInstance();
		
		System.out.println(tm == tm2 ? "Singleton!" : "Not singleton!");
	}
}

class TaskManager { // 将其设计为是单例类
	private static String name;
	
	{
		name = "taskManager";
	}
	
	// Step 1
	private TaskManager() {
	}
	
	// Step 2
	private static TaskManager tm = null;
	
	// Step 3
	public static TaskManager getInstance() {
		if (tm == null) {
			tm = new TaskManager();
			System.out.println("First constructed! " + "Name: " + name);
		}
		
		return tm;
	}
}