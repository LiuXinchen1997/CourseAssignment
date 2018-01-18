<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<style type="text/css">
	td{
		text-align: center;
	}
</style>

<table border="1" cellspacing="0" style="margin-left: 5%;width: 90%;">
	<tr>
		<th>序号</th>
		<th>描述</th>
		<th>单价(元)</th>
		<th>购票数(张)</th>
		<th>总金额(元)</th>
		<th></th>
	</tr>
	<c:forEach items="${shopping_cart}" var="list1">
	<tr>
		<td width="10%;">${list1.key }</td>
		<td width="40%;">${list1.value.descs }</td>
		<td width="10%;">${list1.value.price }</td>
		<td width="10%;" >${list1.value.number }</td>
		<td width="10%;" >${list1.value.number * list1.value.price }</td>
		<td><input type="button"  value="删除" onclick="delectbuychar(${list1.key })" /></td>
	</tr>
	</c:forEach>
	<tr>
		<td>总计</td>
		<td ><font color="red">${errop }</font></td>
		<td></td>
		<td>${sumTicket}</td>
		<td>${sumMoney}</td>
		<td></td>
	</tr>
</table>
<table border="0" cellspacing="0" style="margin-left: 5%;width: 90%;margin-top: 2%;">
	<tr>
		<td width="80%" style="text-align: right;"><input type="button" style="width: 80px;" value="继续订票" onclick="contuen()" /></td>
		<td width="20%"><input type="button" style="width: 80px;" value="结 账 "  onclick="Checkout(${sumMoney})" /></td>
	</tr>
</table>

<script type="text/javascript">
	function contuen(){
		window.location="user/queryTicketsByDate";
	}
	function delectbuychar(key){
		window.location="user/deleteCart?key="+key;
	}
	function Checkout(sumMoney){
 		window.location="user/summaryMoney?money="+sumMoney;
	}
</script>
