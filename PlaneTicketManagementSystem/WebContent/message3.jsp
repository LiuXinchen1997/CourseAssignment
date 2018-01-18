<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ page import="com.PTMSystem.bean.User" %>
<%@ page import="com.PTMSystem.bean.BankInfo" %>
<%@ page import="com.PTMSystem.dao.BankInfoDao" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>查看个人信息</title>
</head>
<body>
<a href="index.jsp">返回主页面</a> <br/>
<%
	User user = (User)session.getAttribute("user");
	if (user != null) {
%>
	<table align="center" width="300" border="0">
		<tr>
			<td align="right">用户名：</td>
			<td>
				<%=user.getUsername() %>
			</td>
		</tr>
		<tr>
			<td align="right">性别：</td>
			<td>
				<%=user.getSex() %>
			</td>
		</tr>
		<tr>
			<td align="right">电子邮箱：</td>
			<td>
				<%=user.getEmail() %>
			</td>
		</tr>
		<tr>
			<td align="right">手机号：</td>
			<td>
				<%=user.getTel() %>
			</td>
		</tr>
		<tr>
			<td align="right">身份证号：</td>
			<td>
				<%=user.getIdnum() %>
			</td>
		</tr>
		<tr>
			<td align="right">积分：</td>
			<td>
				<%=user.getPoint() %>
			</td>
		</tr>
	
	<%
		BankInfo bankInfo = new BankInfoDao().getBankInfoByUsername(user.getUsername());
		if (bankInfo != null) {
	%>
		<tr>
			<td align="right">银行卡号：</td>
			<td>
				<%=bankInfo.getBankId() %>
			</td>
		</tr>
		
		<tr>
			<td align="right">银行名称：</td>
			<td>
				<%=bankInfo.getBankName() %>
			</td>
		</tr>
	<%} %>
	</table>
		<br/> <br/>
		
		<a href="modifyPassword.action">修改密码</a> <br>
		<a href="modifyPersonalInfo.action">修改个人信息</a> <br>
		<% if (bankInfo == null) { %>
			<a href="addBankInfo.action">绑定银行卡</a>
		<%} %>
		<%if (bankInfo != null) { %>
			<a href="addBankInfo.action">重新绑定银行卡</a>
		<%} %>
	<%
	} else {
		out.print("<script language='javascript'>alert('请您先登录！');window.location='login.jsp';</script>");
	}
	%>
</body>
</html>