'use strict';

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomPorts() {
    return {
        appiumPort: getRandomInt(2000, 10000),
        webkitDebugProxyPort: getRandomInt(2000, 10000),
        wdaLocalPort: getRandomInt(2000, 10000)
    };
}

module.exports = getRandomPorts;
