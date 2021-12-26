package KWIC.PipeFilter;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Scanner;

public class Client {
	public static void main(String[] args) throws IOException {
		File inputFile = new File("input.txt");
		File outputFile = new File("output.txt");
		
		// 根据设计，需要初始化三个管道，分别连接下面的四个过滤器
		Pipe pipe1 = new Pipe();
		Pipe pipe2 = new Pipe();
		Pipe pipe3 = new Pipe();
		
		// 定义设计，需要初始化四个过滤器
		Input input = new Input(inputFile, pipe1);
		Shift shift = new Shift(pipe1, pipe2);
		Sort sort = new Sort(pipe2, pipe3);
		Output output = new Output(pipe3, outputFile);
		
		input.begin();
		shift.begin();
		sort.begin();
		output.begin();
		
		FileInputStream fis = null;
		InputStreamReader isr = null;
		BufferedReader br = null;
		//FileInputStream fis2 = null;
		//InputStreamReader isr2 = null;
		//BufferedReader br2 = null;
		try {
			System.out.println("输入文件的内容如下所示：");
			
			fis = new FileInputStream(inputFile);
			isr = new InputStreamReader(fis);
			br = new BufferedReader(isr);
			
			String line = null;
			while ((line = br.readLine()) != null) {
				System.out.println(line);
			}
			System.out.println();
			Thread.sleep(3000); // 至关重要的，不然inputFile和outputFile是无法同时读取的！
			
			System.out.println("输出文件的内容如下所示：");
			/*
			fis2 = new FileInputStream(outputFile);
			isr2 = new InputStreamReader(fis2);
			br2 = new BufferedReader(isr2);
			
			System.out.println("sss");
			String line2 = null;
			while ((line2 = br2.readLine()) != null) {
				System.out.println("aa");
				// System.out.println(line);
			}
			*/
			Scanner outputSc = new Scanner(outputFile);
			while (outputSc.hasNext()) {
				System.out.println(outputSc.nextLine());
			}
			
			System.out.println();
			outputSc.close();
		} catch (Exception e) {
			e.printStackTrace();
		} finally { // 关流、释放资源的操作
			if (fis != null) {
				fis.close();
			}
			
			if (isr != null) {
				isr.close();
			}
			
			if (br != null) {
				br.close();
			}
			
			/*
			if (fis2 != null) {
				fis2.close();
			}
			
			if (isr2 != null) {
				isr2.close();
			}
			
			if (br2 != null) {
				br2.close();
			}
			*/
		}

		System.out.println("Done!");
	}
}
