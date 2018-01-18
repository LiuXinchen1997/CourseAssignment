
var myVue = new Vue({
    el:'#bookingSucc' , 
    data:{      
    	orderlists: [],
    	sum:0,
    	oid:0
    },
    created: function() {
    	console.log('created');
    	console.log(window);
		this.fetchData();
    },
    filters:{ 
        formatMoney:function (value) { 
            return "¥ " + value.toFixed(2) +" 元"; 
        }
    },
    methods:{   
        fetchData: function() {
        	var orderlistStr = window.localStorage.getItem("orderlists");
        	this.orderlists = JSON.parse(orderlistStr);
        	console.log(this.orderlists);
        	this.sum = Number(window.localStorage.getItem("sum"));
        	console.log(this.sum);
        	this.oid = this.orderlists[0].oid;
		}
    }
});
 
