export class ExpertiseDetailsElement {
    private readonly selectors = {
        dispatchAndExpertiseSection: 'ion-grid ion-row',
        mobiItemSelect: 'mobi-item-select#expertise-type',
        iconSelect: 'ion-select.ng-valid',
        optionsComboBox: 'ion-select.ng-valid ion-select-option',
        popover: 'div.popover-content',
        expertiseTypesPopoverList: 'ion-radio-group.sc-ion-select-popover ion-item ion-label',
        radioButton: 'ion-radio-group.sc-ion-select-popover ion-item ion-radio',
        selectValue: 'ion-grid mobi-item-select ion-select'
    };

    get readOnlySelectingExpertiseType() {
        const test: string = this.selectors.dispatchAndExpertiseSection.concat(
            ':nth-of-type(2) ion-col:nth-of-type(2) div.info-detail'
        );
        return browser.$(test);
    }

    get expertiseTypeLabel() {
        return $(this.selectors.mobiItemSelect.concat(' div ion-label'));
    }

    get selectingExpertiseType() {
        return $(this.selectors.selectValue).shadow$('div.select-text');

    }

    get optionsComboBox() {
        return $$(this.selectors.optionsComboBox);
    }

    get expertiseTypesPopoverList() {
        return $$(this.selectors.expertiseTypesPopoverList);
    }

    get radioButtons() {
        return $$(this.selectors.radioButton);
    }

    get iconSelect() {
        return $(this.selectors.iconSelect);
    }

    get popover() {
        return $(this.selectors.popover);
    }
}
