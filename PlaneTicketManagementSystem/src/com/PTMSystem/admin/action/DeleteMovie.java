package com.PTMSystem.admin.action;

import java.io.PrintWriter;
import java.sql.SQLException;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;

import com.PTMSystem.dao.InsuranceDao;
import com.PTMSystem.dao.MovieDao;
import com.opensymphony.xwork2.ActionSupport;

public class DeleteMovie extends ActionSupport {
	private int mid;

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
			new MovieDao().deleteMovie(mid);
			out.print("<script language='javascript'>alert('删除成功！');window.location='movieInfoManage.jsp';</script>");
			out.flush();
			out.close();
		} catch (Exception e) {
			out.print("<script language='javascript'>alert('删除失败！请仔细检查您的信息！');window.location='movieInfoManage.jsp';</script>");
			out.flush();
			out.close();
		}

		return SUCCESS;
	}
}
