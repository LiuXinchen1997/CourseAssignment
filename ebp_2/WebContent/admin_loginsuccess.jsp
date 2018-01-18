<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Hello Admin!</title>
    <script type="text/javascript" src="/ebp_2/jQuery/jquery-1.6.2.min.js"></script>
</head>
<body>
User Login success!<br><br>
<input id="admin_out" type="button" value="退出登录" onClick="out()"/>
</body>
<script>
function out()
{
    $.ajax(
    {
      type:"post",
      async:true,
      url:"adminout.jsp",
      success:statechange
    });
}
function statechange()
{
	alert("退出成功！");
	self.location='adminlogin.jsp';
}
</script>
</html>