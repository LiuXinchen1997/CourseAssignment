package KWIC.ObjectOrient;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.LinkedList;

public class Input {
	private LinkedList<String> lines;
	
	public Input() {
		this.lines = new LinkedList<String>();
	}
	
	public void input(String inputFilePath) throws IOException { //最主要方法，对文件进行读取
		
		// 声明一系列输入流对象
		FileInputStream fis = null;
		InputStreamReader isr = null;
		BufferedReader br = null;
		
		try {
			fis = new FileInputStream(inputFilePath);
			isr = new InputStreamReader(fis);
			br = new BufferedReader(isr);
			
			String line;
			while ((line = br.readLine()) != null) { // 按行依次读取文件中的句子
				System.out.println(line);
				lines.add(line); // 并将其放到文件中去
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {  // 一系列的关流、释放资源的操作
			if (br != null) {
				br.close();
			}
			
			if (isr != null) {
				isr.close();
			}
			
			if (fis != null) {
				fis.close();
			}
		}
	}
	
	public LinkedList<String> getList() {
		return lines;
	}
	
	// 在这里的main方法可以作为测试使用
	public static void main(String[] args) throws IOException {
		Input in = new Input();
		in.input("input.txt");
	}
}
