package action;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Scanner;
import java.util.regex.Pattern;

import domain.WordObj;
import utils.Keywords;
import utils.Reversedwords;
import utils.WordClass;
import utils.WordRegex;

public class LexAnalysis {
	private String file;
	
	public LexAnalysis(String filename) {
		this.file = filename;
	}
	
	public ArrayList<WordObj> operateWord(String curWord) {
		ArrayList<WordObj> objs = new ArrayList<>();

		if (Keywords.isMemberOf(curWord)) {
			if (curWord.charAt(curWord.length()-1) == ':') {
				String tmpWord = curWord.substring(0, curWord.length()-1);
				objs.add(new WordObj(WordClass.KEYWORD, tmpWord));
				objs.add(new WordObj(WordClass.COLON, ":"));
			} else {
				objs.add(new WordObj(WordClass.KEYWORD, curWord));
			}
		} else if (Reversedwords.isMemberOf(curWord)) {
			if (curWord.charAt(curWord.length()-1) == '=') {
				String tmpWord = curWord.substring(0, curWord.length()-1);
				objs.add(new WordObj(WordClass.REVERSEWORD, tmpWord));
				objs.add(new WordObj(WordClass.EQUALITY, "="));
			} else {
				objs.add(new WordObj(WordClass.REVERSEWORD, curWord));
			}
		} else if (curWord.equals(":")) {
			objs.add(new WordObj(WordClass.COLON, curWord));
		} else if (curWord.equals("=")) {
			objs.add(new WordObj(WordClass.EQUALITY, curWord));				
		} else if (curWord.equals(";")) {
			objs.add(new WordObj(WordClass.SEMICOLON, curWord));
		} else if (curWord.equals(",")) {
			objs.add(new WordObj(WordClass.COMMA, curWord));
		} else if (Pattern.matches(WordRegex.NUMBER_FORMAT, curWord)){
			objs.add(new WordObj(WordClass.NUMBER, curWord));
		} else if (Pattern.matches(WordRegex.VAR_FORMAT, curWord)) {
			objs.add(new WordObj(WordClass.VAR, curWord));
		} else {
			objs.add(new WordObj(WordClass.ERROR, ""));
		}
		
		return objs;
	}
	
	private boolean isSign(char ch) {
		for (int i = 0; i < WordRegex.SIGNS.length; i++) {
			char sign = WordRegex.SIGNS[i].charAt(0);
			
			if (ch == sign) {
				return true;
			}
		}
		
		return false;
	}
	
	
	
	public ArrayList<WordObj> analysis(String content) {
		ArrayList<WordObj> marks = new ArrayList<>();
		String[] lines = content.split("\n");
		
		L:
		for (int line_i = 0; line_i < lines.length; line_i++) {
			String curWord = lines[line_i];
			System.out.println(curWord);
			
			ArrayList<String> words = new ArrayList<>();
			int beginIndex = 0;
			for (int i = 0; i < curWord.length(); i++) {
				if (isSign(curWord.charAt(i))) {
					if (beginIndex != i) {
						words.add(curWord.substring(beginIndex, i));
					}
					words.add(""+curWord.charAt(i));
					
					beginIndex = i+1;
				} else if (!isSign(curWord.charAt(i)) && i == curWord.length()-1) {
					words.add(curWord.substring(beginIndex, i+1));
				}
			}
			
			for (String word : words) {
				ArrayList<WordObj> tmpList = operateWord(word);
				boolean flag = false;
				for (WordObj obj : tmpList) {
					if (obj.getWordClass() == WordClass.ERROR) {
						flag = true;
						break;
					}
					
					marks.add(obj);
				}
				
				if (flag) {
					System.out.println(curWord + " 词法错误！");
					break L;
				}
			}
		}
		
		return marks;
	}
	
	
	
	
	public ArrayList<WordObj> analysis() throws FileNotFoundException {
		ArrayList<WordObj> marks = new ArrayList<>();
		Scanner input = new Scanner(new File(file));
		
		L:
		while (input.hasNext()) {
			String curWord = input.next();
			System.out.println(curWord);
			
			ArrayList<String> words = new ArrayList<>();
			int beginIndex = 0;
			for (int i = 0; i < curWord.length(); i++) {
				if (isSign(curWord.charAt(i))) {
					if (beginIndex != i) {
						words.add(curWord.substring(beginIndex, i));
					}
					words.add(""+curWord.charAt(i));
					
					beginIndex = i+1;
				} else if (!isSign(curWord.charAt(i)) && i == curWord.length()-1) {
					words.add(curWord.substring(beginIndex, i+1));
				}
			}
			
			for (String word : words) {
				ArrayList<WordObj> tmpList = operateWord(word);
				boolean flag = false;
				for (WordObj obj : tmpList) {
					if (obj.getWordClass() == WordClass.ERROR) {
						flag = true;
						break;
					}
					
					marks.add(obj);
				}
				
				if (flag) {
					System.out.println(curWord + " 词法错误！");
					break L;
				}
			}
		}

		if (input != null) {			
			input.close();
		}
		
		return marks;
	}
	
	
	public static void main(String[] args) throws Exception {
		LexAnalysis la = new LexAnalysis("rpsl.txt");
		
		String curWord = "asdas;asda,sdad;;==";
		ArrayList<String> words = new ArrayList<>();
		int beginIndex = 0;
		for (int i = 0; i < curWord.length(); i++) {
			if (la.isSign(curWord.charAt(i))) {
				if (beginIndex != i) {
					words.add(curWord.substring(beginIndex, i));
				}
				words.add(""+curWord.charAt(i));
				
				beginIndex = i+1;
			}
		}
		
		for (String word: words) {
			System.out.println(word);
		}
	}
}