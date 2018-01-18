<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="zh-CN">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>售票 &rsaquo; 注册</title>

<script type="text/javascript" src="/ebp_2/js/jquery-1.6.2.min.js"></script>
<link rel='stylesheet' id='buttons-css'
	href='/ebp_2/login_css/buttens.min.css' type='text/css' media='all' />
<link rel='stylesheet' id='dashicons-css'
	href='/ebp_2/login_css/dashicons.css' type='text/css' media='all' />
<link rel='stylesheet' id='login-css'
	href='/ebp_2/login_css/login.min.css' type='text/css' media='all' />
<link rel="stylesheet" id='login_yangshi' type="text/css"
	href="/ebp_2/login_css/yangshi.css" media="all" />
<link rel="stylesheet" type="text/css"
	href="/ebp_2/login_css/unlock.css">
<link rel="stylesheet" type="text/css"
	href="/ebp_2/login_css/normalize.css" />
<link rel="stylesheet" type="text/css"
	href="/ebp_2/login_css/htmleaf-demo.css">
<style type="text/css">
		html, body {
		  height: 100%;

		}

		body {
		  background: #000;
		  perspective: 340px;
		}

		.stars {
		  position: absolute;
		  top: 50%;
		  left: 50%;
		  width: 3px;
		  height: 3px;
		  box-shadow: -447px 387px #c4c4c4, -401px 118px #fafafa, -109px 217px #d9d9d9, -680px -436px #e3e3e3, 514px 360px #cccccc, -708px 298px #e8e8e8, -696px -270px #ededed, 116px -128px #f7f7f7, 179px 35px white, -404px -90px whitesmoke, -331px -309px #c4c4c4, -363px -24px #d1d1d1, 277px 416px #fafafa, -145px -244px whitesmoke, 123px 62px #d4d4d4, -407px 418px #d9d9d9, 535px 237px #d9d9d9, -466px -78px #f7f7f7, 257px 287px #dedede, 327px -398px #e0e0e0, -602px -38px #c2c2c2, 128px 398px #e6e6e6, 274px -446px #d1d1d1, -602px -298px #c7c7c7, 526px -5px #c4c4c4, -90px -158px #fcfcfc, 5px 294px whitesmoke, -633px 229px #c4c4c4, -475px 427px #dedede, 586px -453px #f2f2f2, 180px -432px #c7c7c7, -637px -88px #cfcfcf, -453px 308px #d6d6d6, -111px 1px #d9d9d9, 573px -450px #ededed, 198px 300px #d6d6d6, -355px 166px #dedede, -715px 13px #e3e3e3, 262px -104px #d1d1d1, 147px 325px #dbdbdb, 1px 399px #dbdbdb, 286px -100px white, 43px -329px #e8e8e8, 617px 55px #d9d9d9, -168px -392px #cccccc, 84px 219px #c9c9c9, 507px -226px #d9d9d9, -327px -70px #e6e6e6, 386px -212px #c4c4c4, -717px 4px #cfcfcf, 502px -231px #e3e3e3, 302px 56px #ededed, 649px 341px #c7c7c7, 569px 350px #c9c9c9, 516px -31px #e6e6e6, 689px 447px #c2c2c2, 591px -206px #fafafa, 422px -137px #e6e6e6, -510px -324px #cccccc, -649px 287px #c2c2c2, -194px -48px #f7f7f7, -279px -329px #d1d1d1, -406px 478px #dbdbdb, -735px -87px #c9c9c9, 30px -197px #dedede, -564px 233px #e6e6e6, -486px -324px #ededed, -54px -7px #ededed, -441px -194px #e3e3e3, -133px -95px #e0e0e0, -722px -73px #d6d6d6, 595px 423px #ededed, 568px -39px #ededed, 370px 377px #d1d1d1, -419px -102px #fcfcfc, -450px 109px #c4c4c4, -57px -119px #d1d1d1, -582px 150px #e6e6e6, 206px -263px #cfcfcf, 582px -461px #c9c9c9, -268px -141px #d9d9d9, -148px 291px #c7c7c7, 254px -179px #c9c9c9, 725px 424px #f0f0f0, 391px -150px #ebebeb, 89px -299px #d4d4d4, 170px 1px #c9c9c9, 243px 209px #c7c7c7, 27px 460px #c9c9c9, -465px -380px #d4d4d4, 530px -360px whitesmoke, -626px 53px #e0e0e0, 706px 218px #d9d9d9, 40px -82px #cccccc, -5px -212px #e6e6e6, -742px 33px #ebebeb, -714px 478px #e0e0e0, -585px -125px #cccccc, -216px 348px #cfcfcf, 601px 332px #ededed, 344px -88px #c4c4c4, 659px -22px #d1d1d1, -411px 188px #d6d6d6, -423px -206px #fcfcfc, -359px -136px #cfcfcf, 612px 406px whitesmoke, 725px 96px whitesmoke, 363px -446px white, -204px 325px #c9c9c9, 740px 176px #fafafa, -489px -352px white, -638px 64px #dbdbdb, 537px -65px #dbdbdb, 151px -32px #ebebeb, 681px 212px #fcfcfc, 604px -149px #e6e6e6, -542px -398px #c4c4c4, -707px 66px whitesmoke, -381px 258px #cfcfcf, -30px 332px #d6d6d6, 512px -381px #c9c9c9, 195px 288px #cccccc, -278px 479px #c7c7c7, 27px -208px #d6d6d6, -288px 15px white, -680px 248px #dedede, 433px 31px #c9c9c9, 150px -206px #d4d4d4, -79px 247px white, -594px 115px #e0e0e0, 99px 292px #e0e0e0, 673px -269px #dedede, -257px -64px #d1d1d1, 449px 81px #f2f2f2, 18px -99px #d1d1d1, -694px 415px #f7f7f7, 240px 264px #e0e0e0, 450px -172px white, 383px 7px #e8e8e8, 338px -73px #c9c9c9, 291px -19px #ebebeb, 659px 137px #d1d1d1, 602px -6px #fcfcfc, 554px 249px #ebebeb, 625px 356px #d9d9d9, 579px -183px #d6d6d6, -20px 250px white, -401px 431px #c4c4c4, -645px -232px #cccccc, -265px -148px white, 553px 258px #d1d1d1, 166px -360px #ebebeb, 719px 51px #ededed, 612px -129px #ebebeb, -465px -104px #f2f2f2, -154px -121px #d9d9d9, -1px 330px #f2f2f2, -666px 248px #f7f7f7, -720px 264px #ededed, 148px -365px #e6e6e6, -388px -349px #c4c4c4, 128px -88px #e3e3e3, -683px -274px #fafafa, -341px 41px #c9c9c9, -59px -471px #f0f0f0, -3px -427px #c2c2c2, 418px 167px #d6d6d6, 343px 247px #c7c7c7, 623px -347px #d1d1d1, 716px -217px white, 243px -409px whitesmoke, -75px -126px #d6d6d6, -730px -91px #c9c9c9, -210px -397px #cfcfcf, -349px 180px #c9c9c9, -567px -281px #e0e0e0, -460px 381px #fcfcfc, -310px -22px #ededed, 450px -1px #dbdbdb, -405px -328px #e3e3e3, 5px 332px #d6d6d6, -294px 302px #fcfcfc, -398px 97px whitesmoke, -696px 325px #cfcfcf, -589px 110px #d6d6d6, 353px -411px #dbdbdb, -697px -318px #ebebeb, -114px -72px #f0f0f0, 259px -193px #fcfcfc, 60px 26px #e6e6e6, -63px -232px white, 205px -372px #f7f7f7, -464px -333px #f2f2f2, -374px 123px white, -377px -386px #c7c7c7, -80px 337px #cccccc, 478px -178px #dbdbdb, 222px 420px #ebebeb, -707px 99px #c4c4c4, 716px -132px #fafafa, -253px -286px #e3e3e3, 646px 178px #f0f0f0, 201px 24px #d1d1d1, 178px -58px #c7c7c7, -557px 368px #ededed, 0px 219px #d9d9d9, -266px -269px #cccccc, 242px -197px #c9c9c9, -419px 193px #c2c2c2, -47px 91px #c7c7c7, -109px 75px #c2c2c2, -146px -453px #d6d6d6, 671px -350px #f2f2f2, 421px -91px #d9d9d9, 738px 19px #ededed, -316px -155px #dedede, 419px 244px #fcfcfc, -278px -418px #d6d6d6, -581px -181px #fcfcfc, 139px 264px #d9d9d9, 691px -11px #ebebeb, -622px 402px #c2c2c2, 219px 396px #f0f0f0, -149px -423px white, -716px -78px #d9d9d9, -590px 341px #e6e6e6, -208px 79px #d6d6d6, -227px -24px #f7f7f7, 239px 262px #d1d1d1, 740px 443px #f7f7f7, 509px 134px #d6d6d6, -555px 232px #e8e8e8, -67px -427px #cfcfcf, -368px 250px #f7f7f7, 715px -415px #fafafa, 411px -301px #f0f0f0, -322px 287px #d9d9d9, -429px -90px #f2f2f2, -327px -387px #f0f0f0, -491px 183px #c2c2c2, -133px 250px #d4d4d4, 538px 139px #e3e3e3, -417px -125px #f0f0f0, 653px -351px #e6e6e6, -549px 38px #d4d4d4, 602px 110px whitesmoke, 415px 105px #e0e0e0, -733px -371px #cfcfcf, 286px 403px #d4d4d4, 11px 320px #c4c4c4, -597px 158px whitesmoke, 716px -350px whitesmoke, 321px 67px #fafafa, -237px -300px #cfcfcf, 74px 152px #c9c9c9, 587px -123px #fcfcfc, 699px -332px whitesmoke, 399px 355px #f7f7f7, -323px 314px #dbdbdb, 89px 416px #c7c7c7, 445px 38px #e3e3e3, 572px 122px #c4c4c4, -258px 372px white, 49px 306px #d9d9d9, 437px -35px #dedede, 566px 174px #f2f2f2, 732px -299px whitesmoke, -410px 394px #ededed, 131px -415px white, 19px -326px #e8e8e8, -700px -188px #d1d1d1, 96px -1px #e0e0e0, -328px -396px #f0f0f0, -117px -214px #fcfcfc, -53px 261px #ebebeb, 80px 134px #d6d6d6, -364px -216px white, -636px -125px #dbdbdb, -639px -265px #e3e3e3, 208px 98px #c7c7c7, 172px 467px #e0e0e0, 435px 309px #e3e3e3, 194px -259px #f0f0f0, 209px -186px #c9c9c9, -312px 418px #fafafa, 229px 407px #c9c9c9, -449px -357px #fafafa, 674px 121px #e8e8e8, 608px -429px #ebebeb, -431px -428px #cfcfcf, 105px 462px #e3e3e3, -179px -372px #e3e3e3, 143px -317px #d6d6d6, -449px -149px #fafafa, -544px 250px #dedede, -220px -323px whitesmoke, 658px 8px whitesmoke, -656px -244px #e8e8e8, 347px 11px whitesmoke, 694px -230px #f7f7f7, -317px 1px #c4c4c4, 28px 23px #fcfcfc, -382px 321px #dbdbdb, 632px -74px #c4c4c4, 154px -245px #c2c2c2, -553px 337px #d6d6d6, -48px -243px #d1d1d1, 92px -391px #cccccc, -71px -256px #cfcfcf, -372px 57px #d9d9d9, 369px -140px #fcfcfc, 675px 81px #c2c2c2, -663px 254px #cccccc, 703px -203px #ededed, 74px -363px #c2c2c2, 643px -458px #d1d1d1, 198px 359px #cccccc, 265px 309px #d4d4d4, -353px -368px #e8e8e8, -465px 439px whitesmoke, 693px 360px #c9c9c9, 634px -397px #d1d1d1, 467px 25px whitesmoke, -558px -272px #e6e6e6, 671px 69px #dbdbdb, 407px 357px #cfcfcf, 379px 80px white, 10px -203px #c9c9c9, 104px -292px #f0f0f0, -667px -29px #d1d1d1, 557px -155px #e6e6e6, -505px 115px #cfcfcf, -605px 164px #f2f2f2, -108px -223px #e0e0e0, 523px -156px #ebebeb, 691px 230px white, -507px -13px #d1d1d1, -349px 332px #dedede, 520px 266px whitesmoke, -66px -250px #e6e6e6, -496px -449px #ebebeb, 414px -170px #dedede, -649px 230px #ebebeb, 598px -92px #c7c7c7, -638px 113px #c2c2c2, 151px 363px #f7f7f7, -445px -241px #f0f0f0, 527px -14px #dedede, 203px -61px #cfcfcf, -716px -284px #ebebeb, -525px 134px #c2c2c2;
		  animation: fly 2s linear infinite;
		  transform-style: preserve-3d;
		}
		.stars:before, .stars:after {
		  content: "";
		  position: absolute;
		  width: inherit;
		  height: inherit;
		  box-shadow: inherit;
		}
		.stars:before {
		  transform: translateZ(-300px);
		  opacity: .6;
		}
		.stars:after {
		  transform: translateZ(-600px);
		  opacity: .4;
		}

		@keyframes fly {
		  from {
		    transform: translateZ(0px);
		    opacity: .6;
		  }
		  to {
		    transform: translateZ(300px);
		    opacity: 1;
		  }
		}
	</style>
