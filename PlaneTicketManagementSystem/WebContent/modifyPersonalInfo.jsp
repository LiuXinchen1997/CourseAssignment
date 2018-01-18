<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ page import="com.PTMSystem.bean.User"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="viewport" content="width=device-width, inital-scale=1">
<script type="text/javascript" src="jQuery/jquery-3.1.1.min.js"></script>
<script type="text/javascript" src="Bootstrap/js/bootstrap.min.js"></script>
<link href="Bootstrap/css/bootstrap.min.css" type="text/css"
	rel="stylesheet">
<title>修改个人信息</title>
</head>
<%
	User user = (User) session.getAttribute("user");
%>
<body background="image/background2.jpg">
	<div class="container">
		<form action="modifyPersonalInfoSubmit.action" method="post"
			class="form-horizontal">
			<fieldset>
				<legend>
					<label><span class="glyphicon glyphicon-user"> </span>&nbsp;修改个人信息</label>
				</legend>

				<div class="form-group">
					<label class="col-md-3 control-label" for="email">电子邮箱:
					</label>
					<div class="col-md-5">
						<input type="text" id="email" name="email"
							class="form-control" value="<%=user.getEmail()%>">
					</div>
				</div>
				
				<div class="form-group">
					<label class="col-md-3 control-label" for="tel">手机号码:
					</label>
					<div class="col-md-5">
						<input type="text" id="tel" name="tel"
							class="form-control" value="<%=user.getTel()%>">
					</div>
				</div>
				
				<div class="form-group">
					<label class="col-md-3 control-label" for="idnum">身份证号:
					</label>
					<div class="col-md-5">
						<input type="text" id="idnum" name="idnum"
							class="form-control" value="<%=user.getIdnum()%>">
					</div>
				</div>
				
				<div class="form-group">
					<label class="col-md-3 control-label" for="sex">性别:
					</label>
					<div class="col-md-5">
						<input type="radio" id="sexMale" name="sex" value="男" 
						 checked="checked">男
						 <input type="radio" id="sexFemale" name="sex" value="女" 
						>女
					</div>
				</div>
				
				<div class="form-group" id="buttonDiv">
					<div class="col-md-5 col-md-offset-3">
						<button type="submit" id="submit" class="btn btn-xs btn-primary">提交</button>
						<button type="reset" id="reset" class="btn btn-xs btn-warning">重置</button>
					</div>
				</div>
			</fieldset>
		</form>
	</div>
</body>
</html>