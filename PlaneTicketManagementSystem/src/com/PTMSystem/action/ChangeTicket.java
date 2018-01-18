package com.PTMSystem.action;

import java.io.PrintWriter;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;

import com.PTMSystem.bean.Flight;
import com.PTMSystem.bean.Ticket;
import com.PTMSystem.bean.User;
import com.PTMSystem.dao.FlightDao;
import com.PTMSystem.dao.OrderListDao;
import com.PTMSystem.dao.SeatDao;
import com.PTMSystem.dao.TicketDao;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

public class ChangeTicket extends ActionSupport {
	private String tid;
	private int seatno;

	public String getTid() {
		return tid;
	}

	public void setTid(String tid) {
		this.tid = tid;
	}

	public int getSeatno() {
		return seatno;
	}

	public void setSeatno(int seatno) {
		this.seatno = seatno;
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

		User user = (User) session.getAttribute("user");
		if (user == null) {
			out.print("<script language='javascript'>alert('请您先登录！');window.location='login.jsp';</script>");
			out.flush();
			out.close();
			return null;
		}

		Ticket ticket = new TicketDao().getTicket(tid);
		String fid = ticket.getFid();
		Flight flight = new FlightDao().getFlightByFid(fid);
		String pid = flight.getPid();
		String startPoint = flight.getStartPoint();
		String endPoint = flight.getEndPoint();

		String strwhere = "pid = '" + pid + "' and startPoint =  '" + startPoint + "' and endPoint = '" + endPoint
				+ "'";
		List<Flight> list = new FlightDao().getList(strwhere, "");

		ActionContext actionContext = ActionContext.getContext();
		Map<String, Object> request = (Map) actionContext.get("request");
		request.put("flightList", list);
		session.setAttribute("originalOL", new OrderListDao().getARecord(tid, user.getId()));

		return SUCCESS;
	}
}
