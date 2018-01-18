<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
     <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
<p>您的预定已成功！</p>
订单号：<font color="red">${orders.oid }</font>&nbsp;&nbsp;&nbsp;
订单生成时间：<font color="red">${orders.commitTime }</font>&nbsp;&nbsp;&nbsp;
成交金额：<font color="red">${orders.amount }</font>
<p>以下是该定单详细信息：</p>
<table border="1" cellspacing="0" style="margin-left: 5%;width: 90%;">
	<tr>
		<td>序号</td>
		<td>描述</td>
		<td>单价(元)</td>
		<td>购票数(张)</td>
		<td>总金额(元)</td>
	</tr>
	<c:forEach items="${list  }" var="list1" varStatus="status">
	<tr>
		<td width="10%;">${status.count }</td>
		<td width="40%;">${list1.descs }</td>
		<td width="10%;">${list1.price }</td>
		<td width="10%;" >${list1.quantity }</td>
		<td width="10%;" >${list1.amount }</td>
	</tr>
	</c:forEach>
	<tr>
		<td>总计</td>
		<td></td>
		<td></td>
		<td>${sumTicket }</td>
		<td>${sumMoney }</td>
	</tr>
</table>
<br/>
<p><font color="blue">该定单已出票，两日内将通过快递送达，请注意查收。</font></p>
</body>
</html>