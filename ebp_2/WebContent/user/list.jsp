<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="com.oracle.ebp.util.constant.Constant" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>

<c:url var="queryLast7DayByDateURL" value="/user/queryAllOrderList"
	scope="request" />
<c:url var="url" value="/user/queryTicketsByDate" scope="request" />
<c:url var="queryByDateUrl" value="/user/GetTicketBySday_Eday"
	scope="request" />
<c:url var="queryByDescsUrl" value="/user/GetTicketByDescs"
	scope="request" />
<c:url var="queryByPriceUrl" value="/user/GetTicketByPrice"
	scope="request" />

<!doctype html>
<html lang="cn">
<head>
<link href="/ebp_2/css/reset.css" rel="stylesheet">
<link
	href="http://cdn.bootcss.com/bootstrap/3.3.6/css/bootstrap.min.css"
	rel="stylesheet">
<link href="/ebp_2/bootstrap/css/bootstrap.min.css" rel="stylesheet"
	media="screen">
<link href="/ebp_2/css/bootstrap-datetimepicker.css" rel="stylesheet"
	media="screen">
		<script type="text/javascript" src="/ebp_2/jQuery/jquery-1.8.3.min.js" charset="UTF-8"></script>
<style type="text/css">
.glyphicon {
	margin-right: 5px;
}

.btn-wrapper {
	padding: 1em 0;
}

.thumbnail {
	margin-bottom: 20px;
	padding: 0px;
	-webkit-border-radius: 0px;
	-moz-border-radius: 0px;
	border-radius: 0px;
}

.item.list-group-item {
	float: none;
	width: 100%;
	background-color: #fff;
	margin-bottom: 10px;
}

.item.list-group-item:nth-of-type(odd):hover, .item.list-group-item:hover
	{
	background: #428bca;
}

.item.list-group-item .list-group-image {
	margin-right: 10px;
}

.item.list-group-item .thumbnail {
	margin-bottom: 0px;
}

.item.list-group-item .caption {
	padding: 9px 9px 0px 9px;
}

.item.list-group-item:nth-of-type(odd) {
	background: #eeeeee;
}

.item.list-group-item:before, .item.list-group-item:after {
	display: table;
	content: " ";
}

.item.list-group-item img {
	float: left;
}

.item.list-group-item:after {
	clear: both;
}

.list-group-item-text {
	margin: 0 0 11px;
}
</style>


<script type="text/javascript">
		function GetAllTicket(currentPage){
			data="currentPage="+currentPage;
			if($("#stardate").val()!=''){
				data+="&Ticketbegin="+$("#stardate").val();
			}
			window.location="${queryLast7DayByDateURL}?"+data;
		}
	 	function GetTicketBySday_Eday(currentPage){
			data="currentPage="+currentPage;
			if($("#stardate").val()!=''){
				data+="&Ticketbegin="+$("#stardate").val();
			}
			window.location="${queryByDateUrl}?"+data;
		}
		function GetTicketByDescs(currentPage){
			data="currentPage="+currentPage;
			if($("#tDescs").val()!=''){
				data+="&TicketDescs="+$("#tDescs").val();
			}
			 window.location="${queryByDescsUrl}?"+data;
		}
		function GetTicketByPrice(currentPage){
			data="currentPage="+currentPage;
			if($("#tlowPrice").val()!=''){
				data+="&lowPrice="+$("#tlowPrice").val();
			}
			if($("#thighPrice").val()!=''){
				data+="&highPrice="+$("#thighPrice").val();
			}
			 window.location="${queryByPriceUrl}?"+data;
		}
		
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
		
		function queryByDate() {
			var startDate = $("#stardate").val();
			
			if (startDate.length != 10) {
				startDate = strhandle(startDate);
			}
			
			//"/user/GetTicketBySday_Eday"
			//$("#stardate").val(startDate);
			//var form1 = document.getElementById("form1");
			//form1.submit();
			window.location = "/ebp_2/user/GetTicketBySday_Eday?Ticketbegin="+startDate;
		}
	</script>
</head>

