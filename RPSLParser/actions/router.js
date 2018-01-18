'use strict';
/* 
auth: 蒋雪瑶
function: router接口函数定义
*/
const RouterLib = require('../lib/Router').RouterLib;
const Router = require('../model/router').Router;
const IpTable = require('../model/ipTable').IpTable;
const errors = require('../config/errors');
const connectBGP = require('../lib/asRoute').connectBGP;
const getNeighbor = require('../lib/getNeighbor').getNeighbor;

async function newRouter(req, res) {
    try {
        const router = new RouterLib(req.body.router);
        const routerId = await router.create();
        let routerModel = await Router.findOne({
            where: {
                id: routerId
            }
        });

        let neighbors = await getNeighbor(routerId);
        res.json({
            successful: true,
            routerId: routerId,
            localAs: routerModel.get('local_as'),
            neighbors: neighbors
        });
        return;
    } catch (e) {
        res.json({
            successful: false,
            error: e
        });
        return;
    }
}

async function updateRouter(req, res) {
    try {
        let routerText = 'id: ' + req.body.routerId + '\n' + req.body.router;
        const router = new RouterLib(routerText);
        const routerId = await router.update();
        let routerModel = await Router.findOne({
            where: {
                id: routerId
            }
        });

        let neighbors = await getNeighbor(routerId);
        res.json({
            successful: true,
            routerId: routerId,
            localAs: routerModel.get('local_as'),
            neighbors: neighbors
        });
        return;
    } catch (e) {
        res.json({
            successful: false,
            error: e
        });
        return;
    }
}

async function whois(req, res) {
    try {
        let destination = await IpTable.findOne({
            where: {
                ip: req.body.destination
            }
        });
        if (!destination) {
            res.json({
                successful: false,
                error: {
                    message: errors.destinationError
                }
            });
        }
        let route = await connectBGP(req.body.routerId, destination.get('router'), ['AS0', 'AS2', 'AS3']);
        res.json({
            successful: true,
            route: route
        });
        return;
    } catch (e) {
        console.log(e);
        res.json({
            successful: false,
            error: e
        });
        return;
    }
}

async function getRouter(req, res) {
    let router = await RouterLib.fromModel(req.body.routerId);
    router = router.options;
    delete router.subWebs;
    res.json({
        successful: true,
        router: router
    });
}

async function test(req, res) {
    let neighbors = await getNeighbor(req.body.id);
    res.json({
        neighbors: neighbors
    })
}

module.exports = {
    newRouter,
    updateRouter,
    whois,
    getRouter,
    test
}