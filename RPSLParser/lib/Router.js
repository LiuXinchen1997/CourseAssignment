'use strict';

/* 
auth: 蒋雪瑶
function: Router类
*/

const errors = require('../config/errors');

const Sequelize = require('Sequelize');
const Router = require('../model/router').Router;
const RouteTable = require('../model/routeTable').RouteTable;
const Aut_num = require('../model/aut_num').Aut_num;

const intersection = require('./intersection').intersection;
const connectRouter = require('./connectRouter').connectRouter;
const ripLib = require('./getTempTopology').rip;
const getSubWebsLib = require('./getSubWebs').getSubWebs;
const checkRtrSet = require('./checkRtrSet').checkRtrSet;
const checkPeers = require('./checkPeers').checkPeers;
const {checkLocation, checkDNS, checkIfaddr} = require('./checkKeys');
const {ltrim, rtrim, trim} = require('./trim');
const saveIp = require('./saveIp').saveIp;
const saveBGP = require('./savePeer').saveBGP;

const mandatoryKeys = ['inet-rtr', 'local-as', 'ifaddr'];
const optionKeys = ['alias', 'peer', 'member-of', 'rtr-set', 'members', 'peering-set', 'peering', 'id'];
const singleKeys = ['inet-rtr', 'local-as'];

class RouterLib {
    constructor(options) {
        if (options) {
            this.options = this.getAttributions(options);
        }
    }

    /* 
    将传入的字符串转化为router的格式化形式
    */
    getAttributions(options) {
        const attributionStrArray = options.split('\n');
        let attributions = {};
        attributionStrArray.forEach(attributionStr => {
            const option = attributionStr.split(':');
            const key = trim(option[0]);
            const value = trim(option[1]);
            if (!attributions[key]) {
                attributions[key] = value;
            } else {
                if (!(attributions[key] instanceof Array)) {
                    attributions[key] = [attributions[key]];
                }
                attributions[key].push(value);
            }
        });

        console.log(attributions);
        return attributions;
    }

    /* 
    语法检查统一入口
    */
    async check() {
        try {
            let result = await this.checkKeys();
            if (!result.successful) {
                return result;
            }
            result = await checkRtrSet(this.options);
            if (!result.successful) {
                return result;
            }

            result = await checkPeers(this.options);
            if (!result.successful) {
                return result;
            }
            return {
                successful: true
            }
        } catch (e) {
            console.log(e);
        }
    }

    /* 
    检查字段
    */
    async checkKeys() {
        const options = this.options;
        try {
            mandatoryKeys.forEach(key => {
                if (!options[key]) {
                    throw {
                        successful: false,
                        error: {
                            wrongKey: key,
                            message: errors.lackMandatory
                        }
                    };
                }
            });
        } catch (e) {
            return e;
        }

        try {
            Object.keys(options).forEach(key => {
                if (mandatoryKeys.indexOf(key) == -1 && optionKeys.indexOf(key) == -1) {
                    throw {
                        successful: false,
                        error: {
                            wrongKey: key,
                            message: errors.extraKeys
                        }
                    };
                }
            });
        } catch (e) {
            return e;
        }

        try {
            Object.keys(singleKeys).forEach(key => {
                if (options[key] instanceof Array && options[key].length > 1) {
                    throw {
                        successful: false,
                        error: {
                            wrongKey: key,
                            message: errors.extraValue
                        }
                    }
                }
            });
        } catch (e) {
            return e;
        }

        Object.keys(options).forEach(key => {
            console.log(key, key in singleKeys);
            if (options[key] && (singleKeys.indexOf(key) == -1)) {
                if (!(options[key] instanceof Array)) {
                    options[key] = [options[key]];
                }
            }
        });
        this.options = options;

        let checkDnsResult = await checkDNS(options['inet-rtr']);
        if (!checkDnsResult) {
            return {
                successful: false,
                error: {
                    wrongKey: 'inet-rtr',
                    message: errors.noSuchDNS
                }
            };
        }

        checkDnsResult = await checkDNS(options['alias']);
        if (options['alias'] && !checkDnsResult) {
            return {
                successful: false,
                error: {
                    wrongKey: 'alias',
                    message: errors.noSuchDNS
                }
            };
        }

        const checkLocationResult = await checkLocation(options['local-as']);
        if (!checkLocationResult) {
            return {
                successful: false,
                error: {
                    wrongKey: 'local-as',
                    message: errors.noSuchAs
                }
            };
        }

        const checkIfaddrResult = checkIfaddr(options['ifaddr']);
        if (!checkIfaddrResult.successful) {
            return checkIfaddrResult;
        }
        return {
            successful: true
        }
    };

    
    /* 
        将当前对象转成数据库对象模式
    */
    optionsToModel() {
        const optionsModel = {};
        Object.keys(this.options).forEach(key => {
            const modelKey = key.replace(/-/, '_');
            if (this.options[key] instanceof Array) {
                optionsModel[modelKey] = this.options[key].join(';');
            } else {
                optionsModel[modelKey] = this.options[key];
            }
        });
        console.log(optionsModel);
        return optionsModel;
    }