<body onload="onloading()">
	<jsp:include page='header.jsp' />
	<div class="stars"></div>

	<div class="row">
		<div class="col-sm-2" style="background-color: #222c2e" id="mysider">
			<br> <font
				style="font-size: 20px; padding-top: 30px; margin: 20px 10px 10px 10px; font-family: 'Microsoft YaHei'">日期查询</font>
			<center>
				<form id='form1' action="${queryByDateUrl}" method="post"
					class="bs-example bs-example-form" role="form">
					<div class="row" style="padding: 20px 0px 10px 10px;">
						<div style="margin-right: 0px">请选择起始日期(查询七天内的票)：</div>
						<div class="input-group date form_datetime col-md-5"
							data-date="1979-09-16T05:25:07Z"
							data-date-format="yyyy-mm-dd"
							data-link-field="dtp_input1">
							<input id="stardate" name="Ticketbegin" class="form-control"
								style="width: 150px" type="text" value="${Ticketbegin}" readonly>
							<span class="input-group-addon"><span
								class="glyphicon glyphicon-remove"></span></span> <span
								class="input-group-addon"><span
								class="glyphicon glyphicon-th"></span></span>
						</div>
						<input type="hidden" id="dtp_input9" value="" />
					</div>

					<div class="row" style="padding: 30px 0px 10px 10px;">
						<div class="input-group">
							<input
								style="width: 240px; height: 34px; color: #fff69e; padding: 0"
								 class="btn" type="button" value="查询" onclick="queryByDate()" />
						</div>
					</div>

					<div class="row" style="padding: 10px 0px 10px 10px;">
						<div id="tips" class="alert alert-warning" hidden="hidden">
							<a href="" class="close" onclick="closethis"> &times; </a> <strong
								id="tip"></strong>
						</div>
					</div>
				</form>
			</center>
			<br>
			<br> <font
				style="font-size: 20px; padding-top: 30px; margin: 20px 10px 10px 10px; font-family: 'Microsoft YaHei'">价格区间查询</font>
			<center>
				<form id='form2' action="${queryByPriceUrl}" method="post"
					class="bs-example bs-example-form" role="form">
					<div class="row" style="padding: 20px 0px 10px 10px;">
						<div class="input-group" style='margin: 0 0 0 32px'>
							<span class="input-group-addon">价格上限：</span> <input type="text"
								id="thighPrice" name="highPrice" value="${highPrice}"
								style='width: 150px' class="form-control" />
						</div>
						<font id="up1_error"
							style='font-family: Microsoft YaHei; color: red; padding: 20px 0 0 0; font-size: 20px'></font>
					</div>

					<div class="row" style="padding: 10px 0px 10px 10px;">
						<div class="input-group" style='margin: 0 0 0 32px'>
							<span class="input-group-addon">价格下限：</span> <input type="text"
								id="tlowPrice" name="lowPrice" value="${lowPrice}"
								style='width: 150px' class="form-control" />
						</div>
						<font id="down1_error"
							style='font-family: Microsoft YaHei; color: red; padding: 20px 0 0 0; font-size: 20px'></font>
					</div>

					<div class="row" style="padding: 30px 0px 10px 10px;">
						<div class="input-group">
							<input
								style="width: 240px; height: 34px; color: #fff69e; padding: 0"
								 class="btn" type="submit" value="查询" />
						</div>
					</div>

					<div class="row" style="padding: 30px 0px 10px 10px;">
						<div class="input-group">
							<input
								style="width: 240px; height: 34px; color: #fff69e; padding: 0"
								class="btn" type="button" value="查看购物车" onclick="location1()" />
						</div>
					</div>
					<div class="row" style="padding: 10px 0px 10px 10px;">
						<div id="tips2" class="alert alert-warning" hidden="hidden">
							<a href="" class="close" onclick="closethis2"> &times; </a> <strong
								id="tip2"></strong>
						</div>
					</div>


				</form>
			</center>
		</div>
		<div class="col-sm-10" id="mycontext">
			<div class="container">
				<div class="btn-wrapper">
					<strong>排列方式</strong>
					<div class="btn-group">
						<a onclick="onloading1()" href="/ebp_2/user/list.jsp" id="list"
							class="btn btn-default btn-sm"><span
							class="glyphicon glyphicon-th-list"> </span>列状</a> <a on
							onclick="onloading2()" href="list.jsp" id="grid"
							class="btn btn-default btn-sm"> <span
							class="glyphicon glyphicon-th"></span>块状
						</a>
					</div>
				</div>
				<div id="products" class="row list-group">

					<c:forEach items="${list}" var="list1">
						<div class="item  col-xs-4 col-lg-4">
							<div class="thumbnail">
								<img class="group list-group-image" style='width:400px;height:400px' 
									src="/ebp_2/upload/<c:if test="${not empty list1.cover}">${list1.cover}</c:if><c:if test="${empty list1.cover}">noimg.jpg</c:if>" alt="<h1>暂无封面</h1>" />
								<div class="caption">
									<h4 class="group inner list-group-item-heading">
										${list1.descs}</h4>
									<p class="group inner list-group-item-text" style="font-size:15px;color:#000;font-family:'Microsoft YaHei'">
										序号：${list1.tid}&nbsp;&nbsp;<br>影片名：${list1.descs}&nbsp;&nbsp;<br>上映日期：${list1.startTime}</p><br>
									<div class="row">
										<div class="col-xs-12 col-md-6">
											<p class="lead" style="font-size:10px;font-family:'Microsoft YaHei'">
												总票数：${list1.amount}&nbsp;&nbsp;<br>剩余票数：${list1.balance}&nbsp;&nbsp;<br>售价：${list1.price}元&nbsp;&nbsp;<br>
												<c:if test="${list1.status==0 }">
													<td width="10%;" style="color: red; border-color: blue;">已停售</td>
												</c:if>
												<c:if test="${list1.status==1 }">
													<td width="10%;">售票中</td>
												</c:if>
											</p>
										</div>

										<div class="col-xs-12 col-md-6">
											<c:if test="${list1.status==1}">
												<button class="btn btn-success"
													onclick="location2(${list1.tid})">查看详情</button>
											</c:if>
										</div>
									</div>
								</div>
							</div>
						</div>
					</c:forEach>

				</div>
			</div>

			<center>
				<tfoot>
					<tr>
						<td colspan="5">
							<ul>
								<font color="red"><p>${error}</p></font>
								<c:if test="${isQueryAll == 1}">
									
									<input class="btn" type="button" value="首页" onclick="GetAllTicket(1)" />
									<input class="btn" type="button" value="上一页" onclick="GetAllTicket(${currentPage-1})" />
									${currentPage}/${pageCount} 
									<input class="btn" type="button" value="下一页" onclick="GetAllTicket(${currentPage+1})" />
									<input class="btn" type="button" value="尾页" onclick="GetAllTicket(${pageCount})" />
								</c:if>
								<c:if test="${isDate == 1}">
									<input class="btn" type="button" value="首页" onclick="GetTicketBySday_Eday(1)" />
									<input class="btn" type="button" value="上一页" onclick="GetTicketBySday_Eday(${currentPage-1})" />
									${currentPage}/${pageCount} 
									<input class="btn" type="button" value="下一页" onclick="GetTicketBySday_Eday(${currentPage+1})" />
									<input class="btn" type="button" value="尾页" onclick="GetTicketBySday_Eday(${pageCount})" />
								</c:if>
								<c:if test="${isDescs == 1}">
									<input class="btn" type="button" value="首页" onclick="GetTicketByDescs(1)" />
									<input class="btn" type="button" value="上一页" onclick="GetTicketByDescs(${currentPage-1})" />
									${currentPage}/${pageCount} 
									<input class="btn" type="button" value="下一页" onclick="GetTicketByDescs(${currentPage+1})" />
									<input class="btn" type="button" value="尾页" onclick="GetTicketByDescs(${pageCount})" />
								</c:if>
								<c:if test="${isPrice == 1}">
									<input class="btn" type="button" value="首页" onclick="GetTicketByPrice(1)" /></li>
									<input class="btn" type="button" value="上一页" onclick="GetTicketByPrice(${currentPage-1})" />
									${currentPage}/${pageCount}
									<input class="btn" type="button" value="下一页" onclick="GetTicketByPrice(${currentPage+1})" />
									<input class="btn" type="button" value="尾页" onclick="GetTicketByPrice(${pageCount})" />
								</c:if>
							</ul>
						</td>
					</tr>
				</tfoot>
			</center>
			<br>
		</div>
	</div>

	<jsp:include page='footer.jsp' />
	<script type="text/javascript" src="/ebp_2/jQuery/jquery-1.8.3.min.js" charset="UTF-8"></script>
	<script>window.jQuery || document.write('<script src="/ebp_2/js/jquery-1.6.2.min.js"><\/script>')</script>
	<script type="text/javascript">

	
	function location1(){
		window.location="/ebp_2/user/shopping_car.jsp";
	}
	
	function location2(tid) {
		window.location="/ebp_2/user/ticketdetail?tid="+tid;
	}


	function GetAllTicket(currentPage){
		data="currentPage="+currentPage;
		if($("#stardate").val()!=''){
			data+="&Ticketbegin="+$("#stardate").val();
		}
		window.location="${queryLast7DayByDateURL}?"+data;
	}
 	function GetTicketBySday_Eday(currentPage){
		data="currentPage="+currentPage;
		if($("#stardate").val()!=''){
			data+="&Ticketbegin="+$("#stardate").val();
		}
		window.location="${queryByDateUrl}?"+data;
	}
	function GetTicketByDescs(currentPage){
		data="currentPage="+currentPage;
		if($("#tDescs").val()!=''){
			data+="&TicketDescs="+$("#tDescs").val();
		}
		 window.location="${queryByDescsUrl}?"+data;
	}
	function GetTicketByPrice(currentPage){
		data="currentPage="+currentPage;
		if($("#tlowPrice").val()!=''){
			data+="&lowPrice="+$("#tlowPrice").val();
		}
		if($("#thighPrice").val()!=''){
			data+="&highPrice="+$("#thighPrice").val();
		}
		 window.location="${queryByPriceUrl}?"+data;
	}

