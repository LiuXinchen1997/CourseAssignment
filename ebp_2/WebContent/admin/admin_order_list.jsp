<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<c:url var="queryByDateUrl" value="/admin/queryOrderByDate" scope="request" />
<c:url var="queryByAdminUrl" value="/admin/GetUserByAdmin_oni" scope="request" />

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <title>管理员界面</title>
    <style type="text/css">
        body{
            font-family: 'microsoft yahei',Arial,sans-serif;
            margin:0;
            padding:0;
        }
    </style>
    
	<script type="text/javascript" src="/ebp_2/jQuery/jquery-1.8.3.min.js" charset="UTF-8"></script>
    <link href="/ebp_2/bootstrap/css/bootstrap.min.css" rel="stylesheet" media="screen">
    <link href="/ebp_2/css/bootstrap-datetimepicker.css" rel="stylesheet" media="screen">
    <script>
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
    <script type="text/javascript">
		var selectType = -1;
		$(function(){
			$("#starttime").datepicker();
			$("#endtime").datepicker();
		});
		function GetUserByAdmin_Sday_Eday(){
			
           
			var startDate = $("#starttime").val();
			var endDate = $("#endtime").val();
			
			if (startDate.length != 10) {
				startDate = strhandle(startDate);
			}
			
			if (endDate.length != 10) {
				endDate = strhandle(endDate);
			}
			
			
			
	            //执行正常的查询
				window.location="${queryByDateUrl}?begin="+startDate+"&end="+endDate;
	        

			
			selectType = 0;
		}
		
		function GetUserByAdmin_oni(){
			selectType = 1;
			window.location="${queryByAdminUrl}?sname="+$("#sname").val()+"&sidCard="+$("#sidCard").val()+"&soid="+$("#soid").val();
		}
	</script>
	<script type="text/javascript" src="/ebp_2/js/admin_order_list.js"></script>
</head>
<body style="font-family: 'Microsoft YaHei UI';background-color: #f0ebe7" onload="allstart">
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
            <li>
                <a href="" data-toggle="dropdown">
                    <span class="glyphicon glyphicon-user"></span>
                    <!--<img class="img-circle" src="user_photo.png" width="30" height="30"/>-->
                    <small>欢迎</small>
                    admin
                    <span class="caret"></span>
                </a>
                <ul class="nav nav-pills nav-stacked dropdown-menu">
                    <li class="active">
                        <a href="">
                            <span class="glyphicon glyphicon-cog"></span>&nbsp;&nbsp;页面管理
                        </a>
                    </li>

                    <li class="divider"></li>
                    <li>
                        <a href="/ebp_2/admin/logout" onclick="return confirm('您确定要退出吗？')">
                            <span class="glyphicon glyphicon-off"></span>&nbsp;&nbsp;登出
                        </a>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</div>

