import {toUpper} from 'lodash';
import {Contexts} from './contexts';
import {Screen} from './screen';

export class Keyboard {
    private static readonly selectors = {
        doneKeyboardButton: '~Done'
    };

    private static get doneKeyboardButton() {
        return browser.$(this.selectors.doneKeyboardButton);
    }

    static isNativeKeyboardButtonsShown(): boolean {
        browser.switchContext(Contexts.NativeApp);

        try {
            Screen.waitForElementDisplay(Keyboard.doneKeyboardButton);
        } catch (e) {
            throw e;
        } finally {
            browser.switchContext(Contexts.WebView);
        }
        return browser.isKeyboardShown();
    }

    static waitForKeyboard() {
        Contexts.doTasksInNativeContext(() => {
            Screen.waitForElementDisplayInShortTimeOut(Keyboard.doneKeyboardButton);
        });

        return this;
    }

    static tapDoneKeyboardButton() {
        Contexts.doTasksInNativeContext(() => {
            const doneButton = this.doneKeyboardButton;
            doneButton.click();
            Screen.waitForElementNotDisplayInShortTimeOut(doneButton);
        });
        browser.pause(5000);
        return this;
    }

    static type(character: string) {
        return browser.$(`//XCUIElementTypeKey[@name="${toUpper(character)}"]`).click();
    }

    /**
     * @description Return character `Done` on the device keyboard.
     */
    static get tapDoneOnIPad() {
        return browser.$('//XCUIElementTypeButton[@name="Hide keyboard"]').click();
    }

    static tapOnDoneiPhone() {
        return browser.$('//XCUIElementTypeButton[@name="Done"]').click();
    }
}
