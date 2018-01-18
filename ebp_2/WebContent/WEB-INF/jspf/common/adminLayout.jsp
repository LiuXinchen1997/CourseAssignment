<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>电子商务平台</title>
        <link href="css/style.css" rel="stylesheet" type="text/css" />
        <link href="css/ui-lightness/jquery-ui-1.8.5.custom.css" rel="stylesheet" type="text/css" />
        <script type="text/javascript" src="js/jquery-1.6.2.min.js"></script>
		<script type="text/javascript" src="js/jquery-ui-1.8.5.custom.min.js"></script>
		<script type="text/javascript" src="js/jquery.ui.datepicker-zh-CN.js"></script>
    </head>

    <body>
        <div id="main_page">
            <div id="header">
                <img src="images/bg-logo.jpg"/>
            </div>
            <div id="body">
                <div id="navigation">
                    <div id="inner">
                        <p>当前用户： ${session_admin.username }</p>
                        <ul>
                            <li><a href="admin/index.jsp" class="index">首&nbsp;&nbsp;&nbsp;页</a><li>
                            <li><a href="admin/queryAllOrderList" class="personal">票项管理</a><li>
                            <li><a href="admin/queryUsersByDatePage" class="exam">用户管理</a><li>
                            <li><a href="admin/queryOrderByDate" class="examlog">订单管理</a><li>
                            <li><a href="admin/logout" class="logout" onClick="return confirm('您确定要退出吗？')">退&nbsp;&nbsp;&nbsp;出</a><li>
                        </ul>
                    </div>
                </div>
                <div id="content">
                    <div class="title">
                        <p><img src="images/icon-title.jpg" /> 管理员页面</p>
                    </div>
                    <div class="main">
							<jsp:include page="${param.mainbody}"/>                        
                    </div>
                </div>  <!--content-->
            </div>  <!--body-->
        </div>
    </body>
</html>
