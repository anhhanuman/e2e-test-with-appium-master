import {BaseSelector} from "@shared/selectors/base-selector.selector";
import {Contexts} from "@shared/helpers";

export class AddForeignContractElement {
    private readonly selectors = {
        scanDocumentCard: 'mobi-item-card mobi-card',
        insuranceTypeSelectIcon: 'ion-item div.insurance-type-select-container mobi-icon',
        insuranceTypeSelectedValue: 'div.insurance-type-select-container div.content',
        actionSheetDoneButton: '~Done',
        actionSheetCancelButton: '~Cancel',
        insuranceProvider: 'mobi-auto-complete div.input__content input.native-input',
        saleInfo: 'div.hint-icon mobi-icon',
        tooltipContent: 'mobi-input-tooltip div.input-tooltip__content',
        datePickerIcon: 'div.input__content ion-datetime',
        expandCollapseButton: 'div #aspect-content div.aspect-tab label',
        additionalAttributeLabel: 'div #aspect-content div.aspect-tab div span.aspect-name',
        annualPremiumAndPolicyNumberLabels: 'mobi-item-input div ion-label',
        annualPremiumAndPolicyNumberInputs: 'mobi-item-input input.native-input',
        annualPremiumNativeInput: '//XCUIElementTypeTextField[1]',//(//XCUIElementTypeOther[@name="main"])[3]/XCUIElementTypeTextField[1]
        remark: 'div textarea',
        addButton: BaseSelector.getSubmitButton(),
        errorToolTipAboveButton: 'div.invalid-tooltip__content mobi-hint div.container',
        errorIconOfInsuranceType: 'div.insurance-type-select-container mobi-icon.icon-errorIcon',
        errorIconOfInsuranceProvider: 'mobi-auto-complete div.input__content.input__content--invalid div.icon__container',
        errorToolTipOfInsuranceProvider: 'mobi-input-tooltip div.input-tooltip__content'
    };


    get scanDocumentCard() {
        return $(this.selectors.scanDocumentCard);
    }

    get scanDocumentIcon() {
        return $(this.selectors.scanDocumentCard.concat(' mobi-icon ion-icon'));
    }

    get scanDocumentTitleAndContent() {
        return $(this.selectors.scanDocumentCard.concat(' div.container'));
    }

    get insuranceTypeSelectIcon() {
        return $(this.selectors.insuranceTypeSelectIcon);
    }

    get actionSheetDoneButton() {
        return $(this.selectors.actionSheetDoneButton);
    }

    get actionSheetCancelButton() {
        return $(this.selectors.actionSheetCancelButton);
    }

    get insuranceProviderInput() {
        return $(this.selectors.insuranceProvider);
    }

    get insuranceProviderInputSelectingValue() {
        return $(this.selectors.insuranceProvider);
    }

    get saleInfoIcon() {
        return $(this.selectors.saleInfo);
    }

    get salesTooltipContent() {
        return $(this.selectors.tooltipContent);
    }

    get expirationDatePickerIcon() {
        return $(this.selectors.datePickerIcon);
    }

    get expandCollapseButton() {
        return $(this.selectors.expandCollapseButton);
    }

    get additionalAttributeLabel() {
        return $(this.selectors.additionalAttributeLabel);
    }

    get annualPremiumAndPolicyNumberInputs() {
        return $$(this.selectors.annualPremiumAndPolicyNumberInputs);
    }

    get annualPremiumNativeInput() {
        Contexts.switchToNative();
        return $(this.selectors.annualPremiumNativeInput);
    }

    get annualPremiumAndPolicyNumberLabels() {
        return $$(this.selectors.annualPremiumAndPolicyNumberLabels);
    }

    get remarks() {
        return $(this.selectors.remark);
    }

    get addButton() {
        return $(this.selectors.addButton);
    }

    get errorToolTipAboveButton() {
        return $(this.selectors.errorToolTipAboveButton);
    }

    get errorIconOfInsuranceType() {
        return $(this.selectors.errorIconOfInsuranceType);
    }

    get errorIconOfInsuranceProvider() {
        return $(this.selectors.errorIconOfInsuranceProvider);
    }

    get errorToolTipOfInsuranceProvider() {
        return $(this.selectors.errorToolTipOfInsuranceProvider);
    }

    get insuranceTypeSelectedValue() {
        return $(this.selectors.insuranceTypeSelectedValue);
    }

}
