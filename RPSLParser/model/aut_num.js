const Sequelize = require('sequelize');
const sequelize = require('./getSequelize').getSequelize();

const Aut_num = sequelize.define('aut_num', {
  as_num: {
    type: Sequelize.STRING,   //对原定义中未single-value的字段定义string,在数据库中对应varchar(45)
    allowNull: false,      //表示不能为空，对应原字段中的mandatory,
    primaryKey: true
  },
  as_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  mnt_by: {
    type: Sequelize.TEXT,     //对原定义中未multi-value的字段定义text,在数据库中对应text
    allowNull: false
  },
  descr: {     //原定义中未upd-to，这里是框架限制，用下划线代替所有中划线
    type: Sequelize.TEXT,
    allowNull: true
  },
  country: {
    type: Sequelize.STRING,
    allowNull: true
  },
  member_of: {
    type: Sequelize.STRING,
    allowNull: true
  }
}, {
  freezeTableName: true,
  tableName: 'aut_num',      //数据表名
  timestamps: false
});

module.exports = {
  Aut_num
};
