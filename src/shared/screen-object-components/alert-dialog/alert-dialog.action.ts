import {Screen} from '../../helpers/screen';
import {AlertDialogElement} from './alert-dialog.element';
import {AlertDialogValidator} from './alert-dialog.validator';

export class AlertDialog {
    static waitForAlertDialog() {
        Screen.waitForElementDisplay(AlertDialogElement.alertDialog);
        return this;
    }

    static verify() {
        return new AlertDialogValidator(this);
    }

    static isAlertDialogDisplayed() {
        return AlertDialogElement.alertDialog.isDisplayed();
    }

    static getAlertDialog(): string[] {
        this.waitForAlertDialog();
        let alertDialog = [];
        alertDialog.push(AlertDialogElement.alertTitle.getText(), AlertDialogElement.alertContentMessage.getText());
        const alertDialogButtonNames = Screen.getTextOfElements(AlertDialogElement.alertDialogButtons);

        return alertDialog.concat(alertDialogButtonNames);
    }

    static tapAlertDialogButtonFirst() {
        AlertDialogElement.alertDialogButtons[0].click();
        Screen.waitUntilElementNotExist(AlertDialogElement.alertDialog);

        return this;
    }

    static tapAlertDialogButtonSecond() {
        this.waitForAlertDialog();
        Screen.waitForElementDisplay(AlertDialogElement.alertDialogButtons[1]);
        AlertDialogElement.alertDialogButtons[1].click();
        Screen.waitUntilElementNotExist(AlertDialogElement.alertDialog);

        return this;
    }

    static tapAlertDialogButtonAndWaitForAlertNotDisplay(buttonName: string) {
        switch (buttonName) {
            case expectedLoginErrorAlertDialog[2]:
                this.tapAlertDialogButtonFirst();
                break;
            case expectedCameraAlertError[2]:
                this.tapAlertDialogButtonFirst();
                break;
            case expectedCameraAlertError[3]:
                this.tapAlertDialogButtonSecond();
                break;
            case expectedRemoveImageAlertDialog[2]:
                this.tapAlertDialogButtonFirst();
                break;
            case expectedRemoveImageAlertDialog[3]:
                this.tapAlertDialogButtonSecond();
                break;
            case expectedDeleteClaimAlertDialog[2]:
                this.tapAlertDialogButtonFirst();
                break;
            case expectedDeleteClaimAlertDialog[3]:
                this.tapAlertDialogButtonSecond();
                break;
            case expectedRemovePartnerAlertDialog[2]:
                this.tapAlertDialogButtonFirst();
                break;
            case expectedRemovePartnerAlertDialog[3]:
                this.tapAlertDialogButtonSecond();
                break;
            case expectedSyncMultiplePartnersAlertDialog[3]:
                this.tapAlertDialogButtonSecond();
                break;
            default:
                break;
        }
    }
}

export const expectedLoginErrorAlertDialog = [
    'Error',
    'Invalid username or password. Please check your credentials.',
    'OK'
];

export const expectedCameraAlertError = [
    'Camera access needed!',
    'We would like to use the Camera to scan QR codes. Please enable this permission in App settings.',
    "Don't allow",
    'OK'
];
export const expectedAlertMtanDialog = ['Error', 'Invalid confirmation code. Please try again.', 'OK'];
export const expectedRemoveImageAlertDialog = [
    'Remove data',
    'Do you really want to remove the data?',
    'Cancel',
    'Remove'
];

export const expectedDeleteClaimAlertDialog = [
    'Delete this claim',
    'Are you sure you want to delete this claim?',
    'Cancel',
    'Delete'
];
export const expectedRemovePartnerAlertDialog = [
    'Remove this partner?',
    'Do you want to remove this partner from the current Claim?',
    'Cancel',
    'Remove',
    'Abort',
    'Continue'
];

export const expectedSyncMultiplePartnersAlertDialog = [
    'Note: syncing multiple partners takes time',
    'Please be aware that syncing more than 10 partners will take some time. You can optimize this by providing a stable connection.',
    'Abort',
    'Continue'
];

export const fatalErrorAlertDialog = ['Error', 'Something went wrong. Please try again later.', 'OK'];

export const discardDocumentAlert = [
    'Discard this document?',
    'You are about to discard the current document.',
    'Discard',
    'Keep'
];
