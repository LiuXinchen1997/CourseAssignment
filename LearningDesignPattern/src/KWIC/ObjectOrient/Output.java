package KWIC.ObjectOrient;

import java.io.BufferedWriter;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.util.LinkedList;

public class Output {
	private LinkedList<String> lines;
	
	public Output(LinkedList<String> lines) {
		this.lines = lines;
	}
	
	public void output(String outputFilePath) throws IOException {
		FileOutputStream fos = null; // 声明一系列输入流对象
		OutputStreamWriter osw = null;
		BufferedWriter bw = null;
		
		try {
			fos = new FileOutputStream(outputFilePath);
			osw = new OutputStreamWriter(fos);
			bw = new BufferedWriter(osw);
			
			for (String line : lines) { // 逐个遍历句子，并将每个句子输出到文件中去
				bw.write(line);
				bw.newLine();
				bw.flush();
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally { // 一系列的关流、释放资源的操作
			if (bw != null) {
				bw.close();
			}
			
			if (osw != null) {
				osw.close();
			}
			
			if (fos != null) {
				fos.close();
			}
		}
	}
	
	public LinkedList<String> getList() {
		return lines;
	}
	
	// 在这里的main方法可以作为测试使用
	public static void main(String[] args) throws IOException {
		LinkedList<String> lines = new LinkedList<>();
		lines.add("i love java");
		lines.add("i love programming");
		
		Output out = new Output(lines);
		out.output("output.txt");
	}
}
