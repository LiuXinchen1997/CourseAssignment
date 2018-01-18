'use strict';
/* 
auth: 蒋雪瑶
function: 连接两个路由器
*/
const RouteTable = require('../model/routeTable').RouteTable;

async function connectRouter(router1, router2) {
    let routeTable = await RouteTable.findOrCreate({
        where: {
            router: router1,
            destination: router2
        }
    });
    console.log('routeTable', routeTable);
    routeTable = routeTable[0];
    routeTable.nexthop = router2;
    routeTable.distance = 1;
    await routeTable.save();
}

module.exports = {
    connectRouter
};