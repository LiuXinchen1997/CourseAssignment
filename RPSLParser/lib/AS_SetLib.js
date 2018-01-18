const errors = require('../config/errors');
const As_set = require('../model/as_set').As_set;

class AS_SetLib {
    //查询多个
    async findAll() {
        const allAs_set = await As_set.findAll();
        
        return allAs_set;
    }
    
    //查询一个
    async findOneAS_set() {
        let oneAs_set = await As_set.findOne({
            where: {
                as_set_name : '1'
            }
        });
        console.log(JSON.stringify(oneAs_set));
        return oneAs_set;
    }

    //插入一个,仅做测试使用
    async insertOneAS_set() {
        let as_set = await As_set.create({
            'as_set_name' : '4',
            'members' : '1',
            'mbrs_by_ref' : '4'
        });
        console.log(JSON.stringify(as_set));
    }
}

async function main() {
    let as_set_lib = new AS_SetLib();
    let sets = await as_set_lib.findAll();

    console.log(sets);
}

main();

module.exports = {
    AS_SetLib
}
