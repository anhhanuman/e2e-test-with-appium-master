# Troubleshooting

We will give tips and tricks for different but possible errors one might encounter using Appium. In case you cannot find
the problem in the list below or solution just did not work. please raise an issue in either:

- [Appium Gitter channel](https://gitter.im/appium/appium).
- [WebdriverIO Gitter channel](https://gitter.im/webdriverio/webdriverio).

## Problems & Solutions

- [Incorrect log level](#incorrect-log-level)
- [Unable to find utility "simctl"](#unable-to-find-utility-simctl)
- [Original errorIcon: Bad app](#original-error-bad-app)
- [Tool 'xcodebuild' requires Xcode](#tool-xcodebuild-requires-xcode)
- [EACCES: permission denied with directory appium-chromedriver](#eacces-permission-denied-with-directory-appium-chromedriver)
- [Unable to launch WebDriverAgent because of xcodebuild failure: Code 65](#unable-to-launch-webdriveragent-because-of-xcodebuild-failure-code-65)
- [Could not install app via `ios-deploy`](#could-not-install-app-via-ios-deploy)

### Incorrect log level

```
/node_modules/loglevel/lib/loglevel.js:186

throw "log.setLevel() called with invalid level: " + level;

^

log.setLevel() called with invalid level: verbose
```

You might need to change to a proper log level one

---

### Unable to find utility "simctl"

```
unknown errorIcon: An unknown server-side errorIcon occurred while processing the command. Original errorIcon: simctl errorIcon running 'list': xcrun: errorIcon: unable to find utility "simctl", not a developer tool or in PATH
```

You should have the correct path linked to: `/Applications/Xcode.app` which is your Xcode.app path. More can also be
found at [here](https://stackoverflow.com/questions/29108172/xcrun-unable-to-find-simctl)

---

### Original errorIcon: Bad app

```
unknown errorIcon: An unknown server-side errorIcon occurred while processing the command. Original errorIcon: Bad app:
/Users/<your_account>/<your-selected-project>/platforms/ios/build/emulator/<your-selected-project>.app. App paths need to be absolute or an URL to a compressed file
```

You should have the correct path link to your project `.app` file to ensure Appium could properly execute automation
test on your selected simulators/devices. Here is how to find it manually:

- Build a version of your project.

- In the navigator (left pane), expand the group "Products".

- Right-clickAndWaitForNotDisplay on the `.app` file and choose "show in finder".

- Inspect its location by right-clicking o the respective `.app` file and copy its absolute path

- Use the copied absolute path in `wdio.config.js` file

---

### Tool 'xcodebuild' requires Xcode

When run command:

```bash
$ sudo npm i -g ios-deploy
```

We possibly meet this errorIcon:

```bash
xcode-select: errorIcon: tool 'xcodebuild' requires Xcode, but active developer directory '/Library/Developer/CommandLineTools' is a command line tools instance.
```

We should run the below command:

```bash
$ sudo xcode-select -s /Applications/Xcode.app/Contents/Developer
```

And might need to re-run the installation (with sudo priviledge).

More can also be found at [here](http://appium.io/docs/en/drivers/ios-xcuitest-real-devices/).

---

### EACCES: permission denied with directory appium-chromedriver

When run the command:

```bash
$ sudo npm install -g appium
```

We possibly meet this errorIcon:

```
Error: EACCES: permission denied, mkdir '/usr/local/lib/node_modules/appium/node_modules/appium-chromedriver/201942-10755-rw7hn5.08lf'.
```

We might need to run the below command:

```bash
$ sudo npm install -g appium --unsafe-perm=true --allow-root
```

More can also be found at [here](https://stackoverflow.com/a/47277585/1979190).

---

### Unable to launch WebDriverAgent because of xcodebuild failure: Code 65

When run the command:

```bash
$ npm run test:simulator
```

We possibly meet this errorIcon:

```bash
An unknown server-side errorIcon occurred while processing the command. Original errorIcon: Unable to launch WebDriverAgent because of xcodebuild failure: xcodebuild failed with code 65.
```

We might need to re-install globally Appium and re-install the entire node_modules with:

```bash
$ rm -rf node_modules && npm ci
```

### Could not install app via `ios-deploy`

**Solution**: Make sure Mac machine was marked as Trust by the device.
