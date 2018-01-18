'use strict';

/* 
auth: 蒋雪瑶
function: 数据库IpTable的Model定义，与数据库连接接口
*/

const Sequelize = require('sequelize');
const sequelize = require('./getSequelize').getSequelize();
const Router = require('./router').Router;

const IpTable = sequelize.define('ipTable', {
    ip: {
        type: Sequelize.STRING
    },
    router: {
        type: Sequelize.INTEGER,
        references: {
            model: Router,
            key: 'id'
        }
    }
}, {
    freezeTableName: true,
    tableName: 'ipTable', //数据库名
    timestamps: false
});

module.exports = {
    IpTable
};