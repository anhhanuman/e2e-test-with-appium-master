import {SearchPartnerElement} from './search-partner.element';
import {BaseSearchPartnerScreen} from '@shared/screen-object-components/objects/base-search-partner.screen';
import {Contexts, Keyboard} from '../../../../shared/helpers/index';
import {LoadingContent} from '@shared/screen-object-components/loading-content/loading.content';
import {Screen} from '@shared/helpers/screen';
import {AlertDialog} from "@shared/screen-object-components";

export class SearchPartnerScreen extends BaseSearchPartnerScreen {

    private quickSearchElement = new SearchPartnerElement();

    private extendedSearchElement = new SearchPartnerElement();

    constructor() {
        super();
    }

    private defineQuickSearchScreenElements() {
        let quickSearchPartnerElements = [];
        quickSearchPartnerElements.push(
            this.quickSearchElement.quickSearchInput,
            this.quickSearchElement.quickSearchButton,
            this.quickSearchElement.searchSegments[0],
            this.quickSearchElement.searchSegments[1]
        );
        return quickSearchPartnerElements;
    }

    waitForDisplay() {
        super.waitForDisplay();
        Screen.waitForElementsDisplay(this.defineQuickSearchScreenElements());

        return this;
    }

    verify() {
        return super.verify();
    }

    tapPenIcon() {
        super.tapPenIcon();

        return this;
    }

    navigateSearchSegment(whichSegment: number) {
        this.quickSearchElement.searchSegments[whichSegment].click();

        return this;
    }

    navigateToPartnerSearchSegment() {
        this.quickSearchElement.searchSegments[1].click();

        return this;
    }

    tapQuickSearchInput() {
        this.quickSearchElement.quickSearchInput.click();

        return this;
    }

    isQuickSearchInputFocused() {
        Keyboard.waitForKeyboard();

        return this.quickSearchElement.quickSearchInput.isFocused();
    }

    tapClearIconOnQuickSearch() {
        this.quickSearchElement.clearIconOnQuickSearch.click();

        return this;
    }

    getTextOfInputtedQuickSearch() {
        const quickSearchInput = this.quickSearchElement.quickSearchInput;

        return quickSearchInput.getValue();
    }

    inputQuickPartnerData(partnerData: string) {
        this.quickSearchElement.quickSearchInput.addValue(partnerData);

        return this;
    }

    getInputFocusBorderColor(): any {
        return this.quickSearchElement.quickSearchInputFocusBorder.getCSSProperty('border-color').parsed.hex;
    }

    tapQuickSearchButtonAndWait() {
        this.tapQuickSearchButton();
        this.waitForQuickSearchFormNotDisplay()

        super.waitForSearchResultDisplay();

        return this;
    }

    tapQuickSearchButton() {
        this.quickSearchElement.quickSearchButton.click();

        return this;
    }

    private waitForQuickSearchFormNotDisplay() {
        LoadingContent.waitForLoadingContentDismiss();
        if (AlertDialog.isAlertDialogDisplayed()) {
            AlertDialog.tapAlertDialogButtonFirst();
            this.tapQuickSearchButton();
            LoadingContent.waitForLoadingContentDismiss();
            if (AlertDialog.isAlertDialogDisplayed()) {
                throw Error('Something went wrong with search')
            }
        }

        return this;
    }

    inputQuickPartnerAndSearchAndTapFoundPartner(partnerData: string) {
        this.inputQuickPartnerAndSearch(partnerData).tapFoundPartnerOnSearchResultAndWait(0);

        return this;
    }

    inputQuickPartnerAndSearch(partnerData: string) {
        this.inputQuickPartnerData(partnerData).tapQuickSearchButtonAndWait();

        return this;
    }

    private defineNativeVehicleNumber() {
        return this.extendedSearchElement.vehicleRegistrationNumber;
    }

    inputVehicleRegistrationNumber(vehicleRegistrationNumber: string) {
        const nativeVehicleRegistrationNumber = this.defineNativeVehicleNumber();
        Contexts.doTasksInNativeContext(() => {
            if (nativeVehicleRegistrationNumber.getText() === '') {
                nativeVehicleRegistrationNumber.addValue(vehicleRegistrationNumber);
            } else {
                nativeVehicleRegistrationNumber.clearValue();
                nativeVehicleRegistrationNumber.setValue(vehicleRegistrationNumber);
            }
        });

        return this;
    }
}

