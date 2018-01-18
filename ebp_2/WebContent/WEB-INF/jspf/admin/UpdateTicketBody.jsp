<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix = "form" uri="http://www.springframework.org/tags/form" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>更新票务信息</title>
</head>
<body>
<%--    <jsp:useBean id="ticketBean" scope = "request"
    class = "com.oracle.ebp.domain.Ticket"></jsp:useBean>
   <c:url var = "url" value = "admin/AdminUpdateTicketById" scope = "request"></c:url> --%>
   <form:form modelAttribute = "ticketBean" action = "admin/AdminUpdateTicketById" method = "post" id="form1">
     <p>
       <font color="red" size = "-1">
       <i><form:errors/></i>
       </font>  
     </p>
     <form:input type="hidden" path="tid"/><br/><br/>
		<table>
			<tr>
				<td>描述：</td>
				<td><form:input path='descs' /></td>
				<td><font color="red" size="-1"><i><form:errors path='descs' /></i></font> 			
				<br></br></td>
			</tr>
			<tr>
				<td>总票数：</td>
				<td><form:input path='amount' /><br />
				<br /></td>
				<td><font color="red" size="-1"> <i><form:errors
								path='amount' /></i>
				</font> <br></br></td>
			</tr>
			<tr>
				<td>剩余票数：</td>
				<td><form:input path='balance' /><br />
				<br /></td>
				<td><font color="red" size="-1"> <i><form:errors
								path='balance' /></i>
				</font> <br></br></td>
			</tr>
			<tr>
				<td>单价(元)：</td>
				<td><form:input path='price' /><br />
				<br /></td>
				<td><font color="red" size="-1"> <i><form:errors
								path='price' /></i>
				</font> <br></br></td>
			</tr>
		</table>
		<input type="button" value="修改" onclick="register()"/>
        <input type="reset" />
	</form:form> 
<%-- <form action="admin/AdminUpdateTicketById" method="post"  id="form1">
<input type="hidden" name="tid" value="${ticketBean.tid }"/><br/><br/>
描述：<input type="text" name="descs" value="${ticketBean.descs }"/><br/><br/>
总票数：<input type="text" name="amount" value="${ticketBean.amount }"/><br/><br/>
剩余票数：<input type="text" name="balance" value="${ticketBean.balance }"/><br/><br/>
单价(元)：<input type="text" name="price" value="${ticketBean.price }"/><br/><br/>
<input type="button" value="修改" onclick="register()"/>
<input type="reset" />
</form> --%>
</body>
<script type="text/javascript">
	function register(){
		var form1 = document.getElementById("form1");
		form1.submit();
	}
</script>
</html>