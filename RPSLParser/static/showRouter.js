document.write("<script language=javascript src='../js/util.js'><\/script>");
//记录拖拽时要生成的left和top和id
let newRouterPosition_left = "";
let newRouterPosition_top = "";
Vue.directive('drag',//自定义指令                                      JS
{bind:function (el, binding) {
        let oDiv = el;   //当前元素
        let self = this;  //上下文
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
                document.getElementById("addRouterDialogShow").click();
             };
        };
    }
}
);
window.onload = function () {
 let center = new Vue({
    el: '#wrapper',
    data: {
      //新添加的路由器是否显示
      IsAddNewRouter: false,
      //路由器记录列表
      routers: [
  
    ],
      //路径记录列表
      pathes:[{
        path:'M536,550 L300,300',
        id:5
      }],
      //用来显示的AS列表
      as_num:[25],
      //添加路由器的解析内容
      addRouterText:"",
      //修改路由器的解析内容
      updateRouterText:"",
      //添加AS的解析内容
      addASText:"",
      //修改AS的解析内容
      updateASText:"",
      //用来在修改模态框中记录AS_Num
      updateASNum : "",
      //用来记录修改路由器的路由器id
      updateRouterId:"",
      //用来记录whois的路由器id
      whoisRouterId:"",
      //whois命令内容
      whoisText:"",
      //修改/添加AS/添加/修改路由器的错误标志
      ifError:false,
      //修改/添加AS/添加/修改路由器的错误信息
      errorMsg:"",
      showWhoisAndUpdate:false
    },
    methods: {
      //将left和top移除px
    removePx:function(string){
      return string.substring(0,string.length-2);
    },
          //生成单个连接关系
    addPath:function(idStart,startPositionLeft,startPostiontop,idEnd,endPositionLeft,endPostionTop){
      this.pathes.push({
          id:idStart+'_'+idEnd,
          path:'M'+this.removePx(startPositionLeft)+','+this.removePx(startPostiontop)
               + ' '+ 'L' + this.removePx(endPositionLeft)+','+this.removePx(endPostionTop)
        });
        console.log("pathes"+ this.pathes[1].path);
        console.log("pathes"+ this.pathes[1].id);
    },
      //界面加载就调用的函数
      /*
      upload:function(){
        data.forEach(element => {
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
              continue;
            }
            if(this.findIndexInObjectArray(this.pathes,elementConnect.id+'_'+element.router_id) != -1){
              routers[routerIndex].connect.push(elementConnect.id+'_'+element.router_id);
              continue;
            }
            //此连接关系未绘制,先绘制连接，再加入此路由器保存的connect中
            this.addPath(element.router_id,element.left,element.top,elementConnect.id,elementConnect.left,elementConnect.top);
            routers[routerIndex].connect.push(element.router_id+'_'+ elementConnect.id);
          });
        });
      },*/
      ifEmpty:function(value){
        if( value == null || value.length<= 0){
            this.ifError = true;
            this.errorMsg = "输入不能为空";
            return true;
        }
    },

      //whois命令
      whoisFunction:function(){
        if(this.ifEmpty(this.whoisText))
          return;

          //解析成功
          document.getElementById("whoisConsole").click;
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
      deleteNewRouter:function(){
        this.addRouterText = "";
        this.resetErrorMsg();
        this.IsAddNewRouter = false;
        //将元素的left和right重新指定
      },
      //添加路由器
      addRouterFunction:function(){
        if(this.ifEmpty(this.addRouterText))
          return;
        //此处传递json

        //解析成功
        this.IsAddNewRouter = false;
        this.routers.push({
          id:'router'+ 10,
          style:{
            left: newRouterPosition_left,
            top: newRouterPosition_top,
            width: '100px',
            height:'100px',
            position:'absolute'
          },
          showDialogStyle:{
            position:'absolute',
            left: newRouterPosition_left,
            top: newRouterPosition_top - 10,
          },
          connect:[]
        })
        console.log(this.routers[0].id);
        console.log("添加完成");
        document.getElementById("addRouterConsole").click();

        var data = new Array(1,2); id = 10;
        let routerIndex = this.findIndexInObjectArray(this.routers,'router'+ id);
        
        data.forEach(element => {
          let index = this.findIndexInObjectArray(this.routers,'router'+element); 
          if(index != -1){
            this.addPath(id,newRouterPosition_left,newRouterPosition_top,
                        element,this.routers[index].left,this.routers[index].top);
            this.routers[routerIndex].connect.push(id+'_'+element);
          }else{
            //说明这个元素不是我们要链接的Router
          }  
        });
        //连接+保存连接关系
      
        //this.addPath(id,newRouterPosition_left,newRouterPosition_top,idEndend,PositionLeft,endPostionTop);

        //解析错误
          //this.ifError = true;
          //this.errorMsg = "解析出错，请检查";
        
      },
      addRouterFunctionThen:function(){
        var data = new Array(1,2); 
        id = 10;newNodeindex = 3;
        data.forEach(element => {
          if(this.findIndexInObjectArray(this.routers,'router'+element) != -1){
            this.addPath(id,newRouterPosition_left,newRouterPosition_top,
                        element,this.routers[index].left,this.routers[index].top);
            this.routers[newNodeindex].connect.push(id+'_'+element);
          }else{
            //说明这个元素不是我们要链接的Router
          }  
        });

        },
      showUpdateRouterDialog:function(router_id){
        updateRouterId = router_id;
        document.getElementById("updateRouterDialogShow").click();
      },
      //修改路由器，---修改后的连接关系改变记录--
      updateRouterFunction:function(){
        if(this.ifEmpty(this.updateRouterText))
          return;
        //此处传递json

        console.log(this.updateRouterId);

        this.getElementById("");
        //解析成功
        document.getElementById("updateRouterConsole").click();
        //将自己的连接关系中所有的pathid对应的path删除
        //添加新的连接，push进栈
        
        //解析错误
        //this.ifError = true;
        //this.errorMsg = "解析出错，请检查";
      },
      //更改AS
      updateASFunction:function(){
        console.log("修改AS");
        if(this.ifEmpty(this.updateASText))
          return;
        //此处传递json
        
        //解析成功
        console.log("修改AS解析成功");
        document.getElementById("updateASConsole").click();
        //解析错误
          //this.ifError = true;
          //this.errorMsg = "解析出错，请检查";

      },
      //增加AS
      addASFunction:function(){
        if(this.ifEmpty(this.addASText))
          return;
        
        //此处传递json

        //解析成功
        document.getElementById("addASConsole").click();
        //this.as_num.push(26);
        //解析错误
          //this.ifError = true;
          //this.errorMsg = "解析出错，请检查";
        
      },
      //将as_num传给修改AS模态框
      updateASDialogLable:function(as_num){
        this.updateASNum = as_num;
      },
      //用于用户关闭模态框时，将错误标志清0
      resetErrorMsg:function(){
        this.errorMsg = "";
        this.ifError = false;
      },
      //用于查找数组中对应的元素的index
      findIndexInObjectArray(array,test){
        let index = 0;
        for(index in array){
          if(array[index].id === test)
            break;
          if(index === array.length - 1)
            index = -1;
        }
        return index;
      },
      logout:function(){
        if(confirmRessult = confirm("您确认退出吗？")){
          sessionStorage.removeItem("uid");
          redirectTo('login.html');
        }   
      }
    }
  })
}


