<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>  
<head>  
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />  
<title>购物车</title>  
  
<link rel="stylesheet" href="../css/shoppingCart.css" />
</head>  
<body> 
<div id="page-cart" class="catbox">
	<table id="cartTable">
		<thead>
			<tr>
				<th>
					<label>
						<input class="check-all check" type="checkbox" 
							:checked="manualAllChosen"
							@click.stop="toggleAllChosen"/> 
						全选
					</label>
				</th>
				<th>票名</th>
				<th>单价</th>
				<th>数量</th>
				<th>小计</th>
				<th>操作</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="good in goods">
				<td class="checkbox">
					<input class="check-one check" type="checkbox" v-model="good.chosen"/>
				</td>
				<td class="goods"><img src="images/1.jpg" alt="" /><span>{{good.descs}}</span></td>
				<td class="price">{{good.price}}</td>
				<td class="count">
					<span class="reduce" @click.stop.prevent="decCount(good)">-</span>
					<input class="count-input" type="text" v-model="good.count" />
					<span class="add" @click.stop.prevent="incCount(good)">+</span></td>
				<td class="subtotal">{{Number(subTotal(good)).toFixed(2)}}</td>
				<td class="operation"><span class="delete" @click.stop.prevent="removeGood(good)">删除</span></td>
			</tr>
		</tbody>
	</table>

	<div class="foot" id="foot">
		<label class="fl select-all"><input type="checkbox"
			class="check-all check" :checked="manualAllChosen"@click.stop="toggleAllChosen"/> 
			全选
		</label> 
		<a class="fl delete" id="deleteAll" href="javascript:;" @click.stop.prevent="deleteChosen()">删除</a>
		<div class="fr closing"  @click.stop.prevent="summaryMoney()">结 算</div>
		<div class="fr total">
			合计：￥<span id="priceTotal">{{Number(totalPrice).toFixed(2)}}</span>
		</div>
		<div class="fr selected" id="selected">
			已选商品<span id="selectedTotal">{{totalCount}}</span>件<span class="arrow up">︽</span><span
				class="arrow down">︾</span>
		</div>
		<div class="selected-view">
			<div id="selectedViewList" class="clearfix">
				<div>
					<img src="images/1.jpg"><span>取消选择</span>
				</div>
			</div>
			<span class="arrow">◆<span>◆</span></span>
		</div>
	</div>
</div>

</body>  

<script src="../js/jquery-1.6.2.min.js"></script>
<script src="../js/vue.js"></script>
<script src="../js/axios.min.js"></script>
<script src="../js/my-axios.js"></script>
<script src="../js/shopping-cart.js"></script>
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
</html>  