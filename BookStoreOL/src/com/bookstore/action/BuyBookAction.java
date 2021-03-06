package com.bookstore.action;

import java.io.PrintWriter;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;

import com.bookstore.dao.BookDao;
import com.bookstore.domain.Book;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

public class BuyBookAction extends ActionSupport {
	private int id;
	private Book book;
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Book getBook() {
		return book;
	}

	public void setBook(Book book) {
		this.book = book;
	}

	public String execute() throws Exception {
		// 解决乱码，用于页面输出
		HttpServletResponse response = null;
		response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=UTF-8");
		response.setCharacterEncoding("UTF-8");
		PrintWriter out = response.getWriter();
		
		ActionContext actionContext = ActionContext.getContext();
		Map<String, Object> session = (Map)actionContext.get("session");
		
		if (session.get("user") == null) {
			out.print("<script language='javascript'>alert('请您先登录！');window.location='login.jsp';</script>");
			out.flush();
			out.close();
			return null;
		}
		
		book = new BookDao().getBookById(id);
		if (book.getPrint_num() <= 0) {
			out.print("<script language='javascript'>alert('购买失败，书本余量不足！');window.location='main.jsp';</script>");
			out.flush();
			out.close();
			return null;
		}
		
		boolean res = new BookDao().buyABook(book.getId());
		if (res) {
			out.print("<script language='javascript'>alert('恭喜您，购买成功！');window.location='main.jsp';</script>");
			out.flush();
			out.close();
			return null;
		} else {
			out.print("<script language='javascript'>alert('购买失败，请重试！');window.location='main.jsp';</script>");
			out.flush();
			out.close();
			return null;
		}
	}
}