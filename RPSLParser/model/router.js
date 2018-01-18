'use strict';

/* 
auth: 蒋雪瑶
function: 数据库Router的Model定义，与数据库连接接口
*/

const Sequelize = require('sequelize');
const sequelize = require('./getSequelize').getSequelize();

const Router = sequelize.define('router', {
  inet_rtr: {
    type: Sequelize.STRING,   
    allowNull: false      
  },
  alias: {
    type: Sequelize.TEXT
  },
  local_as: {
    type: Sequelize.STRING,     
    allowNull: false
  },
  ifaddr: {     
    type: Sequelize.TEXT,
    allowNull: false
  },
  peer: {
    type: Sequelize.TEXT
  },
  member_of: {
    type: Sequelize.TEXT
  },
  subWebs: {
    type: Sequelize.TEXT
  }
}, {
  freezeTableName: true,
  tableName: 'router',      //数据库名
  timestamps: false
});

module.exports = {
  Router
};
