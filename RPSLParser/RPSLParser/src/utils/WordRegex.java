package utils;

import java.util.regex.Pattern;

public class WordRegex {
	public static final String NUMBER_FORMAT = "[0-9]+";
	public static final String VAR_FORMAT = "[a-zA-Z][a-zA-Z0-9:-]*";
	
	public static final String[] SIGNS = { ":", "=", ",", ";" }; // 指具有实际意义的操作符
	public static final String SIGN_FORMAT = "[:=,;]";
	
	public static final String AS_FORMAT = "AS\\d{1,4}";
	public static final String AS_SET_FORMAT = "AS\\d{1,4}:[a-zA-Z0-9-]+";
	
	public static void main(String[] args) {
		boolean res = Pattern.matches(AS_FORMAT, "AS11aa");
		System.out.println(res);
	}
}
