<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<c:url var="queryByDateUrl" value="/admin/queryUsersByDatePage"
	scope="request" />
<c:url var="queryByConditionUrl" value="/admin/queryUsersByCondition"
	scope="request" />

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>管理员界面</title>
<script type="text/javascript" src="/ebp_2/jQuery/jquery-1.8.3.min.js" charset="UTF-8"></script>
<style type="text/css">
        body{
            font-family: 'microsoft yahei',Arial,sans-serif;
            margin:0;
            padding:0;
        }
</style>
<link href="/ebp_2/bootstrap/css/bootstrap.min.css" rel="stylesheet"
	media="screen">
<link href="/ebp_2/css/bootstrap-datetimepicker.css" rel="stylesheet"
	media="screen">
<script type="text/javascript">
function strhandle(str)
{
    if(str=='')
        return '';
    var arry=((str.split('-'))[0]).split(' ');
    var temp='';
    switch(arry[1])
    {
        case 'January':
            temp='01';
            break;
        case 'February':
            temp='02';
            break;
        case 'March':
            temp='03';
            break;
        case 'April':
            temp='04';
            break;
        case 'May':
            temp='05';
            break;
        case 'June':
            temp='06';
            break;
        case 'July':
            temp='07';
            break;
        case 'August':
            temp='08';
            break;
        case 'September':
            temp='09';
            break;
        case 'October':
            temp='10';
            break;
        case 'November':
            temp='11';
            break;
        case 'December':
            temp='12';
            break;
    }
    return arry[2]+'-'+temp+'-'+arry[0];
}
</script>

