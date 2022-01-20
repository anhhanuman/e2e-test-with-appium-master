import {ExpertiseType, expertiseTypeValues} from '@apps/xca/specs/test-data/expertise-type';
import {Screen} from '@shared/helpers/screen';
import {ExpertiseDetailsElement} from '@apps/xca/screen-objects/expertise/components/expertise-details/expertise-details.element';
import {ExpertiseDetailsValidator} from "@apps/xca/screen-objects/expertise/components/expertise-details/expertise-details.validator";

export class ExpertiseDetails {
    private element = new ExpertiseDetailsElement();

    verify() {
        return new ExpertiseDetailsValidator(this);
    }

    tapIconSelect() {
        Screen.tapToElement(this.element.iconSelect);
        this.waitForPopOverDisplay();

        return this;
    }

    waitForPopOverDisplay() {
        Screen.waitForElementDisplay(this.element.popover);

        return this;
    }

    selectType(expertiseTypeLabel: string) {
        this.tapIconSelect();
        const positionOfExpertise: number = expertiseTypeValues.indexOf(expertiseTypeLabel);
        this.element.radioButtons[positionOfExpertise].click();
        Screen.waitUntilElementNotExist(this.element.popover);

        return this;
    }

    getExpertiseTypeLabel(): string {
        return this.element.expertiseTypeLabel.getText();
    }

    getComboBoxDisplayingState(): Array<boolean> {
        let expertiseTypesStateComboBox: Array<boolean> = [];
        const optionComboBoxElements = this.element.optionsComboBox;
        for (const element of optionComboBoxElements) {
            expertiseTypesStateComboBox.push(element.isDisplayed());
        }

        return expertiseTypesStateComboBox;
    }

    getPopoverDisplayingState(): boolean {
        return this.element.popover.isDisplayed();
    }

    getIconSelectExistingState(): boolean {
        return this.element.iconSelect.isExisting();
    }

    isSpecialExpertiseType(selectedExpertiseType: string): boolean {
        return (selectedExpertiseType === ExpertiseType.ReturnExtern ||
            selectedExpertiseType === ExpertiseType.ReturnStuden ||
            selectedExpertiseType === ExpertiseType.Autoscout24 ||
            selectedExpertiseType === ExpertiseType.CommercialHail
        );
    }

    isClaimExpertiseType(): boolean {
        const selectedExpertiseType = this.getSelectingExpertiseType()
        return (
            selectedExpertiseType === ExpertiseType.ReturnExtern ||
            selectedExpertiseType === ExpertiseType.ReturnStuden ||
            selectedExpertiseType === ExpertiseType.Autoscout24
        );
    }

    getExpertiseTypes(): Array<string> {
        const expertiseTypeElement = this.element.expertiseTypesPopoverList;

        return Screen.getTextOfElements(expertiseTypeElement);
    }

    getRbGroupAttributes(): Array<string> {
        const radioButtonElements = this.element.radioButtons;

        return Screen.getElementAttributes(radioButtonElements, 'aria-checked');
    }

    getSelectedExpertiseTypeState(expertiseTypeLabel: string): string {
        const positionOfExpertiseType = expertiseTypeValues.indexOf(expertiseTypeLabel);

        return this.element.radioButtons[positionOfExpertiseType].getAttribute('aria-checked');
    }

    getSelectingExpertiseType(): string {
        const iconSelectExistingState: boolean = this.getIconSelectExistingState()
        if (iconSelectExistingState) {
            return Screen.getTextOfElement(this.element.selectingExpertiseType);
        } else {
            return this.getReadOnlySelectingExpertiseType()
        }
    }

    getReadOnlySelectingExpertiseType(): string {

        return Screen.getTextOfElement(this.element.readOnlySelectingExpertiseType)
    }


}
