import {BaseSelector} from '../../selectors/base-selector.selector';

export class SettingElement {
    static readonly settingSelectors = {
        languageLabel: '',
        dropDownSelect: '',
        keepDownloadedLabel: '',
        keepDownloadSelect: ''
    };

    static getLanguageDropdown() {
        return $$(BaseSelector.getDropdownSelect('settings'))[0];
    }

    static getShadowSelectedDropdown(whatDropdown: string) {
        const shadowSelectedInDropdown = BaseSelector.commonSelectors.shadowDropdownSelect;
        switch (whatDropdown.toLowerCase()) {
            case 'language':
                return this.getLanguageDropdown().shadow$(shadowSelectedInDropdown);
            case 'keep':
                return this.getDownloadPartnerDropdown().shadow$(shadowSelectedInDropdown);
            default:
                break;
        }
    }

    static getDownloadPartnerDropdown() {
        return $$(BaseSelector.getDropdownSelect('settings'))[1];
    }

    static getPopOverOption(optionName: string) {
        switch (optionName.toLowerCase()) {
            case 'english':
                const english: string = BaseSelector.getPopoverOption(4);
                return $(english);

            case 'deutsch':
                const deutsch: string = BaseSelector.getPopoverOption(1);
                return $(deutsch);

            case 'francais':
                const francais: string = BaseSelector.getPopoverOption(2);
                return $(francais);

            default:
                const italian: string = BaseSelector.getPopoverOption(3);
                return $(italian);
        }
    }
}
