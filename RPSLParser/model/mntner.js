const Sequelize = require('sequelize');
const sequelize = require('./getSequelize').getSequelize();

const Mntner = sequelize.define('mntner', {
  mntner: {
    type: Sequelize.STRING,   //对原定义中未single-value的字段定义string,在数据库中对应varchar(45)
    allowNull: false      //表示不能为空，对应原字段中的mandatory,
  },
  descr: {
    type: Sequelize.STRING,
    allowNull: false
  },
  auth: {
    type: Sequelize.TEXT,     //对原定义中未multi-value的字段定义text,在数据库中对应text
    allowNull: false
  },
  upd_to: {     //原定义中未upd-to，这里是框架限制，用下划线代替所有中划线
    type: Sequelize.TEXT,
    allowNull: false
  },
  mnt_nfy: {
    type: Sequelize.TEXT
  },
  tech_c: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  admin_c: {
    type: Sequelize.TEXT
  },
  remarks: {
    type: Sequelize.TEXT
  },
  notify: {
    type: Sequelize.TEXT
  },
  mnt_by: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  changed: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  source: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  freezeTableName: true,
  tableName: 'mntner',      //数据库名
  timestamps: false
});

module.exports = {
  Mntner
};
