package com.PTMSystem.admin.action;

import java.util.Map;

import com.PTMSystem.bean.Admin;
import com.PTMSystem.dao.AdminDao;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

public class Login extends ActionSupport {
	
	private String username;
	private String password;
	
	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	private String info;
	
	public String getInfo() {
		return info;
	}

	public void setInfo(String info) {
		this.info = info;
	}

	@Override
	public String execute() throws Exception {
		
		AdminDao dao = new AdminDao();
		Admin admin = dao.login(username, password);

		ActionContext actionContext = ActionContext.getContext();
		Map<String, Object> session = (Map)actionContext.get("session");
		
		if (admin != null) {
			session.put("user", admin);
			info = null;
			return "success";
		} else {
			info = "用户名或密码错误~";
			return "fail";
		}
	}
}
