import chalk from 'chalk';

export enum LogLevel {
    Info,
    Log,
    Debug,
    Warn,
    Error
}

export function log(logLevel, message) {
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
            console.log(`${chalk.black.bgRed('errorIcon')} ${message}`);
            break;
        case LogLevel.Warn:
            console.log(`${chalk.black.bgYellow('warn')} ${message}`);
            break;
    }
}
