const errors = require('../config/errors');
const Policy_Info = require('../model/Policy_Info').Policy_Info;

class PolicyLib {
    //查询多个
    async findAll() {
        const allPolicies = await Policy_Info.findAll();
        
        return allPolicies;
    }
    
    //查询一个
    async findOnePolicy() {
        let onePolicy = await Policy_Info.findOne({
            where: {
                policy_info_id : '1'
            }
        });
        console.log(JSON.stringify(onePolicy));
        return onePolicy;
    }

    //插入一个,仅做测试使用
    async insertOnePolicy() {
        let p_f = await Policy_Info.create({
            'policy_info_id':4,
            'as_num':'1',
            'as_num_d':'4',
            'is_import':0,
            'permit':1,
            'asregexp' : '?',
            'comm' : 100,
            'pref' : 100,
            'med' : 0
        });
        console.log(JSON.stringify(p_f));
    }
}

module.exports = {
    PolicyLib
}
