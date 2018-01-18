'use strict';

/* 
auth: 蒋雪瑶
function: 数据库PeeringSet的Model定义，与数据库连接接口
*/

const Sequelize = require('sequelize');
const sequelize = require('./getSequelize').getSequelize();

const PeeringSet = sequelize.define('peeringset', {
    peering_set: {
        type: Sequelize.STRING,
        allowNull: false
    },
    peering: {
        type: Sequelize.TEXT
    }
}, {
    freezeTableName: true,
    tableName: 'peeringset', //数据库名
    timestamps: false
});

module.exports = {
    PeeringSet
};