<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<jsp:useBean id="addTicketBean" class="com.oracle.ebp.domain.AddTicketBean" scope="request"/>
<c:url var="url" value="/admin/AddTicket" scope="request" />

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<script type="text/javascript" src="../js/jquery-1.4.2.js"></script>
<script type="text/javascript" src="../js/jquery-ui-1.8.5.custom.min.js"></script>
<script type="text/javascript" src="../js/jquery.ui.datepicker-zh-CN.js"></script>
<script type="text/javascript">
	$(function(){
		$("#date").datepicker();
	});
</script>
<body>
<form:form modelAttribute="addTicketBean" action="${url}" method="post" id="form1">
	<p><font color="red" size="-1"><i><form:errors /></i></font></p> <br><br>
	
	影片名：<form:input path="descs"/>
	<p><font color="red" size="-1">
		<i><form:errors path="descs" /></i>
	</font></p><br/><br/>
	
	开始时间：<form:input path="startTime"/><br/><br/>
	<p><font color="red" size="-1">
		<i><form:errors path="startTime" /></i>
	</font></p><br/><br/>
	
	总票数：<form:input path="amount" /><br/><br/>
	<p><font color="red" size="-1">
		<i><form:errors path="amount" /></i>
	</font></p><br/><br/>
	
	剩余票数：<form:input path="balance" /><br/><br/>
	<p><font color="red" size="-1">
		<i><form:errors path="balance" /></i>
	</font></p><br/><br/>
	
	单价(元)：<form:input path="price"/><br/><br/>
	<p><font color="red" size="-1">
		<i><form:errors path="price" /></i>
	</font></p><br/><br/>
	
	状态：<form:radiobutton path="status" value="0" checked="checked"/>售票中
	<form:radiobutton path="status" value="1"/>已停售<br/><br/>
	<input type="submit" value="提交" />
	<input type="reset" value="重置" />
</form:form>
</body>
</html>