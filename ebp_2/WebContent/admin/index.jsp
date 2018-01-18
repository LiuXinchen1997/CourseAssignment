<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<c:url var="queryByDateUrl" value="/admin/queryUsersByDatePage"
	scope="request" />
<c:url var="queryByConditionUrl" value="/admin/queryUsersByCondition"
	scope="request" />

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>管理员界面</title>
<script type="text/javascript" src="/ebp_2/jQuery/jquery-1.8.3.min.js" charset="UTF-8"></script>
<style type="text/css">
        body{
            font-family: 'microsoft yahei',Arial,sans-serif;
            margin:0;
            padding:0;
        }
</style>
<link href="/ebp_2/bootstrap/css/bootstrap.min.css" rel="stylesheet"
	media="screen">
<link href="/ebp_2/css/bootstrap-datetimepicker.css" rel="stylesheet"
	media="screen">
</head>
<body
	style="font-family: 'Microsoft YaHei UI'; background-color: #f0ebe7"
	onload="allstart">
	<!-- 导航栏部分 -->
	<div class="navbar navbar-inverse">
		<div class="container-fluid">
			<div class="navbar-header">
				<div class="navbar-brand">
					<!--<small class="glyphicon glyphicon-fire"></small>-->
					<!--<img class="img-circle" src="textrue/logo1.png" width="30" height="30">-->
					星环影城--管理员后台界面
				</div>
			</div>
			<ul class="nav navbar-nav nav-stacked navbar-right">
				<li><a href="" data-toggle="dropdown"> <span
						class="glyphicon glyphicon-user"></span> <!--<img class="img-circle" src="user_photo.png" width="30" height="30"/>-->
						<small>欢迎</small> admin <span class="caret"></span>
				</a>
					<ul class="nav nav-pills nav-stacked dropdown-menu">
						<li class="active"><a href=""> <span
								class="glyphicon glyphicon-cog"></span>&nbsp;&nbsp;页面管理
						</a></li>

						<li class="divider"></li>
						<li><a href="/ebp_2/admin/logout" onClick="return confirm('您确定要退出吗？')"> <span class="glyphicon glyphicon-off"></span>&nbsp;&nbsp;登出
						</a></li>
					</ul></li>
			</ul>
		</div>
	</div>

	<!-- 页面部分 -->
	<div class="row">
		<div class="col-sm-2">
			<div class="panel-group" id="box">
				<div class="panel panel-success">
					<div class="panel-heading">
						<a href="#collapseA" data-parent="#box" data-toggle="collapse"
							class="panel-title">用户管理</a>
					</div>
					<div class="panel-collapse collapse in" id="collapseA">
						<div class="panel-body">
							<ul class="nav nav-pills nav-stacked">
								<li><a href="/ebp_2/admin/queryUsersByDatePage?currentPage=1">用户禁用</a></li>
							</ul>
						</div>
					</div>
				</div>
				<div class="panel panel-success">
					<div class="panel-heading">
						<a href="#collapseB" data-parent="#box" data-toggle="collapse"
							class="panel-title">票项管理</a>
					</div>
					<div class="panel-collapse collapse" id="collapseB">
						<div class="panel-body">
							<ul class="nav nav-pills nav-stacked">
								<li><a href="/ebp_2/admin/queryAllOrderList?currentPage=1">票项管理</a></li>
							</ul>
						</div>
					</div>
				</div>
				<div class="panel panel-success">
					<div class="panel-heading">
						<a href="#collapseC" data-parent="#box" data-toggle="collapse"
							class="panel-title">订单管理</a>
					</div>
					<div class="panel-collapse collapse" id="collapseC">
						<div class="panel-body">
							<ul class="nav nav-pills nav-stacked">
								<li><a href="/ebp_2/admin/queryOrderByDate?currentPage=1">订单查询</a></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="col-sm-10">
			<div class="bread-crumb">
				<ul class="breadcrumb">
					<li><span class="glyphicon glyphicon-home">Home</span></li>
				</ul>
			</div>

			<div class="panle panel-success">
				<center>
				<h2>欢迎您admin</h2>
				</center>
			</div>
		</div>
	</div>
	
	<script type="text/javascript"
		src="/ebp_2/bootstrap/js/bootstrap.min.js"></script>
	<script type="text/javascript"
		src="/ebp_2/js/bootstrap-datetimepicker.js" charset="UTF-8"></script>
	<script type="text/javascript"
		src="/ebp_2/js/locales/bootstrap-datetimepicker.fr.js" charset="UTF-8"></script>
	<script type="text/javascript">
    $('.form_datetime').datetimepicker({
        //language:  'fr',
        weekStart: 1,
        todayBtn:  1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        forceParse: 0,
        showMeridian: 1
    });
    $('.form_date').datetimepicker({
        language:  'fr',
        weekStart: 1,
        todayBtn:  1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0
    });
    $('.form_time').datetimepicker({
        language:  'fr',
        weekStart: 1,
        todayBtn:  1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 1,
        minView: 0,
        maxView: 1,
        forceParse: 0
    });
</script>
</body>
</html>