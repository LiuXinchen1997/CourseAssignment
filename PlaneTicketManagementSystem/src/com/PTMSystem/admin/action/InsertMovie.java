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

public class InsertMovie extends ActionSupport {
	
	private String cid;
	
	public String getCid() {
		return cid;
	}

	public void setCid(String cid) {
		this.cid = cid;
	}

	private String mname;
	private String mmoney;
	private String mlong;
	private String mhot;
	private String mpoint;
	private int mid;
	
	
	
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

	public int getMid() {
		return mid;
	}



	public void setMid(int mid) {
		this.mid = mid;
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
			int mh = Integer.parseInt(mhot);
			m.setMhot(mh);
			
			int ml = Integer.parseInt(mlong);
			m.setMlong(ml);
			
			int mm = Integer.parseInt(mmoney);
			m.setMmoney(mm);
			
			m.setMname(mname);
			
			int mp = Integer.parseInt(mpoint);
			m.setMpoint(mp);
			
			new MovieDao().insertMovie(m);
			out.print("<script language='javascript'>alert('添加成功！');window.location='movieInfoManage.jsp';</script>");
			out.flush();
			out.close();
		} catch (SQLException e) {
			out.print("<script language='javascript'>alert('添加失败！请仔细检查您的信息！');window.location='movieInfoManage.jsp';</script>");
			out.flush();
			out.close();
		} catch (Exception e) {
			out.print("<script language='javascript'>alert('添加失败！您的输入不合法！');window.location='movieInfoManage.jsp';</script>");
			out.flush();
			out.close();
		}

		return SUCCESS;
	}
}
