package com.PTMSystem.admin.action;

import java.util.List;

import com.PTMSystem.bean.Insurance;
import com.PTMSystem.dao.InsuranceDao;
import com.opensymphony.xwork2.ActionSupport;

public class SelectInsurance extends ActionSupport {
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
	
	private List<Insurance> list;

	public List<Insurance> getList() {
		return list;
	}

	public void setList(List<Insurance> list) {
		this.list = list;
	}
	
	@Override
	public String execute() throws Exception {
		list = new InsuranceDao().getAll();
		
		return SUCCESS;
	}
}
