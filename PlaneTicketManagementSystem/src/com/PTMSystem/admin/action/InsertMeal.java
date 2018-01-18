package com.PTMSystem.admin.action;

import java.io.PrintWriter;
import java.sql.SQLException;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;

import com.PTMSystem.bean.Insurance;
import com.PTMSystem.bean.Meal;
import com.PTMSystem.dao.InsuranceDao;
import com.PTMSystem.dao.MealDao;
import com.opensymphony.xwork2.ActionSupport;

public class InsertMeal extends ActionSupport {

	private int mealid;
	private String mealname;
	private String mealmoney;
	private String mealtext;
	private String mealhot;
	private String mealpoint;

	public int getMealid() {
		return mealid;
	}

	public void setMealid(int mealid) {
		this.mealid = mealid;
	}

	public String getMealname() {
		return mealname;
	}

	public void setMealname(String mealname) {
		this.mealname = mealname;
	}

	public String getMealmoney() {
		return mealmoney;
	}

	public void setMealmoney(String mealmoney) {
		this.mealmoney = mealmoney;
	}

	public String getMealtext() {
		return mealtext;
	}

	public void setMealtext(String mealtext) {
		this.mealtext = mealtext;
	}

	public String getMealhot() {
		return mealhot;
	}

	public void setMealhot(String mealhot) {
		this.mealhot = mealhot;
	}

	public String getMealpoint() {
		return mealpoint;
	}

	public void setMealpoint(String mealpoint) {
		this.mealpoint = mealpoint;
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
			Meal m = new Meal();
			int mh = Integer.parseInt(mealhot);
			m.setMealhot(mh);
			
			int mm = Integer.parseInt(mealmoney);
			m.setMealmoney(mm);
			m.setMealname(mealname);
			
			int mp = Integer.parseInt(mealpoint);
			m.setMealpoint(mp);
			
			m.setMealtext(mealtext);
			
			new MealDao().insertMeal(m);
			out.print(
					"<script language='javascript'>alert('添加成功！');window.location='mealInfoManage.jsp';</script>");
			out.flush();
			out.close();
		} catch (SQLException e) {
			out.print(
					"<script language='javascript'>alert('添加失败！请仔细检查您的信息！');window.location='mealInfoManage.jsp';</script>");
			out.flush();
			out.close();
		} catch (Exception e) {
			out.print(
					"<script language='javascript'>alert('添加失败！您的输入不合法！');window.location='mealInfoManage.jsp';</script>");
			out.flush();
			out.close();
		}

		return SUCCESS;
	}
}
