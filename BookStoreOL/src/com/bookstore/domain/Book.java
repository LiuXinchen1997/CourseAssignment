package com.bookstore.domain;

public class Book {
	private int id;
	private String name;
	private String author;
	private String publishing;
	private int word_number;
	private String version;
	private int total_page;
	private int print_num;
	private String author_summary;
	private String summary;
	private String image;
	private int price;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getAuthor() {
		return author;
	}
	public void setAuthor(String author) {
		this.author = author;
	}
	public String getPublishing() {
		return publishing;
	}
	public void setPublishing(String publishing) {
		this.publishing = publishing;
	}
	public int getWord_number() {
		return word_number;
	}
	public void setWord_number(int word_number) {
		this.word_number = word_number;
	}
	public String getVersion() {
		return version;
	}
	public void setVersion(String version) {
		this.version = version;
	}
	public int getTotal_page() {
		return total_page;
	}
	public void setTotal_page(int total_page) {
		this.total_page = total_page;
	}
	public int getPrint_num() {
		return print_num;
	}
	public void setPrint_num(int print_num) {
		this.print_num = print_num;
	}
	public String getAuthor_summary() {
		return author_summary;
	}
	public void setAuthor_summary(String author_summary) {
		this.author_summary = author_summary;
	}
	public String getSummary() {
		return summary;
	}
	public void setSummary(String summary) {
		this.summary = summary;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	public int getPrice() {
		return price;
	}
	public void setPrice(int price) {
		this.price = price;
	}
	
	public Book(int id, String name, String author, String publishing, int word_number, String version, int total_page,
			int print_num, String author_summary, String summary, String image, int price) {
		super();
		this.id = id;
		this.name = name;
		this.author = author;
		this.publishing = publishing;
		this.word_number = word_number;
		this.version = version;
		this.total_page = total_page;
		this.print_num = print_num;
		this.author_summary = author_summary;
		this.summary = summary;
		this.image = image;
		this.price = price;
	}
	
	public Book() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	@Override
	public String toString() {
		return "Book [id=" + id + ", name=" + name + ", author=" + author + ", publishing=" + publishing
				+ ", word_number=" + word_number + ", version=" + version + ", total_page=" + total_page
				+ ", print_num=" + print_num + ", author_summary=" + author_summary + ", summary=" + summary
				+ ", image=" + image + ", price=" + price + "]";
	}
}
