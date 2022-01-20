import {Screen} from '../../helpers/screen';
import {BaseSearchPartnerElement} from '../../screen-objects/search-partner/base-search-partner.element';
import Input from '../../helpers/input';
import {AlertDialog} from '@shared/screen-object-components';
import Gestures from '../../helpers/gestures';
import {Contexts} from '../../helpers';
import {BaseSearchPartnerValidators} from '../../screen-objects/search-partner/base-search-partner.validators';
import {LoadingContent} from '../loading-content/loading.content';

export class BaseSearchPartnerScreen {
    constructor(appName?: string) {
    }

    private definePartnerSearchInputElements() {
        return BaseSearchPartnerElement.searchInputs;
    }

    clearInputtedStreetAndInputNewStreet(street: string) {
        Input.setInputValue(this.definePartnerSearchInputElements()[2], street, true, true);
        return this;
    }

    inputPartnerAttributes(lastName: string, firstName: string, zip: string, street: string, phone: string) {
        const inputElements = this.definePartnerSearchInputElements();

        Input.setInputValue(inputElements[1], lastName, false, true);

        Input.setInputValue(inputElements[2], firstName, false, true);
        Input.setInputValue(inputElements[3], street, false, true);

        this.enterZipInput(zip);
        this.selectAutoCompleteZip();
        this.inputPhoneNumber(phone);
        return this;
    }

    private definePhoneNumber() {
        return BaseSearchPartnerElement.phoneNativeInput;
    }

    inputPhoneNumber(phone: string) {
        const phoneNativeInput = this.definePhoneNumber();
        Contexts.doTasksInNativeContext(() => {
            if (phoneNativeInput.getValue() === '') {
                phoneNativeInput.addValue(phone);
            } else {
                phoneNativeInput.clearValue();
                phoneNativeInput.setValue(phone);
            }
        });

        return this;
    }

    waitForDisplay(): void {
        Screen.waitForElementDisplay(BaseSearchPartnerElement.closeModalButton);
        Screen.waitForElementDisplay(BaseSearchPartnerElement.searchPartnerScreenIdentity);
    }

    waitForPartnerNumberAndAttributes(): void {
        Screen.waitForElementsDisplay(BaseSearchPartnerElement.partnerAttributesAndNumber);
        Screen.waitForElementsDisplay(this.definePartnerSearchInputElements());
    }

    waitForNotDisplay(): void {
        Screen.waitUntilElementNotDisplay(BaseSearchPartnerElement.closeModalButton);
        Screen.waitUntilElementNotDisplay(BaseSearchPartnerElement.searchPartnerScreenIdentity);
    }

    waitForSearchResultDisplay(): void {
        Screen.waitForElementDisplay(BaseSearchPartnerElement.searchCriteriaLabelOnSearchResult);
    }

    verify() {
        return new BaseSearchPartnerValidators(this);
    }

    tapPenIcon(): void {
        const penEditIcon = BaseSearchPartnerElement.penEditIcon;
        penEditIcon.click();
        Screen.waitUntilElementNotDisplay(penEditIcon);
    }

    tapCloseSearchPartnerScreenButton(): void {
        BaseSearchPartnerElement.closeModalButton.click();
        Screen.waitUntilElementNotDisplay(BaseSearchPartnerElement.closeModalButton);
    }

    tapPartnerNumberTab() {
        BaseSearchPartnerElement.partnerNumberSegment.click();
        return this;
    }

    enterNumberInput(value: string) {
        Input.setInputValue(BaseSearchPartnerElement.numberInput, value, false, true);
        return this;
    }

    inputLastNameOrCompanyInput(value: any) {
        Input.setInputValue(BaseSearchPartnerElement.lastNameOrCompanyInput, value, false, false);
        return this;
    }

    getInputtedLastName(): string {
        const inputElements = this.definePartnerSearchInputElements();
        return inputElements[0].getValue();
    }

    inputFirstNameOrCompanyInput(value: any) {
        const inputElements = this.definePartnerSearchInputElements();
        Input.setInputValue(inputElements[1], value, false, false);

        return this;
    }

    getInputtedFirstName(): string {
        const inputElements = this.definePartnerSearchInputElements();
        return inputElements[1].getValue();
    }

