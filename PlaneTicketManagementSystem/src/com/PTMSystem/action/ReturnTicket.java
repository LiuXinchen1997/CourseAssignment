package com.PTMSystem.action;

import java.io.PrintWriter;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;

import com.PTMSystem.bean.User;
import com.PTMSystem.dao.OrderListDao;
import com.PTMSystem.dao.SeatDao;
import com.PTMSystem.dao.TicketDao;
import com.opensymphony.xwork2.ActionSupport;

public class ReturnTicket extends ActionSupport {
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
		
		String info = new TicketDao().getReturnInfo(tid);
		if (info.equals("超过退票期限")) {
			out.print("<script language='javascript'>alert('退票失败！ " + info + "');window.location='myBill.jsp';</script>");
			out.flush();
			out.close();
		} else {
			//可以使用存储过程保证数据的一致性
			new OrderListDao().deleteARecord(tid, user.getId());
			new TicketDao().increaseTickets(tid);
			new SeatDao().clearFlag(tid, seatno);
			
			out.print("<script language='javascript'>alert('退票成功！ " + info + "');window.location='myBill.jsp';</script>");
			out.flush();
			out.close();
		}
		
		return SUCCESS;
	}
}
