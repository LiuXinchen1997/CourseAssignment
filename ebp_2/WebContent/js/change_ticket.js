$(function () {
	$("#descs").blur(validateDescs);
	$("#amount").blur(validateAmount);
	$("#balance").blur(validateBalance);
	$("#price").blur(validatePrice);
});

function validateDescs() {
	if ($("#descs").val() == "") {
		$("#descsError").text("影片描述不能为空~");
		return false;
	}
	
	$("#descsError").text("");
	return true;
}

function validateAmount() {
	var amount = $("#amount").val();
	if (amount == "") {
		$("#amountError").text("总票数不能为空~");
		return false;
	}
	
	var regExp = /^[0-9]*$/;
	if (!regExp.test(amount)) {
		$("#amountError").text("输入格式不符合~");
		return false;
	}
	
	if (amount < 0 || amount > 2000) {
		$("#amountError").text("总票数只能在0-2000范围之间~");
		return false;
	}
	
	if (amount < $("#balance").val()) {
		$("#amountError").text("总票数不能小于剩余票数~");
		return false;
	}
	
	$("#amountError").text("");
	return true;
}

function validateBalance() {
	var balance = $("#balance").val();
	if (balance == "") {
		$("#balanceError").text("剩余票数不能为空~");
		return false;
	}
	
	var regExp = /^[0-9]*$/;
	if (!regExp.test(balance)) {
		$("#balanceError").text("输入格式不符合~");
		return false;
	}
	
	if (balance > $("#amount").val()) {
		$("#amountError").text("总票数不能小于剩余票数~");
		return false;
	}
	
	
	$("#balanceError").text("");
	return true;
}

function validatePrice() {
	var price = $("#price").val();
	if ($("#price").val() == "") {
		$("#priceError").text("单价不能为空~");
		return false;
	}
	
	var regExp = /^[0-9]*$/;
	if (!regExp.test(price)) {
		$("#priceError").text("输入格式不符合~");
		return false;
	}
	
	if (price < 0 || price > 200) {
		$("#priceError").text("单价必须在0-200之间~");
		return false;
	}
	
	$("#priceError").text("");
	return true;
}