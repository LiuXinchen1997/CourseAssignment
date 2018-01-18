package utils;

public class Keywords {
	public static boolean isMemberOf(String word) {
		if (word.length() >= 2 && word.charAt(word.length()-1) == ':') {
			word = word.substring(0, word.length()-1);
		}
		
		for (String keyword : members) {
			if (word.equals(keyword)) {
				return true;
			}
		}
		
		return false;
	}
	
	public static final String[] members = {
		"mnt-by", "aut-num", "as-name", "descr", "country", "import", "export", 
		"member-of", "as-set", "members"
	};
}
