<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>订单查询</title>
<link
	href="http://cdn.bootcss.com/bootstrap/3.3.6/css/bootstrap.min.css"
	rel="stylesheet">
<link href="/ebp_2/bootstrap/css/bootstrap.min.css" rel="stylesheet"
	media="screen">
<link href="/ebp_2/css/bootstrap-datetimepicker.css" rel="stylesheet"
	media="screen">

<link rel="stylesheet" href="/ebp_2/css/orders.css" />
<style type="text/css">
.glyphicon {
	margin-right: 5px;
}
</style>
</head>
<body>
<div class="stars"></div>
	<jsp:include page='header.jsp' />

	<div class="container" style="margin-left: 0; margin-right: 0;" id="orders">
		<div class="row">
			<div id='silders' class="col-md-3" style="background-color: #222c2e" id="mysider">
				<br> <font
					style="font-size: 20px; padding-top: 30px; margin: 20px 10px 10px 0px; font-family: 'Microsoft YaHei'">订单查询</font>
				<form class="bs-example bs-example-form" role="form">
					<div class="row" style="padding: 20px 0px 10px 10px;">
						<div style="margin-right: 180px">起始日期</div>
						<div class="input-group date form_datetime col-md-5"
							data-date="1979-09-16T05:25:07Z"
							data-date-format="yyyy-mm-dd"
							data-link-field="dtp_input1">
							<input class="form-control" id="date1" style="width: 150px"
								type="text" value="" readonly> <span
								class="input-group-addon"><span
								class="glyphicon glyphicon-remove"></span></span> <span
								class="input-group-addon"><span
								class="glyphicon glyphicon-th"></span></span>
						</div>
						<input type="hidden" id="dtp_input9" value="" />
					</div>
					<div class="row" style="padding: 10px 0px 10px 10px;">
						<div class="input-group">
							<div style="margin-right: 180px">终止日期</div>
							<div class="input-group date form_datetime col-md-5"
								data-date="1979-09-16T05:25:07Z"
								data-date-format="yyyy-mm-dd"
								data-link-field="dtp_input1">
								<input class="form-control" id="date2" style="width: 150px"
									type="text" value="" readonly> <span
									class="input-group-addon"><span
									class="glyphicon glyphicon-remove"></span></span> <span
									class="input-group-addon"><span
									class="glyphicon glyphicon-th"></span></span>
							</div>
							<input type="hidden" id="dtp_input8" value="" />
						</div>
					</div>
					<div class="row" style="padding: 10px 0px 10px 10px;">
						<div class="input-group">
							<div style="margin-right: 180px">票名</div>
							<div class="input-group col-md-5">
								<input class="form-control" id="keyword" style="width: 239px; border-radius:3px;" type="text" value=""> 
							</div>
							<input type="hidden" id="dtp_input8" value="" />
						</div>
					</div>
					<div class="row" style="padding: 30px 0px 10px 10px;">
						<div class="input-group">
							<input
								style="width: 240px; height: 34px; color: #fff69e; padding: 0"
								 @click.stop.prevent="query()" class="btn" type="button" value="查询" />
						</div>
					</div>
					
					<div class="row" style="padding: 30px 0px 10px 10px;">
						<div class="input-group">
							<input
								style="width: 240px; height: 34px; color: #fff69e; padding: 0"
								 onclick='goback()' class="btn" type="button" value="返回" />
						</div>
					</div>
					
					<div class="row" style="padding: 10px 0px 10px 10px;">
						<div id="tips" class="alert alert-warning" hidden="hidden">
							<a href="" class="close" onclick="closethis"> &times; </a> <strong
								id="tip"></strong>
						</div>
					</div>
				</form>
			</div>
			<div id='orderlist' class="col-md-9" style="margin-left: 0px">
				<div class="main center_div">
					<!--begin: 标题-->
					<!-- <div class="title">
						<div style="font-size:30px;">订单查询</div>
					</div> -->
					<!--end: 标题-->

					<!--begin: 事件列表-->
					<br>
					<br>
					<br>
					<table class="orderlist"
						style="margin-left: 330px; border-top: 1px rgb(49, 59, 61)">
						<tr>
							<td width="100px">票名</td>
							<td width="100px">单价</td>
							<td width="50px">数量</td>
							<td width="100px">小计</td>
						</tr>
					</table>
					<div class="list">
						<ul>
							<template v-for="order in orders">
							<li><span class="lefttime"><i></i>{{order.commitTime}}</span>
								<div class="righttext">
									<div>
										<table class="orderlist">
											<tbody>
												<tr v-for="orderlist in order.orderlists">
													<td width="100px">{{orderlist.descs}}</td>
													<td width="100px">￥{{orderlist.price}}</td>
													<td width="50px">{{orderlist.quantity}}</td>
													<td width="100px">￥{{orderlist.amount}}</td>
												</tr>
											</tbody>
										</table>
										<p style="text-align: right; padding-right: 50px">总额：￥{{order.amount}}</p>
									</div>
								</div></li>
							</template>
						</ul>
					</div>
					<!--end: 事件列表-->
				</div>
			</div>
		</div>
	</div>
	<jsp:include page='footer.jsp' />
</body>
<script type="text/javascript" src="/ebp_2/jQuery/jquery-1.8.3.min.js"
	charset="UTF-8"></script>
<script src="/ebp_2/js/vue.js"></script>
<script src="/ebp_2/js/axios.min.js"></script>
<script src="/ebp_2/js/my-axios.js"></script>
<script src="/ebp_2/js/orders.js"></script>
<script src="http://cdn.bootcss.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
<script type="text/javascript" src="/ebp_2/bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript" src="/ebp_2/js/bootstrap-datetimepicker.js"
	charset="UTF-8"></script>
<script type="text/javascript"
	src="/ebp_2/js/locales/bootstrap-datetimepicker.fr.js" charset="UTF-8"></script>
<script type="text/javascript">
window.onload=function(){
   var temp=$('#orderlist').css('height');
    temp=parseInt(temp.replace('px',''));
    $('#silders').css('height',temp);
}
function goback()
{
	self.location='/ebp_2/user/user_center.jsp';
}
	$('.form_datetime').datetimepicker({
		//language:  'fr',
		weekStart : 1,
		todayBtn : 1,
		autoclose : 1,
		todayHighlight : 1,
		startView : 2,
		minView : 2,
		forceParse : 0,
		showMeridian : 1
	});
</script>
</html>