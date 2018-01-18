package com.PTMSystem.admin.action;

import java.io.PrintWriter;
import java.sql.SQLException;
import java.sql.Timestamp;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;

import com.PTMSystem.bean.Flight;
import com.PTMSystem.dao.FlightDao;
import com.opensymphony.xwork2.ActionSupport;

public class UpdateFlight extends ActionSupport {

	private String fid;
	private String startPoint;
	private String middlePoint;
	private String endPoint;
	private String startDate;
	private String endDate;
	private String status;
	private String pid;

	public String getFid() {
		return fid;
	}

	public void setFid(String fid) {
		this.fid = fid;
	}

	public String getStartPoint() {
		return startPoint;
	}

	public void setStartPoint(String startPoint) {
		this.startPoint = startPoint;
	}

	public String getMiddlePoint() {
		return middlePoint;
	}

	public void setMiddlePoint(String middlePoint) {
		this.middlePoint = middlePoint;
	}

	public String getEndPoint() {
		return endPoint;
	}

	public void setEndPoint(String endPoint) {
		this.endPoint = endPoint;
	}

	public String getStartDate() {
		return startDate;
	}

	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	public String getEndDate() {
		return endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getPid() {
		return pid;
	}

	public void setPid(String pid) {
		this.pid = pid;
	}

	public String check() throws Exception {
		Flight f = new FlightDao().getFlightByFid(fid);

		fid = f.getFid();
		endDate = f.getEndDate() + "";
		endPoint = f.getEndPoint();
		middlePoint = f.getMiddlePoint();
		pid = f.getPid();
		startDate = f.getStartDate() + "";
		startPoint = f.getStartPoint();
		status = f.getStatus() + "";

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
			Flight f = new Flight();
			f.setEndPoint(endPoint);
			f.setFid(fid);
			f.setMiddlePoint(middlePoint);
			f.setPid(pid);
			f.setStartPoint(startPoint);
			
			f.setEndDate(Timestamp.valueOf(endDate));
			f.setStartDate(Timestamp.valueOf(startDate));
			
			int s = Integer.parseInt(status);
			f.setStatus(s);
			
			new FlightDao().updateFlight(f);
			out.print("<script language='javascript'>alert('添加成功！');window.location='flightInfoManage.jsp';</script>");
			out.flush();
			out.close();
		} catch (SQLException e) {
			out.print(
					"<script language='javascript'>alert('添加失败！请仔细检查您的信息！');window.location='updateFlight.jsp';</script>");
			out.flush();
			out.close();
		} catch (IllegalArgumentException e) {
			out.print(
					"<script language='javascript'>alert('添加失败！请仔细检查您输入的日期信息！');window.location='updateFlight.jsp';</script>");
			out.flush();
			out.close();
		} catch (Exception e) {
			out.print(
					"<script language='javascript'>alert('添加失败！您的输入不合法！');window.location='updateFlight.jsp';</script>");
			out.flush();
			out.close();
		}

		return SUCCESS;
	}
}
