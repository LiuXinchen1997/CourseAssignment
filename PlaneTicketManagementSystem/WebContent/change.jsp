<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ page import="java.util.*"%>
<%@ page import="com.PTMSystem.bean.Flight"%>
<%@ page import="com.PTMSystem.bean.Plane"%>
<%@ page import="com.PTMSystem.dao.PlaneDao"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="viewport" content="width=device-width, inital-scale=1">
<script type="text/javascript" src="jQuery/jquery-3.1.1.min.js"></script>
<script type="text/javascript" src="Bootstrap/js/bootstrap.min.js"></script>
<link href="Bootstrap/css/bootstrap.min.css" type="text/css" rel="stylesheet">
<title>改签页面</title>
</head>
<body background="image/background3.jpg">
<div class="container">
<fieldset>
	<legend><label>我要改签</label></legend>

	<table width="100%" border="0" cellspacing="0" cellpadding="0">
		<tr align="center" class="t1">
			<td height="25" bgcolor="#D5E4F4"><strong>航班号</strong></td>
			<td height="25" bgcolor="#D5E4F4"><strong>起点</strong></td>
			<td bgcolor="#D5E4F4"><strong>终点</strong></td>
			<td bgcolor="#D5E4F4"><strong>出发时间</strong></td>
			<td bgcolor="#D5E4F4"><strong>预计达到时间</strong></td>
			<td bgcolor="#D5E4F4"><strong>状态</strong></td>
			<td bgcolor="#D5E4F4"><strong>航空公司</strong></td>
			<td bgcolor="#D5E4F4"><strong>选择舱位</strong></td>
			<td bgcolor="#D5E4F4">操作</td>
		</tr>

		<%
			List<Flight> list = (List) request.getAttribute("flightList");
			for (Flight f : list) {
				Plane plane = new PlaneDao().getPlaneByPid(f.getPid());
		%>
		<form action="ChangeTicketConfirm.action">
			<tr>
				<td align="center"><select name="fid">
					<option value=<%=f.getFid()%>><%=f.getFid()%></option>
				</select></td>
				<td align="center"><%=f.getStartPoint()%></td>
				<td align="center"><%=f.getEndPoint()%></td>
				<td align="center"><%=f.getStartDate()%></td>
				<td align="center"><%=f.getEndDate()%></td>
				<td align="center"><%=f.getStatus()%></td>
				<td align="center"><%=plane.getCompany()%></td>
				<td align="center"><select name="type" id="type">
					<option value=1>经济舱</option>
					<option value=2>商务舱</option>
					<option value=3>头等舱</option>
				</select></td>
				<td align="center">
					<button type="summit" class="btn btn-xs btn-primary" onClick="return confirm('您确定要改签吗？')">确定</button>
				</td>
			</tr>
		</form>
		<%
			}
		%>

	</table>
</fieldset>
</div>
</body>
</html>