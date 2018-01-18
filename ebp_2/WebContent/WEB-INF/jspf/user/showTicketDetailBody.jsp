<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
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
<title>查看票项详情</title>
</head>
<body>
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
				<div style="background-color: darkgray; width: 400px;">
					<h3>
						<%=descs.get(id1-1) %>
					</h3>
				</div>
				
			<% 
				} else if (sequences.get(i).charAt(0) == 'm') { 
				int id2 = Integer.parseInt((sequences.get(i).substring(1)));
				
				//imageUrl  ${pageScope.serverImageUrl}
			%>
				
				<img style="width: 400px; height: 300px" src="/ebp_2/upload/<%=images.get(id2-1) %>" />
				
			<%
				}
			%>
	<%
			}
		}
	%>
	
	<form action="/ebp_2/user/addShoppingCart">
		购买数量：<input type="text" name="number" />
		<input type="hidden" name="tid" value="${requestScope.tid}" />
		<input type="submit" value="加入购物车" />
	</form>
</body>
</html>