    async create() {
        const result = await this.check();
        console.log('create', result);
        if (result.successful) {
            try {
                const optionsModel = this.optionsToModel();
                const router = Router.build(optionsModel);
                await router.save();
                this.router = router;
                await saveIp(this.options.ifaddr, this.router.id);
                await this.getSubWebs();
                await this.getTopology();
                await this.rip();
                if (this.options.peer) {
                    await saveBGP(this.options.peer, this.router);
                }
                return router.get('id');
            } catch (e) {
                console.log(e);
                throw e;
            }

        } else {
            throw result.error;
        }

    }

    /* 
        更新当前mntner
    */
    async update() {
        console.log(this.options);
        const result = await this.check();
        console.log('update', result);
        if (result.successful) {
            try {
                const optionsModel = this.optionsToModel();
                await Router.update(optionsModel, {
                    where: {
                        id: this.options.id
                    }
                });
                const router = await Router.findOne({
                    where: {
                        id: this.options.id
                    }
                });
                this.router = router;
                await saveIp(this.options.ifaddr, this.router.id);
                await this.getSubWebs();
                await this.getTopology();
                await this.rip();
                if (this.options.peer) {
                    await saveBGP(this.options.peer, this.router);
                }
                return router.get('id');
            } catch (e) {
                console.log(e);
                throw e;
            }

        } else {
            throw result.error;
        }
    }

    /* 
        找到一个mntner
    */
    static async findOne(params) {
        const router = await Router.findOne({
            where: params
        });
        return router;
    }

    /* 
    构建子网络
    */
    async getSubWebs() {
        const subWebs = getSubWebsLib(this.options.ifaddr);
        this.options.subWebs = subWebs;
        this.router.subWebs = subWebs.join(';');
        await this.router.save();
    }

    /* 
    构建拓扑结构
    */
    async getTopology() {
        console.log('get topology');
        const routersInAs = await Router.findAll({
            where: {
                local_as: this.options['local-as']
            }
        });
        for (let router of routersInAs) {
            let routerId1 = router.get('id');
            let routerId2 = this.router.get('id');
            if (routerId1 == routerId2) {
                continue;
            }
            if (!router.get('subWebs') || router.get('subWebs')=='') {
                continue;
            }
            const AnothersubWebs = new Set(router.get('subWebs').split(';'));
            const subWebs = new Set(this.options.subWebs);
            const intersectionSubWeb = intersection(AnothersubWebs, subWebs);
            console.log(AnothersubWebs);
            console.log(subWebs);
            console.log(intersectionSubWeb);
            if (intersectionSubWeb.size != 0) {
                await connectRouter(routerId1, routerId2);
                await connectRouter(routerId2, routerId1);
            } else {
                await RouteTable.destroy({
                    where: Sequelize.or(
                        {
                            router: routerId1,
                            nexthop: routerId2
                        },
                        {
                            router: routerId2,
                            nexthop: routerId1
                        }
                    )
                });
            }
        };
    }

    async rip() {
        console.log('get rip');
        let AutNum = this.options['local-as'];
        ripLib(AutNum);
    }

    /* 
    whois查询
    */
    static async whois(id, destination) { 
        console.log(id, destination);
        if (id == destination) {
            return [id];
        }       
        let routeTable = await RouteTable.findOne({
            where: {
                router: id,
                destination: destination
            }
        });
        let route = null;
        if (routeTable) {
            route = await RouterLib.whois(routeTable.get('nexthop'), destination);
            route.push(id);
        } else {
            route.push(routeTable.get('default'));
        }
        return route;
    }

    static async fromModel(id) {
        let routerModel = await Router.findOne({
            where: {
                id: id
            }
        });
        let router = new RouterLib();
        router.router = routerModel;
        const options = {};
        routerModel = routerModel.dataValues;
        Object.keys(routerModel).forEach(modelKey => {
            const key = modelKey.replace(/_/, '-');
            if (key in singleKeys || key == 'id') {
                options[key] = routerModel[modelKey];
            } else {
                if (routerModel[modelKey]) {
                    options[key] = routerModel[modelKey].split(';');
                }
            }
        });
        console.log(options);
        router.options = options;
        return router;
    }
}

module.exports = {
    RouterLib
}