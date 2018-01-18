document.write("<script language=javascript src='js/util.js'><\/script>");
document.write("<script language=javascript src='js/md5.js'><\/script>");
var registerValue = new Vue({
    el:"#register",
    data : {
        ifError : false,
        errorMsg : "",
        username: "",
        password:"",
        repassword:""
    },
    methods: {
        register: function() {
          if(this.username.length == ""){
            this.ifError = true;
            this.errorMsg = "用户名不能为空";
            return;
          }
          if(this.password.length == ""){
            this.ifError = true;
            this.errorMsg = "密码不能为空";
            return;
          } 
          if(this.password != this.repassword){
            this.ifError = true;
            this.errorMsg = "两次密码不一致";
            return;
          } 
          ifError = true;
          var formData = JSON.stringify(this.loginForm);

          this.$http.post('http://localhost:8088/post', formData).then((response) => {

              // success callback
              console.log(response.data);
          }, (response) => {
            this.ifError = true;
            this.errorMsg = "用户名密码不一致";
            return;
          });
        }
    },
})