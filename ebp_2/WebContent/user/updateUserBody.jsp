<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="com.oracle.ebp.domain.*"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<c:url var="url" value="/user/updateUserById" />
<c:url var="modifyPasswordUrl" value="/user/modifyPassword.jsp" />

<%
	if (request.getAttribute("userBean") == null) {
		User user = (User)session.getAttribute("session_user");
		if (user == null) user = new User();
		UpdateUserBean uub = User.convertToUpdateUserBean(user);
		request.setAttribute("updateUserBean", uub);
	}
%>

<!DOCTYPE html>
<jsp:useBean id="userBean" class="com.oracle.ebp.domain.UpdateUserBean" scope="request"/>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>个人中心>修改个人信息</title>

<link rel="stylesheet" type="text/css" href="/ebp_2/bootstrap/css/bootstrap.min.css">
<script src="/ebp_2/bootstrap/js/bootstrap.min.js"></script>
<script src="/ebp_2/bootstrap/css/bootstrap-theme.min.css"></script>
<script type="text/javascript" src="/ebp_2/js/jquery-1.6.2.min.js"></script>
<script type="text/javascript" src="/ebp_2/js/jquery-ui-1.8.5.custom.min.js"></script>
<script src="/ebp_2/bootstrap/js/bootstrap.min.js"></script>
<style type="text/css">
.form-wrapper {
	display: block;
}
.form-wrapper .input-row {
	display: block;
}
.form-wrapper .row .col-sm-6 {
	margin-bottom: 40px;
}
.form-wrapper input {
	width: 100%;
	padding: 0 22px;
	height: 46px;
	border: none;
	border-bottom: 1px #dae4e8 solid;
	border-left: 1px #dae4e8 solid;
	font-size: 15px;
	color: #858788;
}
.padding-lg {
	display: block;
	padding-top: 60px;
	padding-bottom: 60px;
}
.btn {
	display: inline-block;
	padding: 12px 24px;
	border-radius: 4px;
	background: #ff9600;
	font-family: 'texgyreadventorbold';
	font-size: 14px;
	color: #fff;
	text-transform: uppercase;
	-moz-transition: all 0.3s ease 0s;
	-o-transition: all 0.3s ease 0s;
	-webkit-transition: all 0.3s ease 0s;
	-ms-transition: all 0.3s ease 0s;
	transition: all 0.3s ease 0s;
}
</style>
<link href="/ebp_2/css/jquery-accordion-menu.css" rel="stylesheet" type="text/css" />
<link href="/ebp_2/css/font-awesome.css" rel="stylesheet" type="text/css" />

<style type="text/css">
*{box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;}
body{background:#f0f0f0;}
.content{width:260px;margin:20px auto;}
.filterinput{
	background-color:rgba(249, 244, 244, 0);
	border-radius:15px;
	width:90%;
	height:30px;
	border:thin solid #FFF;
	text-indent:0.5em;
	font-weight:bold;
	color:#FFF;
}
#demo-list a{
	overflow:hidden;
	text-overflow:ellipsis;
	-o-text-overflow:ellipsis;
	white-space:nowrap;
	width:100%;
}
</style>

<script src="/ebp_2/js/jquery-1.11.2.min.js" type="text/javascript"></script>
<script src="/ebp_2/js/jquery-accordion-menu.js" type="text/javascript"></script>
<script type="text/javascript">

