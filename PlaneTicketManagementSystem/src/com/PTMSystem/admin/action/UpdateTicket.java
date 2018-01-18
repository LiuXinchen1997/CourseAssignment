package com.PTMSystem.admin.action;

import java.io.PrintWriter;
import java.sql.Date;
import java.sql.SQLException;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;

import com.PTMSystem.bean.Ticket;
import com.PTMSystem.dao.FlightDao;
import com.PTMSystem.dao.TicketDao;
import com.opensymphony.xwork2.ActionSupport;

public class UpdateTicket extends ActionSupport {
	private String tid;
	private String fid;
	private String type;
	private String fullReturnTime;
	private String returnTime;
	private String returnProMoneyPercent;
	private String returnLateMoneyPercent;
	private String changeTime;
	private String changeProMoneyPercent;
	private String price;
	private String fullSeat;
	private String remainSeat;
	private String luggageLimit;
	private String exceedmoney;

	public String getTid() {
		return tid;
	}

	public void setTid(String tid) {
		this.tid = tid;
	}

	public String getFid() {
		return fid;
	}

	public void setFid(String fid) {
		this.fid = fid;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getFullReturnTime() {
		return fullReturnTime;
	}

	public void setFullReturnTime(String fullReturnTime) {
		this.fullReturnTime = fullReturnTime;
	}

	public String getReturnTime() {
		return returnTime;
	}

	public void setReturnTime(String returnTime) {
		this.returnTime = returnTime;
	}

	public String getReturnProMoneyPercent() {
		return returnProMoneyPercent;
	}

	public void setReturnProMoneyPercent(String returnProMoneyPercent) {
		this.returnProMoneyPercent = returnProMoneyPercent;
	}

	public String getReturnLateMoneyPercent() {
		return returnLateMoneyPercent;
	}

	public void setReturnLateMoneyPercent(String returnLateMoneyPercent) {
		this.returnLateMoneyPercent = returnLateMoneyPercent;
	}

	public String getChangeTime() {
		return changeTime;
	}

	public void setChangeTime(String changeTime) {
		this.changeTime = changeTime;
	}

	public String getChangeProMoneyPercent() {
		return changeProMoneyPercent;
	}

	public void setChangeProMoneyPercent(String changeProMoneyPercent) {
		this.changeProMoneyPercent = changeProMoneyPercent;
	}

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public String getFullSeat() {
		return fullSeat;
	}

	public void setFullSeat(String fullSeat) {
		this.fullSeat = fullSeat;
	}

	public String getRemainSeat() {
		return remainSeat;
	}

	public void setRemainSeat(String remainSeat) {
		this.remainSeat = remainSeat;
	}

	public String getLuggageLimit() {
		return luggageLimit;
	}

	public void setLuggageLimit(String luggageLimit) {
		this.luggageLimit = luggageLimit;
	}

	public String getExceedmoney() {
		return exceedmoney;
	}

	public void setExceedmoney(String exceedmoney) {
		this.exceedmoney = exceedmoney;
	}

	public String check() throws Exception {
		Ticket t = new TicketDao().getTicket(tid);

		changeProMoneyPercent = t.getChangeProMoneyPercent() + "";
		changeTime = t.getChangeTime() + "";
		exceedmoney = t.getExceedmoney() + "";
		fid = t.getFid();
		fullReturnTime = t.getFullReturnTime() + "";
		fullSeat = t.getFullSeat() + "";
		luggageLimit = t.getLuggageLimit() + "";
		price = t.getPrice() + "";
		remainSeat = t.getRemainSeat() + "";
		returnLateMoneyPercent = t.getReturnLateMoneyPercent() + "";
		returnProMoneyPercent = t.getReturnProMoneyPercent() + "";
		returnTime = t.getReturnTime() + "";
		tid = t.getTid();
		type = t.getType() + "";

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
			Ticket t = new Ticket();
			t.setChangeProMoneyPercent(Float.parseFloat(changeProMoneyPercent));
			t.setChangeTime(Date.valueOf(changeTime));
			t.setExceedmoney(Integer.parseInt(exceedmoney));
			t.setFid(fid);
			t.setFullReturnTime(Date.valueOf(fullReturnTime));
			t.setFullSeat(Integer.parseInt(fullSeat));
			t.setLuggageLimit(Integer.parseInt(luggageLimit));
			t.setPrice(Integer.parseInt(price));
			t.setRemainSeat(Integer.parseInt(remainSeat));
			t.setReturnLateMoneyPercent(Float.parseFloat(returnLateMoneyPercent));
			t.setReturnProMoneyPercent(Float.parseFloat(returnProMoneyPercent));
			t.setReturnTime(Date.valueOf(returnTime));
			t.setTid(tid);
			t.setType(Integer.parseInt(type));
			
			new TicketDao().updateTicket(t);
			out.print("<script language='javascript'>alert('修改成功！');window.location='ticketInfoManage.jsp';</script>");
			out.flush();
			out.close();
		} catch (SQLException e) {
			out.print(
					"<script language='javascript'>alert('修改失败！请仔细检查您的信息！');window.location='updateTicket.jsp';</script>");
			out.flush();
			out.close();
		} catch (IllegalArgumentException e) {
			out.print(
					"<script language='javascript'>alert('修改失败！请仔细检查您输入的日期信息！');window.location='updateTicket.jsp';</script>");
			out.flush();
			out.close();
		} catch (Exception e) {
			out.print(
					"<script language='javascript'>alert('修改失败！您的输入不合法！');window.location='updateTicket.jsp';</script>");
			out.flush();
			out.close();
		}

		return SUCCESS;		
	}
}
