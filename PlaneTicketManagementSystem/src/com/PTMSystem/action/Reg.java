package com.PTMSystem.action;

import java.io.PrintWriter;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;

import com.PTMSystem.bean.User;
import com.PTMSystem.dao.UserDao;
import com.opensymphony.xwork2.ActionSupport;

public class Reg extends ActionSupport {
	private String username;
	private String password;
	private String sex;
	private String photo;
	private String tel;
	private String email;
	private String idnum;
	
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
	public String getSex() {
		return sex;
	}
	public void setSex(String sex) {
		this.sex = sex;
	}
	public String getPhoto() {
		return photo;
	}
	public void setPhoto(String photo) {
		this.photo = photo;
	}
	public String getTel() {
		return tel;
	}
	public void setTel(String tel) {
		this.tel = tel;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getIdnum() {
		return idnum;
	}
	public void setIdnum(String idnum) {
		this.idnum = idnum;
	}

	private String msg;
	
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}
	
	@Override
	public String execute() throws Exception {
		UserDao dao = new UserDao();
		
		if (username != null && !username.isEmpty()) {
			if (!dao.userExists(username)) {
				User u = new User();
				u.setUsername(username);
				u.setPassword(password);
				u.setSex(sex);
				u.setTel(tel);
				u.setEmail(email);
				u.setIdnum(idnum);
				
				dao.saveUser(u);
				
				HttpServletResponse response = ServletActionContext.getResponse();
				response.setContentType("text/html;charset=UTF-8");
		        response.setCharacterEncoding("UTF-8");
				PrintWriter out = response.getWriter();
				out.print("<script>alert('注册成功！~'); window.location='login.jsp';</script>");
				out.flush(); out.close();
			} else {
				msg = "注册失败，用户已存在！";
				return "fail";
			}
		}
		
		msg = "注册失败！";
		return "fail";
	}
}
