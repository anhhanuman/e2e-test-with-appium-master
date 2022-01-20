import Gestures from './gestures';
import {Contexts} from './contexts';
import {Keyboard} from './keyboard';
import {Screen} from '@shared/helpers/screen';

const DEFAULT_TIMEOUT: number = 35000;

export default class Input {
    static setInputValue(
        element: WebdriverIO.Element,
        value: string,
        shouldClearValue: boolean = false,
        shouldHideKeyboard: boolean = false
    ): void {
        Gestures.scrollIntoView(element);
        element.click();
        if (this.isKeyboardShownOnInput()) {
            this.waitForElementDisplayWhenKeyboardAppeared(element);
        }
        if (shouldClearValue) {
            const currentValue = element.getValue();
            if (currentValue && currentValue.length > 0) {
                for (let i = 0; i < currentValue.length; i++) {
                    browser.sendKeys(['\uE003']);
                }
            }
        }

        element.addValue(value);

        if (shouldHideKeyboard) {
            Input.hideKeyboard();
        }
    }

    static inputValue(element: WebdriverIO.Element, whatToInput: string) {
        Screen.tapToElement(element);
        this.checkKeyboardDisplayed(element)
            .checkEmptyThenSetValue(element, whatToInput);
        Keyboard.tapDoneKeyboardButton();

        return this;
    }

    private static checkKeyboardDisplayed(element: WebdriverIO.Element) {
        if (this.isKeyboardShownOnInput()) {
            this.waitForElementDisplayWhenKeyboardAppeared(element);
        } else {
            throw Error('Keyboard is not displayed. Either app or test script has problems.');
        }
        return this;
    }

    private static checkEmptyThenSetValue(element: WebdriverIO.Element, whatToInput: string) {
        browser.pause(2000);
        if (element.getAttribute('value') === null) {
            element.addValue(whatToInput);
        } else {
            element.clearValue();
            element.setValue(whatToInput); //built-in clearValue() does not work
        }
        return this;
    }

    static hideKeyboard(): void {
        if (browser.isKeyboardShown()) {
            browser.$('body').click();
        }
    }

    static isKeyboardShownOnInput(): boolean {
        return !!browser.isKeyboardShown();
    }

    private static waitForElementDisplayWhenKeyboardAppeared(element: WebdriverIO.Element) {
        browser.waitUntil(
            () => {
                return element.isDisplayed();
            },
            DEFAULT_TIMEOUT,
            `ERROR: element ${element} does not display in view after ${DEFAULT_TIMEOUT / 1000}s`,
            2000
        );
    }

    static inputToSpecialInputField(element: WebdriverIO.Element, whatToInput: string) {
        Contexts.doTasksInNativeContext(() => {
            this.inputValue(element, whatToInput);
        });

        return this;
    }
}
