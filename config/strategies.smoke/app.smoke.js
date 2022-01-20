'use strict';

const shell = require('shelljs');
const fs = require('fs');
const path = require('path');
const {findLast, forEach, map, toLower} = require('lodash');
const {exec, spawn} = require('child_process');
const {log, LogLevel, asyncForEach} = require(path.resolve(__dirname, 'helper.smoke.js'));
const devicePropertiesFile = path.resolve('./config/', 'properties/devices.properties.json');
const devicesProperties = require(devicePropertiesFile);

const projectId = process.argv[2];
if (!projectId) {
    log(LogLevel.Error, 'Please specify Project ID before continue...');
    shell.exit(1);
}

const smokeTestForReleaseStrategies = require(path.resolve(__dirname, `ch.mobiliar.${projectId}`));

function execute(command) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            console.log(stderr);

            if (error) {
                reject(error);
            }
            resolve(stdout);
        });
    }).catch((err) => error(err));
}

log(LogLevel.Info, `Welcome buddy! We are from Hanuman team, Die Mobiliar. Let's start automation test progress`);
log(LogLevel.Log, 'Verifying device list ...');

if (!fs.existsSync(devicePropertiesFile)) {
    log(LogLevel.Error, 'Sorry, the device list is not existing! Please make sure you have added your device list');
    shell.exit(1);
}

log(LogLevel.Log, 'Devices list existing');
if (!devicesProperties || devicesProperties.length === 0) {
    log(LogLevel.Error, 'Sorry, the device list is empty! Please connect your already defined devices');
    shell.exit(1);
}

log(LogLevel.Log, `Total devices on list: ${devicesProperties.length}`);
log(LogLevel.Log, 'Verifying attached devices...');

if (!shell.which('ideviceinstaller')) {
    log(LogLevel.Error, '\nSorry, missing required libraries: ideviceinstaller');
    shell.exit(1);
}

if (!shell.which('ios_webkit_debug_proxy')) {
    log(LogLevel.Error, '\nSorry, missing required libraries: ios_webkit_debug_proxy');
    shell.exit(1);
}

