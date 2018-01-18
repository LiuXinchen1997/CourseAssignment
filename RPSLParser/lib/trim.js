'use strict';
/* 
auth: 蒋雪瑶
function: 除去多余的空格
*/

//去左空格;
function ltrim(s){
    return s.replace(/(^\s*)/g, "");
}
//去右空格;
function rtrim(s){
    return s.replace(/(\s*$)/g, "");
}
//去左右空格;
function trim(s){
    return s.replace(/(^\s*)|(\s*$)/g, "");
}

function trimAll(s) {
    return s.replace(/\s+/g, "");
}

module.exports = {
    ltrim,
    rtrim,
    trim,
    trimAll
}