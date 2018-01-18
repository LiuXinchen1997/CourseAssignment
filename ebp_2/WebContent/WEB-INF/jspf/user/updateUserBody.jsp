<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="com.oracle.ebp.domain.*"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<c:url var="url" value="/user/updateUserById" />
<c:url var="modifyPasswordUrl" value="/user/modifyPassword.jsp" />

<%
	if (request.getAttribute("userBean") == null) {
		User user = (User)session.getAttribute("session_user");
		UpdateUserBean uub = User.convertToUpdateUserBean(user);
		request.setAttribute("updateUserBean", uub);
	}
%>
<jsp:useBean id="userBean" class="com.oracle.ebp.domain.UpdateUserBean" scope="request"/>

<div id="myDiv">   <!-- onsubmit="return checkForm()" return check(); -->
	<form:form action="${url}" method="post"  modelAttribute="updateUserBean" onsubmit="return check();">
		<form:input type="hidden" path="uid" />
		<font color="red"><i><form:errors path="uid"/></i></font>
		
		用&nbsp;&nbsp;户：<form:input path="username" id="username" />
		<font color="red"><i><form:errors path="username"/></i></font>
		<font color="red"><i id="usernameError"></i></font>
		*<font id="usernameF" color="red"></font>
		<br/><br/>

		<form:hidden path="password" />
		<form:hidden path="repassword" />
		
		真实姓名：<form:input type="text" path="name" id="name" />
		<font color="red"><i><form:errors path="name"/></i></font>
		<font color="red"><i id="nameError"></i></font>
		*<font id="nameF" color="red"></font>
		<br/><br/>
		
		性&nbsp;&nbsp;别:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		<form:radiobutton path="gender" value="1" /><img src="images/nan.gif">
		<form:radiobutton path="gender" value="0" /><img src="images/nv.gif">
		<font color="red"><i><form:errors path="gender"/></i></font>
		<br/><br/>
		
		身份证号：<form:input type="text" path="idCard" id="idCard" maxlength="18" />
		<font color="red"><i><form:errors path="idCard"/></i></font>
		<font color="red"><i id="idCardError"></i></font>
		*<font id="idCardF" color="red"></font>
		<br/><br/>
		
		年&nbsp;&nbsp;龄：<form:input type="number" path="age" id="age" />
		<font color="red"><i><form:errors path="age"/></i></font>
		<font color="red"><i id="ageError"></i></font>
		*<font id="ageF" color="red"></font>
		<br/><br/>
		
		地&nbsp;&nbsp;址：<form:input type="text" path="address" id="address" />
		<font color="red"><i><form:errors path="address"/></i></font>
		<font color="red"><i id="addressError"></i></font>
		*<font id="addressF" color="red"></font>
		<br/><br/>
		
		联系电话：<form:input type="text" path="telno" id="telno" />
		<font color="red"><i><form:errors path="telno"/></i></font>
		<font color="red"><i id="telnoError"></i></font>
		*<font id="telnoF" color="red"></font>
		<br/><br/>
		
		<input type="submit" value="修改" />
		<input type="reset" value="重置"/>
	</form:form>
	
	<br> <a href="${modifyPasswordUrl}">修改密码</a>
</div>