$(function(){	
	//顶部导航切换
	$("#demo-list li").click(function(){
		$("#demo-list li.active").removeClass("active")
		$(this).addClass("active");
	})	
})	
</script>
</head>
<body>
<jsp:include page='header.jsp'/>
<div class="stars"></div>
<div >
<div class="row">
    <div class="col-sm-2" style="height:960px;background-color: #222c2e" id="mysider" >
    
			<div id="jquery-accordion-menu" style="height:960px;" class="jquery-accordion-menu red">
		<ul id="demo-list">
		
			<li ><a href="/ebp_2/user/user_center.jsp"><i class="fa fa-home"></i>主页 </a></li>
			<li><a href="/ebp_2/user/orders.jsp"><i class="fa fa-glass"></i>我的订单 </a></li>
			<li><a href="/ebp_2/gallery.jsp"><i class="fa fa-file-image-o"></i>艺术馆 </a></li>
			<li class="active"><a href=""><i class="fa fa-cog"></i>修改个人信息 </a></li>
			<li><a href="/ebp_2/user/shopping_car.jsp"><i class="fa fa-suitcase"></i>购物车 </a></li>
			<li><a  href="/ebp_2/user/modifyPassword.jsp"><i class="fa fa-user"></i>修改密码 </a></li>
			<li ><a href="/ebp_2/user/TopUpAccountBody.jsp"><i class="fa fa-money"></i>充值 </a></li>
			<li><a href="javascript: userout();"><i class="fa fa-home"></i>登出 </a></li>

		   
		</ul>
	</div>
	
    </div>
    <div class="col-sm-10" style='background-color:rgb(197, 204, 206);width:1595px;height:960px;border-left: 5px solid'>
	
<div align="center">
 <div style="background:#FFF;padding: 15px,15px,15px,15px;">
   <section class="login-wrapper register">
  <div class="inner">
    <div class="regiter-inner">

         <form:form action="${url}" method="post"  modelAttribute="updateUserBean" class="form-outer">
      <div class="cnt-block" style='border-radius: 25px;background-color:#fff'>
      
		<form:input type="hidden" path="uid" id="uid"/>
		<font color="red"><i><form:errors path="uid"/></i></font>
		
	    <div class="row">
             <div class="col-sm-6 clearfix">
                <input name="country code" type="text" placeholder="用户名" readonly/>
            </div>
            <div class="col-sm-6 clearfix">
                <form:input type="text" path="username" id="username" readonly="true"/>
            </div>
          </div>
           <div class = "row">
                <font color="red"><i><form:errors path="username"/></i></font>
                <font color="red"><i id="usernameError"></i></font>
		          <font id="usernameF" color="red"></font>
            </div>
            <div class = "row">
               <div class="col-sm-6 clearfix">
                <input name="country code" type="text" placeholder="真实姓名" readonly/>
               </div>
               <div class="col-sm-6 clearfix">
                 <form:input type="text" path="name" id="name" />
               </div>
            </div>
           <div class = "row">
               <font color="red"><i><form:errors path="name"/></i></font>
               <font color="red"><i id="nameError"></i></font>
		            <font id="nameF" color="red"></font>
           </div>
             <div class = "row">
               <div class="col-sm-6 clearfix">
                  <input name="country code" type="text" placeholder="电话号码" readonly/>
               </div>
               <div class="col-sm-6 clearfix">
                 <form:input type="text" path="telno" id="telno"/>
               </div>
            </div>
            
            <div class = "row">  
            <center>  <font color="red"><i id="telnoError"></i></font>
                <font color="red"><i><form:errors path="telno"/></i></font>
		           <font id="telnoF" color="red"></font></center>
            </div>
           <div class = "row">
               <div class="col-sm-6 clearfix">
                <input name="country code" type="text" placeholder="身份证号" readonly/>
               </div>
               <div class="col-sm-6 clearfix">
                 <form:input type="text" path="idCard" id="idCard" maxlength="18" />
               </div>
            </div>
          <div class = "row">   
                 <font color="red"><i><form:errors path="idCard"/></i></font>
                 <font color="red"><i id="idCardError"></i></font>
				    <font id="idCardF" color="red"></font> 
           </div>
           
           <div class = "row">
               <div class="col-sm-6 clearfix">
                 <input name="country code" type="text" placeholder="地址" readonly/>
               </div>
               <div class="col-sm-6 clearfix">
                  <form:input type="text" path="address" id="address" />
                  <font color="red"><i id="addressError"></i></font>
               </div>
            </div>
          <div class = "row">   
                 <font color="red"><i><form:errors path="address"/></i></font>
		          <font id="addressF" color="red"></font>
           </div>
           <div class = "row">
               <div class="col-sm-6 clearfix">
                 <input name="country code" type="text" placeholder="年龄" readonly/>
               </div>
               <div class="col-sm-6 clearfix">
                  <form:input type="number" path="age" id="age" />      
               </div>
            </div>
          <div class = "row">   
                 <font color="red"><i><form:errors path="age"/></i></font>
                 <font color="red"><i id="ageError"></i></font>
		          <font id="ageF" color="red"></font>
           </div>
           <form:hidden path="password" id="password"/>
		   <form:hidden path="repassword" id="repassword" />
		 <div class="col-sm-6 clearfix">
		  <ul class="select-opt clearfix">
                  <li>
                    <form:radiobutton id="f-option" name="gender" path="gender" value="1"></form:radiobutton>
                    <label for="f-option"><font><font>男</font></font></label>
                    <div class="check"></div>
                    
                  </li>
                  <li>
                  <form:radiobutton id="s-option"  name="gender" path="gender" value="0"></form:radiobutton>
                    <!-- <input id="s-option" name="selector" type="radio"> -->
                    <label for="s-option"><font><font>女</font></font></label>
                    <div class="check">
                      <div class="inside"></div>
                    </div>
                    
                  </li>
                </ul>
           </div>    
            
             <div class="row">
               <font color="red"><i><form:errors path="gender"/></i></font>
             </div>
		<div class="row">
           <div class="col-sm-4 clearfix">
               <input type="button"  class="btn" onclick="update()" value="提交"/>    
            </div>
    
            <div class="col-sm-4 clearfix">
               <input type="reset" value="重置" class="btn"/>   
		     </div>
		    <div class="col-sm-4 clearfix">
		        <a href="${modifyPasswordUrl}"> 
		          <input type="button" class="btn" value="修改密码"/> 
		        </a>
		      </div>
		   </div>
          </div>
	  </form:form>
      </div>
    </div>
 </section>
 </div>