<!-- 页面部分 -->
<div class="row">
    <div class="col-sm-2">
        <div class="panel-group" id="box">

            <div class="panel panel-success">
                <div class="panel-heading"  >
                    <a href="#collapseA" data-parent="#box" data-toggle="collapse" class="panel-title">用户管理</a>
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
                    <a href="#collapseB" data-parent="#box" data-toggle="collapse" class="panel-title">票项管理</a>
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
                    <a href="#collapseC" data-parent="#box" data-toggle="collapse" class="panel-title">订单管理</a>
                </div>
                <div class="panel-collapse collapse in" id="collapseC">
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
                <li>Order</li>
                <li>List</li>
            </ul>
        </div>

        <div class="panle panel-success">

            <div style="padding: 10px 100px 30px 10px;">
                <form class="bs-example bs-example-form" role="form">
 <div class="row" style="padding: 0 0 0 50px;">
                        <div class="col-xs-3">
                            <div class="input-group">
                                <span class="input-group-addon">用户名或姓名</span>
                                <input type="text" class="form-control" id="sname" name="sname" value = "${sname}" placeholder="用户名或姓名"/>
                            </div>
                        </div>
                        <div class="col-xs-3">
                            <div class="input-group">
                                <span class="input-group-addon">订单号</span>
                                <input type="text" class="form-control" id="soid" name="soid" value = "${soid}" placeholder="订单号"/>
                                

                            </div>
                        </div>
                        <div class="col-xs-3">
                            <div class="input-group">
                                <span class="input-group-addon">身份证</span>
                                <input type="text" class="form-control" id="sidCard" name="sidCard" value = "${sidCard}" placeholder="身份证"/>
                                
                            </div>
                        </div>
                        <div class="col-xs-3">
  							<div class="input-group">
                                <input style="margin:0 0 0 105px;width: 300px; height:34px;background-color: #bbf0ae" onclick="GetUserByAdmin_oni()" class="btn" style="color: #2f2e33 ;background-color:#bbf0ae" type="button" value="  查询  "/>
                            </div>
                        </div>
                    </div>
                    <br>
                    <div class="row">
                        <div class="col-xs-5">
                        
                            <div class="input-group date form_datetime col-md-5" data-date="1979-09-16T05:25:07Z" data-date-format="yyyy-mm-dd" data-link-field="dtp_input1">
                                <span class="input-group-addon">起始日期</span>
                                <input class="form-control"  id="starttime"  name="startdate" style="width: 400px" type="text" value = "${begin}" readonly>
                                <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
                                <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
                            </div>
                            <input type="hidden" id="dtp_input9" value="" />

                        </div>
                        <div class="col-xs-5">
                            <div class="input-group">

                                <div class="input-group date form_datetime col-md-5" data-date="1979-09-16T05:25:07Z" data-date-format="yyyy-mm-dd" data-link-field="dtp_input1">
                                    <span class="input-group-addon">终止日期</span>
                                    <input class="form-control" id="endtime" name="enddate" style="width: 400px" type="text" value = "${end}" readonly>
                                    <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
                                    <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
                                </div>
                                <input type="hidden" id="dtp_input8" value="" />

                            </div>
                        </div>
                        <div class="col-xs-2">
                            <div class="input-group">
                                <input style="width: 300px; height:34px;background-color: #bbf0ae" onclick="GetUserByAdmin_Sday_Eday()" class="btn" style="color: #2f2e33 ;background-color:#bbf0ae" type="button" value="  查询  "/>
                            </div>
                        </div>
                    </div>

                </form>
            </div>


            <div id="tips" class="alert alert-warning" hidden="hidden">
                <a href="" class="close" onclick="closethis">
                    &times;
                </a>
                <strong id="tip"></strong>
            </div>

            <div class="panel-heading">
                <a class="panel-title">订单列表</a>
            </div>
            <div class="panel-body">
                <table class="table table-striped table-hover">
                    <thead>
                    <tr>
                        <th style="text-align: center;">编号</th>
                        <th style="text-align: center;">订单号</th>
                        <th style="text-align: center;">订单内容</th>
                        <th style="text-align: center;">成交时间</th>
                        <th style="text-align: center;">金额</th>
                        <th style="text-align: center;">姓名</th>
                        <th style="text-align: center;">用户名</th>
                        <th style="text-align: center;">身份证号</th>
                        <th style="text-align: center;">操作</th>
                    </tr>
                    </thead>

                    <!--这里用c标签进行输出-->
                    <c:forEach items="${list}" var="orders" varStatus="sta">
						<tr align="center">
							<td>${sta.count}</td>
							<td>${orders.oid}</td>
							<td>${orders.orderList.descs}</td>
							<td>${orders.commitTime}</td>
							<td>${orders.orderList.price}</td>
							<td>${orders.user.name }</td>
							<td>${orders.user.username }</td>
							<td>${orders.user.idCard }</td>
							<td><button class="btn btn-primary" data-toggle="modal" data-target="#myModal" onclick="queryForDetail(${orders.oid})">查看详情</button></td>
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
                            
                            	<c:if test = "${begin != null || end != null }" var = "bool">
			  						<button onclick="window.location='/ebp_2/admin/queryOrderByDate?currentPage=1&begin=${begin}&end=${end}';" class="btn btn-primary">首页</button>
									<button onclick="window.location='/ebp_2/admin/queryOrderByDate?currentPage=${currentPage-1}&begin=${begin}&end=${end}';" class="btn btn-info">上一页</button>
									${currentPage}/${pageCount}
									<button onclick="window.location='/ebp_2/admin/queryOrderByDate?currentPage=${currentPage+1 }&begin=${begin}&end=${end}';" class="btn btn-info">下一页</button>
									<button onclick="window.location='/ebp_2/admin/queryOrderByDate?currentPage=${pageCount}&begin=${begin}&end=${end}';" class="btn btn-primary">尾页</button>
								</c:if>
								<c:if test = "${!bool}">
								    <button onclick="window.location='/ebp_2/admin/GetUserByAdmin_oni?currentPage=1&sname=${sname}&soid=${soid}&sidCard=${sidCard}';" class="btn btn-primary" class="btn btn-primary">首页</button>
									<button onclick="window.location='/ebp_2/admin/GetUserByAdmin_oni?currentPage=${currentPage-1}&sname=${sname}&soid=${soid}&sidCard=${sidCard}';" class="btn btn-info">上一页</button>
									${currentPage}/${pageCount}
									<button onclick="window.location='/ebp_2/admin/GetUserByAdmin_oni?currentPage=${currentPage+1 }&sname=${sname}&soid=${soid}&sidCard=${sidCard}';" class="btn btn-info">下一页</button>
									<button onclick="window.location='/ebp_2/admin/GetUserByAdmin_oni?currentPage=${pageCount}&sname=${sname}&soid=${soid}&sidCard=${sidCard}';" class="btn btn-primary">尾页</button>
								</c:if>
                            </ul>
                        </td>
                    </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    </div>
    
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    &times;
                </button>
                <h4 class="modal-title" id="myModalLabel">
                    	显示订单详情
                </h4>
            </div>
            <div class="modal-body">
                <div class="modal-body">

				    <div id="dataarea">
				    </div>
    
    
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭
                </button>

            </div>
        </div>
    </div>
</div>
    

    
</div>


<script>
    function query2() {
        
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
        var str1=$('#starttime').val();
        var str2=$('#endtime').val();
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
</script>
<script type="text/javascript" src="/ebp_2/bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript" src="/ebp_2/js/bootstrap-datetimepicker.js" charset="UTF-8"></script>
<script type="text/javascript" src="/ebp_2/js/locales/bootstrap-datetimepicker.fr.js" charset="UTF-8"></script>
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