</head>
<body
	style="font-family: 'Microsoft YaHei UI'; background-color: #f0ebe7"
	onload="allstart">
	<!-- 导航栏部分 -->
	<div class="navbar navbar-inverse">
		<div class="container-fluid">
			<div class="navbar-header">
				<div class="navbar-brand">
					<!--<small class="glyphicon glyphicon-fire"></small>-->
					<!--<img class="img-circle" src="textrue/logo1.png" width="30" height="30">-->
					星环影城--管理员后台界面
				</div>
			</div>
			<ul class="nav navbar-nav nav-stacked navbar-right">
				<li><a href="" data-toggle="dropdown"> <span
						class="glyphicon glyphicon-user"></span> <!--<img class="img-circle" src="user_photo.png" width="30" height="30"/>-->
						<small>欢迎</small> admin <span class="caret"></span>
				</a>
					<ul class="nav nav-pills nav-stacked dropdown-menu">
						<li class="active"><a href=""> <span
								class="glyphicon glyphicon-cog"></span>&nbsp;&nbsp;页面管理
						</a></li>

						<li class="divider"></li>
						<li><a href="/ebp_2/admin/logout" onClick="return confirm('您确定要退出吗？')"> <span class="glyphicon glyphicon-off"></span>&nbsp;&nbsp;登出
						</a></li>
					</ul></li>
			</ul>
		</div>
	</div>

	<!-- 页面部分 -->
	<div class="row">
		<div class="col-sm-2">
			<div class="panel-group" id="box">
				<div class="panel panel-success">
					<div class="panel-heading">
						<a href="#collapseA" data-parent="#box" data-toggle="collapse"
							class="panel-title">用户管理</a>
					</div>
					<div class="panel-collapse collapse in" id="collapseA">
						<div class="panel-body">
							<ul class="nav nav-pills nav-stacked">
								<li><a href="/ebp_2/admin/queryUsersByDatePage?currentPage=1">用户禁用</a></li>
							</ul>
						</div>
					</div>
				</div>
				<div class="panel panel-success">
					<div class="panel-heading">
						<a href="#collapseB" data-parent="#box" data-toggle="collapse"
							class="panel-title">票项管理</a>
					</div>
					<div class="panel-collapse collapse" id="collapseB">
						<div class="panel-body">
							<ul class="nav nav-pills nav-stacked">
								<li><a href="/ebp_2/admin/queryAllOrderList?currentPage=1">票项管理</a></li>
							</ul>
						</div>
					</div>
				</div>
				<div class="panel panel-success">
					<div class="panel-heading">
						<a href="#collapseC" data-parent="#box" data-toggle="collapse"
							class="panel-title">订单管理</a>
					</div>
					<div class="panel-collapse collapse" id="collapseC">
						<div class="panel-body">
							<ul class="nav nav-pills nav-stacked">
								<li><a href="/ebp_2/admin/queryOrderByDate?currentPage=1">订单查询</a></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="col-sm-10">
			<div class="bread-crumb">
				<ul class="breadcrumb">
					<li><span class="glyphicon glyphicon-home">Home</span></li>
					<li>User</li>
					<li>Forbid</li>
				</ul>
			</div>

			<div class="panle panel-success">

				<div style="padding: 10px 100px 30px 10px;">
					<form class="bs-example bs-example-form" role="form">

						<div class="row" style="padding: 0 0 0 50px;">
							<div class="col-xs-3">
								<div class="input-group">
									<span class="input-group-addon">用户名或姓名</span> <input
										type="text" id="sname" name="name" value="${param.name }"
										class="form-control" placeholder="用户名或姓名" />
								</div>
							</div>
							<div class="col-xs-3">
								<div class="input-group">
									<span class="input-group-addon">电话号</span> <input type="text"
										id="stelno" name="telno" value="${param.telno }"
										class="form-control" placeholder="电话号" />


								</div>
							</div>
							<div class="col-xs-3">
								<div class="input-group">
									<span class="input-group-addon">身份证</span> <input type="text"
										id="sidCard" name="idCard" value="${param.idCard }"
										class="form-control" placeholder="身份证" />

								</div>
							</div>
							<div class="col-xs-3">
								<div class="input-group">
									<input
										style="margin: 0 0 0 105px; width: 300px; height: 34px; background-color: #bbf0ae"
										onclick="GetUserBynuit(1)" class="btn"
										style="color: #2f2e33 ;background-color:#bbf0ae" type="button"
										value="  查询  " />
								</div>
							</div>
						</div>
						<br>
						<div class="row">
							<div class="col-xs-5">
								<!--<div class="input-group">-->
								<!--<span class="input-group-addon">起始日期</span>-->
								<!--<input type="text" class="form-control" placeholder="twitterhandle">-->
								<!--</input>-->
								<!--</div>-->

								<div class="input-group date form_datetime col-md-5"
									data-date="1979-09-16T05:25:07Z"
									data-date-format="yyyy-mm-dd"
									data-link-field="dtp_input1">
									<span class="input-group-addon">起始日期</span> <input
										class="form-control" id="starttime" name="begin"
										style="width: 400px" type="text" value="${begin}" readonly>
									<span class="input-group-addon"><span
										class="glyphicon glyphicon-remove"></span></span> <span
										class="input-group-addon"><span
										class="glyphicon glyphicon-th"></span></span>
								</div>
								<input type="hidden" id="dtp_input9" value="" />

							</div>
							<div class="col-xs-5">
								<div class="input-group">
									<!--<span class="input-group-addon">终止日期</span>-->
									<!--<input type="text" class="form-control" placeholder="twitterhandle">-->
									<!--</input>-->


									<div class="input-group date form_datetime col-md-5"
										data-date="1979-09-16T05:25:07Z"
										data-date-format="yyyy-mm-dd"
										data-link-field="dtp_input1">
										<span class="input-group-addon">终止日期</span> <input
											class="form-control" id="endtime" name="end"
											style="width: 400px" type="text" value="${end}" readonly>
										<span class="input-group-addon"><span
											class="glyphicon glyphicon-remove"></span></span> <span
											class="input-group-addon"><span
											class="glyphicon glyphicon-th"></span></span>
									</div>
									<input type="hidden" id="dtp_input8" value="" />

								</div>
							</div>
							<div class="col-xs-2">
								<div class="input-group">
									<input
										style="width: 300px; height: 34px; background-color: #bbf0ae"
										onclick="GetUserBySday_Eday(1)" class="btn"
										style="color: #2f2e33 ;background-color:#bbf0ae" type="button"
										value="  查询  " />
								</div>
							</div>
						</div>

					</form>
				</div>


				<div id="tips" class="alert alert-warning" hidden="hidden">
					<a href="" class="close" onclick="closethis"> &times; </a> <strong
						id="tip"></strong>
				</div>

				<div class="panel-heading">
					<a class="panel-title">用户列表</a>
				</div>
				<div class="panel-body">
					<table class="table table-striped table-hover">
						<thead>
							<tr>
								<th style='text-align: center'>ID</th>
								<th style='text-align: center'>用户名</th>
								<th style='text-align: center'>真实姓名</th>
								<th style='text-align: center'>性别</th>
								<th style='text-align: center'>年龄</th>
								<th style='text-align: center'>注册时间</th>
								<th style='text-align: center'>地址</th>
								<th style='text-align: center'>联系方式</th>
								<th style='text-align: center'>身份证号码</th>
								<th style='text-align: center'>余额</th>
								<th style='text-align: center'>状态</th>
								<th style='text-align: center'>功能</th>
							</tr>
						</thead>

						<c:forEach items="${list }" var="list">
							<tr align="center">
								<td>${list.uid }</td>
								<td>${list.username }</td>
								<td>${list.name}</td>
								<td>
									<c:if test="${list.gender == 1}"><img alt="男" src="/ebp_2/images/male.png"></c:if>
									<c:if test="${list.gender == 0}"><img alt="女" src="/ebp_2/images/female.png"></c:if>
								</td>
								<td>${list.age }</td>
								<td>${list.regTime }</td>
								<td>${list.address }</td>
								<td>${list.telno }</td>
								<td>${list.idCard }</td>
								<td><font color="red"> ${list.balance}</font></td>
								<td id="statustd${list.uid }">${list.status }</td>
								<c:if test="${list.status==1 }">
									<td><button id="buying${list.uid}" onclick="buying(${list.uid})" class="btn btn-danger">禁用</button></td>
								</c:if>
								<c:if test="${list.status==0 }">
									<td><button id="buyend${list.uid }" onclick="buying(${list.uid})" class="btn btn-warning">启用</button></td>
								</c:if>
							</tr>
						</c:forEach>
						<!--这里用c标签进行输出-->


						<tfoot>
							<tr>
								<td><font color="black" size="-1">${error}</font></td>
							</tr>
							<tr align="center">
								<td colspan="8">
								<ul class="pagination">								
								<c:if test="${isDate == 1 }">
									<li><button onclick="GetUserBySday_Eday(1)" class="btn btn-primary" id="firstpage" >首页</button></li>
									<li><button onclick="GetUserBySday_Eday(${currentPage-1})" id="pervpage" class="btn btn-info">上一页</button></li>
				${currentPage}/${pageCount}
				<li><button id="nextpage" onclick="GetUserBySday_Eday(${currentPage+1})" class="btn btn-info">下一页</button></li>
				<li><button onclick="GetUserBySday_Eday(${pageCount})" id="finalpage" class="btn btn-primary">尾页</button></li>
									</c:if> 
									<c:if test="${isCondition == 1 }">
										<li><button onclick="GetUserBynuit(1)" class="btn btn-primary">首页</button></li>
										<li><button value="上一页" onclick="GetUserBynuit(${currentPage-1})" class="btn btn-info">上一页</button></li>
				${currentPage}/${pageCount}
				<li><button onclick="GetUserBynuit(${currentPage+1})" class="btn btn-info">下一页</button></li>
				<li><button	onclick="GetUserBynuit(${pageCount})" class="btn btn-primary">尾页</button></li>
									</c:if>
									</ul>
								</td>
							</tr>
						</tfoot>
					</table>
				</div>
			</div>
		</div>
	</div>

	<script>
    function query2()
    {
        //模糊查询
    }
    function firstpagefunc()
    {
        //首页
    }
    function pervpagefunc()
    {
        //前一页
    }
    function nextpagefunc()
    {
        //下一页
    }
    function finalpagefunc()
    {
        //最后一页
    }
    function allstart()
    {
        //在这里加载数据行
    }
    
    function compareCheck(str1,str2)//如果str1小于str2返回true
    {
        if(parseInt(str1.split('-')[0])<parseInt(str2.split('-')[0]))
            return true;
        else if(parseInt(str1.split('-')[0])>parseInt(str2.split('-')[0]))
            return false;
        else
        {
            if(parseInt((str1.split('-')[1]).replace(/\b(0+)/gi,""))<parseInt((str2.split('-')[1]).replace(/\b(0+)/gi,"")))
                return true;
            else if(parseInt((str1.split('-')[1]).replace(/\b(0+)/gi,""))==parseInt((str2.split('-')[1]).replace(/\b(0+)/gi,"")))
                return false;
            else
            {
                if(parseInt(str1.split('-')[2])<parseInt(str2.split('-')[2]))
                    return true;
                else if(parseInt(str1.split('-')[2])<parseInt(str2.split('-')[2]))
                    return false;
                else
                    return false;
            }
        }
    }
    function closethis()
    {
        $('#tip').html('');
        $('#tips').attr('hidden','hidden');
    }
    function query()
    {
        $('#tip').html('');
        $('#tips').attr('hidden','hidden');
        var str1=strhandle($('#date1').val());
        var str2=strhandle($('#date2').val());
        if(str1==''&&str2=='')
        {
            $('#tips').removeAttr('hidden');
            $('#tip').html('两次查询都不能为空！');
            return null;
        }
        if(str1=='')
        {
            //执行到str2为止的查询
            alert('查询成功！');
            return null;
        }
        if(str2=='')
        {
            //执行str1到今天为止的查询
            alert('查询成功！');
            return null;
        }
        if(compareCheck(str1,str2))
        {
            //执行正常的查询
            alert('查询成功！');
        }
        else
        {
            $('#tips').removeAttr('hidden');
            $('#tip').html('起始日期必须小于结束日期！');
            return null;
        }
    }
    var flag2=false;
    function clicka(th)
    {
        var btid=th.id;
        if(flag2==false)
        {
            $('#'+btid).val('启用');
            $('#'+btid).parent().prev().html('<font color="red">禁用</font>');
            flag2=true;
        }
        else
        {
            $('#'+btid).val('禁用');
            $('#'+btid).parent().prev().html('正常');
            flag2=false;
        }
    }
