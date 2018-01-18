'use strict';
/*
auth: 蒋雪瑶
function: 获得子网号
*/

function getSubWebs(ifaddr) {
    try {
        const subWebs = ifaddr.map(ifaddr => {
            ifaddr = ifaddr.replace(/\s+/g, "");
            let [ipRaw, masklen] = ifaddr.split('masklen');
            ipRaw = ipRaw.split('.');
            let ip = ipRaw.map(num => {
                return parseInt(num);
            });
            masklen = parseInt(masklen);
            let masklenArray = [];
            for (let i = 0; i < Math.floor(masklen / 8); i++) {
                masklenArray.push(255);
            }
            let temp = 0;
            for (let i = 0; i < masklen % 8; i++) {
                console.log(temp);
                temp = (temp << 1) + 1;
            }
            temp = temp << (8 - masklen % 8);
            masklenArray.push(temp);
            for (let i = 0; i < 3 - masklen / 8; i++) {
                masklenArray.push(0);
            }
            console.log(masklenArray);
            let subWeb = [];
            for (let i = 0; i < 4; i++) {
                subWeb.push(masklenArray[i] & ip[i]);
            }
            subWeb = subWeb.join('.');
            console.log(subWeb);
            return subWeb;
        });
        return subWebs;
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    getSubWebs
}