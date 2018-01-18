<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<jsp:useBean id="addTicketBean" class="com.oracle.ebp.domain.AddTicketBean" scope="request"/>
<c:url var="url" value="/admin/AddTicket" scope="request" />
<c:url var="addImageUrl" value="/admin/addTicketImage" scope="request" />
<c:url var="addDescsUrl" value="/admin/addTicketDescs" scope="request" />
<c:url var="addDetailUrl" value="/admin/addTicketDetail" scope="request" />
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <title>管理员界面</title>
    <script type="text/css">
        body{
            font-family: 'microsoft yahei',Arial,sans-serif;
            margin:0;
            padding:0;
        }
    </script>

    <link href="/ebp_2/bootstrap/css/bootstrap.min.css" rel="stylesheet" media="screen">
    <link href="/ebp_2/css/bootstrap-datetimepicker.css" rel="stylesheet" media="screen">
</head>
<body style="font-family: 'Microsoft YaHei UI';background-color: #f0ebe7">
<!-- 导航栏部分 -->
<div class="navbar navbar-inverse" style="margin: 0">
    <div class="container-fluid">
        <div class="navbar-header">
            <div class="navbar-brand">
                <!--<small class="glyphicon glyphicon-fire"></small>-->
                <!--<img class="img-circle" src="textrue/logo1.png" width="30" height="30">-->
                星环影城--管理员后台界面
            </div>
        </div>
        <ul class="nav navbar-nav nav-stacked navbar-right">
            <li>
                <a href="" data-toggle="dropdown">
                    <span class="glyphicon glyphicon-user"></span>
                    <!--<img class="img-circle" src="user_photo.png" width="30" height="30"/>-->
                    <small>欢迎</small>
                    admin
                    <span class="caret"></span>
                </a>
                <ul class="nav nav-pills nav-stacked dropdown-menu">
                    <li class="active">
                        <a href="">
                            <span class="glyphicon glyphicon-cog"></span>&nbsp;&nbsp;页面管理
                        </a>
                    </li>
                    <li class="divider"></li>
                    <li>
                        <a href="/ebp_2/admin/logout" onClick="return confirm('您确定要退出吗？')">
                            <span class="glyphicon glyphicon-off"></span>&nbsp;&nbsp;登出
                        </a>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</div>

<!-- 页面部分 -->

<div id="wrapper">
    <div class="col-md-12" style="margin: 20px 0 0 0">
    
   <jsp:useBean id="updateTicketBean" scope = "request" class = "com.oracle.ebp.domain.UpdateTicketBean"></jsp:useBean>
   <c:url var = "url" value = "admin/AdminUpdateTicketById" scope = "request"></c:url>
<center>
<form:form modelAttribute = "updateTicketBean" action = "/ebp_2/admin/AdminUpdateTicketById" method = "post" id="form1">
     <p>
       <font color="red" size = "-1">
       <i><form:errors/></i>
       </font>
     </p>
     <form:input type="hidden" path="tid"/><br/><br/>
		<table>
		
			<tr>
				<td>描述：</td>
				<td><form:input style='width:285px;margin-top:10px' class="form-control" path='descs' /></td>
				<td><font color="red" size="-1"><i><form:errors path='descs' /></i></font> <br></br><br></td>
				<td><font color="red"><i id="descsError"></i></font></td>
			</tr>
			
			<tr>
				<td>总票数：</td>
				<td><form:input style='width:285px;margin-top:10px' class="form-control" path='amount' /></td>
				<td><font color="red" size="-1"> <i><form:errors path='amount' /></i></font> <br></br></td>
				<td><font color="red"><i id="amountError"></i></font></td>
			</tr>
			
			<tr>
				<td>剩余票数：</td>
				<td><form:input style='width:285px;margin-top:10px' class="form-control" path='balance' /></td>
				<td><font color="red" size="-1"> <i><form:errors path='balance' /></i></font> <br></br></td>
				<td><font color="red"><i id="balanceError"></i></font></td>
			</tr>
			
			<tr>
				<td>单价(元)：</td>
				<td><form:input style='width:285px;margin-top:10px' class="form-control" path='price' /></td>
				<td><font color="red" size="-1"> <i><form:errors path='price' /></i></font> <br></br></td>
				<td><font color="red"><i id="priceError"></i></font></td>
			</tr>
		</table>
		
        <div class='row'>
            <input style='width:150px'  class="btn btn-success"  type="button" value="返回" onclick="history.go(-1);" />
			<input style='width:150px'  class="btn btn-warning" type="submit" value="提交"/>
        </div>
</form:form>
</center>
	<br>
    </div>
</div>

<script type="text/javascript">

    function register()
    {
		var form1 = document.getElementById("form1");
		form1.submit();
        alert('保存成功！');
    }
</script>
<script type="text/javascript" src="/ebp_2/jQuery/jquery-1.8.3.min.js" charset="UTF-8"></script>
<script type="text/javascript" src="/ebp_2/bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript" src="/ebp_2/js/bootstrap-datetimepicker.js" charset="UTF-8"></script>
<script type="text/javascript" src="/ebp_2/js/locales/bootstrap-datetimepicker.fr.js" charset="UTF-8"></script>
<script type="text/javascript" src="/ebp_2/js/change_ticket.js"></script>
</body>
</html>