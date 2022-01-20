import {DeviceType} from './constants';

export class Contexts {
    /**
     * Return type of device that currently running the test
     */

    static switchToWebview(): void {
        if (browser.getContext() === 'NATIVE_APP') {
            browser.switchContext(Contexts.WebView);
        } else return;
    }

    static switchToNative() {
        browser.switchContext('NATIVE_APP');
        return this;
    }

    static get deviceType(): string {
        return browser.capabilities['deviceType'];
    }

    private static contexts(): Array<string> {
        return browser.getContexts();
    }

    /**
     * @description Return value string of Native App context
     */
    static get NativeApp(): string {
        return 'NATIVE_APP';
    }

    /**
     * @description Return value string of Webview context
     */
    static get WebView(): string {
        return Contexts.contexts()[1];
    }

    /**
     * @description Define tasks should be done in Webview context before switching to Native App context
     * @param callback {function} callback task need to be done in Webview context
     */
    static doTasksInWebviewContext(callback?: () => void): void {
        browser.switchContext(Contexts.WebView);

        try {
            callback();
        } catch (e) {
            throw e;
        } finally {
            browser.switchContext(Contexts.NativeApp);
            browser.pause(3000);
        }
    }

    /**
     * @description Define tasks should be done in Native App context before switching to Webview context
     * @param callback {function} callback task(s) need to be done in Native App context
     */
    static doTasksInNativeContext(callback?: () => void) {
        browser.switchContext('NATIVE_APP');
        try {
            callback();
        } catch (e) {
            throw e;
        } finally {
            browser.switchContext(Contexts.WebView);
        }
        return this;
    }

    static acceptPermission() {
        try {
            Contexts.doTasksInNativeContext(() => {
                browser.acceptAlert();
            });
        } catch (e) {
        }

        return this;
    }

    static dismissPermission(): void {
        try {
            if (browser.getContext() === Contexts.NativeApp) {
                browser.dismissAlert();
            } else {
                Contexts.doTasksInNativeContext(() => {
                    browser.dismissAlert();
                });
            }
        } catch (e) {
            // Do nothing if Alert is not available/visible
        }
    }

    /**
     * @description Return `true` if the selected device is iPad
     */
    static isIPad(): boolean {
        return Contexts.deviceType === DeviceType.iPad;
    }

    /**
     * @description Return `true` if the selected device is iPhone
     */
    static isIPhone(): boolean {
        return Contexts.deviceType === DeviceType.iPhone;
    }
}
