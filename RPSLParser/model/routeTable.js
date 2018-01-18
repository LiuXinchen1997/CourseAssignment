'use strict';

/* 
auth: 蒋雪瑶
function: 数据库RouteTable的Model定义，与数据库连接接口
*/

const Sequelize = require('sequelize');
const sequelize = require('./getSequelize').getSequelize();
const Router = require('./router').Router;

const RouteTable = sequelize.define('routeTable', {
    destination: {
        type: Sequelize.INTEGER,
        references: {
            model: Router,
            key: 'id'
        }
    },
    distance: {
        type: Sequelize.INTEGER
    },
    nexthop: {
        type: Sequelize.INTEGER,
        references: {
            model: Router,
            key: 'id'
        }
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
    tableName: 'routeTable', //数据库名
    timestamps: false
});

module.exports = {
    RouteTable
};