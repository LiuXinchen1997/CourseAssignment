<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="viewport" content="width=device-width, inital-scale=1">
<script type="text/javascript" src="jQuery/jquery-3.1.1.min.js"></script>
<script type="text/javascript" src="Bootstrap/js/bootstrap.min.js"></script>
<link href="Bootstrap/css/bootstrap.min.css" type="text/css" rel="stylesheet">
<script type="text/javascript" src="js/login.js"></script>
<title>管理员登录界面</title>
</head>
<body background="image/background.jpg">
	<div class="container">
		<form id="loginForm" action="adminLogin" method="post" class="form-horizontal" onsubmit="return check();">
			<fieldset>
				<legend><label><span class="glyphicon glyphicon-user">
				</span>&nbsp;管理员登录</label></legend>
				
				<div class="form-group">
					<span class='col-md-5 col-md-offset-3 text-danger'>
						${info}
					</span>
				</div>
				
				<div class="form-group" id="usernameDiv">
					<label class="col-md-3 control-label" for="username">用户名: </label>
					<div class="col-md-5">
						<input type="text" id="username" name="username" class="form-control" placeholder="欢迎您，管理员~">
					</div>
					<div class="col-md-4" id="usernameSpan"></div>
				</div>
				
				<div class="form-group" id="passwordDiv">
					<label class="col-md-3 control-label" for="password">密码: </label>
					<div class="col-md-5">
						<input type="password" id="password" name="password" class="form-control" placeholder="请输入用户密码">
					</div>
					<div class="col-md-4" id="passwordSpan"></div>
				</div>
				
				<div class="form-group" id="buttonDiv">
					<div class="col-md-5 col-md-offset-3">
						<button type="submit" id="submit" class="btn btn-xs btn-primary">登录</button>
						<button type="reset" id="reset" class="btn btn-xs btn-warning">重置</button>
					</div>
				</div>
				
			</fieldset>
		</form>
	</div>
	<script type="text/javascript" src="js/canvas-nest.js"></script>
</body>
</html>