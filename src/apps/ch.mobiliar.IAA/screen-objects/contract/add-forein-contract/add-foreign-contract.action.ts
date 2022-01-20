import {AddForeignContractValidator} from '@apps/iaa/screen-objects/contract/add-forein-contract/add-foreign-contract.validator';
import {Contexts} from '@shared/helpers';
import {Screen} from '@shared/helpers/screen';
import Input from '@shared/helpers/input';
import {AutoCompleteScreen} from '@shared/screen-object-components/auto-complete/auto-complete.screen';
import {DateTimeScreen} from '@shared/screen-object-components/date-time/date-time.screen';
import Gestures from '@shared/helpers/gestures';
import {AddForeignContractElement} from "@apps/iaa/screen-objects/contract/add-forein-contract/add-foreign-contract.element";

export class AddForeignContract {
    private element = new AddForeignContractElement();

    isScannedDocumentCardDisplayed() {
        return this.element.scanDocumentCard.isDisplayedInViewport();
    }

    getScannedDocumentTitleAndContent() {
        return this.element.scanDocumentTitleAndContent.getText();
    }

    getDocumentIconSize() {
        return this.element.scanDocumentIcon.getCSSProperty('font-size').value;
    }

    getScannedDocumentBorderedByValue() {
        return this.element.scanDocumentCard.getCSSProperty('border').value;
    }

    verify() {
        return new AddForeignContractValidator(this);
    }

    tapInsuranceTypeSelectIcon() {
        this.element.insuranceTypeSelectIcon.click();
        Contexts.switchToNative();

        return this;
    }

    tapDoneButtonActionSheet() {
        Screen.tapAndWaitForNotDisplay(this.element.actionSheetDoneButton);

        return this;
    }

    selectDefaultInsuranceType() {
        this.tapInsuranceTypeSelectIcon();
        Contexts.doTasksInNativeContext(() => {
            this.tapDoneButtonActionSheet();
        });

        return this;
    }

    getSelectedInsuranceType() {
        return this.element.insuranceTypeSelectedValue.getText();
    }

    inputInsuranceProvider(whatInsuranceProvider: string) {
        Input.setInputValue(
            this.element.insuranceProviderInput,
            whatInsuranceProvider,
            false,
            false
        );

        return this;
    }

    selectInsuranceProvider(autoCompletePosition: number) {
        AutoCompleteScreen.selectValueInAutoComplete(autoCompletePosition);

        return this;
    }

    getSelectingInsuranceProviderValue() {
        return this.element.insuranceProviderInputSelectingValue.getValue();
    }

    selectDefaultStartDate() {
        DateTimeScreen.selectDefaultDate(0);

        return this;
    }

    selectDefaultExpirationDate() {
        DateTimeScreen.selectDefaultDate(1);

        return this;
    }

    getSaleInfoToolTipContent() {
        let salesToolTipContentElement = this.element.salesTooltipContent;
        let salesTooltipContent = salesToolTipContentElement.getText();

        if (salesToolTipContentElement.isDisplayed()) {
            return salesTooltipContent;
        } else {
            this.turnOnSalesInfoContent();

            return salesTooltipContent;
        }
    }

    turnOnSalesInfoContent() {
        this.element.saleInfoIcon.click();
        Screen.waitForElementDisplay(this.element.salesTooltipContent);

        return this;
    }

    turnOffSaleInfoContent() {
        const salesToolTipDisplaying = this.element.salesTooltipContent.isDisplayed();
        if (salesToolTipDisplaying) {
            this.element.saleInfoIcon.click();
            Screen.waitUntilElementNotExistingStateReturn(this.element.salesTooltipContent);
        } else throw Error('Review test case - now the salesToolTipContent Is Not Display to turn off');

        return this;
    }

    inputInsuranceProviderAndSelectValue(whatInsuranceProvider: string, autoCompletePosition: number) {
        Input.setInputValue(
            this.element.insuranceProviderInput,
            whatInsuranceProvider,
            false,
            false
        );
        AutoCompleteScreen.selectValueInAutoComplete(autoCompletePosition);

        return this;
    }

