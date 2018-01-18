<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html>
<html lang="en">
<head>

    <meta charset="UTF-8">
    <title>我的购物车</title>
    <meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible">
    <!--<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">-->
   
    <link rel="stylesheet" href="/ebp_2/css/checkout.css">
    <link rel="stylesheet" href="/ebp_2/css/modal.css">
    <style>
        .quentity input{
            width: 40px;
            padding: 5px 10px;
            text-align: center;
        }
    </style>
</head>
<body class="checkout">
<jsp:include page='header.jsp'/>
<div class="stars"></div>
<div align="center" >
    <div id="app" style='background-color:rgb(208, 208, 208);width:1270px;border-radius: 25px;border: solid;margin-top:100px;margin-bottom:100px'>

        <svg style="position: absolute; width: 0; height: 0; overflow: hidden;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <defs>
                <symbol id="icon-add" viewBox="0 0 32 32">
                    <title>add2</title>
                    <path class="path1" d="M15 17h-13.664c-0.554 0-1.002-0.446-1.002-1 0-0.552 0.452-1 1.002-1h13.664v-13.664c0-0.554 0.446-1.002 1-1.002 0.552 0 1 0.452 1 1.002v13.664h13.664c0.554 0 1.002 0.446 1.002 1 0 0.552-0.452 1-1.002 1h-13.664v13.664c0 0.554-0.446 1.002-1 1.002-0.552 0-1-0.452-1-1.002v-13.664z"></path>
                </symbol>
                <symbol id="icon-ok" viewBox="0 0 39 32">
                    <title>ok</title>
                    <path class="path1" d="M14.084 20.656l-7.845-9.282c-1.288-1.482-3.534-1.639-5.016-0.351s-1.639 3.534-0.351 5.016l10.697 12.306c1.451 1.669 4.057 1.623 5.448-0.096l18.168-22.456c1.235-1.527 0.999-3.765-0.528-5.001s-3.765-0.999-5.001 0.528l-15.573 19.337z"></path>
                </symbol>
                <symbol id="icon-edit" viewBox="0 0 32 32">
                    <title>edit</title>
                    <path class="path1" d="M25.599 11.292l-4.892-4.892 3.825-3.825 4.892 4.892-3.825 3.825zM4.732 23.308l3.959 3.959-5.939 1.98 1.98-5.939zM10.666 26.225l-4.892-4.892 13.425-13.425 4.892 4.892-13.425 13.425zM31.687 6.713l-6.4-6.4c-0.417-0.417-1.091-0.417-1.508 0l-20.267 20.267c-0.114 0.115-0.191 0.25-0.242 0.393-0.003 0.009-0.012 0.015-0.015 0.025l-3.2 9.6c-0.128 0.383-0.029 0.806 0.257 1.091 0.203 0.204 0.476 0.313 0.754 0.313 0.112 0 0.227-0.017 0.337-0.054l9.6-3.2c0.011-0.003 0.017-0.013 0.027-0.016 0.142-0.052 0.276-0.128 0.39-0.242l20.267-20.267c0.417-0.416 0.417-1.091 0-1.508v0z"></path>
                </symbol>
                <symbol id="icon-del" viewBox="0 0 26 32">
                    <title>delete</title>
                    <path class="path1" d="M17.723 28c0.543 0 0.984-0.448 0.984-1v-12c0-0.552-0.441-1-0.984-1s-0.985 0.448-0.985 1v12c0 0.552 0.441 1 0.985 1v0zM7.877 28c0.543 0 0.984-0.448 0.984-1v-12c0-0.552-0.441-1-0.984-1s-0.985 0.448-0.985 1v12c0 0.552 0.441 1 0.985 1v0zM12.8 28c0.543 0 0.985-0.448 0.985-1v-12c0-0.552-0.441-1-0.985-1s-0.984 0.448-0.984 1v12c0 0.552 0.441 1 0.984 1v0zM23.631 4h-5.908v-2c0-1.104-0.882-2-1.969-2h-5.908c-1.087 0-1.969 0.896-1.969 2v2h-5.908c-1.087 0-1.969 0.896-1.969 2v2c0 1.104 0.882 2 1.969 2v18c0 2.208 1.765 4 3.939 4h13.784c2.174 0 3.938-1.792 3.938-4v-18c1.087 0 1.969-0.896 1.969-2v-2c0-1.104-0.882-2-1.969-2v0zM9.846 3c0-0.552 0.441-1 0.984-1h3.938c0.544 0 0.985 0.448 0.985 1v1h-5.908v-1zM21.662 28c0 1.104-0.882 2-1.969 2h-13.784c-1.087 0-1.97-0.896-1.97-2v-18h17.723v18zM22.646 8h-19.692c-0.543 0-0.985-0.448-0.985-1s0.441-1 0.985-1h19.692c0.543 0 0.984 0.448 0.984 1s-0.441 1-0.984 1v0z"></path>
                </symbol>
                <symbol id="icon-clock" viewBox="0 0 32 32">
                    <title>clock</title>
                    <path class="path1" d="M29.333 16c0-7.364-5.97-13.333-13.333-13.333s-13.333 5.97-13.333 13.333c0 7.364 5.97 13.333 13.333 13.333s13.333-5.97 13.333-13.333v0 0 0 0 0 0zM0 16c0-8.837 7.163-16 16-16s16 7.163 16 16c0 8.837-7.163 16-16 16s-16-7.163-16-16zM14.667 14.667v1.333h2.667v-10.667h-2.667v9.333zM24 18.667h1.333v-2.667h-10.667v2.667h9.333z"></path>
                </symbol>
            </defs>
        </svg>


        <div class="container">
            <div class="cart">


                <!--商品信息-->
                <div class="item-list-wrap">
                    <div class="cart-item">
                        <div class="cart-item-head">
                            <ul>
                                <li>电影票信息</li>
                                <li>电影票金额</li>
                                <li>电影票数量</li>
                                <li>总金额</li>
                                <li>编辑</li>
                            </ul>
                        </div>
                        <!--商品列表信息-->

                        <ul class="cart-item-list">
                            <li v-for="item in goods">                                
                                <div class="cart-tab-1">
                                    <div class="cart-item-check">
                                        
                                        <a     style='border: 1px solid #000;'href="javascript:;" class="item-check-btn" v-bind:class="{'check':item.checked} " @click="selectedProduct(item)">
                                            <use xlink:href="#icon-ok"></use>
                                        </a>
                                    </div>
                                    <!--图片-->
                                    <div class="cart-item-pic">
                                        <img  v-bind:src="item.images" alt="">
                                    </div>
                                    <!--图片后面的文字-->
                                    <div class="cart-item-title">
                                        <div class="item-name">
                                            {{ item.descs}}
                                        </div>
                                    </div>
                                </div>
                                <!--第二列-->
                                <div class="cart-tab-2">
                                    <div class="item-price"> {{ item.price | formatMoney }}</div>
                                </div>
                                <!--第三列-->
                                <div class="cart-tab-3">
                                    <div class="item-quantity">
                                        <div class="select-self select-self-open">
                                             <div class="quentity">
                                                 <a href="javascript:;" v-on:click=" decCount(item)"> - </a>
                                                 <!--文本框 放入当前商品数量 v-model   -->
                                                 <input type="text" v-model="item.count">
                                                 <a href="javascript:; " @click=" incCount(item) "> + </a>
                                             </div>
                                        </div>
                                        <div class="item-stock"> 有货 </div>
                                    </div>
                                </div>
                                <!--第四列-->
                                <div class="cart-tab-4">
                                    <!-- 总金额是当前的单价乘以商品总数-->
                                    <div class="item-price-total">{{subTotal(item) | formatMoney}}</div>

                                </div>
                                <!--第五列-->
                                <div class="cart-tab-5">
                                    <div class="cart-item-opration">
                                        <a href="javascript:;" class="item-edit-btn" @click="delConfirm(item)">
                                            <svg class="icon icon-del"><use xlink:href="#icon-del"></use></svg>
                                        </a>
                                    </div>
                                </div>

                            </li>
                        </ul>
                    </div>
                </div>

                <!--footer-->
                <div class="cart-foot-wrap">
                    <!--footer 左边的-->
                    <div class="cart-foot-l">
                        <div class="item-all-check">
                            <a href="javascript:;">
                            <!--v-bind:class 的简写  :class-->
                            <span style='border: 1px solid #000;' class="item-check-btn" :class="{'check': manualAllChosen}" @click.stop="toggleAllChosen">
                                <use xlink:href="#icon-ok"></use>
                            </span>
                            <span> 全选 </span>
                            </a>
                        </div>
                       <!--  <div class="item-all-del">
                            <a href="javascript:;" @click="checkAll(false)"> 取消全选</a>
                        </div> -->
                    </div>
                    <!--footer 右边的-->
                    <div class="cart-foot-r">
                        <div class="item-total">
                            总价：<span class="total-price"> {{ totalPrice | formatMoney  }}</span>
                        </div>
                        <div  class="next-btn-wrap">
                            <a href="#" class="btn btn--red" @click.stop.prevent="summaryMoney()"> 结账 </a>
                        </div>&nbsp;&nbsp;
                         <div  class="next-btn-wrap">
                            <a href="" class="btn btn--red" onclick="backto()"> 返回 </a>
                        </div>&nbsp;&nbsp;
                    </div>
                </div>
            </div>
        </div>

        <!--模态框-->
        <div class="md-modal modal-msg md-modal-transtion " id="showModal" :class="{'md-show': delFlag}">
            <div class="md-modal-inner">
                <div class="md-top">
                    <button class="md-close" @click="delFlag= false"> 关闭 </button>
                </div>
                <div class="md-content">
                    <div class="confirm-tips">
                        <p id="cusLanInfo" lan="Cart.Del.Confirm">你确认删除此订单信息吗?</p>
                    </div>
                    <div class="btn-wrap col-2">
                        <button class="btn btn--m" id="btnModalConfirm" @click=" delProduct()"> YES</button>
                        <button class="btn btn--m  btn--red" id="btnModalCancel" @click=" delFlag = false" > NO</button>
                    </div>
                </div>
            </div>
        </div>
        <!--遮罩层-->
        <div class="md-overlay" id="showOverLay" v-if=" delFlag"></div>
    </div>

</div>
<jsp:include page='footer.jsp'/>
</body>
<script src="/ebp_2/js/vue2.min.js"></script>
<script src="/ebp_2/js/vue-resource.min.js"></script>
<script src="/ebp_2/js/axios.min.js"></script>
<script src="/ebp_2/js/my-axios.js"></script>
<script src="/ebp_2/user/js/cart.js"></script>
<script type="text/javascript">
window.onbeforeunload = function(event) {
	var message = 'Do you want to exit?'
    event.returnValue = message;
	axios({
	    method: 'post',
	    url: '/ebp_2/user/cartToDatabase'
	})
	.then(function (response) {
		console.log(response);
	})
	.catch(function (error) {
		   console.log(error);
	});
    return message;
};
</script>
<script type="text/javascript">
function backto()
{
	window.history.back();
	}
</script>
</html>