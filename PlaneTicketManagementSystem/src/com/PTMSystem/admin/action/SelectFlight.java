package com.PTMSystem.admin.action;

import java.util.List;

import com.PTMSystem.bean.Flight;
import com.PTMSystem.dao.FlightDao;
import com.opensymphony.xwork2.ActionSupport;

public class SelectFlight extends ActionSupport {
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
	
	private List<Flight> list;

	public List<Flight> getList() {
		return list;
	}

	public void setList(List<Flight> list) {
		this.list = list;
	}
	
	@Override
	public String execute() throws Exception {
		list = new FlightDao().getList("", "");
		
		return SUCCESS;
	}
}
