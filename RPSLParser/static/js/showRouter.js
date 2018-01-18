window.onload = function () {
  let center = new Vue({
    el: '#wrapper',
    data: {
      //新添加的路由器是否显示
      IsAddNewRouter: false,
      //路由器记录列表
      routers: [{
        id: 126,
        left: 300,
        top: 300
      }, {
        id: 127,
        left: 450,
        top: 450
      }, {
        id: 128,
        left: 450,
        top: 200
      }, {
        id: 129,
        left: 100,
        top: 450
      }, {
        id: 130,
        left: 100,
        top: 300
      }, {
        id: 131,
        left: 600,
        top: 300
      }, {
        id: 132,
        left: 750,
        top: 300
      }],
      //路径记录列表
      pathes: [],
      //whois路径记录列表
      whoisPathes: [],
      //用来显示的AS列表
      as_num: [],
      //添加路由器的解析内容
      addRouterText: "",
      //添加路由器的x
      addNewRouterX: "",
      //添加路由器的y
      addNewRouterY: "",
      //修改路由器的解析内容
      updateRouterText: "33",
      //添加AS的解析内容
      addASText: "",
      //修改AS的解析内容
      updateASText: "",
      //用来在修改模态框中记录AS_Num
      updateASNum: "",
      //用来记录修改路由器的路由器id
      updateRouterId: "",
      //用来记录whois的路由器id
      whoisRouterId: "",
      //whois命令内容
      whoisText: "",
      //修改/添加AS/添加/修改路由器的错误标志
      ifError: false,
      //修改/添加AS/添加/修改路由器的错误信息
      errorMsg: "",
      showWhoisAndUpdate: false
    },
    mounted(){
      this.getALLAS();
    },
    methods: {
    getALLAS(){
        let self = this;
        postJSON('/autnum/getAllAS', {
          }, function (res) {
            console.log(JSON.stringify(res));
            if (res.successful) {
              res.as_num.forEach(element => {
              self.as_num.push(element);
            });
           } else {
             alert("加载失败");
             return;
           }
        });
    },
      //将left和top移除px
      removePx: function (string) {
        return string.substring(0, string.length - 2);
      },
      //生成单个连接关系
      addPath: function (idStart, startPositionLeft, startPostiontop, idEnd, endPositionLeft, endPostionTop) {
        console.log("传参：" + startPositionLeft + " " + startPostiontop + " " + endPositionLeft + " " + endPostionTop);
        this.pathes.push({
          id: idStart + '_' + idEnd,
          path: 'M' + startPositionLeft + ' ' + startPostiontop +
            ' ' + 'L' + endPositionLeft + ' ' + endPostionTop
        });
        console.log('M' + startPositionLeft + ' ' + startPostiontop +
          ' ' + 'L' + endPositionLeft + ' ' + endPostionTop);
      },
      //添加whois连接的路径
      addWhoisPath: function (idStart, startPositionLeft, startPostiontop, idEnd, endPositionLeft, endPostionTop) {
        console.log("传参：" + startPositionLeft + " " + startPostiontop + " " + endPositionLeft + " " + endPostionTop);
        this.whoisPathes.push({
          id: idStart + '_' + idEnd,
          path: 'M' + startPositionLeft + ' ' + startPostiontop +
            ' ' + 'L' + endPositionLeft + ' ' + endPostionTop
        });
        console.log('M' + startPositionLeft + ' ' + startPostiontop +
          ' ' + 'L' + endPositionLeft + ' ' + endPostionTop);
      },
      //界面加载就调用的函数

      upload: function (data) {
        /*data.forEach(element => {
          this.as_num.push(element.as_num); 
          this.routers.push({
            id:'router'+ element.router_id,
            left: element.left,
            top: element.top,
            //这里存与该路由器连接的所有path的id,先不放，等开始加path的时候再放
            connect:[],
          })
          let routerIndex = this.findIndexInObjectArray(this.routers,'router'+ element.router_id);
          //假设json返回的连接关系是connect[{id:,left,right},{}.{}]
          element.conect.forEach(elementConnect => {
            //先判断是否此连接关系已绘制,若已绘制就不重复绘制了，直接将连接关系加入此路由器保存的connect中
            if(this.findIndexInObjectArray(this.pathes,element.router_id+'_'+ elementConnect.id) != -1){
              routers[routerIndex].connect.push(element.router_id+'_'+ elementConnect.id);
              
            }
            if(this.findIndexInObjectArray(this.pathes,elementConnect.id+'_'+element.router_id) != -1){
              routers[routerIndex].connect.push(elementConnect.id+'_'+element.router_id);
              
            }
            //此连接关系未绘制,先绘制连接，再加入此路由器保存的connect中
            this.addPath(element.router_id,element.left,element.top,elementConnect.id,elementConnect.left,elementConnect.top);
            routers[routerIndex].connect.push(element.router_id+'_'+ elementConnect.id);
          });
        });*/
      },
      ifEmpty: function (value) {
        if (value == null || value.length <= 0) {
          this.ifError = true;
          this.errorMsg = "输入不能为空";
          return true;
        }
      },

      //whois命令
      whoisFunction: function () {
        if (this.ifEmpty(this.whoisText))
          return;
        let self = this;
        postJSON('/router/whois', {
          routerId: self.updateRouterId,
          destination: self.whoisText
        }, function (res) {
          console.log(JSON.stringify(res));
          if (res.successful) {
            self.ifError = false;
            self.errorMsg = "";
            document.getElementById("routerOperationConSole").click;
            let data = res.route;
            for (let i = 0; i < data.length - 1; i++) {
              let frontPointInRouterIndex = self.findIndexInObjectArray(self.routers, data[i]);
              let lastPointInRouterIndex = self.findIndexInObjectArray(self.routers, data[i + 1]);
              if (frontPointInRouterIndex != -1 && lastPointInRouterIndex != -1) {
                self.addWhoisPath(
                  self.routers[frontPointInRouterIndex].id,
                  parseFloat(self.routers[frontPointInRouterIndex].left) + 40,
                  parseFloat(self.routers[frontPointInRouterIndex].top) + 40,
                  self.routers[lastPointInRouterIndex].id,
                  parseFloat(self.routers[lastPointInRouterIndex].left) + 40,
                  parseFloat(self.routers[lastPointInRouterIndex].top) + 40);
              }
            };
            //解析成功
          } else {
            self.ifError = true;
            self.errorMsg = JSON.stringify(res.error);
            return;
          }
        });

        //解析错误
        //this.ifError = true;
        //this.errorMsg = "解析出错，请检查";
      },
      addNewRouter(component) {
        console.log(this.IsAddNewRouter);
        this.IsAddNewRouter = true;
        console.log(this.IsAddNewRouter);
      },
      //当用户取消添加路由器时，1.将错误信息至空和翻转标志 2.消除新生成的路由器
      deleteNewRouter: function () {
        this.addRouterText = "";
        this.addNewRouterX = "";
        this.addNewRouterY = "";
        this.resetErrorMsg();
      },
      isBetween0And1000(testString) {
        if ((parseFloat(testString) > 1000 || parseFloat(testString) < 0)) {
          this.errorMsg = "x和Y要为1000到0的数字";
          this.ifError = true;
          return true;
        }
      },
      isElementNan: function (string) {
        if (isNaN(parseFloat(string))) {
          this.errorMsg = "X和Y要为数字";
          this.ifError = true;
          return true;
        }
      },
      addConnection: function (data, routerIndex) {
        data.forEach(element => {
          let index = this.findIndexInObjectArray(this.routers, element);
          if (index != -1) {
            //连接+保存连接关系
            console.log('1111111111111', this.routers[routerIndex]);
            this.addPath(this.routers[routerIndex].id, parseFloat(this.routers[routerIndex].left) + 40, parseFloat(this.routers[routerIndex].top) + 40,
              element, parseFloat(this.routers[index].left) + 40, parseFloat(this.routers[index].top) + 40);
            this.routers[routerIndex].connect.push(this.routers[routerIndex].id + '_' + element);
            console.log(this.routers[routerIndex].connect);
          } else {
            //说明这个元素不是我们要链接的Router
          }
        });
      },
      //添加路由器
      addRouterFunction: function () {
        let self = this;
        if (this.isElementNan(this.addNewRouterX) ||
          this.isElementNan(this.addNewRouterY) ||
          this.isBetween0And1000(this.addNewRouterX) ||
          this.isBetween0And1000(this.addNewRouterY) ||
          this.ifEmpty(this.addRouterText))
          return;
        let x = self.addNewRouterX;
        let y = self.addNewRouterY;
        //此处传递json
        postJSON('/router/newRouter', {
          router: self.addRouterText,
        }, function (res) {
          document.getElementById("addRouterConsole").click();
          console.log(JSON.stringify(res));
          if (res.successful) {
            self.ifError = false;
            self.errorMsg = "";
            self.routers.push({
              id: res.routerId,
              localAs: res.localAs,
              left: parseFloat(x),
              top: parseFloat(y),
              connect: []
            });
            let routerIndex = self.findIndexInObjectArray(self.routers, res.routerId);
            self.addConnection(res.neighbors, routerIndex);
            alert('添加成功');
          } else {
            self.ifError = true;
            self.errorMsg = res.error;
            return;
          }
        });



      },
      showUpdateRouterDialog: function (router_id) {
        updateRouterId = router_id;
        document.getElementById("updateRouterDialogShow").click();
      },
      updateRouterFunctionQuery: function (routerId) {
        this.updateRouterId = routerId;
        let self = this;
        postJSON('/router/getRouter', {
          routerId: routerId,
        }, function (res) {
          console.log(JSON.stringify(res));
          if (res.successful) {
            let routerText = "";
            Object.keys(res.router).forEach(key => {
              if (res.router[key] instanceof Array) {
                res.router[key].forEach(value => {
                  routerText = `${routerText}\n${key}: ${value}`;
                });
              } else {
                routerText = `${routerText}\n${key}: ${res.router[key]}`;
              }
            });
            routerText = routerText.substr(1);
            self.updateRouterText = routerText;
          } else {
            this.ifError = true;
            this.errorMsg = res.error;
            return;
          }
        });
      },
      //修改路由器，---修改后的连接关系改变记录--
      updateRouterFunction: function () {
        if (this.ifEmpty(this.updateRouterText))
          return;
        //此处传递json
        let self = this;
        postJSON('/router/updateRouter', {
          routerId: self.updateRouterId,
          router: self.updateRouterText
        }, function (res) {
          console.log(JSON.stringify(res));
          if (res.successful) {
            self.ifError = false;
            self.errorMsg = "";
            document.getElementById("routerOperationConSole").click();
            console.log("按钮");
            console.log(document.getElementById("routerOperationConSole"));  
            let index = self.findIndexInObjectArray(self.routers, self.updateRouterId);
            if (index != -1 && self.routers[index].connect) {
              self.routers[index].connect.forEach(element => {
                let pathIndex = self.findIndexInObjectArray(self.pathes, element);
                if (pathIndex != -1)
                  self.pathes.splice(pathIndex, 1);
              });
            }
            self.routers[index].connect = [];
            let routerIndex = self.findIndexInObjectArray(self.routers, res.routerId);
            self.addConnection(res.neighbors, routerIndex);
            alert('修改成功');
          } else {
            self.ifError = true;
            self.errorMsg = JSON.stringify(res.error);
            return;
          }
        });
        console.log(this.updateRouterId);
      },
      //更改AS
      updateASFunction:function(){
        console.log("修改AS");
        if(this.ifEmpty(this.updateASText))
          return;
        //此处传递json
        let updateASText = this.updateASText;
        let as_num = this.updateASNum;
        let self = this;
        postJSON('/autnum/updateAS', {
          as_num: as_num,  
          as:updateASText
          }, function(res) {
              console.log(JSON.stringify(res));
              if (res.successful) {
                  alert("解析成功");
                  //解析成功
                  document.getElementById("updateASConsole").click();
              } else {
                  self.ifError = true;
                  self.errorMsg = res.error;
                  return;
              }
      });

      },
      //增加AS
      addASFunction:function(){
        if(this.ifEmpty(this.addASText))
          return;
       
        //此处传递json
        let addASText = this.addASText;
        let self = this;
        postJSON('/autnum/addAS', {
          as: addASText,  
          }, function(res) {
              console.log(JSON.stringify(res));
              if (res.successful) {
                  self.as_num.push(res.as_num);
                  alert("解析成功");
                  //解析成功
                  document.getElementById("addASConsole").click();
              } else {
                  self.ifError = true;
                  self.errorMsg = res.error;
                  return;
              }
      });

        
      },
      //将as_num传给修改AS模态框
      updateASDialogLable:function(as_num){
          this.updateASNum = as_num;
          let self = this;
          postJSON('/autnum/getAS', {
            as_num: as_num,
          }, function (res) {
            if (res.successful) {
              let ASText = "";
              console.log("in ------------: "+ res.AS);
              Object.keys(res.AS).forEach(key => {
                if (res.AS[key] instanceof Array) {
                  res.AS[key].forEach(value => {
                    ASText = `${ASText}\n${key}: ${value}`;
                  });
                } else {
                  ASText = `${ASText}\n${key}: ${res.AS[key]}`;
                }
              });
              ASText = ASText.substr(1);
              self.updateASText = ASText;
              console.log("in ------------: "+ ASText);
            } else {
              this.ifError = true;
              this.errorMsg = res.error;
              return;
            }
          });
      },

      //用于用户关闭模态框时，将错误标志清0
      resetErrorMsg: function () {
        this.errorMsg = "";
        this.ifError = false;
      },
      //用于查找数组中对应的元素的index
      findIndexInObjectArray(array, test) {
        let index = 0;
        for (index in array) {
          if (array[index].id === test)
            break;
          if (index === array.length - 1)
            index = -1;
        }
        return index;
      },
      logout: function () {
        if (confirmRessult = confirm("您确认退出吗？")) {
          sessionStorage.removeItem("uid");
          redirectTo('login.html');
        }
      }
    }
  })
}

