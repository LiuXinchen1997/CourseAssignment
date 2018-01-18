<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<c:url var="url" value="/admin/AdminGetTicketById" scope="request" />
<c:url var="showTicketUrl" value="/admin/GetTicketBySday_Eday" scope="request" />
<c:url var="showTicketDescsUrl" value="/admin/GetTicketByDescs" scope="request" />

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<link href="../css/ticket.css" rel="stylesheet" type="text/css"></link>
</head>
<script type="text/javascript" src="../js/jquery-1.4.2.js"></script>
<script type="text/javascript" src="../js/jquery-ui-1.8.5.custom.min.js"></script>
<script type="text/javascript" src="../js/jquery.ui.datepicker-zh-CN.js"></script>
<script type="text/javascript">
$(function(){
	$("#stardate").datepicker();
	$("#enddate").datepicker();
});
	function buying(tid) {
		$.ajax({  
					  url: "admin/GetTicketById",  
					  type:'post',
					  dataType:'text',  
					  data:{  
					  	tid:tid
						},  
					success:function(data){
						if(data=="售票中"){
							$("#buyend"+tid).html(data);
							$("#buying"+tid).val("停售");
							$("#buyend1"+tid).val("停售");
						}else if(data=="已停售"){
							$("#buyend"+tid).html("<font color='red'>"+data+"</font>");
							$("#buying"+tid).val("出售");
							$("#buyend1"+tid).val("出售");
						}
					}
				}); 
	}
	function GetTicketBySday_Eday(currentPage) {
		
	window.location="${showTicketUrl}?Ticketbegin="+$("#stardate").val()+"&Ticketend="+$("#enddate").val()+"&currentPage="+currentPage;
	}
	function GetTicketBynuit(currentPage){
		window.location="${showTicketDescsUrl}?TicketDescs="+$("#ticketName").val()
				         +"&currentPage="+currentPage;
	}
</script>
<body>


	<table border="1" cellspacing="0"
		style="margin-left: 5%; width: 90%; border-left: 0; border-top: 0; border-right: 0;">

		<tr>
			<td colspan="6"
				style="border-left: 0; border-top: 0; border-right: 0; padding-bottom: 2%;">
				起始日期：<input type="text" id="stardate" name="Ticketbegin" value="${Ticketbegin}" /> 
				终止日期：<input type="text" id="enddate" name="Ticketend" value="${Ticketend }" /><input type="submit" value="查询"
				onclick="GetTicketBySday_Eday(1)" />
			</td>
			<td colspan="2"
				style="border-left: 0; border-top: 0; border-right: 0; padding-bottom: 2%;"><input
				type="button" value="添加票项" onclick="AddTicket()" /></td>
		</tr>
        <tr>
		   <td colspan="12"
				style="border:0; padding-bottom: 2%; text-align: left;">
				描述/名称：<input type="text" id="ticketName"  name="tName" value="${TicketDescs}"/> 
				<input type="button" value="查询" onclick="GetTicketBynuit(1)"/>
			</td>
		</tr>
		
		<tr>
			<th>序号</th>
			<th>描述</th>
			<th>时间</th>
			<th>总票数</th>
			<th>剩余票数</th>
			<th>单价(元)</th>
			<th>状态</th>
			
			<th></th>
		</tr>
		<c:forEach items="${list }" var="list1">
			<tr>
				<td width="5%;">${list1.tid }</td>
				<td width="25%;">${list1.descs }</td>
				<td width="12%;">${list1.startTime }</td>
				<td width="8%;">${list1.amount }</td>
				<td width="8%;">${list1.balance }</td>
				<td width="8%;">${list1.price }</td>
				<c:if test="${list1.status==0 }">
					<td width="10%;" id="buyend${list1.tid }"
					><font color="red">已停售</font></td>
						
					<td><input type="button" value="售票" id="buying${list1.tid }" onclick="buying(${list1.tid })" />
					<input	type="button" value="修改" onclick="updatebuy(${list1.tid })" /></td> 
				</c:if>
				<c:if test="${list1.status==1 }">
					<td width="10%;" id="buyend${list1.tid }">售票中</td>
				    <td><input type="button" value="停售"   id="buyend1${list1.tid }"	onclick="buying(${list1.tid })" />  
					<input type="button" value="修改" onclick="updatebuy(${list1.tid })" /> 
					</td>
				</c:if>
			</tr>
		</c:forEach>
	</table>
	<table border="0" cellspacing="0"
		style="width: 100%; border-left: 0; border-top: 0; border-right: 0;">
		<tr align="center">
			<td><font color="red"><p>${error}</p></font></td>
		</tr>
		<tr align="center">
			<td>
			<c:if test = "${TicketDescs != null && TicketDescs != ''}" var = "ticketBool">
		      <input type="button" value="首页"
				onclick="GetTicketBynuit(1)" /> <input type="button" value="上一页"
				onclick="GetTicketBynuit(${currentPage-1})" />
				${currentPage}/${pageCount} <input type="button" value="下一页"
				onclick="GetTicketBynuit(${currentPage+1})" /> <input
				type="button" value="尾页" onclick="GetTicketBynuit(${pageCount})" />
		       </c:if>
		    <c:if test = "${!ticketBool}">
			<input type="button" value="首页"
				onclick="GetTicketBySday_Eday(1)" /> <input type="button" value="上一页"
				onclick="GetTicketBySday_Eday(${currentPage-1})" />
				${currentPage}/${pageCount} <input type="button" value="下一页"
				onclick="GetTicketBySday_Eday(${currentPage+1})" /> <input
				type="button" value="尾页" onclick="GetTicketBySday_Eday(${pageCount})" />
			</c:if>
			</td>
		</tr>
	</table>
</body>
<script type="text/javascript">
	function updatebuy(tid,currentPage,pageCount){
		window.location="${url}?tid="+tid;
	}
	function AddTicket(){
		window.location="/ebp_2/admin/AddTicket.jsp";
	}
</script>
</html>