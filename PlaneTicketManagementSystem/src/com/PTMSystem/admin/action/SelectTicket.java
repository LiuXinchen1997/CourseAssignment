package com.PTMSystem.admin.action;

import java.util.List;

import com.PTMSystem.bean.Meal;
import com.PTMSystem.bean.Ticket;
import com.PTMSystem.dao.MealDao;
import com.PTMSystem.dao.TicketDao;
import com.opensymphony.xwork2.ActionSupport;

public class SelectTicket extends ActionSupport {
	private String method;
	
	public String getMethod() {
		return method;
	}
	
	public void setMethod(String method) {
		this.method = method;
	}
	
	private String keyword;
	
	public String getKeyword() {
		return keyword;
	}
	
	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}
	
	private List<Ticket> list;
	
	public List<Ticket> getList() {
		return list;
	}
	
	public void setList(List<Ticket> list) {
		this.list = list;
	}
	
	@Override
	public String execute() throws Exception {
		list = new TicketDao().getAll();
		
		return SUCCESS;
	}
}
