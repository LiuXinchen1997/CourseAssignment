package com.oracle.ebp.util.tools;

public class StringUtils {
	/**
	 * @param flag “m”或者是“p”，用来分别到底是图片还是文字信息
	 * @param s
	 * @return
	 */
	public static int findLastNum(String flag, String s) {
		int begin;
		int end = s.length();
		for (begin = s.length()-1; begin >= 0; begin--) {
			if (!isNum(s.charAt(begin)) && !s.substring(begin, begin+1).equals(flag)) {
				end = begin;
			}
			
			if (s.substring(begin, begin+1).equals(flag)) {
				break;
			}
		}
		
		if (begin < 0) return 0;
		
		return Integer.parseInt(s.substring(begin+1, end));
	}
	
	public static boolean isNum(char a) {
		if (a >= '0' && a <= '9') {
			return true;
		}
		
		return false;
	}
}
