'use strict';
/* 
auth: 蒋雪瑶
function: 求交集
 */
function intersection(oneSet, otherSet) {
    const intersectionSet = new Set();
    console.log(oneSet.values(), otherSet.values());
    oneSet.forEach((v, i) => {
        if (otherSet.has(v)) {
            intersectionSet.add(v)
        }
    })
    return intersectionSet
}

module.exports = {
    intersection
}