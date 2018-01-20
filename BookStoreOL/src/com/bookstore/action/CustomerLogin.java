package com.bookstore.action;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;

import com.bookstore.dao.UserDao;
import com.bookstore.domain.User;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

public class CustomerLogin extends ActionSupport {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private String username;
	private String password;
	private String verifyCode;
	
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
	
	public String getVerifyCode() {
		return verifyCode;
	}
	public void setVerifyCode(String verifyCode) {
		this.verifyCode = verifyCode;
	}
	
	@Override
	public String execute() throws Exception {
		// System.out.println(username);
		// System.out.println(password);
		if (isEmpty(username) || isEmpty(password)) {
			info = "";
			System.out.println("asasdad");
			return "fail";
		}
		
		UserDao dao = new UserDao();
		User user = dao.customerLogin(username, password);
		
		ActionContext actionContext = ActionContext.getContext();
		Map<String, Object> session = (Map)actionContext.get("session");
		
		if (user != null) {
			String code = (String)session.get("verifyCode");
			if (isEmpty(code)) {
				info = "";
				return "fail";
			}
			
			if (!code.equals(verifyCode)) {
				info = "验证码错误！";
				return "fail";
			}
			
			session.put("user", user);
			info = null;
			return "success";
		} else {
			info = "用户名或密码错误!";
			return "fail";
		}
	}
	
	private boolean isEmpty(String str) {
		if (str == null || str.length() == 0) {
			return true;
		}
		
		return false;
	}
}
