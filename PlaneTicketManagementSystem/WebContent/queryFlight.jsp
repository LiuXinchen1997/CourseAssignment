<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="viewport" content="width=device-width, inital-scale=1">
<script type="text/javascript" src="jQuery/jquery-3.1.1.min.js"></script>
<script type="text/javascript" src="Bootstrap/js/bootstrap.min.js"></script>
<link href="Bootstrap/css/bootstrap.min.css" type="text/css"
	rel="stylesheet">
<link href="Bootstrap/css/bootstrap-datetimepicker.min.css"
	rel="stylesheet" media="screen">


<title>查询航班</title>
</head>
<body background="image/background3.jpg">
	<div class="container">
		<form name="form1" method="post" action="queryFlight.action" class="form-horizontal">
			<fieldset>
				<legend>
					<label>查询机票：</</label>
				</legend>
				
				<div class="form-group">
					<label class="col-md-3 control-label" for="username">起点:</label>
					<div class="col-md-5">
						<input name="startPoint" type="text" id="startPoint" 
						class="form-control" placeholder="请输入起始地点"/>
					</div>
				</div>
				
				<div class="form-group">
					<label class="col-md-3 control-label" for="username">终点:</label>
					<div class="col-md-5">
						<input name="endPoint" type="text" id="endPoint" 
						class="form-control" placeholder="请输入到达地点"/>
					</div>
				</div>
				
				<div class="form-group">
					<label for="dtp_input" class="col-md-3 control-label">日期：</label>
					<div class="input-group date form_date col-md-5" data-date=""
						data-date-format="dd MM yyyy" data-link-field="dtp_input"
						data-link-format="yyyy-mm-dd">
						<input class="form-control" size="16" type="text" value=""
							name="startDate" readonly> <span
							class="input-group-addon"><span
							class="glyphicon glyphicon-remove"></span></span> <span
							class="input-group-addon"><span
							class="glyphicon glyphicon-calendar"></span></span>
					</div>
					<input type="hidden" id="dtp_input" value="" /><br />
				</div>
				
				<div class="form-group">
					<label for="dtp_input" class="col-md-3 control-label">排序方式：</label>
					<div class="col-md-5">
						<select name="sort" id="sort">
							<option value="fid">航班号</option>
							<option value="startDate">起始时间</option>
							<option value="endDate">结束时间</option>
						</select>
					</div>
					<div class="col-md-4">
						<button type="submit" id="submit" class="btn btn-xs btn-primary">查询</button>
						<button type="reset" id="reset" class="btn btn-xs btn-warning">重置</button>
					</div>
				</div>
			</fieldset>
		</form>
	</div>



	<table width="100%" border="0" cellspacing="0" cellpadding="0">
		<tr align="center" class="t1">
			<td height="25" bgcolor="#D5E4F4"><strong>航班号</strong></td>
			<td bgcolor="#D5E4F4"><strong>起点</strong></td>
			<td bgcolor="#D5E4F4"><strong>中转点</strong></td>
			<td bgcolor="#D5E4F4"><strong>终点</strong></td>
			<td bgcolor="#D5E4F4"><strong>起始时间</strong></td>
			<td bgcolor="#D5E4F4"><strong>到达时间</strong></td>
			<td bgcolor="#D5E4F4"><strong>状态</strong></td>
			<td bgcolor="#D5E4F4"><strong>客机号</strong></td>
		</tr>
		<s:iterator value="list">
			<tr align="center">
				<td height="25" align="center">${fid}</td>
				<td>${startPoint}</td>
				<td>${middlePoint}</td>
				<td>${endPoint}</td>
				<td align="center">${startDate}</td>
				<td align="center">${endDate}</td>
				<td align="center">${status}</td>
				<td align="center">${pid}</td>

				<td align="center"><a href="BuyTicket.action?fid=${fid}">我要购买</a>
				</td>
			</tr>
		</s:iterator>
	</table>













	<script type="text/javascript"
		src="Bootstrap/js/bootstrap-datetimepicker.js" charset="UTF-8"></script>
	<script type="text/javascript"
		src="Bootstrap/js/bootstrap-datetimepicker.zh-CN.js" charset="UTF-8"></script>
	<script type="text/javascript">
		$('.form_date').datetimepicker({
			language : 'fr',
			weekStart : 1,
			todayBtn : 1,
			autoclose : 1,
			todayHighlight : 1,
			startView : 2,
			minView : 2,
			forceParse : 0
		});
	</script>
</body>
</html>