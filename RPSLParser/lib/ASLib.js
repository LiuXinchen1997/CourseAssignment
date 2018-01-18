const errors = require('../config/errors');
const Aut_num = require('../model/aut_num').Aut_num;

class ASLib {
    //查询多个
    async findAll() {
        const allAs = await Aut_num.findAll();
        // console.log(allAs);
        
        return allAs;
    }

    async getNum() {
        const allAs = await Aut_num.findAll();
        let num = allAs.length;
        return num;
    }
    
    //查询一个
    async findOneAS(num) {
        let oneAs = await Aut_num.findOne({
            where: {
                as_num : num 
            }
        });
        console.log(JSON.stringify(oneAs));
        return oneAs;
    }

    //插入一个,仅做测试使用
    async insertOneAS() {
        let as = await Aut_num.create({
            'as_num' : '4',
            'as_name' : '1',
            'mnt_by' : '4',
            'descr' : 'hello world',
            'country' : 'CN',
            'member_of' : '',
        });
        console.log(JSON.stringify(as));
    }
}

/*
async function main() {
    let lib = new ASLib();
    let num = await lib.getNum();

    console.log(num);
}

main();
*/

module.exports = {
    ASLib
}
