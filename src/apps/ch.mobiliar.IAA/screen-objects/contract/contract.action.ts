import {ContractElement} from './contract.element';
import Gestures from '../../../../shared/helpers/gestures';
import {Screen} from '@shared/helpers/screen';
import {ContractValidator} from './contract.validator';
import {BaseElement} from '@shared/screen-object-components/elements/base.element';
import {ScreenName} from '@shared/helpers/testdata';
import {ScanBot} from "@shared/screen-objects/scanbot/scanbot.action";
import {Toolbar} from "@apps/iaa/screen-objects/components/header-toolbar/toolbar/toolbar.action";
import {BaseScreen} from "@apps/iaa/screen-objects/base/base-screen.action";

export class Contract extends BaseScreen {
    private element: ContractElement

    constructor() {
        super(ScreenName.Contracts);
        this.element = new ContractElement(ScreenName.Contracts);
        super._headerToolbar = new Toolbar(ScreenName.Contracts);
    }

    /*getUploadingUploadedStates() {
        const spinnerState = this.toolbar.isSpinnerDisplayed();
        const spinner = this.toolbar.spinnerElement.getSpinnerIcon();
        Screen.waitUntilElementNotDisplay(spinner);
        const errorState = this.toolbar.isErrorNotificationDisplayed();
        let uploadingUploadedStates = [];
        uploadingUploadedStates.push(spinnerState, errorState);

        return uploadingUploadedStates;
    }*/

    waitForUploadingForeignContract() {
        const spinner = super.toolbar.notification.spinnerElement.getSpinnerIcon()
        Screen.waitForElementDisplay(spinner)
            .waitUntilElementNotDisplay(spinner);

        return this;
    }

    verify() {
        return new ContractValidator(this);
    }

    getTotalContracts() {
        const cardSelector = this.element.mobiCardElement.cardSelector;

        return this.element.mobiCardElement.getComponentElements(cardSelector).length;
    }

    getTotalInActiveContracts() {
        this.getContractSubHeaders()
        const inActiveContractHeader = this.element.subHeaders[1].getText();
        let totalInActiveContracts: number = 0;

        if (inActiveContractHeader === 'Inactive') {
            const cardViewOnlySelector = this.element.mobiCardElement.cardViewOnlySelector;
            totalInActiveContracts = this.element.mobiCardElement.getComponentElements(cardViewOnlySelector).length
        }
        return totalInActiveContracts;

    }

    getTotalActiveContracts() {
        return this.getTotalContracts() - this.getTotalInActiveContracts();
    }

    getTotalArrowDownloadIcons() {
        return this.element.arrowOverlayIcon.length;
    }

    getTotalDownloadedIcons(): number {
        const greenCheckIcons = this.element.successfulDownloadedIcons;

        return Screen.getTotalDisplayingElements(greenCheckIcons);
    }

    getContractSubHeaders() {
        return Screen.getTextOfElements(this.element.subHeaders)
    }

    tapContract(position ?: number) {
        if (position === undefined) {
            Screen.tapToElement(this.element.successfulDownloadedIcons[0])
        } else {
            throw new Error('Specified contract position or something else');
        }
    }

    getInActiveContractsEnableStates(): Array<boolean> {
        const inActiveContractElements = this.element.mobiCardElement.getComponentElements(this.element.mobiCardElement.cardViewOnlySelector)
        let inActiveContractStates = [];
        for (const element of inActiveContractElements) {
            Gestures.scrollIntoView(element);
            inActiveContractStates.push(element.isEnabled());
        }
        return inActiveContractStates;
    }

    getInActiveContractProperties(): Array<string> {
        const inActiveContractElements = this.element.mobiCardElement.getComponentElements(this.element.mobiCardElement.cardViewOnlySelector)
        let inactiveContractProperties = [];
        for (let i = 0; i < inActiveContractElements.length; i++) {
            Gestures.scrollIntoView(inActiveContractElements[i]);
            inactiveContractProperties.push(
                inActiveContractElements[i].getCSSProperty('border').value,
                inActiveContractElements[i].getCSSProperty('background').parsed.hex);

            if ((i = 1)) {
                break;
            }
        }
        return inactiveContractProperties;
    }

    clickToInActiveContracts() {
        const inActiveContractElements = this.element.mobiCardElement.getComponentElements(this.element.mobiCardElement.cardViewOnlySelector)
        for (const element of inActiveContractElements) {
            Gestures.scrollIntoView(element);
            element.click();
        }

        return this;
    }

    tapScanForeignContractButton() {
        const scanForeignContractButton = this.element.scanForeignContractButton[1];
        Screen.tapToElement(scanForeignContractButton);

        return new ScanBot();
    }

    getScanbotSDK() {
        return new ScanBot()
    }

    scanForeignContract() {
        this.tapScanForeignContractButton()
            .scanAndDisplayNextScreen(true);

        return this;
    }

    getTotalInProgressIcons() {
        const hourGlassIcons = BaseElement.overlayHourGlassIcon(ScreenName.Contracts);

        return Screen.getTotalDisplayingElements(hourGlassIcons);
    }
}

export const expectedHeaders = ['Active', 'Inactive', 'Foreign Contracts'];

