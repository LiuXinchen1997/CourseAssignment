<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.List" %>
<%@ page import="com.oracle.ebp.util.constant.Constant" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<c:set var="imageUrl" value="<%=Constant.LOCAL_IMAGE_PATH %>" scope="page"/>
<c:set var="serverImageUrl" value="<%=Constant.SERVER_IMAGE_PATH %>" scope="page" />
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script type="text/javascript" src="/ebp_2/WebContent/js/jquery-1.6.2.min.js"></script>
<script src="/ebp_2/js/axios.min.js"></script>
<script src="/ebp_2/js/my-axios.js"></script>
<title>查看电影票详情</title>
	<link href="http://cdn.bootcss.com/bootstrap/2.3.2/css/bootstrap-responsive.min.css" rel="stylesheet">
    <link href="http://cdn.bootcss.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet">
    <link href="/ebp_2/bootstrap/css/bootstrap.min.css" rel="stylesheet" media="screen">
    <link href="/ebp_2/css/bootstrap-datetimepicker.css" rel="stylesheet" media="screen">
    <style type="text/css">
    #silders { width:285px;height:180px;position:absolute; left:0}
        .glyphicon { margin-right:5px; }
        .btn-wrapper{
            padding: 1em 0;
        }
        .thumbnail
        {
            margin-bottom: 20px;
            padding: 0px;
            -webkit-border-radius: 0px;
            -moz-border-radius: 0px;
            border-radius: 0px;
        }

        .item.list-group-item
        {
            float: none;
            width: 100%;
            background-color: #fff;
            margin-bottom: 10px;
        }
        .item.list-group-item:nth-of-type(odd):hover,.item.list-group-item:hover
        {
            background: #428bca;
        }

        .item.list-group-item .list-group-image
        {
            margin-right: 10px;
        }
        .item.list-group-item .thumbnail
        {
            margin-bottom: 0px;
        }
        .item.list-group-item .caption
        {
            padding: 9px 9px 0px 9px;
        }
        .item.list-group-item:nth-of-type(odd)
        {
            background: #eeeeee;
        }

        .item.list-group-item:before, .item.list-group-item:after
        {
            display: table;
            content: " ";
        }

        .item.list-group-item img
        {
            float: left;
        }
        .item.list-group-item:after
        {
            clear: both;
        }
        .list-group-item-text
        {
            margin: 0 0 11px;
        }
        
        .content {
        	margin: 40px;
        }
    </style>
</head>
<body onload='onloading'>
<jsp:include page='header.jsp'/>
<div class="stars"></div>
<div class="container">
<div class='row'>
<div class="col-sm-12" id="maindiv">
	<div class='col-sm-3 bs-docs-sidebar nav nav-list bs-docs-sidenav' id='desdiv1' style='height:180px;margin-top:0px'>
	<div id='silders' style='height:180px;border-radius: 15px;border-width:20px;border-color: red;background-color:rgba(255, 255, 255, 0.82);margin-top:0px'>
       <div style='margin-top:30px;margin-left:10px'>
       <div style='margin:10px 0 0 0'>
       <font style='margin:0 0 20px 0;color:#000;font-family:Microsoft YaHei;font-size:20px'>立即购买：</font>
       </div>
		<form action="/ebp_2/user/addShoppingCart">
		<div class="input-group" style='height:40px'>
		<span class="input-group-addon" style='width:50px'>购买数量：</span>
        <input id='addon' style='height:40px' type="text" name="number" class="form-control"  />
        </div>
        <font id="addon_error"  style='font-family:Microsoft YaHei;color:red ;padding:20px 0 0 0;font-size:20px'></font>
        <br>
		
		<input type="hidden" id="tid" name="tid" value="${requestScope.tid}" />
		
		<input style='width:90px;padding:0;height:45px' class='btn btn-success' type="submit" value="购物车" />
		
		<input style='width:82px;height:45px' class='btn'  type="button" onclick="buy();" value="结账" />

		<input onclick='backto()' class='btn' style='width:82px;height:45px' type="button" value="返回" />
		</form>
		</div>
		</div>
</div>
	<div class='col-sm-9' id='desdiv2' style='background-color:rgba(63, 82, 86, 0.66)'>
			<%
		List<String> descs = (List<String>)request.getAttribute("descs");
		List<String> images = (List<String>)request.getAttribute("images");
		List<String> sequences = (List<String>)request.getAttribute("sequences");
		if (sequences != null && !(sequences.size() == 1 && sequences.get(0).equals(""))) {
			for (int i = 0; i < sequences.size(); i++) {
	%>
			<% 
				if (sequences.get(i).charAt(0) == 'p')
			{
				
				int id1 = Integer.parseInt((sequences.get(i).substring(1))); %>
				<center><div class="content" style="width: 400px;">
					<p style="color: white;line-height:1; font-size: 30px; font-family: Microsoft YaHei;">
						<%=descs.get(id1-1) %>
					</p>
				</div></center>
				
			<% 
				} else if (sequences.get(i).charAt(0) == 'm') { 
				int id2 = Integer.parseInt((sequences.get(i).substring(1)));
			%>
				
				<div class="content" align="center">
					<img style="width: 760px;" src="/ebp_2/upload/<%=images.get(id2-1) %>" />
				</div>
				
			<%
				}
			%>
	<%
			}
		}
	%>
	</div>
	</div>
	</div>
	</div>
	
	<jsp:include page='footer.jsp' />
	<script type="text/javascript" src="/ebp_2/jQuery/jquery-1.8.3.min.js" charset="UTF-8"></script>
