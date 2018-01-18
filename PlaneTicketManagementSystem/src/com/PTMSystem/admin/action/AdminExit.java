package com.PTMSystem.admin.action;

import java.io.PrintWriter;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;

import com.PTMSystem.bean.Admin;
import com.PTMSystem.bean.User;
import com.opensymphony.xwork2.ActionSupport;

public class AdminExit extends ActionSupport {
	@Override
	public String execute() throws Exception {
		HttpServletResponse response = null;
		response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=UTF-8");
		response.setCharacterEncoding("UTF-8");
		PrintWriter out = response.getWriter();

		// 创建session对象
		HttpSession session = ServletActionContext.getRequest().getSession();
		
		Object admin = session.getAttribute("user");
		
		if (admin != null) {
			session.removeAttribute("user");
		}
		
		out.print("<script language='javascript'>alert('退出成功！');window.location='empty.jsp';</script>");
		out.flush();
		out.close();
				
		return SUCCESS;
	}
}
