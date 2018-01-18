const Sequelize = require('sequelize');
const sequelize = require('./getSequelize').getSequelize();

const As_set = sequelize.define('as_set', {
  as_set_name: {
    type: Sequelize.STRING,   //对原定义中未single-value的字段定义string,在数据库中对应varchar(45)
    allowNull: false,      //表示不能为空，对应原字段中的mandatory,
    primaryKey: true
  },
  members: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  mbrs_by_ref: {
    type: Sequelize.TEXT,     //对原定义中未multi-value的字段定义text,在数据库中对应text
    allowNull: true
  }
}, {
  freezeTableName: true,
  tableName: 'as_set',      //数据表名
  timestamps: false
});

module.exports = {
  As_set
};