</div>
    </div>
</div>
</div>
<jsp:include page='footer.jsp'/>
<script src="/ebp_2/js/axios.min.js"></script>
<script src="/ebp_2/js/my-axios.js"></script>
<script src="/ebp_2/js/idCardCheck.js"></script>
<script src="/ebp_2/js/updateUserInfo.js"></script>
<script type="text/javascript">
function update() {
	if (!check()) {
		return;
	}
	var uid= $("#uid").val();
	var username = $("#username").val();
	var password = $("#password").val();
	var repassword = $("#repassword").val();
 	var name = $("#name").val();
	var telno = $("#telno").val();
	var idCard = $("#idCard").val();
	var address = $("#address").val();
	var age = $("#age").val();
	var gender = $("input[name='gender']:checked").val();
	console.log(name, telno, idCard, address, age, gender);
	axios({
		url:"/ebp_2/user/ajax_updateUser.json",
		method:"post",
		data: {
			uid:uid,
			name:name,
			username: username,
			password: password,
			repassword: repassword, 
			telno:telno,
			idCard:idCard,
			address:address,
			age:age,
			gender:gender
		}
	})
	.then(function(response) {
		var data = response.data;
		if (data.successful) {
			alert("修改成功！")
		}
	})
	.catch(function(error) {
		
	});
}
</script>
<script type="text/javascript">
function userout()
{
	if (confirm('确定要退出吗？')) {
		window.location='/ebp_2/user/logout';
	}
}
var temp=$('#mysider').css('width');
temp=parseInt(temp.replace('px',''));
temp=temp-15;

$('#jquery-accordion-menu').css('width',temp);
(function($) {
$.expr[":"].Contains = function(a, i, m) {
	return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
};
function filterList(header, list) {
	//@header 头部元素
	//@list 无需列表
	//创建一个搜素表单
	var form = $("<form>").attr({
		"class":"filterform",
		action:"#"
	}), input = $("<input>").attr({
		"class":"filterinput",
		type:"text"
	});
	$(form).append(input).appendTo(header);
	$(input).change(function() {
		var filter = $(this).val();
		if (filter) {
			$matches = $(list).find("a:Contains(" + filter + ")").parent();
			$("li", list).not($matches).slideUp();
			$matches.slideDown();
		} else {
			$(list).find("li").slideDown();
		}
		return false;
	}).keyup(function() {
		$(this).change();
	});
}
$(function() {
	filterList($("#form"), $("#demo-list"));
});
})(jQuery);	
</script>

<script type="text/javascript">

	jQuery("#jquery-accordion-menu").jqueryAccordionMenu();
	
</script>
</body>
</html>