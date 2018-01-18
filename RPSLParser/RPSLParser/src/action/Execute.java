package action;

import java.util.ArrayList;

import domain.WordObj;

public class Execute {
	public static void main(String[] args) throws Exception {
		LexAnalysis la = new LexAnalysis("rpsl.txt");
		ArrayList<WordObj> list = la.analysis();
		
		for (WordObj wo : list) {
			System.out.println(wo);
		}
		
		System.out.println(list.size());
		
		YaccAnalysis ya = new YaccAnalysis(list);
		ya.analysis();
	}
}
