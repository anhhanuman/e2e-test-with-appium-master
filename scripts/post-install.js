const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const {execSync} = require('child_process');
const {log, LogLevel} = require(path.join(process.cwd(), 'config/helper'));

async function postInstall() {
    try {
        log(LogLevel.Log, 'POST INSTALL ACTIONS');

        const webDriverAgentProjectPath = path.join(
            process.cwd(),
            'node_modules/appium/node_modules/appium-webdriveragent'
        );

        log(LogLevel.Log, `Copying ${chalk.yellow('Fastlane')} configurations files for Appium\'s WebDriverAgent`);
        if (!fs.existsSync(path.join(webDriverAgentProjectPath, 'Fastlane'))) {
            fs.mkdirSync(path.join(webDriverAgentProjectPath, 'Fastlane'));
        }

        fs.copyFileSync(
            path.join(process.cwd(), 'scripts/hook-files/Appfile'),
            path.join(webDriverAgentProjectPath, 'Fastlane/Appfile')
        );
        fs.copyFileSync(
            path.join(process.cwd(), 'scripts/hook-files/Fastfile'),
            path.join(webDriverAgentProjectPath, 'Fastlane/Fastfile')
        );

        log(LogLevel.Log, `Running ${chalk.yellow('bootstrap.sh')} on Appium\'s WebDriverAgent`);
        execSync(`cd ${webDriverAgentProjectPath} && sh ./Scripts/bootstrap.sh`, {stdio: 'inherit'});

        log(LogLevel.Log, `Updating ${chalk.yellow('PRODUCT_BUNDLE_IDENTIFIER')} on Appium\'s WebDriverAgent`);
        execSync(
            `sed -i -e 's/com\\.facebook/ch\\.mobiliar/g' ${path.join(
                webDriverAgentProjectPath,
                'WebDriverAgent.xcodeproj/project.pbxproj'
            )}`,
            {stdio: 'inherit'}
        );

        log(LogLevel.Log, `Running ${chalk.yellow('Fastlane')} for`);
        log(LogLevel.Log, `    - Update App Identifier`);
        log(LogLevel.Log, `    - Enable Automatic signing`);
        log(LogLevel.Log, `    - Build XCode project for WebDriverAgentRunner`);
        log(LogLevel.Log, `    - Build XCode project for IntegrationApp`);
        execSync(`cd ${webDriverAgentProjectPath} && fastlane UPDATE_PROJECT`, {
            stdio: 'inherit'
        });

        log(LogLevel.Log, "POST INSTALL COMPLETED! NOW YOU'RE READY TO GO!");
        await execSync(`cd ${process.cwd()}`);
    } catch (e) {
        console.log(e);
    }
}

postInstall();
