<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<div id="myDiv">
<font color="red">充值成功！</font>
<br/><br/><br/>

<b>本次充值信息如下：</b><br/><br/>
	用户名：${session_user.username}	 &nbsp;&nbsp;&nbsp;&nbsp;
	充值方式：${type }	&nbsp;&nbsp;&nbsp;&nbsp;
	充值金额：${money}	&nbsp;&nbsp;&nbsp;&nbsp;
	<br/><br/><br/>
	账户余额：${session_user.balance }

</div>           