<script>window.jQuery || document.write('<script src="/ebp_2/js/jquery-1.6.2.min.js"><\/script>')</script>
<script src="http://cdn.bootcss.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
<script type="text/javascript" src="/ebp_2/bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript" src="/ebp_2/js/bootstrap-datetimepicker.js" charset="UTF-8"></script>
<script type="text/javascript" src="/ebp_2/js/locales/bootstrap-datetimepicker.fr.js" charset="UTF-8"></script>
<script type="text/javascript">

function backto()
{
	window.history.go(-1);
}
$('#desdiv1').css('height','180px');
var temp=$('#maindiv').css('height');
temp=parseInt(temp.replace('px',''));
if(temp<500)
	{
		$('#maindiv').css('height','500px');
		$('#desdiv2').css('height','500px');
	}

window.onload = window.onscroll = function () {
    var sDiv = document.getElementById('silders');
    var varTop=document.documentElement.scrollTop||document.body.scrollTop;
    var t = varTop + (document.documentElement.clientHeight - sDiv.offsetHeight*4.8) / 2;

    startMove(parseInt(t),7);
}
var varTimer = null;
function startMove(destination,speed) {
    var sDiv = document.getElementById('silders');
    clearInterval(varTimer);
    varTimer = setInterval(function () {
        var varSpeed = (destination - sDiv.offsetTop) / speed;
        varSpeed = varSpeed > 0 ? Math.ceil(varSpeed) : Math.floor(varSpeed);
        if (sDiv.offsetTop == destination) {
            clearInterval(varTimer);
        }
        else {
            sDiv.style.top = sDiv.offsetTop + varSpeed + 'px';
        }
    }, 30);
}

$("#addon").blur(function(){
    if($('#addon').val()==''||$('#addon').val()==0)
    {
            $("#addon_error").html("票数不能为空！");
            tem2=false;
            return false;
    }
    else if(isNaN($('#addon').val()))
    {
        $("#addon_error").html("票数必须为数字！");
        tem2=false;
        return false;
    }
    else if($('#addon').val().indexOf(" ")!=-1)
    {
        $("#addon_error").html("票数不能包含空格！");
        tem2=false;
        return false;
    }
    else if(parseInt($('#addon').val())<0)
    {
        $("#addon_error").html("票数不能小于零！");
        tem2=false;
        return false;
    }
    else if(parseInt($('#addon').val())!=$('#addon').val())
    {
        $("#addon_error").html("票数不能为小数!");
        tem2=false;
        return false;
    }
    else
    {
        $("#addon_error").html("");
        tem2=true;
        return true;
    }
});
    $('.form_datetime').datetimepicker({
        //language:  'fr',
        weekStart: 1,
        todayBtn:  1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        forceParse: 0,
        showMeridian: 1
    });
    $('.form_date').datetimepicker({
        language:  'fr',
        weekStart: 1,
        todayBtn:  1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0
    });
    $('.form_time').datetimepicker({
        language:  'fr',
        weekStart: 1,
        todayBtn:  1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 1,
        minView: 0,
        maxView: 1,
        forceParse: 0
    });
</script>
<script>
function buy() {
	var tid = $("#tid").val();
	var number = $("#addon").val();
	axios({
		method: "get",
		url:"/ebp_2/user/buyAtOnce.json",
		query: {
			tid: tid,
			number: number
		}
	})
	.then(function (response) {
		console.log(response);
		if (response.data.error == "余额不足") {
			var con = confirm('余额不足，是否前往充值？'); 
			if (con) {
				window.location.replace("/ebp_2/user/TopUpAccountBody.jsp");
			}
		} else if (response.data.error == "票存不足"){
			alert("票存不足");
		} else {
			alert("购票成功");
			var orderlists = response.data.orderlists;
			var sum = response.data.sum;
			window.localStorage.setItem("orderlists", JSON.stringify(orderlists));
			window.localStorage.setItem("sum", sum);
			console.log(window);
			window.location.replace("/ebp_2/user/bookingSucc.jsp");
		}
	})
	.catch(function (error) {
		   console.log(error);
	});
}
</script>
</body>
</html>