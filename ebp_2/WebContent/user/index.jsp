<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<jsp:include page="/WEB-INF/jspf/common/userLayout.jsp">
	<jsp:param value="/WEB-INF/jspf/user/IndexBody.jsp" name="mainbody"/>
	<jsp:param value="用户首页面" name="title"/>
</jsp:include>
<script src="js/axios.min.js"></script>
<script src="js/my-axios.js"></script>
<script type="text/javascript">
    axios({
	    method: 'get',
	    url: 'user/getCartCookies.json'
	})
	.then(function (response) {
		console.log(response);
	})
	.catch(function (error) {
		   console.log(error);
	});
	    
</script>

