<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="viewport" content="width=device-width, inital-scale=1">
<script type="text/javascript" src="jQuery/jquery-3.1.1.min.js"></script>
<script type="text/javascript" src="Bootstrap/js/bootstrap.min.js"></script>
<link href="Bootstrap/css/bootstrap.min.css" type="text/css"
	rel="stylesheet">
<title>修改密码</title>
</head>
<body background="image/background2.jpg">
	<div class="container">
		<form action="modifyPasswordSubmit.action" method="post"
			class="form-horizontal">
			<fieldset>
				<legend>
					<label><span class="glyphicon glyphicon-user"> </span>&nbsp;修改密码</label>
				</legend>

				<div class="form-group">
					<label class="col-md-3 control-label" for="oldPassword">原密码: </label>
					<div class="col-md-5">
						<input type="password" id="oldPassword" name="oldPassword"
							class="form-control" placeholder="请输入原密码">
					</div>
				</div>
				
				<div class="form-group">
					<label class="col-md-3 control-label" for="newPassword">新密码: </label>
					<div class="col-md-5">
						<input type="password" id="newPassword" name="newPassword"
							class="form-control" placeholder="请输入新密码">
					</div>
				</div>
				
				<div class="form-group">
					<label class="col-md-3 control-label" for="newPasswordAgain">确认密码: </label>
					<div class="col-md-5">
						<input type="password" id="newPasswordAgain" name="newPasswordAgain"
							class="form-control" placeholder="请再输入一次新密码">
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