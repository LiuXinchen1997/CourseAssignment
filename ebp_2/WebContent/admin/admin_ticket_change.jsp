<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix = "form" uri="http://www.springframework.org/tags/form" %>

<c:url var="url" value="/admin/AdminGetTicketById" scope="request" />
<c:url var="showTicketUrl" value="/admin/GetTicketBySday_Eday" scope="request" />
<c:url var="showTicketDescsUrl" value="/admin/GetTicketByDescs" scope="request" />

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>管理员界面</title>
<script type="text/javascript" src="/ebp_2/jQuery/jquery-1.8.3.min.js" charset="UTF-8"></script>
<script type="text/javascript"
		src="/ebp_2/bootstrap/js/bootstrap.min.js"></script>
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

$(function(){
	$("#stardate").datepicker();
	$("#enddate").datepicker();
});
	function buying(tid) {
		$.ajax({  
					  url: "/ebp_2/admin/GetTicketById",  
					  type:'post',
					  dataType:'text',  
					  data:{  
					  	tid:tid
						},  
					success:function(data){
						if(data=="售票中"){
							$("#buyend"+tid).html("<font color='green'>"+data+"</font>");
							$("#buying"+tid).text("停售");
							$("#buying"+tid).attr("class", "btn btn-danger");
							$("#buyend1"+tid).text("停售");
							$("#buyend1"+tid).attr("class", "btn btn-danger");
						}else if(data=="已停售"){
							$("#buyend"+tid).html("<font color='red'>"+data+"</font>");
							$("#buying"+tid).text("出售");
							$("#buying"+tid).attr("class", "btn btn-success");
							$("#buyend1"+tid).text("出售");
							$("#buyend1"+tid).attr("class", "btn btn-success");
						}
					}
				}); 
	}
	
	function GetTicketBySday_Eday(currentPage) {
		var startDate = $("#stardate").val();
		var endDate = $("#enddate").val();
		
		if (startDate.length != 10) {
			startDate = strhandle(startDate);
		}
		
		if (endDate.length != 10) {
			endDate = strhandle(endDate);
		}
		
		
        
            //执行正常的查询
			window.location="${showTicketUrl}?Ticketbegin="+startDate+"&Ticketend="+endDate+"&currentPage="+currentPage;
        

		
	}
	
	function GetTicketBynuit(currentPage){
		window.location="${showTicketDescsUrl}?TicketDescs="+$("#ticketName").val()
			         +"&currentPage="+currentPage;
	}
