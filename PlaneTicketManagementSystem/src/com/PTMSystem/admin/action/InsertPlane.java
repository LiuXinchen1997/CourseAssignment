package com.PTMSystem.admin.action;

import java.io.PrintWriter;
import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;

import com.PTMSystem.bean.Insurance;
import com.PTMSystem.bean.Meal;
import com.PTMSystem.bean.Movie;
import com.PTMSystem.bean.Plane;
import com.PTMSystem.dao.InsuranceDao;
import com.PTMSystem.dao.MealDao;
import com.PTMSystem.dao.MovieDao;
import com.PTMSystem.dao.PlaneDao;
import com.opensymphony.xwork2.ActionSupport;

public class InsertPlane extends ActionSupport {
	private List<Insurance> insuranceList;
	private List<Movie> movieList;
	private List<Meal> mealList;

	public List<Insurance> getInsuranceList() {
		return insuranceList;
	}

	public void setInsuranceList(List<Insurance> insuranceList) {
		this.insuranceList = insuranceList;
	}

	public List<Movie> getMovieList() {
		return movieList;
	}

	public void setMovieList(List<Movie> movieList) {
		this.movieList = movieList;
	}

	public List<Meal> getMealList() {
		return mealList;
	}

	public void setMealList(List<Meal> mealList) {
		this.mealList = mealList;
	}

	private int[] inids;
	private int[] mids;
	private int[] mealids;
	private String pid;
	private String cid;
	private String company;

	public int[] getInids() {
		return inids;
	}

	public void setInids(int[] inids) {
		this.inids = inids;
	}

	public int[] getMids() {
		return mids;
	}

	public void setMids(int[] mids) {
		this.mids = mids;
	}

	public int[] getMealids() {
		return mealids;
	}

	public void setMealids(int[] mealids) {
		this.mealids = mealids;
	}

	public String getPid() {
		return pid;
	}

	public void setPid(String pid) {
		this.pid = pid;
	}

	public String getCid() {
		return cid;
	}

	public void setCid(String cid) {
		this.cid = cid;
	}

	public String getCompany() {
		return company;
	}

	public void setCompany(String company) {
		this.company = company;
	}

	public String check() throws Exception {
		insuranceList = new InsuranceDao().getAll();
		movieList = new MovieDao().getAll();
		mealList = new MealDao().getAll();

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

		Plane plane = new Plane();
		plane.setPid(pid);
		plane.setCompany(company);
		
		new PlaneDao().insertPlane(plane, inids, mids, mealids);
		out.print("<script language='javascript'>alert('添加成功！');window.location='planeInfoManage.jsp';</script>");
		out.flush();
		out.close();

		return SUCCESS;
	}
}
