<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ page import="com.PTMSystem.bean.User"%>
<%@ page import="com.PTMSystem.bean.BankInfo"%>
<%@ page import="com.PTMSystem.dao.BankInfoDao"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>欢迎来到航空之家~</title>
<link rel="shortcut icon" type="image/x-icon"
	href="indexres/css/images/favicon.ico" />
<link rel="stylesheet" href="indexres/css/style.css" type="text/css"
	media="all" />
<!--link rel="stylesheet" href="css/flexslider.css" type="text/css" media="all" />
	
	<script src="js/jquery-1.7.2.min.js" type="text/javascript"></script>
	<!--[if lt IE 9]>
		<script src="js/modernizr.custom.js"></script>
	<![endif]-->
<script src="indexres/js/jquery.flexslider-min.js"
	type="text/javascript"></script>
<script src="indexres/js/functions.js" type="text/javascript"></script>
</head>
<%
	User user = (User) session.getAttribute("user");
	if (user == null) {
		out.print("<script language='javascript'>alert('请您先登录！');window.location='login.jsp';</script>");
	}
%>
<body>
	<!-- wrapper -->
	<div id="wrapper">
		<!-- shell -->
		<div class="shell">
			<!-- container -->
			<div class="container">

				<!-- header -->
				<header class="header">

				<h1 id="logo">
					<a href="#"></a>
				</h1>

				<nav id="navigation">
				<ul>
					<li><a href="modifyPassword.action">修改密码</a></li>
					<li><a href="modifyPersonalInfo.action">修改个人信息</a></li>

					<%
						BankInfo bankInfo = new BankInfoDao().getBankInfoByUsername(user.getUsername());
						if (bankInfo == null) {
					%>
					<li><a href="addBankInfo.action">绑定银行卡</a></li>
					<%
						} else {
					%>
					<li><a href="addBankInfo.action">重新绑定银行卡</a></li>
					<%
						}
					%>

					<li><a href="index.jsp">返回主界面</a></li>
				</ul>
				</nav>

				<div class="cl">&nbsp;</div>
				</header>
				<!-- end of header -->
				<div class="main">
					<!-- slider -->
					<div class="flexslider">
					
					
					
						<table align="center" width="300" border="0">
							<tr>
								<td align="right"><h2>用户名：</h2></td>
								<td><h2><%=user.getUsername()%></h2></td>
							</tr>
							<tr>
								<td align="right"><h2>性别：</h2></td>
								<td><h2><%=user.getSex()%></h2></td>
							</tr>
							<tr>
								<td align="right"><h2>电子邮箱：</h2></td>
								<td><h2><%=user.getEmail()%></h2></td>
							</tr>
							<tr>
								<td align="right"><h2>手机号：</h2></td>
								<td><h2><%=user.getTel()%></h2></td>
							</tr>
							<tr>
								<td align="right"><h2>身份证号：</h2></td>
								<td><h2><%=user.getIdnum()%></h2></td>
							</tr>
							<tr>
								<td align="right"><h2>积分：</h2></td>
								<td><h2><%=user.getPoint()%></h2></td>
							</tr>

							<%
								bankInfo = new BankInfoDao().getBankInfoByUsername(user.getUsername());
								if (bankInfo != null) {
							%>
							<tr>
								<td align="right"><h2>银行卡号：</h2></td>
								<td><h2><%=bankInfo.getBankId()%></h2></td>
							</tr>

							<tr>
								<td align="right"><h2>银行名称：</h2></td>
								<td><h2><%=bankInfo.getBankName()%></h2></td>
							</tr>
							<%
								}
							%>
							
							
						</table>
						<br /> <br />
					</div>
					<!-- end of slider -->
					<!-- cols -->
					<section class="cols">
					<div class="cl">&nbsp;</div>
					</section>
					<!-- end of cols  -->


					<!-- end of container -->
					<div class="footer">
						<nav class="footer-nav">
						<ul>
							<li><a href="modifyPassword.action">修改密码</a></li>
							<li><a href="modifyPersonalInfo.action">修改个人信息</a></li>

							<%
								if (bankInfo == null) {
							%>
							<li><a href="addBankInfo.action">绑定银行卡</a></li>
							<%
								} else {
							%>
							<li><a href="addBankInfo.action">重新绑定银行卡</a></li>
							<%
								}
							%>

							<li><a href="index.jsp">返回主界面</a></li>
						</ul>
						</nav>
						<p class="copy">Copyright &copy; 2017 All Rights Reserved.</p>
					</div>
				</div>
				<!-- end of shell -->
			</div>
			<!-- end of wrappert -->
</body>
</html>