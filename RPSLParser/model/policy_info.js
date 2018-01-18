const Sequelize = require('sequelize');
const sequelize = require('./getSequelize').getSequelize();

const Policy_Info = sequelize.define('policy_info', {
  policy_info_id: {
    type: Sequelize.INTEGER,   //对原定义中未single-value的字段定义string,在数据库中对应varchar(45)
    allowNull: false,      //表示不能为空，对应原字段中的mandatory,
    primaryKey: true
  },
  as_num: {
    type: Sequelize.STRING,
    allowNull: true
  },
  as_num_d: {
    type: Sequelize.STRING,     //对原定义中未multi-value的字段定义text,在数据库中对应text
    allowNull: false
  },
  is_import: {     //原定义中未upd-to，这里是框架限制，用下划线代替所有中划线
    type: Sequelize.INTEGER,
    allowNull: false
  },
  permit: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  asregexp: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  comm: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  pref: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  med: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
}, {
  freezeTableName: true,
  tableName: 'policy_info',      //数据库名
  timestamps: false
});

module.exports = {
  Policy_Info
};
