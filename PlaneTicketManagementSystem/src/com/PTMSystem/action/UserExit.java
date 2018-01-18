package com.PTMSystem.action;

import java.io.PrintWriter;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;

import com.PTMSystem.bean.User;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

public class UserExit extends ActionSupport {
	@Override
	public String execute() throws Exception {
		HttpServletResponse response = null;
		response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=UTF-8");
		response.setCharacterEncoding("UTF-8");
		PrintWriter out = response.getWriter();

		// 创建session对象
		HttpSession session = ServletActionContext.getRequest().getSession();
		
		User user = (User)session.getAttribute("user");
		
		if (user != null) {
			session.removeAttribute("user");
		}
		
		out.print("<script language='javascript'>alert('退出成功！');window.location='index.jsp';</script>");
		out.flush();
		out.close();
				
		return SUCCESS;
	}
}
