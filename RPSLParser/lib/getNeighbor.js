'use strict';
/* 
auth: 蒋雪瑶
function: 获取每个路由的邻居
*/

const Sequelize = require('sequelize');
const RouteTable = require('../model/routeTable').RouteTable;
const Peers = require('../model/peers').Peers;

async function getNeighbor(routerId) {
    let neighborsRaw = await RouteTable.findAll({
        attributes: ['destination'],
        where: {
            router: routerId,
            distance: 1
        }
    });
    let neighbors = [];
    if (neighborsRaw) {
        neighbors = neighborsRaw.map(item=>{
            return item.get('destination');
        });
    }
    let peers = await Peers.findAll({
        attributes: ['bgp2'],
        where: {
            bgp1: routerId
        }
    });
    if (peers) {
        peers.forEach(peer=> {
            neighbors.push(peer.get('bgp2'));
        })
    }
    peers = await Peers.findAll({
        attributes: ['bgp1'],
        where: {
            bgp2: routerId
        }
    });
    if (peers) {
        peers.forEach(peer=> {
            neighbors.push(peer.get('bgp1'));
        })
    }
    return neighbors;
}

module.exports = {
    getNeighbor
}