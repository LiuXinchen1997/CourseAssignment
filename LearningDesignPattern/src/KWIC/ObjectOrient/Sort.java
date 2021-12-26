package KWIC.ObjectOrient;

import java.util.Collections;
import java.util.LinkedList;

public class Sort {
	private LinkedList<String> lines;
	
	public Sort(LinkedList<String> lines) {
		this.lines = lines;
	}
	
	public void sort() {
		Collections.sort(lines); // 直接使用Java的函数库对容器进行排序即可
	}
	
	public LinkedList<String> getList() {
		return lines;
	}
	
	// 在这里的main方法可以作为测试使用
	public static void main(String[] args) {
		LinkedList<String> lines = new LinkedList<>();
		lines.add("i am a student");
		lines.add("hello world");
		lines.add("i love java");
		
		Sort s = new Sort(lines);
		s.sort();
		
		LinkedList<String> list = s.getList();
		for (String sss : list) {
			System.out.println(sss);
		}
	}
}