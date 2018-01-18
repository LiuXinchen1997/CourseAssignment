'use strict';

window.myvue = new Vue({
	el: '#orders',
	data: {
		pageAll:0,
		page:0,
		startTime:null,
		endTime:null,
		keywords:null,
		i:0,
		orders: [],
		window: document.window
	},
	created: function() {
		console.log('created');
		window.addEventListener('scroll', this.onscroll);
		this.fetchData();
		this.fetchPage();
	},
	computed: {
		
	},
	methods: {
		fetchPage: function() {
			var self = this;
			axios({
			    method: 'get',
			    url: '/ebp_2/user/GetOrderCount.json',
			    query: {
			        start:this.startTime,
			        end:this.endTime
			    }
			})
			.then(function (response) {
				var data = response.data;
				var count = data.count;
				console.log(count);
				self.pageAll = Math.ceil(count / 10);
				console.log(self.pageAll);
			})
			.catch(function (error) {
				   console.log(error);
			});
		},
		onscroll: function () { 
			if (this.getScrollTop() + this.getClientHeight() == this.getScrollHeight()) { 
				if (this.page+1<this.pageAll) {
					this.page++;
					this.fetchData();
				}
			} 
		},
		getScrollTop: function() { 
			var scrollTop = 0; 
			if (document.documentElement && document.documentElement.scrollTop) { 
				scrollTop = document.documentElement.scrollTop; 
			} else if (document.body) { 
				scrollTop = document.body.scrollTop; 
			} 
			return scrollTop; 
		},
		getClientHeight: function() { 
			var clientHeight = 0; 
			if (document.body.clientHeight && document.documentElement.clientHeight) { 
				clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight); 
			} else { 
				clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight); 
			} 
			return clientHeight; 
		},		
		getScrollHeight: function() { 
			return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight); 
		},
		query: function() {
			var start = document.getElementById("date1").value;
			var end = document.getElementById("date2").value;
			var keyword = document.getElementById("keyword").value;
			if (start) {
				this.startTime = (new Date(start)).getTime();
			} else {
				this.startTime = null;
			}
			if (end) {
				this.endTime = (new Date(end)).getTime()+86400000;
			} else {
				this.endTime = null;
			}
			if (this.startTime && this.endTime && this.startTime > this.endTime) {
				alert("起始时间不得大于终止时间");
				return;
			}
			if (keyword) {
				this.keywords = keyword;
			} else {
				this.keywords = null;
			}
			this.orders = [];
			this.i = 0;
			this.page = 0;
			if (!this.keywords) {
				this.fetchData();
				this.fetchPage();
			} else {
				this.queyByKeywords();
			}
		},
		queyByKeywords: function() {
			var self = this;
			axios({
			    method: 'get',
			    url: '/ebp_2/user/queryOrdersByKeywords.json',
			    query: {
			    	page: this.page,
			        start:this.startTime,
			        end:this.endTime,
			        keywords: this.keywords
			    }
			})
			.then(function (response) {
				console.log(response);
				var data = response.data;
				if (data.orders) {
					   data.orders.forEach(order=>{
						   order.commitTime=(new Date(order.commitTime)).toDateString();
						   self.orders.push(order);
					   });
				}
			})
			.catch(function (error) {
				console.log(error);
			});
		},
		fetchData: function() {
			var self = this;
			axios({
			    method: 'get',
			    url: '/ebp_2/user/queryAllOrders.json',
			    query: {
			    	page: this.page,
			        start:this.startTime,
			        end:this.endTime
			    }
			})
			.then(function (response) {
			   var data = response.data;
			   console.log(data);
			   if (data.orders) {
				   data.orders.forEach(order=>{
					   order.commitTime=(new Date(order.commitTime)).toDateString();
					   axios({
						    method: 'get',
						    url: '/ebp_2/user/GetOrderListByoid.json',
						    query: {
						        oid: order.oid
						    }
						})
						.then(function (response) {
							var data = response.data;
							order.orderlists = data.orderList;
							if (self.orders.length == self.i) {
								self.orders.push(order);
								self.i++;
							}
						})
						.catch(function (error) {
							   console.log(error);
						});
				   });
			   }
				console.log(self.orders);
			})
			.catch(function (error) {
			   console.log(error);
			});
		}
	}
});