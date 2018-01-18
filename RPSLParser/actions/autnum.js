'use strict';

const RouterLib = require('../lib/Router').RouterLib;
const Router = require('../model/router').Router;
const IpTable = require('../model/ipTable').IpTable;
const errors = require('../config/errors');
const connectBGP = require('../lib/asRoute').connectBGP;
const getNeighbor = require('../lib/getNeighbor').getNeighbor;
const ASLib = require('../lib/ASLib').ASLib;

const fs = require('fs');



async function addAS(req, res) {
    try {
        let rpsl = req.body.as;
        await fs.writeFileSync(__dirname+'/../resource/test.rpsl', rpsl);

        let exec = await require('child_process').exec, child;
        child = await exec("java -jar "+ __dirname+"/../resource/rpsl.jar "+ __dirname+"/../resource/test.rpsl",
            function (error, stdout, stderr) {
                if (error) {
                    console.log('sss1');
                    res.json({
                        successful: false,
                        error: error
                    });
                    return;
                }

                if (stderr) {
                    console.log('sss2');
                    res.json({
                        successful: false,
                        error: stderr
                    });
                    return;
                } else {
                    let num = stdout;
                    console.log(num);
                    res.json({
                        successful: true,
                        as_num: num
                    });
                }
        });

        return;
    } catch (e) {
        console.log('sss4');
        res.json({
            successful: false,
            error: e
        });
        return;
    }
}



async function updateAS(req, res) {
    try {
        let rpsl = req.body.as;
        await fs.writeFileSync(__dirname+'/../resource/test.rpsl', rpsl);

        let exec = await require('child_process').exec, child;
        child = await exec("java -jar "+ __dirname+"/../resource/rpsl.jar "+ __dirname+"/../resource/test.rpsl",
            function (error, stdout, stderr) {
                if (error) {
                    console.log('sss1');
                    res.json({
                        successful: false,
                        error: error
                    });
                    return;
                }

                if (stderr) {
                    console.log('sss2');
                    res.json({
                        successful: false,
                        error: stderr
                    });
                    return;
                } else {
                    let num = stdout;
                    console.log(num);
                    res.json({
                        successful: true,
                        as_num: num
                    });
                }
        });

        return;
    } catch (e) {
        console.log('sss4');
        res.json({
            successful: false,
            error: e
        });
        return;
    }
}



async function getAS(req, res) {
    let as_num = req.body.as_num;
    as_num = as_num.replace('\r', ''); // 坑：去除行末的\r\n换行符
    as_num = as_num.replace('\n', '');

    let lib = new ASLib();
    let as = await lib.findOneAS(as_num);

    res.json({
        successful : true,
        AS : {
            as_num : as.as_num,
            as_name : as.as_name,
            mnt_by : as.mnt_by,
            descr : as.descr,
            country : as.country,
            member_of : as.member_of
        }
    });

    return;
}


async function getAllAS(req, res) {
    let lib = new ASLib();
    let ases = await lib.findAll();

    let as_nums = new Array();
    for (let as of ases) {
        as_nums.push(as.as_num);
    }

    res.json({
        successful: true,
        as_num: as_nums
    });

    return;
}



module.exports = {
    addAS,
    updateAS,
    getAS,
    getAllAS
}