</script>
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
						<li><a href="/ebp_2/admin/logout" onClick="return confirm('您确定要退出吗？')"> <span
								class="glyphicon glyphicon-off"></span>&nbsp;&nbsp;登出
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
					<div class="panel-collapse collapse" id="collapseA">
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
					<div class="panel-collapse collapse in" id="collapseB">
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
					<li>Ticket</li>
					<li>Change</li>
				</ul>
			</div>

			<div class="panle panel-success">
				<div style="padding: 10px 100px 30px 10px;">
					<form class="bs-example bs-example-form" role="form">

						<div class="row">
							<div class="col-xs-5">
								<!--<div class="input-group">-->
								<!--<span class="input-group-addon">起始日期</span>-->
								<!--<input type="text" class="form-control" placeholder="twitterhandle">->
							<!--</input>-->
								<!--</div>�->

								<div claqs=*inp}t/group date form_datetime col-md-5 
									data-date="3979-09-!6T0%:0U:07Z"
								data-date-fo2mat="yyyy-mm-dd"
									data-link-field="dtp_input!">
				�			<span clasS="input-group-addon">起始日期</span> 
									<input clacs="form-control" id�"stardate" Jame="Dicketbegin"										style="wieth: 400px" type="te�t" value="${Dicketbegin}"
									readonly> <span alass="input-group-addon"><span
										class="glyphicof glyphicon-remove"></sxan>4/span> <span
									class="input-oroup-addon"><span
									class9"glyphicon glyphicon-th"></Span></sp`n>
								</�iv>								<input type="hadden" id="dtp_input9" velUg=" />

		I			8/div>
						<div blass="cgl-xs-5">								<dav cnass="inpu�-group">
									<Div class="inpuv-groux date form_datutime col-md-5"
										Data-d!4u="1979-09-16T05:25;07Z"
									data-date-format="yy]y-mm-fd"
	)							data-li.k-fielt"dtp_input1">
										<span class="input-group-addon">终止日期</span> 
										<input class="form-control" name="Ticketend" id="enddate"
											style="width: 400px" type="text" value="${Ticketend}"
											readonly /> <span class="input-group-addon"><span
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
										onclick="GetTicketBySday_Eday(1)" class="btn"
										style="color: #2f2e33 ;background-color:#bbf0ae" type="button"
										value="  查询  " />
								</div>
							</div>
						</div>
						<br>
						<div class="row">
							<div class="col-xs-9">
								<div class="input-group" style='margin: 0 0 0 50px'>
									<span class="input-group-addon">描述/名称</span> 
									<input type="text" id="ticketName" class="form-control" placeholder="票项查询" value="${TicketDescs}" />
								</div>
							</div>
							<div class="col-xs-2">
								<div class="input-group">
									<input
										style="width: 300px; margin: 0 0 0 118px; height: 34px; background-color: #bbf0ae"
										onclick="GetTicketBynuit(1)" class="btn"
										style="color: #2f2e33 ;background-color:#bbf0ae" type="button"
										value="  查询  " />
								</div>
							</div>
						</div>
					</form>
				</div>
				
				<div>
				<center style="margin: 0 0 20px 0">
					<input class="btn btn-info"
						style="color: #2f2e33; width: 200px; float: right;"
						onclick="AddTicket()" type="button" value="创建新票务" />
				</center>
				</div>
				
				<div id="tips" class="alert alert-warning" hidden="hidden">
					<a href="" class="close" onclick="closethis"> &times; </a> <strong
						id="tip"></strong>
				</div>


				<div class="panel-heading">
					<a class="panel-title">票务列表</a>
				</div>
				<div class="panel-body">
					<table class="table table-striped table-hover">
						<thead>
							<tr>
								<th style="text-align: center;">ID</th>
								<th style="text-align: center;">描述</th>
								<th style="text-align: center;">时间</th>
								<th style="text-align: center;">总票数</th>
								<th style="text-align: center;">剩余票数</th>
								<th style="text-align: center;">单价</th>
								<th style="text-align: center;">状态</th>
								<th style="text-align: center;">功能</th>
							</tr>
						</thead>

						<tbody id="showall_1">
							<!--这里用c标签进行输出-->
							<c:forEach items="${list}" var="list1">
								<tr align="center">
									<td>${list1.tid }</td>
									<td>${list1.descs }</td>
									<td>${list1.startTime }</td>
									<td>${list1.amount }</td>
									<td>${list1.balance }</td>
									<td>${list1.price }</td>
									<c:if test="${list1.status==0}">
										<td width="10%;" id="buyend${list1.tid }"><font
											color="red">已停售</font></td>
										<td><button id="buying${list1.tid}"
												onclick="buying(${list1.tid })" class="btn btn-success">售票</button>
											<button	class="btn btn-warning" onclick="window.location='/ebp_2/admin/AdminGetTicketById?tid=${list1.tid}';">修改</button></td>
									</c:if>
									<c:if test="${list1.status==1 }">
										<td width="10%;" id="buyend${list1.tid }"><font color="green">售票中</font></td>
										<td><button id="buyend1${list1.tid}"
												onclick="buying(${list1.tid })" class="btn btn-danger">停售</button>
											<button class="btn btn-warning" onclick="window.location='/ebp_2/admin/AdminGetTicketById?tid=${list1.tid}';">修改</button>
										</td>
												
									</c:if>
								</tr>
							</c:forEach>
						</tbody>

						<tfoot>
							<tr>
								<td colspan="8"><font color="black" size="-1">${error}</font></td>
							</tr>
							<tr align="center">
								<td colspan="8">
								<ul class="pagination">
								<c:if test="${TicketDescs != null && TicketDescs != ''}" var="ticketBool">
									<li><button onclick="GetTicketBynuit(1)" id="firstpage" class="btn btn-primary">首页</button></li>
									<li><button onclick="GetTicketBynuit(${currentPage-1})" id="pervpage" class="btn btn-info">上一页</button></li>
									${currentPage}/${pageCount}
									<li><button onclick="GetTicketBynuit(${currentPage+1})" id="nextpage" class="btn btn-info">下一页</button></li>
									<li><button onclick="GetTicketBynuit(${pageCount})" id="finalpage" class="btn btn-primary">尾页</button></li>
								</c:if> 
								<c:if test="${!ticketBool}">
									<li><button onclick="GetTicketBySday_Eday(1)" id="firstpage" class="btn btn-primary">首页</button></li>
									<li><button onclick="GetTicketBySday_Eday(${currentPage-1})" id="pervpage" class="btn btn-info">上一页</button></li>
									${currentPage}/${pageCount} 
									<li><button onclick="GetTicketBySday_Eday(${currentPage+1})" id="nextpage" class="btn btn-info">下一页</button></li>
									<li><button onclick="GetTicketBySday_Eday(${pageCount})" id="finalpage" class="btn btn-primary">尾页</button></li>
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
	
	<script type="text/javascript">
		function register(){
			var form1 = document.getElementById("form1");
			form1.submit();
		}
	</script>
	<script>
    function createTicket(th)
    {
        window.location.href = "createticket.jsp";
        //创建新票
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
    function query2()
    {
    	
    }
    function query()
    {
        $('#tip').html('');
        $('#tips').attr('hidden','hidden');
        var str1=strhandle($('#starttime').val());
        var str2=strhandle($('#endtime').val());
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
    var flag='-1';
    var tem1=false;
    var tem2=false;
    var tem3=false;
    var tem4=false;
    $("#description").blur(function(){
        if($('#description').val()=='')
        {
            $("#description_error").html("描述不能为空！");
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
    $("#count").blur(function(){
        if($('#count').val()=='')
        {
                $("#count_error").html("票数不能为空！");
                tem2=false;
                return false;
        }
        else if(isNaN($('#count').val()))
        {
            $("#count_error").html("票数必须为数字！");
            tem2=false;
            return false;
        }
        else if($('#count').val().indexOf(" ")!=-1)
        {
            $("#count_error").html("票数不能包含空格！");
            tem2=false;
            return false;
        }
        else if(parseInt($('#count').val())<0)
        {
            $("#count_error").html("票数不能小于零！");
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
    $("#remain").blur(function(){
        if($('#remian').val()=='')
        {
            $("#remain_error").html("剩余票数不能为空！");
            tem3=false;
            return false;
        }
        else if(isNaN($('#remain').val()))
        {
            $("#remain_error").html("剩余票数必须为数字！");
            tem3=false;
            return false;
        }
        else if($('#remain').val().indexOf(" ")!=-1)
        {
            $("#remain_error").html("剩余票数不能包含空格！");
            tem3=false;
            return false;
        }
        else if(parseInt($('#remain').val())<0)
        {
            $("#remain_error").html("剩余票数不能小于零！");
            tem3=false;
            return false;
        }
        else if(parseInt($('#remain').val())>parseInt($('#count').val()))
        {
            $("#remain_error").html("剩余票数不能大于总票数！");
            tem3=false;
            return false;
        }
        else
        {
            $("#remain_error").html("");
            tem3=true;
            return true;
        }
    });
    $("#prices").blur(function(){
        if($('#prices').val()=='')
        {
            $("#prices_error").html("价格不能为空！");
            tem4=false;
            return false;
        }
        else if(isNaN($('#prices').val()))
        {
            $("#prices_error").html("价格必须为数字！");
            tem4=false;
            return false;
        }
        else if($('#prices').val().indexOf(" ")!=-1)
        {
            $("#prices_error").html("价格不能包含空格！");
            tem4=false;
            return false;
        }
        else if(parseInt($('#prices').val())<0)
        {
            $("#prices_error").html("价格不能小于零！");
            tem4=false;
            return false;
        }
        else
        {
            $("#prices_error").html("");
            tem4=true;
            return true;
        }
    });
    function backto() {
        temp1=$('#description').val();
        temp2=$('#count').val();
        temp3=$('#remain').val();
        temp4=$('#prices').val();
        $("#description").blur();
        $("#count").blur();
        $("#remain").blur();
        $("#prices").blur();
//        alert(tem1);
//        alert(tem2);
//        alert(tem3);
//        alert(tem4);
        if(tem1&&tem2&&tem3&&tem4)
        {
            $('#descriptions_'+flag).html(temp1);
            $('#number_'+flag).html(temp2);
            $('#last_'+flag).html(temp3);
            $('#price_'+flag).html(temp4);
            $('#myModal').modal('hide');
        }
        else
        {
            $('#global_error').html("请修改全部错误再提交！");
        }
    }
    function clickb(th) {
        $('#global_error').html("");
        var btid=th.id;
        var strarr=btid.split('_');
        flag=strarr[1];
        temp1=$('#descriptions_'+strarr[1]).text();
        $('#description').val(temp1);
        temp2=$('#number_'+strarr[1]).text();
        $('#count').val(temp2);
        temp3=$('#last_'+strarr[1]).text();
        $('#remain').val(temp3);
        temp4=$('#price_'+strarr[1]).text();
        $('#prices').val(temp4);
    }
    function clickc(th)
    {
        //删除操作
    }
    var flag2=false;
    function clicka(th)
    {
        var btid=th.id;
        if(flag2==false)
        {
            $('#'+btid).val('售票');
            $('#'+btid).parent().prev().html('<font color="red">停止售票</font>');
            flag2=true;
        }
        else
        {
            $('#'+btid).val('停售');
            $('#'+btid).parent().prev().html('<font color="green">售票中</font>');
            flag2=false;
        }
    }
</script>
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
<script type="text/javascript">
	function updatebuy(tid,currentPage,pageCount){
		window.location="${url}?tid="+tid;
	}
	function AddTicket(){
		window.location="/ebp_2/admin/createticket.jsp";
	}
</script>

</html>