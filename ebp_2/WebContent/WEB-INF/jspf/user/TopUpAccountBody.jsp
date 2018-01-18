<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<jsp:useBean id="topUpAccountBean" class="com.oracle.ebp.domain.TopUpAccountBean" scope="request"/>
<c:url var="url" value="/user/topUpMoney" scope="request" />

<div id="myDiv">
用&nbsp;&nbsp;&nbsp;&nbsp;户：${session_user.username }
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<font color="red">${errors_balance}</font>
<br/><br/><br/>
账户余额：${session_user.balance }
<br/><br/><br/>
<form:form modelAttribute="topUpAccountBean" action="${url}" method="post">
	<p>
		<font color="red" size="-1">
			<i><form:errors /></i>
		</font>
	</p>
	充值方式：
	<form:select path="type">
		<c:if test="${(empty param.type) or (param.type eq '')}">		
			<form:option value="">请选择...</form:option>
		</c:if>
		
		<form:option value="空中充值">空中充值</form:option>
		<form:option value="支付宝">支付宝</form:option>
		<form:option value="微信">微信</form:option>
		<form:option value="储蓄卡">储蓄卡</form:option>
	</form:select>
	<font color="red" size="-1">
		<i><form:errors path="type" /></i>
	</font>
	<br/><br/><br/>
	
	充值金额：<form:input path="money" value=""/>
	<font color="red" size="-1">
		<i><form:errors path="money" /></i>
	</font>
	<br/><br/><br/>
	
	<input type="submit" class="button" style="margin-left: 35px;"  value="充值"/>
</form:form>
</div>