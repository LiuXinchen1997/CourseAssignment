package com.PTMSystem.admin.action;

import java.io.PrintWriter;
import java.sql.SQLException;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;

import com.PTMSystem.bean.Meal;
import com.PTMSystem.bean.Movie;
import com.PTMSystem.dao.MealDao;
import com.PTMSystem.dao.MovieDao;
import com.opensymphony.xwork2.ActionSupport;

public class UpdateMeal extends ActionSupport {
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

	public String check() throws Exception {
		Meal m = new MealDao().getById(mealid);
		mealhot = m.getMealhot() + "";
		mealmoney = m.getMealmoney() + "";
		mealname = m.getMealname();
		mealpoint = m.getMealpoint() + "";
		mealtext = m.getMealtext();

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
			Meal m = new Meal();
			
			int mh = Integer.parseInt(mealhot);
			m.setMealhot(mh);
			
			int mm = Integer.parseInt(mealmoney);
			m.setMealmoney(mm);
			
			int mp = Integer.parseInt(mealpoint);
			m.setMealpoint(mp);
			
			m.setMealname(mealname);
			m.setMealid(mealid);
			m.setMealtext(mealtext);
			
			new MealDao().updateMeal(m);
			out.print("<script language='javascript'>alert('修改成功！');window.location='mealInfoManage.jsp';</script>");
			out.flush();
			out.close();
		} catch (SQLException e) {
			out.print("<script language='javascript'>alert('修改失败！');window.location='mealInfoManage.jsp';</script>");
			out.flush();
			out.close();
		} catch (Exception e) {
			out.print("<script language='javascript'>alert('修改失败！您的输入不合法！');window.location='mealInfoManage.jsp';</script>");
			out.flush();
			out.close();
		}

		return SUCCESS;
	}
}
