function check() {
	if (!validateUsername()) {
		alert('您还没有输入用户名~');
		return false;
	} else if (!validatePassword()) {
		alert('您还没有输入密码~');
		return false;
	} else if (!validateRepassword()) {
		alert('请再输入一次密码~');
		return false;
	} else if (!validateTel()) {
		alert('您还没有输入联系电话~');
		return false;
	} else if (!validateEmail()) {
		alert('您还没有输入电子邮箱~');
		return false;
	} else if (!validateRegTel()) {
		alert('联系电话输入不合法~');
		return false;
	} else if (!validateRegEmail()) {
		alert('电子邮箱输入不合法~');
		return false;
	} else if (!validateRegIdnum()) {
		alert('身份证输入不合法');
		return false;
	} else if (!checkRepassword()) {
		alert('前后密码输入不一致~');
		return false;
	} else if (!validateIdnum()) {
		alert('您还没有输入身份证号~');
		return false;
	} else {
		return true;
	}
}

$(function() {
	$("#username").on("blur", function() {
		validateUsername();
	})
	
	$("#password").on("blur", function() {
		validatePassword();
		checkRepassword();
	})
	
	$("#repassword").on("blur", function() {
		validateRepassword();
		checkRepassword();
	})
	
	$("#idnum").on("blur", function() {
		validateIdnum();
		validateRegIdnum();
	})
	
	$("#tel").on("blur", function() {
		validateTel();
		validateRegTel();
	})
	
	$("#email").on("blur", function() {
		validateEmail();
		validateRegEmail();
	})
	
	$("#back").one("click", function() {
		location.href="login.jsp";
	})
});

function checkRepassword() {
	var passText = $("#password").val();
	var repassText = $("#repassword").val();
	
	if (passText == "") {
		return validatePassword();
	} else if (repassText == "") {
		return validateRepassword();
	} else if (passText != repassText) {
		$("#repasswordDiv").attr("class", "form-group has-error");
		$("#repasswordSpan").html("<span class='text-danger'>前后密码不一致！</span>");
		return false;
	} else {
		$("#repasswordDiv").attr("class", "form-group has-success");
		$("#repasswordSpan").html("<span class='text-success'>输入内容合法有效！</span>");
		return true;
	}
}

function validateUsername() {
	return validateEmpty("username");
}

function validatePassword() {
	return validateEmpty("password");
}

function validateRepassword() {
	return validateEmpty("repassword");
}

function validateIdnum() {
	return validateEmpty("idnum");
}

function validateTel() {
	return validateEmpty("tel");
}

function validateEmail() {
	return validateEmpty("email");
}

function validateEmpty(eleId) {
	if ($("#" + eleId).val() == "") {
		$("#" + eleId + "Div").attr("class", "form-group has-error");
		$("#" + eleId + "Span").html("<span class='text-danger'>输入内容不能为空！</span>");
		return false;
	} else {
		$("#" + eleId + "Div").attr("class", "form-group has-success");
		$("#" + eleId + "Span").html("<span class='text-success'>输入内容合法有效！</span>");
		return true;
	}
}

function validateRegEmail() {
	var regExp = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
	return validateReg("email", regExp);
}

function validateRegTel() {
	var regExp = /^(86)?((13\d{9})|(15[0,1,2,3,5,6,7,8,9]\d{8})|(18[0,5,6,7,8,9]\d{8}))$/;
	return validateReg("tel", regExp);
}

function validateRegIdnum() {
	var regExp = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; 
	return validateReg("idnum", regExp);
}

function validateReg(eleId, regExp) {
	if ($("#" + eleId).val() == "") {		
		return validateEmpty(eleId);
	}
	var text = $("#" + eleId).val();
	if (!regExp.test(text)) {
		$("#" + eleId + "Div").attr("class", "form-group has-error");
		$("#" + eleId + "Span").html("<span class='text-danger'>输入内容不合法！</span>");
		return false;
	} else {
		$("#" + eleId + "Div").attr("class", "form-group has-success");
		$("#" + eleId + "Span").html("<span class='text-success'>输入内容合法有效！</span>");
		return true;
	}
}