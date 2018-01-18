package com.PTMSystem.admin.action;

import java.io.PrintWriter;
import java.sql.SQLException;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;

import com.PTMSystem.dao.InsuranceDao;
import com.PTMSystem.dao.PlaneDao;
import com.opensymphony.xwork2.ActionSupport;

public class DeleteInsurance extends ActionSupport {
	private int inid;

	public int getInid() {
		return inid;
	}

	public void setInid(int inid) {
		this.inid = inid;
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
			new InsuranceDao().deleteInsurance(inid);
			out.print("<script language='javascript'>alert('删除成功！');window.location='insuranceInfoManage.jsp';</script>");
			out.flush();
			out.close();
		} catch (SQLException e) {
			out.print("<script language='javascript'>alert('删除失败！请仔细检查您的信息！');window.location='insuranceInfoManage.jsp';</script>");
			out.flush();
			out.close();
		}

		return SUCCESS;
	}
}
