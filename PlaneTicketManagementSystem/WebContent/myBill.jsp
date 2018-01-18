<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ page import="java.util.*"%>
<%@ page import="java.sql.Timestamp"%>
<%@ page import="com.PTMSystem.bean.User"%>
<%@ page import="com.PTMSystem.bean.OrderList"%>
<%@ page import="com.PTMSystem.bean.Bill"%>
<%@ page import="com.PTMSystem.dao.OrderListDao"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="viewport" content="width=device-width, inital-scale=1">
<script type="text/javascript" src="jQuery/jquery-3.1.1.min.js"></script>
<script type="text/javascript" src="Bootstrap/js/bootstrap.min.js"></script>
<link href="Bootstrap/css/bootstrap.min.css" type="text/css" rel="stylesheet">
<script type="text/javascript" src="js/login.js"></script>
<title>我的账单</title>
</head>
<body background="image/background2.jpg">
<div class="container">
<fieldset>
	<legend><label>我的账单</label></legend>

	<%
		User user = (User) session.getAttribute("user");
		if (user == null) {
			out.print("<script language='javascript'>alert('请您先登录！');window.location='login.jsp';</script>");
			out.flush(); out.close();
		} else {
	%>
		<table width="100%" border="0" cellspacing="0" cellpadding="0">
			<tr align="center" class="t1">
				<td height="25" bgcolor="#D5E4F4"><strong>购票时间</strong></td>
				<td height="25" bgcolor="#D5E4F4"><strong>航班号</strong></td>
				<td bgcolor="#D5E4F4"><strong>票价</strong></td>
				<td bgcolor="#D5E4F4"><strong>舱位</strong></td>
				<td bgcolor="#D5E4F4"><strong>座位号</strong></td>
				<td bgcolor="#D5E4F4"><strong>购买保险</strong></td>
				<td bgcolor="#D5E4F4"><strong>购买影片</strong></td>
				<td bgcolor="#D5E4F4"><strong>购买套餐</strong></td>
				<td bgcolor="#D5E4F4"><strong>总花费</strong></td>
				<td bgcolor="#D5E4F4"></td>
				<td bgcolor="#D5E4F4"></td>
			</tr>
	<%
			List<OrderList> list = new OrderListDao().getAllByUid(user.getId());
			for (OrderList ol : list) {
				Bill bill = new OrderListDao().getSingleBillByOL(ol);
	%>
			<tr align="center">
				<td height="25" align="center">
					<%=bill.getTime() %>
				</td>
				<td height="25" align="center">
					<%=bill.getFid() %>
				</td>
				<td>
					<%=bill.getTicketCost() %>元
				</td>
				<td><%=bill.getType() %></td>
				<td><%=bill.getSeatno() %></td>
				<td>
					<%if (bill.getInsuranceName() != null) { %>
						<%=bill.getInsuranceName() %>&nbsp
						<%=bill.getInsuranceCost() %>元
					<%} %>
				</td>
				<td>
					<%if (bill.getMovieName() != null) { %>
						<%=bill.getMovieName() %>&nbsp
						<%=bill.getMovieCost() %>元
					<%} %>
				</td>
				<td>
					<%if (bill.getMealName() != null) { %>
						<%=bill.getMealName() %>&nbsp
						<%=bill.getMealCost() %>元
					<%} %>
				</td>
				<td align="center"><%=bill.getSumCost() %>元</td>
				
				<td>
					<a href="ChangeTicket.action?tid=<%=ol.getTid()%>&seatno=<%=bill.getSeatno()%>">改签</a>
				</td>
				<td>
					<a href="ReturnTicket.action?tid=<%=ol.getTid()%>&seatno=<%=bill.getSeatno()%>" onClick="return confirm('您确定要退票吗？')">退票</a>
				</td>
			</tr>
	<%
			}
		}
	%>
		</table>
</fieldset>
</div>
</body>
</html>