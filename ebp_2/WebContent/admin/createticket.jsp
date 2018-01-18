<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<c:url var="url" value="/admin/AddTicket" scope="request" />
<c:url var="addImageUrl" value="/admin/addTicketImage" scope="request" />
<c:url var="addDescsUrl" value="/admin/addTicketDescs" scope="request" />
<c:url var="addDetailUrl" value="/admin/addTicketDetail" scope="request" />
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
        
        .content {
        	margin: 10px;
        	text-align: center;
        }
    </style>
	<script type="text/javascript" src="/ebp_2/js/jquery-1.12.1.min.js"></script>
	<script type="text/javascript" src="/ebp_2/js/ajaxfileupload.js"></script>
	<link rel="stylesheet" type="text/css" href="/ebp_2/css/addTicketDetail.css">
    <link href="/ebp_2/bootstrap/css/bootstrap.min.css" rel="stylesheet" media="screen">
    <link href="/ebp_2/css/bootstrap-datetimepicker.css" rel="stylesheet" media="screen">
</head>
<body style="font-family: 'Microsoft YaHei UI';background-color: #f0ebe7">
<!-- 导航栏部分 -->
<div class="navbar navbar-inverse" style="margin: 0">
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
                        <a href="/ebp_2/admin/logout" onClick="return confirm('您确定要退出吗？')">
                            <span class="glyphicon glyphicon-off"></span>&nbsp;&nbsp;登出
                        </a>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</div>

<!-- 页面部分 -->







<div id="wrapper">
    <div id="sidebar-wrapper" class="col-md-2" style="margin: 20px 0 0 0">
        <div id="sidebar" >
            <ul class="nav list-group">
                <li style="margin: 2px 0 2px 0;">
                	<jsp:useBean id="addTicketBean" class="com.oracle.ebp.domain.AddTicketBean" scope="request"/>
                    <form:form modelAttribute="addTicketBean" action="/ebp_2/admin/ajax/addTicket" method="post" id="form1">
                        <p>
                            <font color="red" size="-1">
                                <i>
                                    <form:errors />
                                </i>
                            </font>
                        </p>
                        <br>
                        <div class="input-group">
                            <span>影片名</span><br>
                            <form:input path="descs" style='width:285px;margin-top:10px' class="form-control" placeholder="影片名"/>
                            <p>
                                <font color="red" size="-1">
                                    <i>
                                        <form:errors path="descs" />
                                    </i>
                                </font>
                            </p>
                        </div><br>

						
						
						
                        <div class="input-group">
                            <span>开始时间</span><br>
                            	<div style='width:285px;padding:0px' class="input-group date form_datetime col-md-5"
								data-date="1979-09-16T05:25:07Z"
								data-date-format="yyyy-mm-dd hh:mm:ss"
								data-link-field="dtp_input1">
								<form:input path="startTime" class="form-control" style="width: 208px;margin:0px" />
								
								<span class="input-group-addon"><span
									class="glyphicon glyphicon-remove"></span></span> <span
									class="input-group-addon"><span
									class="glyphicon glyphicon-th"></span></span>
								</div>

                        </div><br>

                        <div class="input-group">
                            <span>总票数</span><br>
                            <form:input path="amount" style='width:285px;margin-top:10px' class="form-control" placeholder="总票数"/>
                            <p>
                                <font color="red" size="-1">
                                    <i>
                                        <form:errors path="amount" />
                                    </i>
                                </font>
                            </p>
                        </div><br>

                        <div class="input-group">
                            <span>剩余票数</span><br>
                            <form:input path="balance" style='width:285px;margin-top:10px' class="form-control" placeholder="剩余票数"/>
                            <p>
                                <font color="red" size="-1">
                                    <i>
                                        <form:errors path="balance" />
                                    </i>
                                </font>
                            </p>
                        </div><br>

                        <div class="input-group">
                            <span>单价(元)</span><br>
                            <form:input path="price" style='width:285px;margin-top:10px' class="form-control" placeholder="单价(元)"/>
                            <p>
                                <font color="red" size="-1">
                                    <i>
                                        <form:errors path="price" />
                                    </i>
                                </font>
                            </p>
                        </div><br>

                        状态：<form:radiobutton path="status" value="0" checked="checked"/>售票中
                        <form:radiobutton path="status" value="1"/>已停售
                        <br/>
                        <br/>
                    </form:form>
                </li>


                <li>

                    <br>
                    
                        <div id="ticketDetail" class="controls form-group">
                            <input type="file" name="file" id="uploadFile" value="image" /> <br>
                            <input class='btn btn-default' style='width:285px;background-color:#C2D9CB' onclick="ajaxFileUpload()" type="button" value="添加图片" />
                        </div>

                        <div class="form-group">
                            <textarea class="form-control" style='width:285px' rows="3" rows="30" cols="20" name="descs" id="desc" placeholder="请添加介绍"></textarea> <br>
                            <input class='btn btn-default' style='width:285px;background-color:#C2D9CB' onclick="addDesc()" type="button" value="提交文本" />
                        </div>

                        <div class="form-group">
                            <input class='btn btn-default' type="hidden" name="tid" value="${ticket.tid}" />
                            <input class='btn btn-default' style='width:285px;background-color:#C2D9CB' type="submit" onclick="submitTicket();" value="提交添加" />
                        </div>
                </li>
                <li style="margin: 2px 0 2px 0;">
                    <div class='row'>
                        <div class="col-md-1">
                            <button style="" class="btn" onclick="<%session.removeAttribute("ticketDetail"); %> history.go(-1);">返回</button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>

    <div id="main-wrapper" class="col-md-10 pull-right" style="background-color: #fafafa; border-left: 2px solid #76a470;height: 1024px">
        <div id="right">
	        <div id="preview" class="right_preview">
	        </div>
        </div>
    </div>
