package KWIC.ObjectOrient;

import java.util.LinkedList;

public class Shift {
	private LinkedList<String> lines;
	
	public Shift(LinkedList<String> lines) {
		this.lines = lines;
	}
	
	public void shiftLines() { // 将句子以单词为单位进行循环移位
		LinkedList<String> shiftedLines = new LinkedList<>();
		for (int i = 0; i < lines.size(); i++) { // 遍历容器类中的所有句子
			String line = lines.get(i);
			shiftedLines.add(line);
			
			String[] words = line.split(" "); // 将句子进行按空格分词操作
			LinkedList<String> ws = new LinkedList<>(); // 构建由单词组成的容器
			for (int j = 0; j < words.length; j++) {
				ws.add(words[j]);
			}
			
			for (int j = 0; j < words.length - 1; j++) { // 在容器中对单词进行模拟循环移位
				String firstWord = ws.get(0);
				ws.add(firstWord);
				ws.remove(0);
				
				String newLine = String.join(" ", ws); // 每移位一次后，就将所有的单词以空格串起来，构成新的句子
				shiftedLines.add(newLine); // 并将新的句子加入到容器中
			}
		}
		
		lines = shiftedLines;
	}
	
	public LinkedList<String> getLines() {
		return lines;
	}
	
	// 在这里的main方法可以作为测试使用
	public static void main(String[] args) {
		LinkedList<String> list = new LinkedList<>();
		list.add("hello world");
		list.add("I am a man");
		
		Shift s = new Shift(list);
		s.shiftLines();
		
		list = s.getLines();
		for (int i = 0; i < list.size(); i++) {
			System.out.println(list.get(i));
		}
	}
}
