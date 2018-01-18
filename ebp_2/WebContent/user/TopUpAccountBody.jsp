<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<jsp:useBean id="topUpAccountBean" class="com.oracle.ebp.domain.TopUpAccountBean" scope="request"/>
<c:url var="url" value="/user/topUpMoney" scope="request" />
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>个人中心>充值界面</title>
<link rel="stylesheet" type="text/css" href ="/ebp_2/css/niceSelect.css"/> 

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
    <div class="col-sm-2" style="height:800px;background-color: #222c2e" id="mysider" >
    
			<div id="jquery-accordion-menu" style="height:800px;" class="jquery-accordion-menu red">
		<ul id="demo-list">
		
			<li ><a href="/ebp_2/user/user_center.jsp"><i class="fa fa-home"></i>主页 </a></li>
			<li><a href="/ebp_2/user/orders.jsp"><i class="fa fa-glass"></i>我的订单 </a></li>
			<li><a href="/ebp_2/gallery.jsp"><i class="fa fa-file-image-o"></i>艺术馆 </a></li>
			<li><a href="/ebp_2/user/updateUserBody.jsp"><i class="fa fa-cog"></i>修改个人信息 </a></li>

			<li><a href="/ebp_2/user/shopping_car.jsp"><i class="fa fa-suitcase"></i>购物车 </a></li>
			<li><a  href="/ebp_2/user/modifyPassword.jsp"><i class="fa fa-user"></i>修改密码 </a></li>
			<li class="active"><a href=""><i class="fa fa-money"></i>充值 </a></li>
		    <li><a href="javascript: userout();"><i class="fa fa-home"></i>登出 </a></li>
		</ul>
	</div>
	
    </div>
    <div class="col-sm-10" style='background-color:rgb(197, 204, 206);width:1595px;height:800px;border-left: 5px solid'>
		
		
		
		
		

 

<center>

 <div style="background:#FFF;padding: 15px,15px,15px,15px;">
   <section class="login-wrapper register">
  <div class="inner">
    <div class="regiter-inner" >
      <div class="cnt-block" style='border-radius: 25px;background-color:#fff'>	
      
	    <div class="row" >
            <div class="input-group col-sm-8 clearfix">
				<span class="input-group-addon" style='font-size:20px;font-family:Microsoft YaHei;'>用户名</span>
				<input style='background-color:#F7F7F7;font-family:Microsoft YaHei;font-size:20px' value='${session_user.username }' readonly type="text" class="form-control" />
			</div>
        </div><br>
  
	    <div class="row" >
            <div class="input-group col-sm-8 clearfix">
				<span class="input-group-addon" style='font-size:20px;font-family:Microsoft YaHei;'>账户余额</span>
				<input style='background-color:#F7F7F7;font-family:Microsoft YaHei;font-size:20px' value='${session_user.balance }' readonly type="text"  class="form-control" />
			</div>
        </div>
        
        <form:form modelAttribute="topUpAccountBean" action="${url}" method="post" novalidate="novalidate">
			<label class="error">
	            <font><font><form:errors/></font></font>
	     	</label>
			<div class="row" >
            	<div class="input-group col-sm-8 clearfix">
              	<form:select id = "description" path="type" class="custom_select nice-select wide" tabindex="-1" aria-hidden="true">
                	<c:if test="${(empty param.type) or (param.type eq '')}">		
			         	<form:option value="">充值方式：</form:option>
		        	</c:if>
                	<form:option value="空中充值">空中充值</form:option>
		        	<form:option value="支付宝">支付宝</form:option>
		        	<form:option value="微信">微信</form:option>
		        	<form:option value="储蓄卡">储蓄卡</form:option>
              	</form:select>
              	<font style='font-family:Microsoft YaHei;font-size:20px' color = "red" id = "description_error"></font>
              	<label class="error">
	            	<font><font color = "red" size = "-1"><form:errors path="type" /></font></font>
	          	</label>
          		</div>
			</div><br>
		
		 	<div class="row" >
            	<div class="input-group col-sm-8 clearfix">
					<span class="input-group-addon" style='font-size:20px;font-family:Microsoft YaHei;'>充值金额</span>
					<form:input style='background-color:#F7F7F7;font-family:Microsoft YaHei;font-size:20px' type="text" path="money" id="count" class="form-control" />
				</div>
          	</div>
           	<div class = "row">
          		<label class="error">
	         		<font><font  color = "red" size = "-1"><form:errors path="money" /></font></font>
	      		</label>
                	<font color="red" style='font-family:Microsoft YaHei;font-size:20px'><i id="count_error"></i></font>
		          	<font id="usernameF" color="red" style='font-family:Microsoft YaHei;font-size:20px'></font>
            </div>
            <br>
  
      		<div class="row">
      			<div class="col-sm-6"></div>
				<div class="input-group col-sm-2">
          		<input style='background-color:#f7f7f7;color:#000' type="submit" class="btn" value="充值"/> 
        		</div>
      		</div>
  		</form:form>
  		</div>
  		</div>
  		</div>
  		
 </section>
 </div> 
   
</center>



		
		
		
		
		
		
		
		
    </div>
</div>
</div>
<jsp:include page='footer.jsp'/>
<script type="text/javascript">
function userout()
{
	if (confirm('确定要退出吗？')) {
		window.location='/ebp_2/user/logout';
	}
}
$("#count").blur(function(){
      if($('#count').val()=='')
      {
              $("#count_error").html("不能为空！");
              tem2=false;
              return false;
      }
      else if(isNaN($('#count').val()))
      {
          $("#count_error").html("必须为数字！");
          tem2=false;
          return false;
      }
      else if($('#count').val().indexOf(" ")!=-1)
      {
          $("#count_error").html("不能包含空格！");
          tem2=false;
          return false;
      }
      else if(parseInt($('#count').val())<0)
      {
          $("#count_error").html("单次充值金额只能在 0 - 200000元内！");
          tem2=false;
          return false;
      }
      else if(parseInt($('#count').val())> 200000)
      {
          $("#count_error").html("单次充值金额只能在 0 - 200000元内！");
          tem2=false;
          return false;
      }
      else
      {
          $("#count_error").html("");
          tem2=true;
          return true;
      }
  });



//验证不为空，description输入框的id，description_error为输入框下面错误提示
$("#description").blur(function(){
      if($('#description').val()=='')
      {
          $("#description_error").html("请选择充值方式！");
          tem1=false;
          return false;
      }
      else
      {
          $("#description_error").html("");
          tem1=true;
          return true;
      }
  });


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