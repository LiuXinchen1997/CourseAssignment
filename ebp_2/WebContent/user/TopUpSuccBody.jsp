

<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>充值成功</title>

<link rel="stylesheet" type="text/css" href="/ebp_2/bootstrap/css/bootstrap.min.css">
<script src="/ebp_2/bootstrap/css/bootstrap-theme.min.css"></script>
<script type="text/javascript" src="/ebp_2/js/jquery-1.6.2.min.js"></script>
<script type="text/javascript" src="/ebp_2/js/jquery-ui-1.8.5.custom.min.js"></script>
<script src="/ebp_2/bootstrap/js/bootstrap.min.js"></script>
<style type="text/css"> 
ul.order_details {
	position: relative;
	margin-left: 0;
	border: 1px solid rgba(0, 0, 0, 0.1);
	list-style: none;
}

ul.order_details::after {
	display: table;
	clear: both;
	content: "";
}

ul.order_details li {
	float: left;
	padding: 1em 1.618em;
	border-right: 1px solid rgba(0, 0, 0, 0.1);
	font-size: 0.8em;
	text-transform: uppercase;
}

ul.order_details li:last-child {
	border-right: 0;
}

ul.order_details li strong {
	display: block;
	font-size: 1.387em;
	text-transform: none;
}
table {
   border: 0px solid transparent !important;	
}
.container {
    padding: 15px,15px,15px,15px;
    /* margin: 15px,15px,15px,15px; */

}
</style>
</head>
<body style='color:#000;font-family:Microsoft YaHei;'>

<%@include file="header.jsp"%> 
<div class="stars"></div>
<div  class="container" style="background:rgba(208,208,208,0.95);margin-top:50px;margin-bottom:50px;height:500px;padding:20px;border-radius:25px;border:2px">
 <h3 class="text-center" style='font-family:Microsoft YaHei;font-size:50px;color:red'>
				充值成功
			</h3><hr />	
	
            <ul  style = "font-size:15px;">

				<li  style='font-family:Microsoft YaHei;font-size:30px'>
					用户名:					<strong>${session_user.username}</strong>
				</li><br><br>

				<li style='font-family:Microsoft YaHei;font-size:30px'>
					 充值方式:					<strong>${type }</strong>
				</li><br><br>
				

				<li style='font-family:Microsoft YaHei;font-size:30px'>
					充值金额:					<strong>${money}</strong>
				</li><br><br>
				
				<li style='font-family:Microsoft YaHei;font-size:30px'>
					充值金额:					<strong>${session_user.balance }</strong>
				</li>


				
			</ul>
			<hr />
			<center>
			<a  href='/ebp_2/user/user_center.jsp'><input class='btn'  value='返回个人中心' type='butten'/></a>
			</center>
			
</div>
<%@include file="footer.jsp"%> 
</body>
</html>       