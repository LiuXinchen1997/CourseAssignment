const Sequelize = require('sequelize');
const sequelize = require('./getSequelize').getSequelize();

const DNS = sequelize.define('dns', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
  freezeTableName: true,
  tableName: 'dns',      //数据库名
  timestamps: false
});

module.exports = {
    DNS
};
