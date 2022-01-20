import {Screen} from "@shared/helpers/screen";
import {BaseNotificationElement} from "@apps/iaa/screen-objects/components/header-toolbar/notification/base-notification.element";

export class BaseNotification {
    protected baseNotificationElement: BaseNotificationElement

    constructor(protected screenName: string) {
        this.baseNotificationElement = new BaseNotificationElement(this.screenName)
    }

    get spinnerElement() {
        return this.baseNotificationElement
    }

    isSpinnerDisplayed() {
        const spinner = this.spinnerElement.getSpinnerIcon();
        Screen.waitForElementDisplayInShortTimeOut(spinner);

        return spinner.isDisplayed();
    }

    waitForSpinnerDisplay() {
        const spinner = this.spinnerElement.getSpinnerIcon();
        Screen.waitForElementDisplayInShortTimeOut(spinner);
    }

    waitForSpinnerNotDisplay() {
        const spinner = this.spinnerElement.getSpinnerIcon();
        Screen.waitUntilProcessingElementNotDisplay(spinner);

        return this;
    }

    waitForSpinnerNotificationLoadingCompleted() {
        let spinner = this.spinnerElement.getSpinnerIcon();
        if (spinner.isExisting()) {
            Screen.waitForElementDisplayInShortTimeOut(spinner)
                .waitUntilProcessingElementNotDisplay(spinner);
        } else {
            return this;
        }
        return this;
    }

}
