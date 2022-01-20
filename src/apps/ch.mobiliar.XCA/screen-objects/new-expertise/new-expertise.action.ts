import {Contexts} from '@shared/helpers';
import {NewExpertiseElement} from './new-expertise.element';
import {Screen} from '@shared/helpers/screen';
import {ExpertiseScreen} from '@apps/xca/screen-objects/expertise/content/expertise.action';

const expertiseDetails = new ExpertiseScreen();

export class NewExpertiseScreen {
    private newExpertiseElement = new NewExpertiseElement();

    waitForDisplay() {
        Screen.waitForElementDisplay(this.newExpertiseElement.title)
            .waitForElementDisplay(this.newExpertiseElement.closeButton);

        return this;
    }

    waitUntilElementNotExist() {
        Screen.waitUntilElementNotExist(this.newExpertiseElement.title && this.newExpertiseElement.closeButton);

        return this;
    }

    isNewExpertiseScreenDisplayed() {
        Contexts.switchToWebview();

        return (this.newExpertiseElement.title.isDisplayed() && this.newExpertiseElement.closeButton.isDisplayed());
    }

    getNewExpertiseTitle() {
        return this.newExpertiseElement.title.getText();
    }

    tapCloseButton() {
        this.newExpertiseElement.closeButton.click();

        return this;
    }

    isActionSheetOptionsDisplayed() {
        let actionSheetOptionStates = [];
        Contexts.switchToNative();
        actionSheetOptionStates.push(
            this.newExpertiseElement.optScanQRCodeLater.isDisplayed(),
            this.newExpertiseElement.optAbortCreationExpertise.isDisplayed());

        return actionSheetOptionStates;
    }

    getActionSheet() {
        return this.newExpertiseElement.optScanQRCodeLater;
    }

    getActionSheetOptions() {
        let actionSheetOptions = [];
        Contexts.switchToNative();
        const scanQRCodeLaterSheetOptionText = this.newExpertiseElement.optScanQRCodeLater.getText();
        const optAbortCreationExpertiseText = this.newExpertiseElement.optAbortCreationExpertise.getText();

        actionSheetOptions.push(scanQRCodeLaterSheetOptionText, optAbortCreationExpertiseText);

        return actionSheetOptions;
    }

    tapOptScanQRcodeLater() {
        Contexts.doTasksInNativeContext(() => {
            this.newExpertiseElement.optScanQRCodeLater.click();
        });
        Screen.waitUntilElementNotExist(this.newExpertiseElement.title);

        return expertiseDetails;
    }

    tapOptAbortCreationOfExpertise() {
        const optionAbort = this.newExpertiseElement.optAbortCreationExpertise;
        Screen.tapNativeElementAndWaitForNotDisplay(optionAbort);

        return this;
    }
}

const expectedActionSheet = ['Scan QR code later', 'Abort creation of expertise'];
const expectedActionSheetStates = [true, true];

export {expectedActionSheet, expectedActionSheetStates};