var tem1;
var tem2;
$("#tlowPrice").blur(function(){
	if($('#tlowPrice').val()==''||$('#tlowPrice').val()==0)
    {
            $("#down1_error").html("");
            tem1=true;
            return true;
    }
    else if(isNaN($('#tlowPrice').val()))
    {
        $("#down1_error").html("必须为数字！");
        tem1=false;
        return false;
    }
    else if($('#tlowPrice').val().indexOf(" ")!=-1)
    {
        $("#down1_error").html("不能包含空格！");
        tem1=false;
        return false;
    }
    else if(parseInt($('#tlowPrice').val())<0)
    {
        $("down1_error").html("不能小于零！");
        tem1=false;
        return false;
    }
    else if(parseInt($('#tlowPrice').val())!=$('#tlowPrice').val())
    {
        $("#down1_error").html("不能为小数!");
        tem1=false;
        return false;
    }
    else
    {
        $("#down1_error").html("");
        tem1=true;
        return true;
    }
});

$("#thighPrice").blur(function(){

    if($('#thighPrice').val()==''||$('#thighPrice').val()==0)
    {
            $("#up1_error").html("");
            tem2=true;
            return true;
    }
    else if(isNaN($('#thighPrice').val()))
    {
        $("#up1_error").html("必须为数字！");
        tem2=false;
        return false;
    }
    else if($('#thighPrice').val().indexOf(" ")!=-1)
    {
        $("#up1_error").html("不能包含空格！");
        tem2=false;
        return false;
    }
    else if(parseInt($('#thighPrice').val())<0)
    {
        $("up1_error").html("不能小于零！");
        tem2=false;
        return false;
    }
    else if(parseInt($('#thighPrice').val())!=$('#thighPrice').val())
    {
        $("#up1_error").html("不能为小数!");
        tem2=false;
        return false;
    }
    else
    {
        $("#up1_error").html("");
        tem2=true;
        return true;
    }
});
    function GetTicketBySday_Eday(currentPage) {    
        window.location="${showTicketUrl}?Ticketbegin="+$("#stardate").val()+"&Ticketend="+$("#enddate").val()+"&currentPage="+currentPage;
    }
    function GetTicketBynuit(currentPage){
        window.location="${showTicketDescsUrl}?TicketDescs="+$("#ticketName").val()
                     +"&currentPage="+currentPage;
    }