<script src="/ebp_2/login_js/prefixfree.min.js"></script>
<!--[if IE]>
		<script src="http://cdn.bootcss.com/html5shiv/3.7.3/html5shiv.min.js"></script>
	<![endif]-->
<script src="/ebp_2/login_js/drag.js" type="text/javascript"></script>
<script type="text/javascript">
	addLoadEvent = function(func) {
		if (typeof jQuery != "undefined")
			jQuery(document).ready(func);
		else if (typeof wpOnload != 'function') {
			wpOnload = func;
		} else {
			var oldonload = wpOnload;
			wpOnload = function() {
				oldonload();
				func();
			}
		}
	};

	function s(id, pos) {
		g(id).left = pos + 'px';
	}
	function g(id) {
		return document.getElementById(id).style;
	}
	function shake(id, a, d) {
		$("#user_pass").val("");
		$("#user_repass").val("");
		c = a.shift();
		s(id, c);
		if (a.length > 0) {
			setTimeout(function() {
				shake(id, a, d);
			}, d);
		} else {
			try {
				g(id).position = 'static';
				wp_attempt_focus();
			} catch (e) {
			}
		}
	}
	function abc() {
		var p = new Array(15, 30, 15, 0, -15, -30, -15, 0);
		p = p.concat(p.concat(p));
		var i = document.forms[0].id;
		g(i).position = 'relative';
		shake(i, p, 20);
	};
