package com.PTMSystem.admin.action;

import java.io.PrintWriter;
import java.sql.SQLException;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;

import com.PTMSystem.bean.Insurance;
import com.PTMSystem.bean.Plane;
import com.PTMSystem.dao.InsuranceDao;
import com.PTMSystem.dao.PlaneDao;
import com.opensymphony.xwork2.ActionSupport;

public class InsertInsurance extends ActionSupport {
	private String inname;
	private String inmoney;
	
	public String getInname() {
		return inname;
	}

	public void setInname(String inname) {
		this.inname = inname;
	}

	public String getInmoney() {
		return inmoney;
	}

	public void setInmoney(String inmoney) {
		this.inmoney = inmoney;
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
			Insurance insurance = new Insurance();
			int im = Integer.parseInt(inmoney);
			insurance.setInmoney(im);
			insurance.setInname(inname);
		
			new InsuranceDao().insertInsurance(insurance);
			out.print("<script language='javascript'>alert('添加成功！');window.location='insuranceInfoManage.jsp';</script>");
			out.flush();
			out.close();
		} catch (SQLException e) {
			out.print("<script language='javascript'>alert('添加失败！请仔细检查您的信息！');window.location='insuranceInfoManage.jsp';</script>");
			out.flush();
			out.close();
		} catch (Exception e) {
			out.print("<script language='javascript'>alert('添加失败！您的输入不合法！');window.location='insuranceInfoManage.jsp';</script>");
			out.flush();
			out.close();
		}

		return SUCCESS;
	}
}
