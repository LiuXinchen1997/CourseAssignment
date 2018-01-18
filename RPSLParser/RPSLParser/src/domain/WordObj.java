package domain;

public class WordObj {
	private int wordClass;
	private String content;
	public int getWordClass() {
		return wordClass;
	}
	public void setWordClass(int wordClass) {
		this.wordClass = wordClass;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public WordObj(int wordClass, String content) {
		super();
		this.wordClass = wordClass;
		this.content = content;
	}
	public WordObj() {
		super();
		// TODO Auto-generated constructor stub
	}
	@Override
	public String toString() {
		return "Word [wordClass=" + wordClass + ", content=" + content + "]";
	}
}
