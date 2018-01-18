function check() {
	if (validateOldPassword() && validateNewPassword()
			&& validateReNewPassword()) {
		return true;
	} else {
		alert('请按照要求正确填写表单~');
		return false;
	}
}

$(function() {
			$("#oldPassword").val("");
			$("#newPassword").val("");
			$("#reNewPassword").val("");

			$("#oldPassword").blur(validateOldPassword);
			$("#newPassword").blur(validateNewPassword);
			$("#reNewPassword").blur(validateReNewPassword);
		});

function validateOldPassword() {
	var text = $("#oldPassword").val();

	if (text === "") {
		$("#oldPasswordError").text("原密码不能为空~");
		return false;
	}
	
	return checkOldPassword(text);
}

function validateNewPassword() {
	var text = $("#newPassword").val();

	if (text == "") {
		$("#newPasswordError").text("新密码不能为空~");
		return false;
	}

	if (text.length < 6 || text.length > 20) {
		$("#newPasswordError").text("密码的长度应在6-20之间~");
		return false;
	}

	$("#newPasswordError").text("");
	
	var reNewPasswordText = $("#reNewPassword").val();
	if (reNewPasswordText && reNewPasswordText != "" && text != reNewPasswordText) {
		$("#reNewPasswordError").text("前后密码输入不一致~");
		return false;
	} else {
		$("#reNewPasswordError").text("");
	}

	return true;
}

function validateReNewPassword() {
	var text = $("#reNewPassword").val();

	if (text === "") {
		$("#reNewPasswordError").text("确认密码不能为空~");
		return false;
	}

	var newPasswordText = $("#newPassword").val();
	if (newPasswordText != "" && newPasswordText != text) {
		$("#reNewPasswordError").text("前后密码输入不一致~");
		return false;
	}

	$("#reNewPasswordError").text("");
	return true;
}

function checkOldPassword(password) {
	//var param = "password="+password;
	var oldPass = $("#originPass").val();
	var passMd5 = MD5(password);
	console.log(oldPass);
	console.log(passMd5);
	if (oldPass == passMd5) {
		$("#oldPasswordError").text("");
		return true;
	} else {
		$("#oldPasswordError").text("原密码错误");
		return false;
	}
}
