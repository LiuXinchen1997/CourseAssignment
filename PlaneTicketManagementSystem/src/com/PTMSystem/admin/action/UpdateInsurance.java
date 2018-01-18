package com.PTMSystem.admin.action;

import java.io.PrintWriter;
import java.sql.SQLException;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;

import com.PTMSystem.bean.Insurance;
import com.PTMSystem.dao.InsuranceDao;
import com.PTMSystem.dao.PlaneDao;
import com.opensymphony.xwork2.ActionSupport;

public class UpdateInsurance extends ActionSupport {
	private int inid;

	public int getInid() {
		return inid;
	}

	public void setInid(int inid) {
		this.inid = inid;
	}

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

	public String check() throws Exception {
		Insurance insurance = new InsuranceDao().getById(inid);
		inmoney = insurance.getInmoney() + "";
		inname = insurance.getInname();

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
			Insurance insurance = new Insurance();
			
			int im = Integer.parseInt(inmoney);
			insurance.setInmoney(im);
			
			insurance.setInid(inid);
			insurance.setInname(inname);
			new InsuranceDao().updateInsurance(insurance);
			out.print("<script language='javascript'>alert('修改成功！');window.location='insuranceInfoManage.jsp';</script>");
			out.flush();
			out.close();
		} catch (SQLException e) {
			out.print("<script language='javascript'>alert('修改失败！');window.location='insuranceInfoManage.jsp';</script>");
			out.flush();
			out.close();
		} catch (Exception e) {
			out.print("<script language='javascript'>alert('修改失败！您的输入不合法！');window.location='insuranceInfoManage.jsp';</script>");
			out.flush();
			out.close();
		}
		
		return SUCCESS;
	}
}
