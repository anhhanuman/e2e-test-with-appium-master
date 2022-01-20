const chalk = require('chalk');

const LogLevel = {
    Info: 0,
    Log: 1,
    Debug: 2,
    Warn: 3,
    Error: 4
};

function log(logLevel, message) {
    switch (logLevel) {
        case LogLevel.Info:
            console.log(`${chalk.cyan('info')} ${message}`);
            break;
        case LogLevel.Debug:
            console.log(`${chalk.yellow('debug')} ${message}`);
            break;
        case LogLevel.Log:
            console.log(`${chalk.green('info')} ${message}`);
            break;
        case LogLevel.Error:
            console.log(`${chalk.black.bgRed('error')} ${message}`);
            break;
        case LogLevel.Warn:
            console.log(`${chalk.black.bgYellow('warn')} ${message}`);
            break;
    }
}

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

module.exports = {
    LogLevel,
    log,
    asyncForEach
};
