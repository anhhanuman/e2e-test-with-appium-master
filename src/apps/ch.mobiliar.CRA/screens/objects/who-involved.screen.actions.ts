import {WhoInvolvedElement} from '../selectors/who-involved.element';
import {Contexts} from '../../../../shared/helpers';
import {AlertDialog} from '@shared/screen-object-components';
import {Screen} from '@shared/helpers/screen';

const deviceType: string = browser.capabilities['deviceType'];

class WhoInvolvedScreen {
    private selector = new WhoInvolvedElement();

    private defineDefaultScreenElements(): Array<WebdriverIO.Element> {
        const defaultScreenElements: Array<WebdriverIO.Element> = [];
        defaultScreenElements.push(
            this.selector.title,
            this.selector.defaultYetPartnerIcon,
            this.selector.yetPartnerInfo,
            this.selector.searchPartnerButton
        );
        return defaultScreenElements;
    }

    waitForDisplay() {
        Screen.waitForElementsDisplay(this.defineDefaultScreenElements());
    }

    private waitForNotDisplay() {
        Screen.waitUntilElementsNotDisplay(this.defineDefaultScreenElements());
    }

    tapSearchPartnerButton(): void {
        this.selector.searchPartnerButton.click();
        this.waitForNotDisplay();
    }

    private defineAddedPartnerScreenElements(): Array<WebdriverIO.Element> {
        const addedPartnerScreenElements: Array<WebdriverIO.Element> = [];
        addedPartnerScreenElements.push(
            this.selector.title,
            this.selector.defaultYetPartnerIcon,
            this.selector.partnerName,
            this.selector.partnerNumber,
            this.selector.removePartnerDataButton,
            this.selector.nextButton
        );
        return addedPartnerScreenElements;
    }

    getPartnerDetailsInfo(): Array<string> {
        const partnerInfo: Array<string> = [];
        partnerInfo.push(
            this.selector.title.getText(),
            this.selector.partnerName.getText(),
            this.selector.partnerDOB.getText(),
            this.selector.partnerNumber.getText()
        );
        const partnerContactLabels = this.selector.partnerContactLabels;

        for (let index in partnerContactLabels) {
            partnerInfo.push(partnerContactLabels[index].getText());
        }
        const partnerContacts = this.selector.partnerContacts;

        for (let index in partnerContacts) {
            partnerInfo.push(partnerContacts[index].getText());
        }
        return partnerInfo;
    }

    waitForAddedPartnerDisplay() {
        Screen.waitForElementsDisplay(this.defineAddedPartnerScreenElements());
    }

    tapPhoneNumbersButton(): void {
        this.selector.phoneNumbersButton.click();
        Contexts.switchToNative();
    }

    tapOpenMailComposerButton(): void {
        this.selector.openMailComposerButton.click();
    }

    tapRemovePartnerDataButton(): void {
        this.selector.removePartnerDataButton.click();
        AlertDialog.waitForAlertDialog();
        AlertDialog.tapAlertDialogButtonAndWaitForAlertNotDisplay('Remove');
    }

    tapNextButton(): void {
        this.selector.nextButton.click();
    }
}

const expectedDefaultNavigationMenu: Array<string> = [
    "Who'\ts involved?",
    'Where and when did it happen?',
    'What happened?',
    'Next Steps',
    'No notes added',
    'Attachments'
];

export const whoInvolvedScreen = new WhoInvolvedScreen();
