'use strict';
/* 
auth: 蒋雪瑶
function: 类定义示例
*/
class Mntner {
    constructor(options) {
        this.options = options
    }

     /* 
        补充检查mntner语法的代码 
    */
    check() {
   
        return false;
    };

    /* 
        将当前mntner存入数据库 
    */
    create() {
    
    }

    /* 
        判断当前mntner是否存在 
    */
    isExist() {
   
        return false;
    }

    /* 
        更新当前mntner
    */
    update() {
    
    }

    /* 
        找到一个mntner
    */
    static findOne() {
        this.id = id;
        
        return new Mntner();
    }
}

module.exports = {
    Mntner
}