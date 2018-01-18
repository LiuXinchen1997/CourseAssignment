package com.PTMSystem.action;

import java.io.PrintWriter;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;

import com.PTMSystem.bean.OrderList;
import com.PTMSystem.bean.Ticket;
import com.PTMSystem.bean.User;
import com.PTMSystem.dao.OrderListDao;
import com.PTMSystem.dao.SeatDao;
import com.PTMSystem.dao.TicketDao;
import com.opensymphony.xwork2.ActionSupport;

public class ChangeTicketConfirm extends ActionSupport {
	private String fid;
	private int type;

	public String getFid() {
		return fid;
	}

	public void setFid(String fid) {
		this.fid = fid;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
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
		
		OrderList originalOL = (OrderList) session.getAttribute("originalOL");
		String originalTid = originalOL.getTid();
		
		String info = new TicketDao().getChangeInfo(originalTid);
		if (info.equals("超过改签期限")) {
			out.print("<script language='javascript'>alert('改签失败！  " + info + "');window.location='myBill.jsp';</script>");
			out.flush();
			out.close();
		} else {
		
			//删除原账单信息
			int seatno = originalOL.getSeatno();
			new OrderListDao().deleteARecord(originalTid, user.getId());
			new TicketDao().increaseTickets(originalTid);
			new SeatDao().clearFlag(originalTid, seatno);
			
			OrderList ol = new OrderList();
			ol.setInid(originalOL.getInid());
			ol.setMealid(originalOL.getMealid());
			ol.setMid(originalOL.getMid());
			ol.setUid(user.getId());
			ol.setTime(originalOL.getTime());
			
			Ticket ticket = new TicketDao().getTicket(fid, type);
			ol.setSeatno(new SeatDao().getSeatNum(ticket.getTid()));
			ol.setTid(ticket.getTid());
			
			new OrderListDao().insertARecord(ol);
			session.removeAttribute("originalOL");
			
			out.print("<script language='javascript'>alert('改签成功！  " + info + "');window.location='myBill.jsp';</script>");
			out.flush();
			out.close();
		}
		
		return SUCCESS;
	}
}