document.write("<script language=javascript src='../js/util.js'><\/script>");
//记录拖拽时要生成的left和top和id
let newRouterPosition_left = "";
let newRouterPosition_top = "";
Vue.directive('drag', //自定义指令                                      JS
  {
    bind: function (el, binding) {
      let oDiv = el; //当前元素
      let self = this; //上下文
      oDiv.onmousedown = function (e) {
        //鼠标按下，计算当前元素距离可视区的距离
        let disX = e.clientX - oDiv.offsetLeft;
        let disY = e.clientY - oDiv.offsetTop;
        document.onmousemove = function (e) {
          //通过事件委托，计算移动的距离 
          let l = e.clientX - disX;
          let t = e.clientY - disY;
          //移动当前元素  
          oDiv.style.left = l + 'px';
          oDiv.style.top = t + 'px';
        };
        document.onmouseup = function (e) {
          document.onmousemove = null;
          document.onmouseup = null;
          console.log("拖拽完成");
          newRouterPosition_left = oDiv.style.left;
          newRouterPosition_top = oDiv.style.top;
          console.log("left : " + oDiv.style.left);
          console.log("top: " + oDiv.style.top);
          console.log("x : " + oDiv.style.x);
          console.log("y : " + oDiv.style.y);
          document.getElementById("addRouterDialogShow").click();
        };
      };
    }
  }
);