execute('idevice_id -l').then(async (attachedUdids) => {
    attachedUdids = attachedUdids.split('\n');
    attachedUdids.pop();

    const attachedDevices = [];
    attachedUdids.forEach((udid) => {
        const device = findLast(devicesProperties, (property) => property.udid === udid);
        if (device) {
            attachedDevices.push(device);
        }
    });

    log(LogLevel.Log, `Attached devices found: ${attachedUdids.length}`);

    asyncForEach(smokeTestForReleaseStrategies.strategies, (strategy, strategyIndex) => {
        if (!strategy.enabled) {
            return true;
        }

        const {debug, mode} = strategy;
        log(LogLevel.Log, `Starting Automation Strategy for: ${smokeTestForReleaseStrategies.bundleId}`);
        log(LogLevel.Log, `Running on ${debug ? 'DEBUG' : 'NON-DEBUG'} mode`);
        log(LogLevel.Log, `Automation Script now will be run on below devices/simulators:`);

        let deviceName;
        let suites;
        let suiteParams;
        let params;
        let signingIdentity = {
            xcodeOrgId: smokeTestForReleaseStrategies.xcodeOrgId,
            xcodeSigningId: smokeTestForReleaseStrategies.xcodeSigningId,
            bundleId: smokeTestForReleaseStrategies.bundleId,
            appPath: smokeTestForReleaseStrategies.appPath,
            simulatorAppPath: smokeTestForReleaseStrategies.simulatorAppPath
        };

        let configFilePath;

        switch (mode) {
            case 'SINGLE':
                ({deviceName} = strategy);
                log(LogLevel.Log, `Looking for connectivity of ${deviceName}`);
                let singleDevice = findLast(attachedDevices, (device) => device.deviceName === deviceName);
                if (!singleDevice) {
                    log(LogLevel.Error, 'Cannot identify target Device to run Automation test');
                    log(LogLevel.Error, 'Please check your configurations again!');
                    return;
                }

                log(
                    LogLevel.Log,
                    `Running automation test on ${singleDevice.deviceName} - iOS ${singleDevice.platformVersion} ...`
                );
                configFilePath = `tmp/device-${strategyIndex}.json`;
                params = ['./config/strategies.smoke/wdio.conf.smoke.js', '--deviceInfo', configFilePath];
                singleDevice = {
                    ...singleDevice,
                    ...strategy,
                    ...signingIdentity
                };

                ({suites, suiteParams} = buildSuitesForAttachedDevice(singleDevice.deviceType, strategy));

                if (suiteParams && suiteParams.length > 0) {
                    params.push(...suiteParams);
                    singleDevice['suites'] = suites;
                }

                fs.writeFileSync(path.join(process.cwd(), configFilePath), JSON.stringify(singleDevice, null, 2));
                spawn('wdio', params, {
                    stdio: 'inherit'
                });
                break;
            case 'MULTI':
                attachedDevices.forEach((attachedDevice, index) => {
                    log(
                        LogLevel.Log,
                        `Running automation test on ${attachedDevice.deviceName} - iOS ${attachedDevice.platformVersion} ...`
                    );

                    attachedDevice = {
                        ...strategy,
                        ...attachedDevice,
                        ...signingIdentity
                    };

                    configFilePath = `tmp/device-${strategyIndex}-${index}.json`;

                    params = ['./config/strategies.smoke/wdio.conf.smoke.js', '--deviceInfo', configFilePath];

                    ({suites, suiteParams} = buildSuitesForAttachedDevice(attachedDevice.deviceType, strategy));
                    if (suiteParams && suiteParams.length > 0) {
                        params.push(...suiteParams);
                        attachedDevice['suites'] = suites;
                    }

                    fs.writeFileSync(path.join(process.cwd(), configFilePath), JSON.stringify(attachedDevice, null, 2));

                    spawn('wdio', params, {
                        stdio: 'inherit'
                    });
                });
                break;
            case 'SIMULATOR':
                const {simulatorName, simulatorIOSVersion} = strategy;
                log(LogLevel.Log, `Running automation test on simulator ${simulatorName} - iOS ${simulatorIOSVersion}`);
                configFilePath = 'tmp/simulator.json';
                params = ['./config/strategies.smoke/wdio.conf.smoke.js', '--deviceInfo', configFilePath];
                const simulator = {
                    ...signingIdentity,
                    ...strategy
                };
                ({suites, suiteParams} = buildSuitesForAttachedDevice('SIMULATOR', strategy));
                if (suiteParams && suiteParams.length > 0) {
                    params.push(suiteParams);
                    simulator['suites'] = suites;
                }

                fs.writeFileSync(path.join(process.cwd(), configFilePath), JSON.stringify(simulator, null, 2));
                break;
            default:
                log(LogLevel.Error, 'Cannot run the Automation Test without mode specified!');
                shell.exit(1);

                spawn('wdio', params, {
                    stdio: 'inherit'
                });
                break;
        }
    });
});

function buildSuitesForAttachedDevice(deviceType, strategy) {
    let suites = {};
    let suiteParams = [];
    if (strategy.useSuites) {
        forEach(strategy.suites, (suite, suiteName) => {
            if (!suite.enabled) {
                return true;
            }

            if (suite.deviceType && suite.deviceType !== deviceType) {
                return true;
            }

            suites[suiteName] = map(suite.testCases, (testCase) =>
                path.join(
                    process.cwd(),
                    '/dist/apps/',
                    smokeTestForReleaseStrategies.bundleId,
                    'specs',
                    suite.deviceType ? toLower(suite.deviceType) : 'smoke',
                    testCase
                )
            );
            suiteParams.push('--suite');
            suiteParams.push(suiteName);
        });
    }

    return {
        suites,
        suiteParams
    };
}
