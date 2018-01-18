'use strict';
/* 
auth: 蒋雪瑶
function: 储存边界路由器
*/

const Aut_num = require('../model/aut_num').Aut_num;
const Peers = require('../model/peers').Peers;
const IpTable = require('../model/ipTable').IpTable;

async function saveBGP(peers, router) {
    await Peers.destroy({
        where: {
            bgp1: router.get('id')
        }
    });
    console.log(peers)
    for (let peer of peers) {
        let peerOptions = peer.split(' ');
        let protocol = peerOptions[0];
        let ip = peerOptions[1];
        let nextId = await IpTable.findOne({
            where: {
                ip: ip
            }
        });
        let asno = peerOptions[2];
        if (protocol != 'BGP4') {
            continue;
        }
        let position = asno.indexOf('(');
        let asNum = asno.substr(position + 1, asno.length - position - 2);
        console.log(asNum);
        let asModel = await Aut_num.findOne({
            where: {
                as_num: asNum
            }
        });
        if (!asModel) {
            throw {
                successful: false,
                error: {
                    wrongKey: 'peer',
                    message: errors.noSuchAs
                }
            }
        }
        await Peers.findOrCreate({
            where: {
                as1: router.get('local_as'),
                as2: asNum,
                bgp1: router.get('id'),
                bgp2: nextId.get('router')
            }
        });
    }
}

module.exports = {
    saveBGP
};