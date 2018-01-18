document.write("<script language=javascript src='js/util.js'><\/script>");
document.write("<script language=javascript src='js/md5.js'><\/script>");
    let loginValue = new Vue({
        el:"#login",
        data : {
            ifError : false,
            errorMsg: null,
            username: null,
            password: null
        },
        methods: {
            ifEmpty:function(value,errorMsg){
                if( value == null || value.length<= 0){
                    this.ifError = true;
                    this.errorMsg = errorMsg;
                    return true;
                }
            },
            login: function() {
                if(this.ifEmpty(this.username,"用户名不能为空") || this.ifEmpty(this.password,"密码不能为空"))
                    return;
                    let md5_password = MD5(this.password);
                    console.log(md5_password);
                    redirectTo('index.html'); 
                    let self = this;
                    postJSON('/login', {
                        user: {
                            username: this.username,
                            password: md5_password
                         }
                        }, function(res) {
                            console.log(JSON.stringify(res));
                            if (res.successful) {
                                sessionStorage.setItem("uid",JSON.stringify(res.uid));
                                redirectTo('index.html'); 
                            } else {
                                this.ifError = true;
                                this.errorMsg = '登录失败，请重试！';
                                return;
                            }
                    });
            }
        },
    })


