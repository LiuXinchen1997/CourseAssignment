package com.bookstore.action;

import java.util.Map;

import org.apache.struts2.interceptor.SessionAware;

import com.opensymphony.xwork2.ActionSupport;

public class CustomerLogout extends ActionSupport implements SessionAware {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private Map<String, Object> session;
	
	public Map<String, Object> getSession() {
		return session;
	}

	public void setSession(Map<String, Object> session) {
		this.session = session;
	}

	@Override
	public String execute() throws Exception {
		if (session.get("user") != null) {
			session.remove("user");
		}
		
		return "success";
	}
	
	private boolean isEmpty(String str) {
		if (str == null || str.length() == 0) {
			return true;
		}
		
		return false;
	}
}
