'use strict';
/* 
auth: 蒋雪瑶
function:检查rtr-set语法
*/
async function checkRtrSet(options) {
    let result = {
        successful: true
    }
    const keys = Object.keys(options);
    if ('rtr-set' in keys) {
        const value = options['rtr-set'];
        if (value.indexOf('rtrs-') != 0) {
            result = {
                successful: false,
                error: {
                    wrongKey: 'rtr-set',
                    message: errors.misRtrSet
                }
            };
            return result;
        }
    } else {
        if ('members' in keys) {
            result = {
                successful: false,
                error: {
                    wrongKey: 'members',
                    message: errors.extraKeys
                }
            };
            return result;
        }
    }
    return result;
}

module.exports = {
    checkRtrSet
}