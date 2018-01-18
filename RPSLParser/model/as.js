'use strict';

/* 
auth: 蒋雪瑶
function: 数据库As的Model定义，与数据库连接接口
*/

const Sequelize = require('sequelize');
const sequelize = require('./getSequelize').getSequelize();

const As = sequelize.define('as', {
    aut_num: {
        type: Sequelize.STRING,
        allowNull: false
    },
    as_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    member_of: {
        type: Sequelize.TEXT
    },
    import: {
        type: Sequelize.TEXT
    },
    export: {
        type: Sequelize.TEXT
    },
    default: {
        type: Sequelize.TEXT
    },
}, {
  freezeTableName: true,
  tableName: 'as',      //数据库名
  timestamps: false
});

module.exports = {
  As
};
