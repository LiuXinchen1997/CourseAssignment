'use strict';
/* 
auth: 蒋雪瑶
function: 将数据库中的路由信息读取至内存中，方便之后的rip算法
*/
const Sequelize = require('sequelize');
const Router = require('../model/router').Router;
const RouteTable = require('../model/routeTable').RouteTable;

async function getTempTopology(Asid) {
    let routerRaw = await Router.findAll({
        attributes: ['id'],
        where: {
            local_as: Asid
        }
    });
    let routerList = routerRaw.map(router=>{
        return router.id;
    });
    console.log(routerList);
    let routeTables = await RouteTable.findAll({
        where: {
            router: {
                in: routerList
            }
        }
    });
    let routerNum = routerList.length;
    let data = [];
    for (let i = 0; i < routerNum; i++) {
        data[i] = [];
    }
    routeTables.forEach(routeTable=> {
        let router1 = routeTable.get('router');
        let router2 = routeTable.get('destination');
        let distance = routeTable.get('distance');
        let nexthop = routeTable.get('nexthop');
        let index1 = routerList.indexOf(router1);
        let index2 = routerList.indexOf(router2);
        data[index1][index2] = {
            distance: distance,
            nexthop: nexthop
        }
    });
    return {
        routerList: routerList,
        data: data
    };
}

async function rip(Asid) {
    let {routerList, data} = await getTempTopology(Asid);
    let num = routerList.length;
    console.log(data);
    for (let i = 0; i < num; i++) {
        for (let j = 0; j < num; j++) {
            if (i == j) {
                continue;
            }
            if (data[i][j]) {
                for (let k = 0; k < num; k++) {
                    if (data[j][k]) {
                        if (!data[i][k] || data[j][k].distance+data[i][j].distance < data[i][k].distance) {
                            if (!data[i][k]) {
                                data[i][k] = {};
                            }
                            data[i][k].distance = data[j][k].distance+data[i][j].distance;
                            data[i][k].nexthop = data[i][j].nexthop;
                        }
                    }
                }
            }
        }
        console.log(i, data);
    }
    await saveToDB(routerList, data);
}

async function saveToDB(routerList, data) {
    let num = routerList.length;
    for (let i = 0; i < num; i++) {
        for (let j = 0; j < num; j++) {
            if (i == j || !data[i][j]) {
                continue;
            }
            let routeTable = await RouteTable.findOrCreate({
                where: {
                    router: routerList[i],
                    destination: routerList[j]
                }
            });
            routeTable = routeTable[0];
            routeTable.distance = data[i][j].distance;
            routeTable.nexthop = data[i][j].nexthop;
            await routeTable.save();
        }
    }
}

module.exports = {
    rip
}