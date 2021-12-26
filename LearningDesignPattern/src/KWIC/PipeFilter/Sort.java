package KWIC.PipeFilter;

import java.util.Collections;
import java.util.LinkedList;

public class Sort extends Filter {
	private LinkedList<String> lines = new LinkedList<>();
	
	public Sort(Pipe inputPipe, Pipe outputPipe) {
		super(inputPipe, outputPipe);
	}

	@Override
	protected void convert() throws Exception {
		String line = null;
		
		while ((line = inputPipe.readLine()) != null) { // 从上层输入管道不断读数据
			lines.add(line);
		}
		
		Collections.sort(lines); // 对读到的数据进行排序操作
		
		for (String l : lines) {
			outputPipe.writeLine(l); // 将数据写道下层管道中去
		}
		
		inputPipe.closePipeInput();
		outputPipe.closePipeOutput();		
	}
}
