<%@page contentType="text/html;charset=utf-8"%>
<link href="${pageContext.request.contextPath}/css/book_head090107.css" rel="stylesheet" type="text/css" />
<div class="head_container">
	<div class="head_welcome">
		<div class="head_welcome_right">
			<span class="head_welcome_text"> </span>
			<span class="head_welcome_text"> <span class="little_n">
					| <a href="#" name="mydangdang" class="head_black12a">我的账号</a> | <a
					href="../common/introduce.jsp" name="helpcenter" class="head_black12a" >帮助</a>
					| </span> </span>
			<div class="cart gray4012">
				<a href="${pageContext.request.contextPath}/cart/cart">购物车</a>
			</div>
		</div>
		<span class="head_toutext" id="logininfo">
		<b><span style="color:blue;font-size:15px">${sessionScope.user.username }</span>
		 您好，欢迎光临Simpson的网上书店~ </b>
		<%if(session.getAttribute("user") != null) { %>
		[&nbsp;<a href="<%=request.getContextPath() %>/doLogout" class="b">登出</a>&nbsp;]
		<%} else{%>
		
		[&nbsp;<a href="${pageContext.request.contextPath}/doLogin" class="b">登录</a>|<a
			href="${pageContext.request.contextPath}/register.jsp" class="b">注册</a>&nbsp;]
		<%} %>
		</span>
	</div>
	<div class="head_head_list">
		<div class="head_head_list_left">
			<span class="head_logo"><a href="${pageContext.request.contextPath}/main.jsp" name="backtobook"><img
						src="/BookStoreOL/images/logo.jpg" width="120" height="49" /> </a> </span>
		</div>
		<div class="head_head_list_right">

			<div class="head_head_list_right_b">
			</div>
		</div>
	</div>
	<div class="head_search_div">

	</div>
	<div class="head_search_bg"></div>
</div>
