package KWIC.PipeFilter;

import java.util.LinkedList;

public class Shift extends Filter {
	private LinkedList<String> shiftedLines = new LinkedList<>(); // 用于存放一个句子转移之后得到的句子族

	public Shift(Pipe inputPipe, Pipe outputPipe) {
		super(inputPipe, outputPipe);
	}

	@Override
	protected void convert() throws Exception {
		shiftedLines.clear();
		String line = "";
		
		while ((line = inputPipe.readLine()) != null) { // 从上层管道的输出缓冲区中不断读取数据
			shiftALine(line); // 并对句子进行以为操作
			
			for (int i = 0; i < shiftedLines.size(); i++) {
				outputPipe.writeLine(shiftedLines.get(i)); // 向输出管道不断写数据
			}
			
			shiftedLines.clear();
			line = "";
		}
		
		inputPipe.closePipeInput();
		outputPipe.closePipeOutput();
	}
	
	private void shiftALine(String line) { // 对一行句子进行单词以为操作，形成新的句子集合
		String[] ws = line.split(" ");
		LinkedList<String> words = new LinkedList<>();
		for (String w : ws) {
			words.add(w);
		}
		
		for (int i = 1; i <= words.size(); i++) {
			String newLine = String.join(" ", words);
			shiftedLines.add(newLine);
			
			words.add(words.get(0));
			words.remove(0);
		}
	}
}
