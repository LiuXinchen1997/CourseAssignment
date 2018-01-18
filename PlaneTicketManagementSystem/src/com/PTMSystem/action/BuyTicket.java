package com.PTMSystem.action;

import java.io.PrintWriter;
import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;

import com.PTMSystem.bean.Flight;
import com.PTMSystem.bean.Insurance;
import com.PTMSystem.bean.Meal;
import com.PTMSystem.bean.Movie;
import com.PTMSystem.bean.Ticket;
import com.PTMSystem.dao.FlightDao;
import com.PTMSystem.dao.PlaneDao;
import com.PTMSystem.dao.TicketDao;
import com.opensymphony.xwork2.ActionSupport;

public class BuyTicket extends ActionSupport {
	private String fid;

	public String getFid() {
		return fid;
	}

	public void setFid(String fid) {
		this.fid = fid;
	}
	
	private List<Ticket> ticketList;
	
	public List<Ticket> getTicketList() {
		return ticketList;
	}

	public void setTicketList(List<Ticket> ticketList) {
		this.ticketList = ticketList;
	}
	
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

	@Override
	public String execute() throws Exception {
		// 解决乱码，用于页面输出
		HttpServletResponse response = null;
		response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=UTF-8");
		response.setCharacterEncoding("UTF-8");
		PrintWriter out = response.getWriter();

		// 创建session对象
		HttpSession session = ServletActionContext.getRequest().getSession();
		// 验证是否正常登录
		if (session.getAttribute("user") == null) {
			out.print("<script language='javascript'>alert('请您先登录！');window.location='login.jsp';</script>");
			out.flush();
			out.close();
			return null;
		}
		
		ticketList = new TicketDao().getTicketsByFid(fid);
		session.setAttribute("ticketList", ticketList);
		
		String pid = new FlightDao().getFlightByFid(fid).getPid();
		insuranceList = new PlaneDao().getInsurances(pid);
		session.setAttribute("insuranceList", insuranceList);
		
		movieList = new PlaneDao().getMovies(pid);
		session.setAttribute("movieList", movieList);
		
		mealList = new PlaneDao().getMeals(pid);
		session.setAttribute("mealList", mealList);
		
		session.setAttribute("fid", fid);

		return SUCCESS;
	}
}