var global;
var global_count;
    function onloading2() {
        $('#mysider').css('height',global);
    }
    function onloading1() {
        temp=global;
        if(temp==0){
            $('#mysider').css('height',600);
            return null;
        }
        $('#mysider').css('height',parseInt(temp.replace("px",""))+1025);//or625?
    }
    function onloading() {
        global_count=$('#products').children().length;
        if(global_count==0)
        {
            $('#mysider').css('height',600);
            return null;
        }
        global=$('#mycontext').css('height');
        $('#mysider').css('height',global);
    }

    function closethis()
    {
        $('#tip').html('');
        $('#tips').attr('hidden','hidden');
    }
    function closethis2()
    {
        $('#tip2').html('');
        $('#tips2').attr('hidden','hidden');
    }
    function query()
    {
        $('#tip').html('');
        $('#tips').attr('hidden','hidden');
        var str1=strhandle($('#date1').val());
        if(str1=='')
        {
            $('#tips').removeAttr('hidden');
            $('#tip').html('日期查询不能为空！');
            return null;
        }
        else
        {
            alert('查询成功！');
            $('#form1').sumbit();
        }
    }
    function query2()
    {
    	$("#thighPrice").blur();
    	$("#tlowPrice").blur();
    	if(tem1&&tem2){
        $('#tip2').html('');
        $('#tips2').attr('hidden','hidden');
        var up=$('#thighPrice').val();
        var down=$('#tlowPrice').val();
        if(up==''&&down=='')
        {
            $('#tips2').removeAttr('hidden');
            $('#tip2').html('上限都下限不能为空！');
            return null;
        }
        else if(parseInt(up)<=parseInt(down))
        {
            $('#tips2').removeAttr('hidden');
            $('#tip2').html('上限必须大于下限');
            return null;
        }
        else
        {
            alert('查询成功！');
            $('#form2').sumbit();
        }}
    	else
    	{
            $('#tips2').removeAttr('hidden');
            $('#tip2').html('请修改错误！');
            return null;
    	}
    }

</script>

	<script
		src="http://cdn.bootcss.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
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
	<script type="text/javascript">
    $(document).ready(function() {
        $('#list').click(function(event){event.preventDefault();$('#products .item').addClass('list-group-item');});
        $('#grid').click(function(event){event.preventDefault();$('#products .item').removeClass('list-group-item');$('#products .item').addClass('grid-group-item');});
    });
</script>
</body>
</html>