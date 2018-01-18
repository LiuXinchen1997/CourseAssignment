function check() {
	if (validateUsername() && validateName() && validateIdCard() && validateAge()
	&& validateAddress() && validateTelno()) {
		return true;
	} else {
		alert('请您正确完整填写个人信息~');
		return false;
	}
}


$(function() {
	$("#username").blur(validateUsername);
	$("#name").blur(validateName);
	$("#idCard").blur(validateIdCard);
	$("#age").blur(validateAge);
	$("#address").blur(validateAddress);
	$("#telno").blur(validateTelno);
});


function validateUsername() {
	if ($("#username").val() == "") {
		$("#usernameError").html("用户名不能为空~");
		return false;
	} else {
		$("#usernameError").html("");
		return true;
	}
}

function validateName() {
	if ($("#name").val() == "") {
		$("#nameError").text("真实姓名不能为空~");
		return false;
	} else {
		$("#nameError").text("");
		return true;
	}
}

function validateIdCard() {
	if ($("#idCard").val() == "") {
		$("#idCardError").text("身份证号不能为空~");
		return false;
	} else {
//		var regExp = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
		var text = $("#idCard").val();
		var idCard = document.getElementById("idCard");
		var idCheck = idCardCheck.check(idCard);
		if (!idCheck.result) {
			$("#idCardError").html(idCheck.error);
			return false;
		} else {
			$("#idCardError").html("");
			return true;
		}		
	}
}

function validateAge() {
	if ($("#age").val() == "") {
		$("#ageError").text("年龄不能为空~");
		return false;
	} else {
		var regExp = /^[0-9]*$/;
		var text = $("#age").val();
		if (!regExp.test(text)) {
			$("#ageError").text("您输入的年龄"+text+"不合理~");
			return false;
		}
		
		var age = parseInt(text);
		if (age < 0 || age > 125) {
			$("#ageError").text("您输入的年龄"+age+"不合理~");
			return false;
		} else {			
			$("#ageError").text("");
			return true;
		}
	}
}

function validateAddress() {
	if ($("#address").val() == "") {
		$("#addressError").text("住址不能为空~");
		return false;
	} else {
		$("#addressError").text("");
		return true;
	}
}

function validateTelno() {
	if ($("#telno").val() == "") {
	$("#telnoError").text("手机号码不能为空~");
		return false;
	}
	
	var regExp = /^(86)?((13\d{9})|(15[0,1,2,3,5,6,7,8,9]\d{8})|(18[0,5,6,7,8,9]\d{8}))$/;
	var text = $("#telno").val();
	if (!regExp.test(text)) {
		$("#telnoError").text("手机号码格式不正确~");
		return false;
	} else {
		$("#telnoError").text("");
		return true;
	}
}