</div>
<script type="text/javascript">
    function saveall()
    {
        alert('保存成功！');
    }
    
    function submitTicket() {
    	//if ($('#stardate').val()==='') {
    		//alert('日期不能为空')
    		//return null;
    	//} else {
    		$("#form1").submit();
    	//}
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

        forceParse: 0,
        showMeridian: 1
    });
    
	function ajaxFileUpload() {
		var s = $("#uploadFile").val();
		if (s == null || s == "") {
			alert("请选择一个附件");
			$("#uploadFile").focus();
			return;
		}
		
		$.ajaxFileUpload({
					url : '/ebp_2/admin/ajax/uploadPic', //服务器端请求地址  
					secureuri : false, //是否需要安全协议，一般设置为false  
					fileElementId : 'uploadFile', //文件上传域的ID  
					dataType : 'content', //返回值类型 一般设置为json  
					enctype : 'multipart/form-data',//注意一定要有该参数  
					success : function(data) //服务器成功响应处理函数  
					{
						var str = "<div class='content'><img alt='图片预览' style='width: 860px;' class='right_preview_image'  src='\\ebp_2\\upload\\"+data+"'></div><br>";
						$(str).appendTo("#preview");
						$("#uploadFile").val("");
					},
					error : function(data)//服务器响应失败处理函数  
					{
						alert(data);
					}
		});
	}

	
	
	function addDesc() {
		var s = $("#desc").val();
		if (s == null || s == "") {
			alert("请添加文字描述");
			$("#desc").focus();
			return;
		}
			$.ajax({
					type : "GET",
					url : "/ebp_2/admin/ajax/uploadDesc",
					data : {
						desc : $("#desc").val()
					},
					dataType : "text",
					success : function(data) {
						var str = "<div class='content'><p class='right_preview_text' style='font-size:40px;font-family:Microsoft YaHei;'>"+data+"</p></div>";
						$(str).appendTo("#preview");
						$("#desc").val("");
					},
					error : function(data)//服务器响应失败处理函数  
					{
						alert(data);
					}
				});
	}
</script>
</body>
</html>