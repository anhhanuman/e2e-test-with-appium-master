'use strict';

const path = require('path');

function getCapability(wdaLocalPort, deviceProperties) {
    let defaultCapability;
    const {
        mode,
        appPath,
        bundleId,
        xcodeOrgId,
        xcodeSigningId,
        simulatorName,
        simulatorUDID,
        simulatorType,
        simulatorIOSVersion,
        simulatorAppPath
    } = deviceProperties;

    const webDriverProperties = {
        wdaLocalPort,
        xcodeOrgId,
        xcodeSigningId,
        bundleId,
        app: appPath
    };

    defaultCapability = require(path.resolve(__dirname, 'properties/capability.properties.json'));

    switch (mode) {
        case 'SINGLE':
        case 'MULTI':
            const {platformName, platformVersion, deviceName, deviceType, udid} = deviceProperties;

            defaultCapability = {
                ...defaultCapability,
                ...webDriverProperties,
                platformName,
                platformVersion,
                deviceName,
                deviceType,
                udid
            };
            break;
        case 'SIMULATOR':
            const simulator = {
                deviceName: simulatorName,
                udid: simulatorUDID,
                deviceType: simulatorType,
                platformVersion: simulatorIOSVersion,
                app: simulatorAppPath
            };

            defaultCapability = {
                ...defaultCapability,
                ...webDriverProperties,
                ...simulator
            };
            break;
    }
    return defaultCapability;
}

module.exports = getCapability;
