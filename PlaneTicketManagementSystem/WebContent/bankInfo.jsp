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
<title>绑定银行卡</title>
</head>
<body background="image/background3.jpg">
	<div class="container">
		<form action="addBankInfoSubmit.action" method="post"
			class="form-horizontal" />
		<fieldset>

			<legend>
				<label><span class="glyphicon glyphicon-user"> </span>&nbsp;绑定银行卡</label>
			</legend>

			<div class="form-group">
				<label class="col-md-3 control-label" for="bankId">银行卡号: </label>
				<div class="col-md-5">
					<input type="text" id="bankId" name="bankId" class="form-control"
						placeholder="请输入银行卡号" />
				</div>
			</div>

			<div class="form-group">
				<label class="col-md-3 control-label" for="bankName">银行卡号: </label>
				<div class="col-md-5">
					<input type="text" id="bankName" name="bankName"
						class="form-control" placeholder="请输入银行名称" />
				</div>
			</div>

			<div class="form-group" id="buttonDiv">
				<div class="col-md-5 col-md-offset-3">
					<button type="submit" id="submit" class="btn btn-xs btn-primary">绑定</button>
					<button type="reset" id="reset" class="btn btn-xs btn-warning">重置</button>
				</div>
			</div>
		</fieldset>
		</form>
	</div>
</body>
</html>