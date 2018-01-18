package com.PTMSystem.action;

import java.io.PrintWriter;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.Date;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;

import com.PTMSystem.bean.OrderList;
import com.PTMSystem.bean.User;
import com.PTMSystem.dao.OrderListDao;
import com.PTMSystem.dao.SeatDao;
import com.PTMSystem.dao.TicketDao;
import com.opensymphony.xwork2.ActionSupport;

public class BuyTicketConfirm extends ActionSupport {
	private int type;
	private int inid;
	private int mid;
	private int mealid;

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public int getInid() {
		return inid;
	}

	public void setInid(int inid) {
		this.inid = inid;
	}

	public int getMid() {
		return mid;
	}

	public void setMid(int mid) {
		this.mid = mid;
	}

	public int getMealid() {
		return mealid;
	}

	public void setMealid(int mealid) {
		this.mealid = mealid;
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
		
		User user = (User)session.getAttribute("user");
		if (user == null) {
			out.print("<script language='javascript'>alert('请您先登录！');window.location='login.jsp';</script>");
			out.flush();
			out.close();
			return null;
		}
		
		String fid = (String)session.getAttribute("fid");
		String tid = new TicketDao().getTicket(fid, type).getTid();
		
		OrderList ol = new OrderList();
		ol.setUid(user.getId());
		ol.setInid(inid);
		ol.setMid(mid);
		ol.setMealid(mealid);
		ol.setTid(tid);
		ol.setSeatno(new SeatDao().getSeatNum(tid));
		ol.setTime(new Timestamp(new Date().getTime()));
		
		try {
			new OrderListDao().insertARecord(ol);
			out.print("<script language='javascript'>alert('购买成功！');window.location='myBill.jsp';</script>");
			out.flush();
			out.close();
		} catch (SQLException e) {
			out.print("<script language='javascript'>alert('购买失败！您已经购买过！');window.location='myBill.jsp';</script>");
			out.flush();
			out.close();
		}
		
		return SUCCESS;
	}
}
