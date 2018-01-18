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
<script type="text/javascript" src="js/reg.js"></script>
<title>注册界面</title>
</head>
<body background="image/background.jpg">
	<div class="container">
		<form id="loginForm" action="doReg" method="post" class="form-horizontal" onsubmit="return check();">
			<fieldset>
				<legend><label><span class="glyphicon glyphicon-user">
				</span>&nbsp;用户注册</label></legend>
				
				<div class="form-group">
					<span class='col-md-5 col-md-offset-3 text-danger'>
						${msg}
					</span>
				</div>
				
				<div class="form-group" id="usernameDiv">
					<label class="col-md-3 control-label" for="username">用户名: </label>
					<div class="col-md-5">
						<input type="text" id="username" name="username" class="form-control" placeholder="请输入用户名">
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
				
				<div class="form-group" id="repasswordDiv">
					<label class="col-md-3 control-label" for="repassword">确认密码: </label>
					<div class="col-md-5">
						<input type="password" id="repassword" name="repassword" class="form-control" placeholder="请再输入您的密码">
					</div>
					<div class="col-md-4" id="repasswordSpan"></div>
				</div>
				
				<div class="form-group" id="idnumDiv">
					<label class="col-md-3 control-label" for="idnum">身份证: </label>
					<div class="col-md-5">
						<input type="text" id="idnum" name="idnum" class="form-control" placeholder="请输入身份证号">
					</div>
					<div class="col-md-4" id="idnumSpan"></div>
				</div>
				
				<div class="form-group" id="sexDiv">
					<label class="col-md-3 control-label" for="sex">性别: </label>
					<div class="col-md-5">
						<input type="radio" id="sexMale" name="sex" value="男" checked="checked">男
						<input type="radio" id="sexFemale" name="sex" value="女">女
					</div>
					<div class="col-md-4" id="sexSpan"></div>
				</div>
				
				<div class="form-group" id="telDiv">
					<label class="col-md-3 control-label" for="tel">联系电话: </label>
					<div class="col-md-5">
						<input type="text" id="tel" name="tel" class="form-control" placeholder="请输入联系电话">
					</div>
					<div class="col-md-4" id="telSpan"></div>
				</div>
				
				<div class="form-group" id="emailDiv">
					<label class="col-md-3 control-label" for="email">电子邮箱：</label>
					<div class="col-md-5">
						<input type="text" id="email" name="email" class="form-control" placeholder="请输入电子邮箱">
					</div>
					<div class="col-md-4" id="emailSpan"></div>
				</div>
				
				<div class="form-group" id="buttonDiv">
					<div class="col-md-4 col-md-offset-6">
						<button type="submit" id="submit" class="btn btn-xs btn-primary">注册</button> &nbsp
						<button type="reset" id="reset" class="btn btn-xs btn-warning">重置</button> &nbsp
						<button id="back" class="btn btn-xs btn-success">返回</button>
					</div>
				</div>
			</fieldset>
		</form>
	</div>
	<script type="text/javascript" src="js/canvas-nest.js"></script>
</body>
</html>