package KWIC.PipeFilter;

import java.io.File;
import java.io.PrintWriter;

public class Output extends Filter {
	private File outputFile;
	
	public Output(Pipe inputPipe, File outputFile) {
		super(inputPipe, null); // 输出是向文件，所以这里不需要输出管道，所以为null
		this.outputFile = outputFile;
	}
	

	@Override
	protected void convert() throws Exception {
		PrintWriter writer = new PrintWriter(outputFile);
		String line = "";
		
		while ((line = inputPipe.readLine()) != null) { // 不断地向文件中写数据
			// writer.write(line + "\n");
			writer.println(line);
		}
		
		writer.flush();
		writer.close();
		
		inputPipe.closePipeInput();		
	}
}
