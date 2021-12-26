package KWIC.PipeFilter;

import java.io.IOException;
import java.io.PipedReader;
import java.io.PipedWriter;
import java.io.PrintWriter;
import java.util.Scanner;

public class Pipe {
	private Scanner pipeInput; //管道输入
	private PrintWriter pipeOutput; //管道输出
	
	public Pipe() {
		PipedWriter pw = new PipedWriter();
		PipedReader pr = new PipedReader();
		
		try {
			pw.connect(pr);
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		pipeInput = new Scanner(pr);
		pipeOutput = new PrintWriter(pw);
	}
	
	public String readLine() { // 不停地读取管道输入缓冲区中的数据
		if (pipeInput.hasNextLine()) {
			return pipeInput.nextLine();
		} else {
			return null;
		}
	}
	
	public void writeLine(String line) { // 写到管道字符输入流中去，供别人读
		pipeOutput.println(line);
	}
	
	public void closePipeInput() {
		pipeInput.close();
	}
	
	public void closePipeOutput() {
		pipeOutput.flush();
		pipeOutput.close();
	}
}
