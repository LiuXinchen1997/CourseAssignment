package KWIC.PipeFilter;

import java.io.File;
import java.util.Scanner;

public class Input extends Filter { // 继承抽象过滤器类，作为一种输入过滤器
	private File inputFile;
	
	public Input(File file, Pipe outputPipe) { // 从上层文件中读取数据
		super(null, outputPipe); // 注意这里的上层是文件中的内容，而不是所谓管道类，所以是null
		this.inputFile = file;
	}
	
	@Override
	protected void convert() throws Exception {
		Scanner scanner = new Scanner(inputFile);
		String line = "";
		
		while (scanner.hasNextLine()) { // 读取数据后放到输出管道的缓冲区中，待下层的过滤器拿走
			line = scanner.nextLine();
			outputPipe.writeLine(line);
		}
		
		//outputPipe.closePipeInput();
		scanner.close();
	}
}