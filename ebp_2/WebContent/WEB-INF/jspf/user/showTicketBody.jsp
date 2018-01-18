<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
    
<c:url var="queryLast7DayByDateURL" value="/user/queryAllOrderList" scope="request" />
<c:url var="url" value="/user/queryTicketsByDate" scope="request" />
<c:url var="queryByDateUrl" value="/user/GetTicketBySday_Eday" scope="request" />
<c:url var ="queryByDescsUrl" value = "/user/GetTicketByDescs" scope="request" />
<c:url var = "queryByPriceUrl" value = "/user/GetTicketByPrice" scope="request" />
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>在线订票</title>
<link href="../css/ticket.css" rel="stylesheet" type="text/css"></link>
</head>
<script type="text/javascript" src="js/jquery.ui.datepicker-zh-CN.js"></script>
<script type="text/javascript" src="js/jquery-ui-1.8.5.custom.min.js"></script>
<link type="text/css" href="css/ui-lightness/jquery-ui-1.8.5.custom.css" rel="stylesheet" />
<link href="../css/ticket.css" rel="stylesheet" type="text/css"></link>
<script type="text/javascript">
	$(function(){
		$("#stardate").datepicker();
	});
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
</script>
<body>
<form action="${queryByDateUrl}" method="post">
	请选择起始日期（查询7天以内票项）：<input type="text" id="stardate" name="Ticketbegin" value="${Ticketbegin}" />
	<input type="submit" value="查询"/>
</form>



<form action="${queryByDescsUrl}" method="post">
	描述/名称：<input type="text" id="tDescs" name="TicketDescs" value="${TicketDescs}" />
	<input type="submit" value="查询"/>
</form>



<form action="${queryByPriceUrl}" method="post">
	最低价格：<input type="text" id="tlowPrice" name="lowPrice" value="${lowPrice}" />
	最高价格：<input type="text" id="thighPrice" name="highPrice" value="${highPrice}" />
	<input type="submit" value="查询"/>
</form>

<table border="1" cellspacing="0" style="margin-left: 5%;width: 90%;">
	<tr>
		<th>序号</th>
		<th>描述</th>
		<th>时间</th>
		<th>总票数</th>
		<th>剩余票数</th>
		<th>单价(元)</th>
		<th>状态</th>
		<th>购票数</th>
		<th></th>
	</tr>
	<c:forEach items="${list}" var="list1">
	<tr align="center">
		<td  width="5%;">${list1.tid }</td>
		<td width="25%;">${list1.descs }</td>
		<td width="12%;">${list1.startTime }</td>
		<td  width="8%;">${list1.amount }</td>
		<td  width="8%;">${list1.balance }</td>
		<td  width="8%;">${list1.price }</td>
		<c:if test="${list1.status==0 }">
		<td  width="10%;" style="color: red;border-color: blue;">已停售</td>
		</c:if>
		<c:if test="${list1.status==1 }">
		<td  width="10%;">售票中</td>
		</c:if>
		<c:if test="${list1.status==0 }">
		<td  width="8%;" ></td>
		</c:if>
		<c:if test="${list1.status==1 }">
		<td  width="8%;"><input type="text" id="buynum${list1.tid}" style="width: 50px; " /></td>
		</c:if>
		<c:if test="${list1.status==0 }">
		<td  ></td>
		</c:if>
		<c:if test="${list1.status==1 }">
		<td  >
			<!-- <input type="button" value="加入购物车" onclick="buyticket(${list1.tid},${list1.balance})"/> -->
			<input type="button" value="查看详情" onclick="location2(${list1.tid})" />
		</td>
		</c:if>
	</tr>
	</c:forEach>
	<tr >
		<td colspan="4" style=" text-align: left ;border-right: 0;" id="errotd" ></td>
		<td colspan="5" style="text-align: right;border-left: 0;" ><input type="button" onclick="location1()" value="查看购物车/结账"/></td>
	</tr>
</table>

        <font color="red"><p>${error}</p></font>
        <c:if test  = "${isQueryAll == 1 }">
          <input type="button" value="首页"
				onclick="GetAllTicket(1)" /> <input type="button" value="上一页"
				onclick="GetAllTicket(${currentPage-1})" />
				${currentPage}/${pageCount} <input type="button" value="下一页"
				onclick="GetAllTicket(${currentPage+1})" /> <input
				type="button" value="尾页" onclick="GetAllTicket(${pageCount})" />
        </c:if>
        <c:if test = "${isDate == 1}">
          <input type="button" value="首页"
				onclick="GetTicketBySday_Eday(1)" /> <input type="button" value="上一页"
				onclick="GetTicketBySday_Eday(${currentPage-1})" />
				${currentPage}/${pageCount} <input type="button" value="下一页"
				onclick="GetTicketBySday_Eday(${currentPage+1})" /> <input
				type="button" value="尾页" onclick="GetTicketBySday_Eday(${pageCount})" />
		</c:if>
		<c:if test = "${isDescs == 1}">
          <input type="button" value="首页"
				onclick="GetTicketByDescs(1)" /> <input type="button" value="上一页"
				onclick="GetTicketByDescs(${currentPage-1})" />
				${currentPage}/${pageCount} <input type="button" value="下一页"
				onclick="GetTicketByDescs(${currentPage+1})" /> <input
				type="button" value="尾页" onclick="GetTicketByDescs(${pageCount})" />
		</c:if>
		<c:if test = "${isPrice == 1}">
          <input type="button" value="首页"
				onclick="GetTicketByPrice(1)" /> <input type="button" value="上一页"
				onclick="GetTicketByPrice(${currentPage-1})" />
				${currentPage}/${pageCount} <input type="button" value="下一页"
				onclick="GetTicketByPrice(${currentPage+1})" /> <input
				type="button" value="尾页" onclick="GetTicketByPrice(${pageCount})" />
		</c:if>
</body>
         <script type="text/javascript">

	function buyticket(tid,bal1){
		
		var buynum= document.getElementById("buynum"+tid);
		var errotd= document.getElementById("errotd");
		
		if (buynum.value==null||buynum.value==""||buynum.value=="0") {
			errotd.innerHTML="<font color='red'>请输入正确的票数</font>";
			
		}else{
			if (buynum.value>bal1) {
				errotd.innerHTML="<font color='red'>剩余票数不足，请重新输入</font>";
			}else {
				$.ajax({
					type:"post",
					url:"user/addShoppingCart",
					data:"number="+buynum.value+"&tid="+tid,
					dataType:"text",
					success:function(data){
						if(data=="ok"){
							alert("购物车添加成功！");
						}else{
							alert("购物车添加失败！");
						}
					}
				});
			}
		}
	}
	function location1(){
		window.location="/ebp_2/user/NewShoppingCart.jsp";
	}
	
	function location2(tid) {
		window.location="/ebp_2/user/ticketdetail?tid="+tid;
	}
</script>
</html>