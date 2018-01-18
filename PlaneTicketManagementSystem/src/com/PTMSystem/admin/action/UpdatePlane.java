package com.PTMSystem.admin.action;

import java.io.PrintWriter;
import java.sql.SQLException;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;

import com.PTMSystem.bean.Plane;
import com.PTMSystem.dao.PlaneDao;
import com.opensymphony.xwork2.ActionSupport;

public class UpdatePlane extends ActionSupport {
	private String pid;
	private String company;

	public String getPid() {
		return pid;
	}

	public void setPid(String pid) {
		this.pid = pid;
	}

	public String getCompany() {
		return company;
	}

	public void setCompany(String company) {
		this.company = company;
	}

	public String check() throws Exception {
		Plane plane = new PlaneDao().getPlaneByPid(pid);
		company = plane.getCompany();

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
			new PlaneDao().updatePlane(pid, company);
			out.print("<script language='javascript'>alert('修改成功！');window.location='planeInfoManage.jsp';</script>");
			out.flush();
			out.close();
		} catch (SQLException e) {
			out.print("<script language='javascript'>alert('修改失败！');window.location='planeInfoManage.jsp';</script>");
			out.flush();
			out.close();
		}

		return SUCCESS;
	}
}
