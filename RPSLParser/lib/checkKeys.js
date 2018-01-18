'use strict';
/* 
auth: 蒋雪瑶
function: 检查各类字段有效性
*/

const trimAll = require('./trim').trimAll;
const Aut_num = require('../model/aut_num').Aut_num;
const DNS = require('../model/dns').DNS;
const errors = require('../config/errors');

/* 
    检查as有效性
*/
async function checkLocation(as_location) {
    const ad = await Aut_num.findOne({
        where: {
            as_num: as_location
        }
    });
    if (!ad) {
        return false;
    } else {
        return true;
    }
}


/* 
    检查DNS有效性
*/
async function checkDNS(dnsName) {
    const dns = await DNS.findOne({
        where: {
            name: dnsName
        }
    });
    if (dns) {
        return true;
    } else {
        return false;
    }
}

/* 
检查ifaddr语法
*/
function checkIfaddr(ifaddr) {
    if (!ifaddr instanceof Array) {
        ifaddr = [ifaddr];
    }
    try {
        let result = {
            successful: true
        };
        ifaddr.forEach(addr => {
            addr = trimAll(addr);
            const position = addr.indexOf('masklen');
            const ip = addr.substr(0, position);
            let masklen = addr.substr(position + 7, addr.length - position - 7);
            masklen = parseInt(masklen);
            if (!masklen instanceof Number || masklen < 0 || masklen > 32) {
                throw {
                    successful: false,
                    error: {
                        wrongKey: 'ifaddr',
                        message: errors.masklenError
                    }
                }
            }

            const numStr = ip.split(',');
            try {
                numStr.forEach(num => {
                    num = parseInt(num);
                    if (!num instanceof Number || num < 0 || num > 255) {
                        result = {
                            successful: false,
                            error: {
                                wrongKey: 'ifaddr',
                                message: errors.ipError
                            }
                        }
                    }
                });
            } catch (e) {
                throw e;
            }
        });
        return result;
    } catch (e) {
        return e;
    }
}

module.exports = {
    checkLocation,
    checkDNS,
    checkIfaddr
}