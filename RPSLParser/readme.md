## 安装依赖
* 在项目根目录下运行npm install即可

## 运行项目
* 将sql文件导入数据库
* 找到项目的config目录，将群里的database.js，复制到该文件夹下，将username和password修改为你的数据库用户名密码
* 回到根目录，运行node server.js

## 文件夹目录说明
* static文件夹为静态资源目录，即放前端文件的地方
* model文件夹放连接数据库的模型类，对应数据库中的表，表的定义在示例中已经给出
* actions为系统中真正处理请求的文件夹，mntner.js中包含对mntner的各类处理，具体看文件
* lib文件夹下放置各种工具类，或者工具函数

## 接口说明
* 返回json格式
  ```json
    {
        seccessful: true/false,
        error: 'string',
        data: {
        
        }
    }
  ```

* 若过程中没有问题则，seccessful为true，data里面为返回的数据(视情况而定，也许没有要返回的数据)，没有error字段
* 若过程中出现异常，seccessful为false，没有data字段，error里面的错误提示