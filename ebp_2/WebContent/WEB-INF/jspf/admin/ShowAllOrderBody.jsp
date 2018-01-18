<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<c:url var="queryByDateUrl" value="/admin/queryOrderByDate" scope="request" />
<c:url var="queryByAdminUrl" value="/admin/GetUserByAdmin_oni" scope="request" />

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<script type="text/javascript" src="../js/jquery-1.6.2.js"></script>
<script type="text/javascript" src="../js/jquery-ui-1.8.5.custom.min.js"></script>
<script type="text/javascript" src="../js/jquery.ui.datepicker-zh-CN.js"></script>
<script type="text/javascript">
var selectType = -1;
$(function(){
	$("#starttime").datepicker();
	$("#endtime").datepicker();
});
function GetUserByAdmin_Sday_Eday(){
	selectType = 0;
	window.location="${queryByDateUrl}?begin="+$("#starttime").val()+"&end="+$("#endtime").val();
}
function GetUserByAdmin_oni(){
	selectType = 1;
	window.location="${queryByAdminUrl}?sname="+$("#sname").val()+"&sidCard="+$("#sidCard").val()+"&soid="+$("#soid").val();
}
</script>
<body>
	<table border="1" cellspacing="0"
		style="width: 100%; border-left: 0; border-top: 0; border-right: 0;">
		<tr>
			<td colspan="8"
				style="border: 0; padding-bottom: 2%; text-align: left;">
				起始日期：<input type="text" id="starttime" name="stardate" value = "${begin}"/> 
				终止日期：<input type="text" id="endtime" name="enddate" value = "${end}"/>
				<input type="submit" value="查询" onclick="GetUserByAdmin_Sday_Eday()" />
			</td>
		</tr>
		<tr>
			<td colspan="8"
				style="border-left: 0; border-top: 0; border-right: 0; padding-bottom: 2%; text-align: left;">
				订单号：<input type="text" id="soid" name="enddate" value = "${soid}"/> 
				姓名/用户名：<input type="text" id="sname" name="stardate" value = "${sname}" /> 
				身份证号：<input type="text" id="sidCard" name="enddate" value = "${sidCard}"/> 
				<input type="submit" value="查询" onclick="GetUserByAdmin_oni()" />
			</td>
		</tr>
  
		<tr align="center">
			<th>编号</th>
			<th>订单号</th>
			<th>订单内容</th>
			<th>成交时间</th>
			<th>金额(元)</th>
			<th>姓名</th>
			<th>用户名</th>
			<th>身份证号</th>
		</tr>
		<c:forEach items="${list }" var="orders" varStatus="sta">
			<tr align="center">
				<td>${sta.count }</td>
				<td>${orders.oid }</td>
				<td>${orders.orderList.descs }</td>
				<td>${orders.commitTime }</td>
				<td>${orders.orderList.price}</td>
				<td>${orders.user.name }</td>
				<td>${orders.user.username }</td>
				<td>${orders.user.idCard }</td>
			</tr>
		</c:forEach>
	</table>
	
	
	<table border="0" cellspacing="0"
		style="width: 100%; border-left: 0; border-top: 0; border-right: 0;">	
		<tr align="center">
		     <td><font color = "red"><p>${error}</p></font></td>
		</tr>
		<tr align="center">
			<td colspan="8">
            <c:if test = "${begin != null || end != null }" var = "bool">
			  <a href="admin/queryOrderByDate?currentPage=1&begin=${begin}&end=${end}">首页</a>
				<a href="admin/queryOrderByDate?currentPage=${currentPage-1}&begin=${begin}&end=${end}">上一页</a>
				${currentPage}/${pageCount}<a
				href="admin/queryOrderByDate?currentPage=${currentPage+1 }&begin=${begin}&end=${end}">下一页</a> <a
				href="admin/queryOrderByDate?currentPage=${pageCount}&begin=${begin}&end=${end}">尾页</a>
			</c:if>
			<c:if test = "${!bool}">
			    <a href="admin/GetUserByAdmin_oni?currentPage=1&sname=${sname}&soid=${soid}&sidCard=${sidCard}">首页</a>
				<a href="admin/GetUserByAdmin_oni?currentPage=${currentPage-1}&sname=${sname}&soid=${soid}&sidCard=${sidCard}">上一页</a>
				${currentPage}/${pageCount}<a
				href="admin/GetUserByAdmin_oni?currentPage=${currentPage+1 }&sname=${sname}&soid=${soid}&sidCard=${sidCard}">下一页</a> <a
				href="admin/GetUserByAdmin_oni?currentPage=${pageCount}&sname=${sname}&soid=${soid}&sidCard=${sidCard}">尾页</a>
			</c:if>
			</td>
		</tr>
	</table>
</body>
</html>