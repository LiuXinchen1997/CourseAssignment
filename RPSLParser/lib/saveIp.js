'use strict';
/* 
auth: 蒋雪瑶
function: 保存ip
*/

const IpTable = require('../model/ipTable').IpTable;
const trimAll = require('../lib/trim').trimAll;

async function saveIp(ifaddrs, routerId) {
    await IpTable.destroy({
        where: {
            router: routerId
        }
    });
    for (let addr of ifaddrs) {
        addr = trimAll(addr);
        const position = addr.indexOf('masklen');
        const ip = addr.substr(0, position);
        await IpTable.findOrCreate({
            where: {
                ip: ip,
                router: routerId
            }
        });
    }
}

module.exports = {
    saveIp
};