'use strict';

/* 
auth: 蒋雪瑶
function: 数据库peers的Model定义，与数据库连接接口
*/

const Sequelize = require('sequelize');
const sequelize = require('./getSequelize').getSequelize();
const Router = require('./router').Router;

const Peers = sequelize.define('peers', {
    as1: {
        type: Sequelize.STRING
    },
    as2: {
        type: Sequelize.STRING
    },
    bgp1: {
        type: Sequelize.INTEGER
    },
    bgp2: {
        type: Sequelize.INTEGER
    }
}, {
    freezeTableName: true,
    tableName: 'peers', //数据库名
    timestamps: false
});

module.exports = {
    Peers
};