    isSalesInfoToolTipContentDisplayed(): boolean {
        if (this.element.salesTooltipContent.isExisting()) {
            return this.element.salesTooltipContent.isDisplayed();
        } else {
            return false;
        }
    }

    tapExpandCollapseButton() {
        this.element.expandCollapseButton.click();

        return this;
    }

    tapExpandButton() {
        this.element.expandCollapseButton.click();
        Screen.waitUntilElementNotDisplay(this.element.addButton);

        return this;
    }

    private waitForExpandedContentsDisplay() {
        Screen.waitForElementsDisplay(this.element.annualPremiumAndPolicyNumberInputs)
            .waitForElementsDisplay(this.element.annualPremiumAndPolicyNumberLabels);

        return this;
    }

    isAdditionalAttributesGroupDisplayed() {
        let groupStates = [];
        const premiumAndPolicyNumberElements = this.element.annualPremiumAndPolicyNumberLabels;

        for (const element of premiumAndPolicyNumberElements) {
            groupStates.push(element.isDisplayed());
        }

        return groupStates;
    }

    inputAdditionalAttributes(howMuchPremium: string, whatIsPolicyNumber: string, inputYourRemarks: string) {
        this.inputAnnualPremium(howMuchPremium)
            .inputPolicyNumber(whatIsPolicyNumber)
            .inputRemarks(inputYourRemarks);

        return this;
    }

    inputAnnualPremium(howMuchPremium: string) {
        Input.inputToSpecialInputField(this.element.annualPremiumNativeInput, howMuchPremium);

        return this;
    }

    inputPolicyNumber(whatIsPolicyNumber: string) {
        Input.inputValue(this.element.annualPremiumAndPolicyNumberInputs[1], whatIsPolicyNumber);

        return this;
    }

    inputRemarks(inputYourRemarks: string) {
        Input.inputValue(this.element.remarks, inputYourRemarks);

        return this;
    }

    editAnnualPremium(howMuchPremium: string) {
        Input.inputToSpecialInputField(this.element.annualPremiumNativeInput, howMuchPremium);

        return this;
    }

    getInputtedPremium() {
        return this.element.annualPremiumAndPolicyNumberInputs[0].getValue();
    }

    getInputtedPremiumAndPolicyNumber() {
        const premiumAndPolicyEle = this.element.annualPremiumAndPolicyNumberInputs;
        let premiumAndPolicyNumberValues = [];

        for (const element of premiumAndPolicyEle) {
            element.scrollIntoView();
            premiumAndPolicyNumberValues.push(element.getValue());
        }
        return premiumAndPolicyNumberValues;
    }

    getInputtedRemarks() {
        const remarkInputElement = this.element.remarks;
        Gestures.scrollIntoView(remarkInputElement);

        return remarkInputElement.getValue();
    }

    fillInDataAndUpload(
        whatInsuranceProvider: string,
        autoCompletePosition: number,
        howMuchPremium: string,
        whatIsPolicyNumber: string,
        inputYourRemarks: string
    ) {
        this.selectDefaultInsuranceType()
            .inputInsuranceProvider(whatInsuranceProvider)
            .selectInsuranceProvider(autoCompletePosition)
            .selectDefaultStartDate()
            .selectDefaultExpirationDate()
            .tapExpandCollapseButton()
            .inputAdditionalAttributes(howMuchPremium, whatIsPolicyNumber, inputYourRemarks)
            .uploadScannedForeignContract();

        return this;
    }

    uploadScannedForeignContract() {
        Screen.tapToElementAndWaitForNotDisplay(this.element.addButton);

        return this;
    }

    tapAddButton() {
        Screen.tapToElement(this.element.addButton);
    }

    isAddButtonDisplayed() {
        return this.element.addButton.isDisplayed();
    }

    isErrorToolTipAboveButtonDisplayed() {
        return this.element.errorToolTipAboveButton.isDisplayed();
    }

    getErrorToolTipAboveButtonContent() {
        return this.element.errorToolTipAboveButton.getText();
    }
}

