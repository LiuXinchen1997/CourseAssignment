package com.PTMSystem.admin.action;

import java.util.List;

import com.PTMSystem.bean.Meal;
import com.PTMSystem.dao.MealDao;
import com.opensymphony.xwork2.ActionSupport;

public class SelectMeal extends ActionSupport {
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
	
	private List<Meal> list;
	
	public List<Meal> getList() {
		return list;
	}
	
	public void setList(List<Meal> list) {
		this.list = list;
	}
	
	@Override
	public String execute() throws Exception {
		list = new MealDao().getAll();
		
		return SUCCESS;
	}
}
