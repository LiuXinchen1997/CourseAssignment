'use strict';

window.myvue = new Vue({
	el: '#page-cart',
	data: {
		goods: [],
		window: document.window
	},
	created: function() {
		console.log('created');
		this.fetchData();
	},
	computed: {
		totalCount: function() {
			return this.goods.reduce(function(prev, good) {
				if ( !good.chosen ) {
					return prev;
				}
				
				return prev + good.count;
			}, 0);
		},
		totalPrice: function() {
			return this.goods.reduce(function(prev, good) {
				if ( !good.chosen ) {
					return prev;
				}
				
				return prev + good.price * good.count;
			}, 0);
		},
		manualAllChosen: function() {
			if ( this.selectCount === 0 ) {
				return false;
			}
			return this.goods.reduce(function(prev, good) {
				return prev && good.chosen;
			}, true);
		},
		selectCount: function() {
			return this.goods.reduce(function(prev, good) {
				if (good.chosen) {
					return prev + 1;
				} else {
					return prev;
				}
			}, 0);
		}
	},
	methods: {
		fetchData: function() {
			var self = this;
			axios({
			    method: 'get',
			    url: '/ebp_2/user/showShoppingCart.json'
			})
			.then(function (response) {
			   var data = response.data;
			   console.log(data);
			   self.goods = data.ticketList;
			   self.goods = self.goods.map(good => {
				   var temp = {
						   descs: good.descs,
						   price: good.price,
						   balance: good.balance,
						   _count: good.count,
						   chosen: false,
						   set count(val) {
							   console.log(this);
							   if (val > this.balance) {
								   console.log("123456");
								   return;
							   }
							   console.log(val);
							   axios({
								    method: 'get',
								    url: '/ebp_2/user/updateCart',
								    query: {
								        key: self.goods.indexOf(this),
								        number:val
								    }
								})
								.then(function (response) {
									console.log(response);
								})
								.catch(function (error) {
									   console.log(error);
								});
							   this._count = val;
						   } ,
				   			get count() {
				   				return this._count;
				   			}
					   };

				   return temp;
				});
			})
			.catch(function (error) {
			   console.log(error);
			});
		},
		subTotal: function(good) {
			return good.price * good.count;
		},
		incCount: function(good) {
			good.count ++;
		},
		decCount: function(good) {
			if ( good.count === 0 ) {
				return;
			}
			
			good.count --;
		},
		removeGood: function(goodToRemove) {
			var con = confirm('确定删除所选商品吗？'); 
			if (con) {
				this.deleteTicket(this.goods.indexOf(goodToRemove));
				this.goods = this.goods.filter(good=>{
					return good != goodToRemove;
				})
			}
		},
		toggleAllChosen: function() {
			var newAllChosen = !this.manualAllChosen;
			
			this.goods.forEach(function(good) {
				good.chosen = newAllChosen;
			});
		},
		deleteChosen: function() {
			console.log(this.selectCount);
			if (this.selectCount === 0) {
				alert("请选择商品");
			} else {
				var con = confirm('确定删除所选商品吗？'); 
				if (con) {
					this.deleteTicket();
					this.goods = this.goods.filter(good=>{
						return !good.chosen;
					});
				}
			}
		},
		getChosenId: function() {
			var tid = [];
			this.goods.forEach(good=>{
				if (good.chosen) {
					tid.push(this.goods.indexOf(good));
				}
			});
			return tid;
		},
		deleteTicket: function(cid) {
			var tid = [];
			if (cid != null) {
				tid.push(cid);
			} else if (this.selectCount === 0) {
				alert("请选择商品");
				return;
			} else {
				tid = this.getChosenId();
			}

			var url = '/ebp_2/user/deleteCart.json?key='+tid[0];
			for (var i = 1; i<tid.length; i++) {
				url=url+"&key="+tid[i];
			}
			axios({
			    method: 'get',
			    url: url
			})
			.then(function (response) {
				console.log(response);
			})
			.catch(function (error) {
				   console.log(error);
			});
		},
		summaryMoney: function() {
			var self = this;
			if (this.selectCount === 0) {
				alert("请选择商品");
				return;
			};
			var tid = this.getChosenId();
			console.log(tid);
			var url = '/ebp_2/user/summaryMoney?key='+tid[0];
			for (var i = 1; i<tid.length; i++) {
				url=url+"&key="+tid[i];
			}
			axios({
			    method: 'post',
			    url: url
			})
			.then(function (response) {
				console.log(response.data.error);
				if (response.data.error == "余额不足") {
					var con = confirm('余额不足，是否前往充值？'); 
					if (con) {
						window.location.replace("/ebp_2/user/TopUpAccount.jsp");
					}
				} else if (response.data.error == "票存不足"){
					alert("票存不足");
				} else {
					self.goods = self.goods.filter(good=>{
						return !good.chosen;
					});
					alert("购票成功");
				}
			})
			.catch(function (error) {
				   console.log(error);
			});
		}
	}
});