    enterZipInput(value: any) {
        Input.setInputValue(BaseSearchPartnerElement.zipInput, value, false, false);
        Screen.waitForElementDisplay(BaseSearchPartnerElement.zipSelectBox);

        return this;
    }

    getInputtedZip(): string {
        return BaseSearchPartnerElement.zipInput.getValue();
    }

    selectAutoCompleteZip(): void {
        BaseSearchPartnerElement.zipSelectBox.click();
    }

    enterStreetInput(value: any): void {
        Input.setInputValue(BaseSearchPartnerElement.streetInput, value);
    }

    enterPartnerAttributeInputs(lastName?: string, firstName?: string, zip?: string, street?: string) {
        lastName && this.inputLastNameOrCompanyInput(lastName);
        firstName && this.inputFirstNameOrCompanyInput(firstName);
        if (zip) {
            this.enterZipInput(zip);
            this.selectAutoCompleteZip();
        }
        street && this.enterStreetInput(street);
    }

    isInputErrorIconDisplayed(): Array<boolean> {
        const errorIconSelectors = BaseSearchPartnerElement.inputErrorIcon;
        let errorIconStates: Array<boolean> = [];
        for (let index in errorIconSelectors) {
            errorIconStates.push(errorIconSelectors[index].isDisplayed());
        }
        return errorIconStates;
    }

    getInputErrorContent(): Array<string> {
        const errorContentSelector = BaseSearchPartnerElement.inputErrorContent;
        Screen.waitForElementsDisplay(errorContentSelector);
        let errorContent = [];
        for (let index in errorContentSelector) {
            errorContent.push(errorContentSelector[index].getText().trim());
        }
        return errorContent;
    }

    tapErrorInput(inputPosition: number) {
        const inputElements = this.definePartnerSearchInputElements();
        inputElements[inputPosition].click();

        return this;
    }

    getCSSPropertyOfErrors(): Array<boolean> {
        const errorIconElements = BaseSearchPartnerElement.inputErrorIcon;
        let errorIconCSSProperties: Array<any> = [];
        for (let index in errorIconElements) {
            errorIconCSSProperties.push(errorIconElements[index].getCSSProperty('--errorIcon-color'));
        }
        return errorIconCSSProperties;
    }

    tapContractNumberTab() {
        BaseSearchPartnerElement.contractNumberSegment.click();
        Screen.waitUntilElementNotDisplay(BaseSearchPartnerElement.zipInput);

        return this;
    }

    tapSearchPartnerButtonAndAvoidFailedSearchApi(): void {
        const searchButton = BaseSearchPartnerElement.searchPartnerButton;
        Gestures.clickAndWaitForNotDisplay(searchButton);
        let alertError: boolean;
        for (let i = 0; i < 2; i++) {
            alertError = AlertDialog.isAlertDialogDisplayed();
            if (alertError) {
                AlertDialog.tapAlertDialogButtonFirst();
                BaseSearchPartnerElement.searchPartnerButton.click();
                browser.pause(3000);
            }
        }
    }

    tapSearchButton() {
        const searchPartnerButton = BaseSearchPartnerElement.searchPartnerButton;
        Gestures.scrollIntoView(searchPartnerButton);
        searchPartnerButton.click();
        return this;
    }

    tapSearchPartnerButtonAndWait() {
        this.tapSearchPartnerButtonAndAvoidFailedSearchApi();
        Screen.waitUntilElementsNotDisplay(this.definePartnerSearchInputElements());
        Screen.waitUntilElementNotDisplay(BaseSearchPartnerElement.searchPartnerButton);
        this.waitForSearchResultDisplay();
        return this;
    }

    searchByNumber(whichNumber: string) {
        this.enterNumberInput(whichNumber);
        this.tapSearchPartnerButtonAndWait();
    }

    getPartnerAttributes() {
        return BaseSearchPartnerElement.partnerAttributesAndNumber;
    }

    getPartnerAttributeLabelsAfterInputNumber() {
        return BaseSearchPartnerElement.basicLabels;
    }

