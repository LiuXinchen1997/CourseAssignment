<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<script type="text/javascript" src="jQuery/jquery-3.1.1.min.js"></script>
<script type="text/javascript" src="Bootstrap/js/bootstrap.min.js"></script>
<link href="Bootstrap/css/bootstrap.min.css" type="text/css"
	rel="stylesheet">
<title>购票页面</title>
<%
	if (session.getAttribute("user") == null) {
%>
<script language='javascript'>
	alert('请您先登录！');
	window.location = 'login.jsp';
</script>
<%
	}
%>
</head>
<body background="image/background3.jpg">
<div class="container">
	<legend>
		<label>购票页面</</label>
	</legend>
	
	<table width="100%" border="0" cellspacing="0" cellpadding="0">
		<tr align="center" class="t1">
			<td height="25" bgcolor="#D5E4F4"><strong>航班号</strong></td>
			<td bgcolor="#D5E4F4"><strong>舱位</strong></td>
			<td bgcolor="#D5E4F4"><strong>允许退票截止日期</strong></td>
			<td bgcolor="#D5E4F4"><strong>允许改签截止日期</strong></td>
			<td bgcolor="#D5E4F4"><strong>价格</strong></td>
			<td bgcolor="#D5E4F4"><strong>座位总数</strong></td>
			<td bgcolor="#D5E4F4"><strong>剩余座位数</strong></td>
			<td bgcolor="#D5E4F4"><strong>行李上限</strong></td>
		</tr>
		<s:iterator value="ticketList">
			<tr align="center">
				<td height="25" align="center">${fid}</td>
				<td>${type}</td>
				<td>${returnTime}</td>
				<td>${changeTime}</td>
				<td align="center">${price}</td>
				<td align="center">${fullSeat}</td>
				<td align="center">${remainSeat}</td>
				<td align="center">${luggageLimit}</td>
			</tr>
		</s:iterator>
	</table>
	<br> <br>
	
	<table width="100%" border="0" cellspacing="0" cellpadding="0">
		<tr align="center" class="t1">
			<td height="25" bgcolor="#D5E4F4"><strong>保险编号</strong></td>
			<td bgcolor="#D5E4F4"><strong>保险金额</strong></td>
			<td bgcolor="#D5E4F4"><strong>保险金额</strong></td>
		</tr>
		<s:iterator value="insuranceList">
			<tr align="center">
				<td height="25" align="center">${inid}</td>
				<td>${inname}</td>
				<td>${inmoney}</td>
			</tr>
		</s:iterator>
	</table>
	<br> <br>
	
	<table width="100%" border="0" cellspacing="0" cellpadding="0">
		<tr align="center" class="t1">
			<td height="25" bgcolor="#D5E4F4"><strong>影片编号</strong></td>
			<td height="25" bgcolor="#D5E4F4"><strong>影片名称</strong></td>
			<td bgcolor="#D5E4F4"><strong>金额</strong></td>
			<td bgcolor="#D5E4F4"><strong>时长</strong></td>
			<td bgcolor="#D5E4F4"><strong>热度</strong></td>
			<td bgcolor="#D5E4F4"><strong>所需积分</strong></td>
		</tr>
		<s:iterator value="movieList">
			<tr align="center">
				<td height="25" align="center">${mid}</td>
				<td height="25" align="center">${mname}</td>
				<td>${mmoney}</td>
				<td>${mlong}</td>
				<td>${mhot}</td>
				<td align="center">${mpoint}</td>
			</tr>
		</s:iterator>
	</table>
	<br> <br>
	
	<table width="100%" border="0" cellspacing="0" cellpadding="0">
		<tr align="center" class="t1">
			<td height="25" bgcolor="#D5E4F4"><strong>套餐编号</strong></td>
			<td height="25" bgcolor="#D5E4F4"><strong>套餐名</strong></td>
			<td bgcolor="#D5E4F4"><strong>金额</strong></td>
			<td bgcolor="#D5E4F4"><strong>热度</strong></td>
			<td bgcolor="#D5E4F4"><strong>所需积分</strong></td>
			<td bgcolor="#D5E4F4"><strong>介绍</strong></td>
		</tr>
		<s:iterator value="mealList">
			<tr align="center">
				<td height="25" align="center">${mealid}</td>
				<td height="25" align="center">${mealname}</td>
				<td>${mealmoney}</td>
				<td>${mealhot}</td>
				<td>${mealpoint}</td>
				<td align="center">${mealtext}</td>
			</tr>
		</s:iterator>
	</table>
	<br><br><br><br>
	
	<form action="BuyTicketConfirm.action" method="post">
		<label>请选择舱位：</label>
		<select name="type" id="type">
			<option value=1>经济舱</option>
			<option value=2>公务舱</option>
			<option value=3>头等舱</option>
		</select> &nbsp &nbsp
		
		<label>请选择保险：</label>
		<select name="inid">
			<option value=0>我不需要</option>
			<s:iterator value="insuranceList">
				<option value=${inid}>${inname}</option>
			</s:iterator>
		</select> &nbsp &nbsp
		
		<label>请选择影片：</label>
		<select name="mid">
			<option value=0>我不需要</option>
			<s:iterator value="movieList">
				<option value=${mid}>${mname}</option>
			</s:iterator>
		</select> &nbsp &nbsp
		
		<label>请选择餐饮套餐：</label>
		<select name="mealid">
			<option value=0>我不需要</option>
			<s:iterator value="mealList">
				<option value=${mealid}>${mealname}</option>
			</s:iterator>
		</select> &nbsp &nbsp
		
		<button type="submit" id="submit" class="btn btn-xs btn-primary" onClick="return confirm('您确定要购买吗？')">购买</button>
	</form>
</div>
</body>
</html>