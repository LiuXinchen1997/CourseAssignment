package com.PTMSystem.admin.action;

import java.io.PrintWriter;
import java.sql.SQLException;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;

import com.PTMSystem.bean.Insurance;
import com.PTMSystem.bean.Movie;
import com.PTMSystem.dao.InsuranceDao;
import com.PTMSystem.dao.MovieDao;
import com.opensymphony.xwork2.ActionSupport;

public class UpdateMovie extends ActionSupport {
	private int mid;
	private String mname;
	private String mmoney;
	private String mlong;
	private String mhot;
	private String mpoint;
	
	public int getMid() {
		return mid;
	}
	public void setMid(int mid) {
		this.mid = mid;
	}
	public String getMname() {
		return mname;
	}
	public void setMname(String mname) {
		this.mname = mname;
	}
	public String getMmoney() {
		return mmoney;
	}
	public void setMmoney(String mmoney) {
		this.mmoney = mmoney;
	}
	public String getMlong() {
		return mlong;
	}
	public void setMlong(String mlong) {
		this.mlong = mlong;
	}
	public String getMhot() {
		return mhot;
	}
	public void setMhot(String mhot) {
		this.mhot = mhot;
	}
	public String getMpoint() {
		return mpoint;
	}
	public void setMpoint(String mpoint) {
		this.mpoint = mpoint;
	}
	
	
	public String check() throws Exception {
		Movie m = new MovieDao().getById(mid);
		mname = m.getMname();
		mmoney = m.getMmoney() + "";
		mlong = m.getMlong() + "";
		mhot = m.getMhot() + "";
		mpoint = m.getMpoint() + "";

		return SUCCESS;
	}

	@Override
	public String execute() throws Exception {
		// 解决乱码，用于页面输出
		HttpServletResponse response = null;
		response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=UTF-8");
		response.setCharacterEncoding("UTF-8");
		PrintWriter out = response.getWriter();

		try {
			Movie m = new Movie();
			m.setMid(mid);
			
			int mm = Integer.parseInt(mmoney);
			m.setMmoney(mm);
			m.setMname(mname);
			
			int mh = Integer.parseInt(mhot);
			m.setMhot(mh);
			
			int mp = Integer.parseInt(mpoint);
			m.setMpoint(mp);
			
			int ml = Integer.parseInt(mlong);
			m.setMlong(ml);
			
			new MovieDao().updateMovie(m);
			out.print("<script language='javascript'>alert('修改成功！');window.location='movieInfoManage.jsp';</script>");
			out.flush();
			out.close();
		} catch (SQLException e) {
			out.print("<script language='javascript'>alert('修改失败！');window.location='movieInfoManage.jsp';</script>");
			out.flush();
			out.close();
		} catch (Exception e) {
			out.print("<script language='javascript'>alert('修改失败！您的输入不合法！');window.location='movieInfoManage.jsp';</script>");
			out.flush();
			out.close();
		}
		
		return SUCCESS;
	}
}
