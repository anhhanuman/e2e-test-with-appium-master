import {AlertDialog} from "@shared/screen-object-components";
import {Screen} from "@shared/helpers/screen";
import {DeviceType} from "@shared/helpers";
import {HeaderToolbarElement} from "@apps/cia/screens-objects/components/header-toolbar.element";

const deviceType = browser.capabilities['deviceType'];
const element = new HeaderToolbarElement();

export class HeaderToolbar {
    isSendButtonDisplayed() {
        return element.sendButton.isDisplayed();
    }

    tapSendButtonAndConfirm(): void {
        this.tapSendButton();
        AlertDialog.tapAlertDialogButtonSecond();
        Screen.waitUntilElementNotDisplay(element.homeButton);
    }

    tapSendButton(): void {
        if (deviceType === DeviceType.iPhone) {
            if (this.isSendButtonDisplayed() === true) {
                element.sendButton.click();
            } else {

            }
        } else {
            if (this.isSendButtonDisplayed() === true) {
                element.sendButton.click();
            } else {
                throw Error('iPad - Send button NOT display-Terminate the test case');
            }
        }
    }
}
