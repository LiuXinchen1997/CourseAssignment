package KWIC.ObjectOrient;

import java.util.LinkedList;

public class Client {
	public static void main(String[] args) throws Exception {
		LinkedList<String> lines = null;
		
		Input infile = new Input(); // 读取外部文件中的每行句子，组成容器
		infile.input("input.txt");
		lines = infile.getList();
		
		Shift shift = new Shift(lines); // 将每个句子以单词为单位进行循环移位，并得到新的句子集合
		shift.shiftLines();
		lines = shift.getLines();
		
		Sort s = new Sort(lines); // 将句子集合进行排序
		s.sort();
		lines = s.getList();
		
		Output outfile = new Output(lines); // 将最新的有序的句子集合输出到外部文件中去
		outfile.output("output.txt");
		System.out.println("Done!");
	}
}
