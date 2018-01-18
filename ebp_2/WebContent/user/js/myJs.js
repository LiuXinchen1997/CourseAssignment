
//用户登录验证֤
function checkForm(){
	var username=$("#username").val();
	if(username==''){
		$("#usernameF").html("请输入用户名！");
		return false;
	}else{$("#usernameF").html("");}
	
	var password=$("#password").val();
	var passwordC=$("#passwordC").val();
	if(password=='' || passwordC==''){
		$("#passwordF").html("请输入密码！");
		return false;
	}else{$("#passwordF").html("");}
	
	if(password!=passwordC){
		$("#passwordF").html("两次密码不一致！");
		return false;
	}else{$("#passwordF").html("");}
	
	var name=$("#name").val();
	if(name==''){
		$("#nameF").html("请输入姓名！");
		return false;
	}else{$("#nameF").html("");}
	
	var idCard=$("#idCard").val();
	if(idCard==''){
		$("#idCardF").html("请输入身份号！");
		return false;
	}else{$("#idCardF").html("");}
	
	var age=$("#age").val();
	if(age==''){
		$("#ageF").html("请输入年龄！");
		return false;
	}else{$("#ageF").html("");}
	
	var address=$("#address").val();
	if(address==''){
		$("#addressF").html("请输入地址！");
		return false;
	}else{$("#addressF").html("");}
	
	return true;
}