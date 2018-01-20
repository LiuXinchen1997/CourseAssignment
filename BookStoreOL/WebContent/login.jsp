<%@page contentType="text/html;charset=utf-8"%>

<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<title>登录 - 网上书店</title>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<link href="${pageContext.request.contextPath}/css/login.css" rel="stylesheet" type="text/css" />
		<link href="${pageContext.request.contextPath}/css/page_bottom.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery-1.4.min.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/js/user.login_form.js"></script>
	</head>
	<body>
		<script type="text/javascript">
			function reload(obj, base) {
				var rand = new Date().getTime();
				obj.src = base+"getVerifyCode.action?abc="+rand;
			}	
		</script>
		
		<%@include file="/common/head1.jsp"%>

		<div class="enter_part">

			<%@include file="/common/introduce.jsp"%>

			<div class="enter_in">
				<div class="bj_top"></div>
				<div class="center">
					<div style="height: 30px; padding: 5px; color: red; text-align:center; font-size:16px" id="divErrorMssage">
						${info}
					</div>
					<div class="main">
						<h3>
							欢迎来到Sampson的网上书店!
						</h3>

						<form method="post" action="doLogin" id="ctl00">
							<ul>
								<li>
									<span>用户名：</span>
									<input type="text" name="username" id="txtUsername" class="textbox form-control" />
								</li>
								<li>
									<span>密码：&nbsp;</span>
									<input type="password" name="password" id="txtPassword" class="textbox form-control" />
								</li>
								<li>
									<span>验证码：</span>
									<img src="<%=basePath%>getVerifyCode.action" alt="验证码无法显示" onclick="reload(this, '<%=basePath%>');" />
								</li>
								<li>
									<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
									<input type="text" name="verifyCode" class="textbox form-control" />
								</li>
								
								<li>
									<input type="submit" id="btnSignCheck" class="button_enter btn-xs btn-primary"
										value="登 录" />
								</li>
							</ul>
							<span style="color:red;" id="txtLoginErr"></span>
						</form>
					</div>
					<div class="user_new">
						<p>
							您还不是我们的用户？
						</p>
						<p class="set_up">
							<a href="${pageContext.request.contextPath}/doRegister">创建一个新用户&gt;&gt;</a>
						</p>
					</div>
				</div>
			</div>
		</div>

		<%@include file="/common/foot1.jsp"%>
		
		<script type="text/javascript">
			
		</script>
	</body>
</html>

