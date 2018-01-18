'use strict';
/* 
auth: 蒋雪瑶
function: 检查peers字段
*/
const Aut_num = require('../model/aut_num').Aut_num;

async function checkPeers(options) {
    let result = {
        successful: true
    }
    const keys = Object.keys(options);
    if (('peering-set' in keys) ^ ('peering' in keys)) {
        let wrongKey = 'peering-set'
        if ('peering' in keys) {
            wrongKey = 'peering';
        }
        result = {
            successful: false,
            wrongKey: wrongKey,
            error: errors.extraKeys
        };
        return result;
    }

    if ('peering-set' in keys) {
        const value = options['peering-set'];
        if (value.indexOf('prng-') != 0) {
            result = {
                successful: false,
                error: {
                    wrongKey: wrongKey,
                    message: errors.misPeerSet
                }
            };
            return result;
        }

        const peeringValue = options['peering'];
        const expressions = peeringValue.split(' ');
        const expressionsFilter = [];
        expressions.forEach(express => {
            if (!express) {
                expressionsFilter.push(express);
            }
        });

        if (expressionsFilter.length == 1) {
            let asFind = await Aut_num.findOne({
                where: {
                    as_num: expressionsFilter[0]
                }
            });
            let peerSet = await PeeringSet.findOne({
                where: {
                    peering_set: expressionsFilter[0]
                }
            });
            if (!asFind && !peerSet) {
                result = {
                    successful: false,
                    error: {
                        wrongKey: 'peering',
                        message: errors.misAsOrPeer
                    }
                };
                return result;
            }
        }

        console.log(result);
        if (expressionsFilter.length > 1) {
            const ass = expressionsFilter[0].toLowerCase();
            if (ass.indexOf('as') != 0) {
                result = {
                    successful: false,
                    error: {
                        wrongKey: 'peering',
                        message: errors.misAs
                    }
                };
                return result;
            }
            let asFind = await Aut_num.findOne({
                where: {
                    as_num: ass
                }
            });
            if (!asFind) {
                result = {
                    successful: false,
                    error: {
                        wrongKey: 'peering',
                        message: errors.noSuchAs
                    }
                };
                return result;
            }

            if (expressionsFilter.length > 1) {
                expressionsFilter[1] = expressionsFilter[1].replace(/\s+/g, "");
                if (expressionsFilter[1].indexOf('at') != 0 && expressionsFilter[1].indexOf('at') != -1) {
                    result = {
                        successful: false,
                        error: {
                            wrongKey: 'peering',
                            message: errors.routerError
                        }
                    }
                    return result;
                }
                if (expressionsFilter[1].indexOf('at') == 0) {
                    expressionsFilter[1].substr(2, expressionsFilter[1].length - 2);
                }
                const ip = expressionsFilter[1];
                const numStr = ip.split(',');
                try {
                    numStr.forEach(num => {
                        num = parseInt(num);
                        if (!num instanceof Number || num < 0 || num > 255) {
                            throw {
                                successful: false,
                                error: {
                                    wrongKey: 'peering',
                                    message: errors.ipError
                                }
                            };
                        }
                    });
                } catch (e) {
                    return e;
                }
            }
        }
    }
    return result;
}

module.exports = {
    checkPeers
}