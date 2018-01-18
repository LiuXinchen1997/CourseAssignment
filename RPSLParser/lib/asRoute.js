'use strict';
/* 
auth: 蒋雪瑶
function: 获得as之间的BGP的连接路径
*/

const Sequelize = require('sequelize');
const IpTable = require('../model/ipTable').IpTable;
const Peers = require('../model/peers').Peers;

const errors = require('../config/errors');
const RouterLib = require('./Router').RouterLib;
async function connectBGP(sendId, recvId, asList) {
    let routerIds = [sendId];
    for (let i = 0; i < asList.length - 1; i++) {
        let peer = await Peers.findOne({
            where: {
                as1: asList[i],
                as2: asList[i + 1]
            }
        });
        if (peer) {
            routerIds.push(peer.get('bgp1'));
            routerIds.push(peer.get('bgp2'));
        } else {
            peer = await Peers.findOne({
                where: {
                    as1: asList[i + 1],
                    as2: asList[i]
                }
            });
            if (peer) {
                routerIds.push(peer.get('bgp2'));
                routerIds.push(peer.get('bgp1'));
            } else {
                throw {
                    message: errors.destinationError
                }
            }
        }
    }
    routerIds.push(recvId);
    let router = [];
    console.log(routerIds);
    for (let i = 0; i < routerIds.length - 1; i++) {
        if (i % 2 == 0) {
            let routeTemp = await RouterLib.whois(routerIds[i], routerIds[i + 1]);
            for (let j = routeTemp.length-1; j >= 0; j--) {
                router.push(routeTemp[j]);
            }
        }
    }
    console.log(router)
    return router;
}

module.exports = {
    connectBGP
}