</script>

	<script type="text/javascript">
$(function(){
	$("#starttime").datepicker();
	$("#endtime").datepicker();
});
function GetUserBySday_Eday(currentPage){
	var startDate = $("#starttime").val();
	var endDate = $("#endtime").val();
	
	if (startDate.length != 10) {
		startDate = strhandle(startDate);
	}
	
	if (endDate.length != 10) {
		endDate = strhandle(endDate);
	}
	
	data="currentPage="+currentPage;
	if($("#starttime").val()!=''){
		data+="&begin="+startDate;
	}
	if($("#endtime").val()!=''){
		data+="&end="+endDate;
	}
	window.location="${queryByDateUrl}?"+data;
}

function GetUserBynuit(currentPage){
	window.location="${queryByConditionUrl}?currentPage="+currentPage+"&name="+$("#sname").val()+"&idCard="+$("#sidCard").val()+"&telno="+$("#stelno").val();
}

function buying(uid) {
	var statu=1;
	if($("#buying"+uid).text()=="禁用") {
		statu=0;
	}
	/* alert($("#buying"+uid).val()+"======"+$("#buyend"+uid).val()); */
	
	$.ajax({
		  url: "/ebp_2/admin/updateUserStatusById",  
		  type:'post',
		  dataType:'text',
		  data:{
			  uid:uid,
			  statu:statu
		},
		success:function(data) {
			$("#statustd"+uid).text(data);
			var d = data;
			if (d=="1") {
				$("#buyend"+uid).text("禁用");
				$("#buyend"+uid).attr("class", "btn btn-danger");
				$("#buying"+uid).text("禁用");
				$("#buying"+uid).attr("class", "btn btn-danger");
			}
			
			if (d=="0") {
				$("#buying"+uid).text("启用");
				$("#buying"+uid).attr("class", "btn btn-warning");
				$("#buyend"+uid).text("启用");
				$("#buyend"+uid).attr("class", "btn btn-warning");
			}
		},
		error: function () {
		}
	});
}

</script>

	<script type="text/javascript"
		src="/ebp_2/bootstrap/js/bootstrap.min.js"></script>
	<script type="text/javascript"
		src="/ebp_2/js/bootstrap-datetimepicker.js" charset="UTF-8"></script>
	<script type="text/javascript"
		src="/ebp_2/js/locales/bootstrap-datetimepicker.fr.js" charset="UTF-8"></script>
	<script type="text/javascript">
    $('.form_datetime').datetimepicker({
        //language:  'fr',
        weekStart: 1,
        todayBtn:  1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
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
        minView: 2,
        maxView: 1,
        forceParse: 0
    });
</script>
</body>
</html>