    arePartnerAttributesDisplayed(): boolean {
        let partnerAttributesBeforeInputNumber = this.getPartnerAttributes();
        let labelsAfterInputNumber = this.getPartnerAttributeLabelsAfterInputNumber();
        let labelsAfterInputNumberText: Array<any> = [];
        let expectedLabelAfterInputNumberText: Array<any> = ['Number'];
        for (let index in labelsAfterInputNumber) {
            labelsAfterInputNumberText.push(labelsAfterInputNumber[index].getText());
        }
        if (partnerAttributesBeforeInputNumber === labelsAfterInputNumber) {
            throw Error('Partner Attributes might still display');
        }

        if (labelsAfterInputNumberText.length == 1 && labelsAfterInputNumberText == expectedLabelAfterInputNumberText) {
        } else return true;
    }

    searchPartnerByPartnerAttributes(lastName?: string, firstName?: string, zip?: string, street?: string) {
        this.enterPartnerAttributeInputs(lastName, firstName, zip, street);
        this.tapSearchPartnerButtonAndWait();
    }

    inputContractNumberInput(value: string): void {
        Input.setInputValue(BaseSearchPartnerElement.contractNumberInput, value, false, false);
    }

    searchPartnerByContractNumber(contractNumber: string) {
        this.inputContractNumberInput(contractNumber);
        this.tapSearchPartnerButtonAndWait();
    }

    tapFoundPartnerOnSearchResultAndWait(whichPartnerIndex: number): void {
        this.tapFoundPartnerOnSearchResult(whichPartnerIndex);
        LoadingContent.waitForLoadingContentDismiss();
    }

    tapFoundPartnerOnSearchResult(whichPartnerIndex: number) {
        const partnerCardElement =
            BaseSearchPartnerElement.partnerCardsOnSearchResult[whichPartnerIndex];
        Screen.tapToElement(partnerCardElement);
    }

    getNumberOfFoundPartnersAfterSearched(): number {
        return BaseSearchPartnerElement.partnerCardsOnSearchResult.length;
    }

    getEmptySearchResultText(): string {
        return BaseSearchPartnerElement.emptyPartnerOnSearchResult.getText();
    }

    getPartnerNames() {
        const foundPartnerNameElements = BaseSearchPartnerElement.foundPartnerFullNames;
        return Screen.getTextOfElements(foundPartnerNameElements);
    }

    getAFoundPartnerAfterSearched(): Array<string> {
        let foundPartner = [];
        const partnerFullName = BaseSearchPartnerElement.foundPartnerFullNames[0].getText();
        const partnerDOB = BaseSearchPartnerElement.foundPartnerDOBAndAddress[0].getText().trim();
        const partnerAddress = BaseSearchPartnerElement.foundPartnerDOBAndAddress[1].getText();

        foundPartner.push(partnerFullName, partnerDOB, partnerAddress);

        return foundPartner;
    }

    getFoundPartnerAfterSearchedByVehicleRegistrationNumber(): Array<string> {
        let foundPartner = [];
        const partnerFullname = BaseSearchPartnerElement.foundPartnerFullNames[0].getText();
        const partnerDOB = BaseSearchPartnerElement.foundPartnerDOBAndAddress[0].getText().trim();

        foundPartner.push(partnerFullname, partnerDOB);

        return foundPartner;
    }

    getTextOfSearchCriteriaInfoOnSearchResult(): Array<string> {
        let criteriaByPartner = [];
        criteriaByPartner.push(
            BaseSearchPartnerElement.searchCriteriaLabelOnSearchResult.getText(),
            BaseSearchPartnerElement.searchCriteriaBy.getText()
        );
        return criteriaByPartner;
    }

    getSearchInfoEllipsisIPhone(): Array<string> {
        let info = [];
        info.push(BaseSearchPartnerElement.searchCriteriaBy.getCSSProperty('text-overflow').value,
            BaseSearchPartnerElement.searchCriteriaBy.getCSSProperty('white-space').value,
            BaseSearchPartnerElement.searchCriteriaBy.getCSSProperty('overflow').value);

        return info;
    }
}

export const expectedSearchPartnerCriteriaInfo = ['Search Criteria', 'Partner Number 10092738'];
export const expectedFoundPartnerNameBruno = ['Bruno Zebert', '27.03.1972 (48)', 'Bollwerk 4, 3011 Bern'];
export const expectedFoundPartnerNameClaudio = [
    'Claudio Schuerch',
    '31.10.1968 (51)',
    'impasse de la Golette, 1552 Trey'
];
export const expectedSearchInfoEllipsis = ['ellipsis', 'nowrap', 'hidden'];
export const baseSearchPartnerScreen = new BaseSearchPartnerScreen();