</script>
</head>
<body class="login login-action-login wp-core-ui  locale-zh-cn">
	<div class="stars"></div>
	<jsp:useBean id="registerBean" scope="request"
		class="com.oracle.ebp.domain.UserBean"></jsp:useBean>
	<div class="base" id="login">
		<center>
			<h1>
				<a href="" title="" tabindex="-1">售票中心</a>
			</h1>
			这是用户注册页面~<br><br> 
			<font color="red" id="errorr"></font>
		</center>
		<form:form modelAttribute="registerBean" name="registerform"
			id="registerform" action="user/register" method="post">
			<font color="red"><form:errors /></font>
			<font color="red"><form:errors /></font>
			<p>
				<label for="user_login">用户名<br /> <form:input
						path="username" maxlength="30" required="true" autofocus="true"
						name="username" id="user_login" value="${username}" class="input"
						size="40" /><br> <font color="red" id="a"></font></label>
			</p>


			<p>
				<label for="user_pass">密码<br /> <form:password
						path="password" required="true" name="password" id="user_pass"
					    class="input" size="40" /><font color="red"
					id="b"></font></label>
			</p>

			<p>
				<label for="user_repass">再次输入密码<br /> <form:password
						path="repassword" required="true" name="repassword"
						id="user_repass" class="input" size="40" /><font
					color="red" id="z"></font></label>
			</p>

			<p>
				<label for="user_reallyname">真实姓名<br /> <form:input
						path="name" pattern="^[\u4e00-\u9af5]{2,4}$" required="true"
						name="reallyname" id="user_reallyname" value="${reallyname}"
						class="input" size="40" /><br>
				<font color="red" id="c"></font></label>
			</p>


			<p>

				<label for="user_gender">性别&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				</label>
			<center>
				<label> 
					<input type="radio" name="gender" value="男">男
					<input type="radio" name="gender" value="女">女 <br>
				</label><br>
			</center>

			<p>
				<label for="user_age">年龄<br /> <input path="age" name="age"
					id="user_age" value="${age}" class="input" size="40" /><br>
				<font color="red" id="d"></font></label>
			</p>


			<p>
				<label for="user_id">身份证号码<br /> <form:input path="idCard"
						maxlength="18" required="true" name="id" id="user_id"
						value="${id}" class="input" size="40" /><br>
				<font color="red" id="e"></font></label>
			</p>


			<p>
				<label for="user_address">住址<br /> <form:input
						path="address" required="true" name="address" id="user_address"
						value="${address}" class="input" size="40" /><br>
				<font color="red" id="f"></font></label>
			</p>

			<p>
				<label for="user_id">手机号<br /> <form:input path="telno"
						required="true"
						pattern="^((13[0-9])|(15[0-9])|(18[0, 5-9]))\d{8}$" maxlength="11"
						name="tel" id="user_tel" value="${tel}" class="input" size="40" /><br>
				<font color="red" id="g"></font></label>
			</p>

			<center>
				<p class="submit">

					<input type="button" name="wp-submit" id="wp-submit"
						onclick="register()" class="button button-primary button-large"
						value="注册" />

				</p>
			</center>


		</form:form>
		<p id="nav">
			<a rel="nofollow" href="login.jsp">返回登录</a>
		</p>
		<script type="text/javascript">
			var name = false;
			var ps = false;
			var reps = false;
			var reallyname = false;
			var age = false;
			var idd = false;
			var address = false;
			var tel = false;
			$("#user_pass").val("");
			$("#user_repass").val("");
			
			$("#user_login").blur(function() {
				if ($("#user_login").val() == "") {
					$("#a").html("用户名不能为空！");
				} else {
					var name = $("#user_login").val();
					var param = "username=" + name;
					$.ajax({
						type : "post",
						async : true,
						url : "checkuser.jsp",
						data : param,
						dataType : "text",
						success : statechange
					});
				}
			});
			$("#user_pass").blur(function() {
				if ($("#user_pass").val() == "") {
					$("#b").html("密码不能为空！");
				} else {
					$("#b").html("");
					ps = true;
				}
			});
			$("#user_reallyname")
					.blur(
							function() {
								if (document.getElementById('user_reallyname').value != "") {
									if (document
											.getElementById('user_reallyname').value.length == 1) {
										$("#c").html("真实姓名必须是一个字以上！");  
										return false;
									}
									var nnname = document
											.getElementById('user_reallyname').value;
									var reg = /^([\u4E00-\u9FA5])*$/;
									if (arr = nnname.match(reg)) {
										if (!check_surname(nnname)) {
											$("#c").html("真实姓名格式错误！");  
											return false;
										}
									} else { // www.jbxue.com
										$("#c").html("真实姓名必须全部为中文！");
										return false;
									}  
								} else {
									$("#c").html("请填入真实姓名！");
								}
								$("#c").html("");
								reallyname = true;
							});
			function check_surname(str) {
				var str = str.substr(0, 1); //截取用户提交的用户名的前两字节，也就是姓。   
				var surname = " 赵钱孙李周吴郑王冯陈褚卫蒋沈韩杨朱秦尤许何吕施张孔曹严华金魏陶姜戚谢邹喻柏水窦章云苏潘葛奚范彭郎鲁韦昌马苗凤花方俞任袁柳酆鲍史唐费廉岑薛雷贺倪汤 滕殷罗毕郝邬安常乐于时傅皮卞齐康伍余元卜顾孟平黄和穆萧尹姚邵堪汪祁毛禹狄米贝明臧计伏成戴谈宋茅庞熊纪舒屈项祝董粱杜阮蓝闵席季麻强贾路娄危江童颜郭 梅盛林刁钟徐邱骆高夏蔡田樊胡凌霍虞万支柯咎管卢莫经房裘缪干解应宗宣丁贲邓郁单杭洪包诸左石崔吉钮龚程嵇邢滑裴陆荣翁荀羊於惠甄魏加封芮羿储靳汲邴糜松 井段富巫乌焦巴弓牧隗山谷车侯宓蓬全郗班仰秋仲伊宫宁仇栾暴甘钭厉戎祖武符刘姜詹束龙叶幸司韶郜黎蓟薄印宿白怀蒲台从鄂索咸籍赖卓蔺屠蒙池乔阴郁胥能苍双 闻莘党翟谭贡劳逄姬申扶堵冉宰郦雍郤璩桑桂濮牛寿通边扈燕冀郏浦尚农温别庄晏柴瞿阎充慕连茹习宦艾鱼容向古易慎戈廖庚终暨居衡步都耿满弘匡国文寇广禄阙东 殴殳沃利蔚越夔隆师巩厍聂晁勾敖融冷訾辛阚那简饶空曾毋沙乜养鞠须丰巢关蒯相查后江红游竺权逯盖益桓公万俟司马上官欧阳夏侯诸葛闻人东方赫连皇甫尉迟公羊 澹台公冶宗政濮阳淳于仲孙太叔申屠公孙乐正轩辕令狐钟离闾丘长孙慕容鲜于宇文司徒司空亓官司寇仉督子车颛孙端木巫马公西漆雕乐正壤驷公良拓拔夹谷宰父谷粱 晋楚闫法汝鄢涂钦段干百里东郭南门呼延妫海羊舌微生岳帅缑亢况後有琴梁丘左丘东门西门商牟佘佴伯赏南宫墨哈谯笪年爱阳佟第五言福";
				r = surname.search(str); // 查找字符串。  
				if (r == -1) {
					return false;
				} else {
					return true;
				}
			}
			$("#user_id").blur(function() {
				var id = document.getElementById("user_id");
				var IDNumber = id.value;
				var idCheck = idCardCheck.check(id);
				if (!idCheck.result) {
					$("#e").html(idCheck.error);
					return false;
				}
				
				$("#e").html("");
				idd = true;
			});

			$("#user_tel").blur(function() {
				var phone = document.getElementById('user_tel').value;
				if (!(/^1[34578]\d{9}$/.test(phone))) {
					$("#g").html("手机号码有误，请重填！");
					return false;
				}
				$("#g").html("");
				tel = true;
			});
			$("#user_address").blur(function() {
				if ($("#user_address").val() == "") {
					$("#f").html("地址不能为空！");
				} else {
					$("#f").html("");
					address = true;
				}
			});
			$("#user_age").blur(function() {
				var obj = document.getElementById("user_age");
				if (obj.value<1 || obj.value>150 || isNaN(obj.value) == true) {
					$("#d").html("年龄不合法！");
					return false;
				}
				$("#d").html("");
				age = true;
			});
			$("#user_repass").blur(function() {
				if ($("#user_repass").val() == "") {
					$("#z").html("密码不能为空！");
					return false;
				} else {
					var pass1 = $("#user_pass").val();
					var pass2 = $("#user_repass").val();
					if (pass1 === pass2) {
						$("#z").html("");
						reps = true;
						return true;
					} else {
						$("#z").html("两次密码不一致！");
						return false;
					}
				}
			});

			function register() {
				if (checkaa()) {
					if (dogender()) {
						document.getElementById("registerform").submit();
					}
				} else {

					abc();
				}
			}
			function statechange(data) {
				data = data.replace(/\ +/g, "");//去掉空格
				data = data.replace(/[ ]/g, ""); //去掉空格
				data = data.replace(/[\r\n]/g, "");//去掉回车换行
				if (data === "ok") {
					$("#a").html("");
					name = true;
				} else {
					$("#a").html("用户已存在！");
				}
			}

			function checkaa() {
				if (name && ps && reallyname && age && idd && address && tel
						&& reps) {

					return true;
				} else
					return false;
			}
			function dogender() {
				var sex = document.registerform.gender;
				var flag = false;
				for (var i = 0; i < sex.length; i++) {
					if (sex[i].checked) {
						flag = true;
						break;
					}
				}
				if (!flag) {
					alert("请选择性别！！");
					return false;
				} else {
					return true;
				}
			}
		</script>
	</div>
	<div class="clear"></div>
</body>
<script src="js/idCardCheck.js"></script>
</html>
