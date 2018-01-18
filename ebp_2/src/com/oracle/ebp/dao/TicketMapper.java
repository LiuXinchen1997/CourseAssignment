package com.oracle.ebp.dao;

import java.sql.Timestamp;
import java.util.List;

import com.oracle.ebp.domain.Ticket;
import com.oracle.ebp.domain.TicketDetail;
import com.oracle.ebp.domain.UpdateTicketBean;

public interface TicketMapper {
	public List<Ticket> listTicketsByDate(String earlyTime, String lateTime);

	public TicketDetail getTicketDetailsByTid(int tid);

	public int addTicket(Ticket ticket);

	public int addTicketDetail(TicketDetail ticketDetail);
	
	//用户根据价格查询票所有票项数目用来得到尾页数
	public Integer User_GetTicketByPrice_GetRecordCount(Integer lowPrice,Integer highPrice);
	
	//用户根据价格查询票
	public List<Ticket> User_GetTicketByPrice(Integer lowPrice,Integer highPrice,Integer firstRecord,Integer MaxShowPage);
			
		
	// 管理员得到所有票项的分页查询
	public List<Ticket> Admin_GetALLTicket(Integer firstRecord, Integer MaxShowNumber);

	// 管理员得到查询到所有票项数目用来得到尾页数
	public Integer Admin_GetALLTicket_Number();

	// 管理员根据日期查询票项
	public List<Ticket> Admin_GetTicketBySday_Eday(Timestamp begin, Timestamp end, Integer firstRecord,
			Integer MaxShowNumber);

	// 管理员得到根据日期查询到的所有票项数目用来得到尾页数
	public Integer Admin_GetTicketBySday_Eday_GetRecordCount(Timestamp begin, Timestamp end);

	// 管理员更改票停售/售出
	public void Admin_UpdateTicketStatus(Integer tid, Integer status);

	// 管理员查看票的状态是否更改成功
	public Integer Admin_Query_UpdateTicketStatus(Integer tid);

	// 管理员通过主键获得ticket
	public Ticket Admin_get_TicketInformation(Integer tid);

	// 管理员更改票务信息
	// public void Admin_Update_TicketInformation(Ticket ticket);
	public void Admin_Update_TicketInformation(UpdateTicketBean updateTicketBean);
	
	public Ticket getTicketByTid(int tid);
	
	public void minusTicket(int tid, int quantity);
	
	//管理员通过描述查看票项的尾页数
	public Integer Admin_GetTicketByDescs_GetRecordCount(String descs);
	
	//管理员通过描述查询票项
	public List<Ticket> Admin_GetTicketByDescs(String descs,Integer firstRecord,Integer MaxShowNumber);
}