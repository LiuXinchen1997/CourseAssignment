package com.PTMSystem.action;

import java.io.PrintWriter;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;

import com.PTMSystem.bean.BankInfo;
import com.PTMSystem.bean.User;
import com.PTMSystem.dao.BankInfoDao;
import com.PTMSystem.dao.UserDao;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

public class modifyPassword extends ActionSupport {
	private String oldPassword;
	private String newPassword;
	private String newPasswordAgain;
	
	public String getOldPassword() {
		return oldPassword;
	}

	public void setOldPassword(String oldPassword) {
		this.oldPassword = oldPassword;
	}

	public String getNewPassword() {
		return newPassword;
	}

	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}

	public String getNewPasswordAgain() {
		return newPasswordAgain;
	}

	public void setNewPasswordAgain(String newPasswordAgain) {
		this.newPasswordAgain = newPasswordAgain;
	}

	public String check() throws Exception {
		ActionContext actionContext = ActionContext.getContext();
		Map<String, Object> session = (Map)actionContext.get("session");
		
		User user = (User)session.get("user");
		if (user != null) {
			return "success";			
		} else {
			return "fail";
		}
	}
	
	@Override
	public String execute() throws Exception {
		ActionContext actionContext = ActionContext.getContext();
		Map<String, Object> session = (Map)actionContext.get("session");
		
		User user = (User)session.get("user");
		if (user == null) {
			return "fail";
		} else {
			boolean result = new UserDao().modifyPassword(user.getUsername(), oldPassword, newPassword);
			
			HttpServletResponse response = null;
			response = ServletActionContext.getResponse();
	        response.setContentType("text/html;charset=UTF-8");
	        response.setCharacterEncoding("UTF-8");
	        PrintWriter out = response.getWriter();

	        String info;
			if (result) {
				info = "修改密码成功，请重新登录！";
				session.remove("user");
				out.print("<script language='javascript'>alert('" + info + "');window.location='login.jsp';</script>");
			} else {
				info  = "修改密码失败！";
				out.print("<script language='javascript'>alert('" + info + "');window.location='message.jsp';</script>");
			}
	        out.flush();out.close();
	        return null;
		}
	}
}
