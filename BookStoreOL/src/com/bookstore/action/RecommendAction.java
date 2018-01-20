package com.bookstore.action;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Random;

import com.bookstore.dao.BookDao;
import com.bookstore.domain.Book;
import com.opensymphony.xwork2.ActionSupport;


public class RecommendAction extends ActionSupport {
	private ArrayList<Book> books = new ArrayList<Book>();	

	public String execute() throws Exception {
		ArrayList<Book> list = new BookDao().getAllBooks();
		
		int number = 4;
		if (list.size() < number) {
			number = list.size();
		}
		
		//随机选择 number 本
		HashSet<Integer> indexes = new HashSet<>();
		
		while (indexes.size() != number) {
			indexes.add(new Random().nextInt(list.size()));
		}
		
		for (Integer index : indexes) {
			books.add(list.get(index));
		}
		
		return "success";
	}

	public ArrayList<Book> getBooks() {
		return books;
	}

	public void setBooks(ArrayList<Book> books) {
		this.books = books;
	}
}
