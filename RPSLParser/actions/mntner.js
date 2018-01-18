'use strict';
/* 
auth: 蒋雪瑶
function: 接口函数定义示例
*/
const Mntner = require('../lib/Mntner').Mntner;

const error = require('../config/errors');

async function newMntner(req, res) {
    const mntner = new Mntner({
        mntner: 'MAINT-AS65526',
        descr: 'just for test',
        auth: ['MAIL-FROM591689118@qq.com'],    //由于可能是多值，所以用数组表示
        upd_to: ['591689118@qq.com'],
        mnt_nfy: ['591689118@qq.com'],
        tech_c: ['SHRADB25Liuwei'],
        admin_c: ['SHRADB25Liuwei'],
        mnt_by: ['MAINT-AS65526'],
        changed: ['591689118@qq.com20171227'],
        source: 'localdb'
    });
    if (!mntner.check()) {
        res.json({
            successful: false,
            error: error.SyntaxError
        });
        return;
    }

    res.json({
        successful: true
    });
}

async function updateMntner(req, res) {
    const mntner = Mntner.findOne(req.body);
    mntner.update();
    
    res.json({
        successful: true
    });
}

module.exports = {
    newMntner,
    updateMntner
};

