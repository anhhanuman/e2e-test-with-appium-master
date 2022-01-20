('use strict');

const path = require('path');
const {pick, toLower} = require('lodash');
const chalk = require('chalk');
const {log, LogLevel} = require(path.resolve('./config/', 'helper.js'));
const deviceProperties = require(path.join(process.cwd(), process.argv[4]));

const isDebugging = deviceProperties.debug;
const HOST = '127.0.0.1';

// Generate random ports for Appium, WebDriverAgent & WebkitDebugProxy
// since we need to run test in parallel
const {appiumPort, wdaLocalPort} = require('../random-ports')();
const capability = require('../capability.conf')(wdaLocalPort, deviceProperties);
const waitForTimeoutAmount = isDebugging ? 600000 : 5 * 900000;
/* ms */
const defaultTimeoutIntervalAmount = isDebugging ? 30 * 60000 : 5 * 90000;
/* ms */
const commandTimeoutAmount = 30 * 600000;
/* ms */

exports.config = {
    runner: 'local',
    host: HOST,
    port: appiumPort,
    specs: [
        path.resolve(__dirname, `../dist/apps/${deviceProperties.bundleId}/specs/common/**/*.spec.js`),
        path.resolve(
            __dirname,
            `../dist/apps/${deviceProperties.bundleId}/specs/${toLower(deviceProperties.deviceType)}/**/*.spec.js`
        )
    ],
    suites: deviceProperties.suites,
    maxInstances: 1,
    capabilities: [capability],
    logLevels: {
        webdriver: 'debug',
        webdriverio: 'debug'
    },
    outputDir: path.join(process.cwd(), 'logs', deviceProperties.bundleId, deviceProperties.deviceName),
    coloredLogs: true,
    bail: 0,
    waitforTimeout: waitForTimeoutAmount,
    deprecationWarnings: true,
    services: ['appium'],
    appium: {
        waitStartTime: 6000,
        waitforTimeout: waitForTimeoutAmount,
        command: 'appium',
        args: {
            address: HOST,
            port: appiumPort,
            commandTimeout: commandTimeoutAmount,
            sessionOverride: true,
            debugLogSpacing: true,
            platformName: 'iOS',
            relaxedSecurity: true
        },
        logLevel: 'debug'
    },
    framework: 'jasmine',
    reporters: [
        'dot',
        'spec',
        [
            'allure',
            {
                outputDir: './reports/master/allure-results-master',
                disableWebdriverStepsReporting: true,
                disableWebdriverScreenshotsReporting: false
            }
        ]
    ],
    jasmineNodeOpts: {
        defaultTimeoutInterval: defaultTimeoutIntervalAmount,
        expectationResultHandler: (passed, assertion) => {
            // only take screenshot if assertion failed
            if (passed) {
            } else {
                log(LogLevel.Log, `${chalk.bgRed.black('FAILED')}`);

                let context = browser.getContexts();
                browser.setImplicitTimeout(5000);
                browser.switchContext(context[0]);
                browser.pause(5000);
                browser.takeScreenshot();
                browser.pause(5000);
                browser.switchContext(context[1]);
            }
        }
    },

    onPrepare: (config, capabilities) => {
        log(LogLevel.Log, '<<< NATIVE APP TESTS STARTED >>>');
        log(LogLevel.Log, `Appium Port: ${appiumPort}`);
        log(
            LogLevel.Log,
            JSON.stringify(
                pick(capabilities[0], [
                    'deviceName',
                    'deviceType',
                    'udid',
                    'wdaLocalPort',
                    'webkitDebugProxyPort',
                    'appiumPort'
                ]),
                null,
                2
            )
        );
    },
    before: (capabilities, specs) => {
        require('ts-node').register({files: true, require: ['tsconfig-paths/register']});
    },
    beforeTest: (test) => {
        log(LogLevel.Log, `${chalk.green('running')} ${test.title}`);
    },
    afterTest: (test) => {
    }
};
