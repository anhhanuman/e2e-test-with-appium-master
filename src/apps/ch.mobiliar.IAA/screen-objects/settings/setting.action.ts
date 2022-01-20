import {SettingElement} from '@shared/screen-objects/setting/setting.element';
import {Screen} from '@shared/helpers/screen';
import {ButtonName, ScreenName} from "@shared/helpers/testdata";
import {BaseScreen} from "@apps/iaa/screen-objects/base/base-screen.action";
import {Toolbar} from "@apps/iaa/screen-objects/components/header-toolbar/toolbar/toolbar.action";

export class Setting extends BaseScreen {
    private readonly _toolbar: Toolbar

    constructor() {
        //super(ScreenName.Settings);
        super(ScreenName.Settings);
        this._toolbar = new Toolbar(ScreenName.Settings)
    }

    get toolbar() {
        return this._toolbar
    }

    tapLanguageDropdown() {
        SettingElement.getLanguageDropdown().click();

        return this;
    }

    tapKeepDownloadedPartnerDropdown() {
        SettingElement.getDownloadPartnerDropdown().click();

        return this;
    }

    tapDropdownAndSelectGermanLanguage() {
        this.tapLanguageDropdown();
        const deutschElement = SettingElement.getPopOverOption('deutsch');
        Screen.selectOptionInDropDown(deutschElement);

        return this;
    }

    tapDropdownAndSelectEnglishLanguage() {
        this.tapLanguageDropdown();
        const englishElement = SettingElement.getPopOverOption('english');
        Screen.selectOptionInDropDown(englishElement);

        return this;
    }

    tapDropdownAndSelectFrenchLanguage() {
        this.tapLanguageDropdown();
        const francaisElement = SettingElement.getPopOverOption('francais');
        Screen.selectOptionInDropDown(francaisElement);

        return this;
    }

    tapDropdownAndSelectItalianLanguage() {
        this.tapLanguageDropdown();
        const italianoElement = SettingElement.getPopOverOption('italiano');

        Screen.selectOptionInDropDown(italianoElement);

        return this;
    }

    useGermanLanguage() {
        const selectedShadowOptionElement = SettingElement.getShadowSelectedDropdown('language');
        const displayingOfSelectedLanguage: string = selectedShadowOptionElement.getText();
        if (displayingOfSelectedLanguage !== 'Deutsch') {
            this.tapDropdownAndSelectGermanLanguage()
                .tapBackButton();
        } else {
            this.tapBackButton();
        }

        return this;
    }

    useFrenchLanguage() {
        const selectedShadowOptionElement = SettingElement.getShadowSelectedDropdown('language');
        const displayingOfSelectedLanguage: string = selectedShadowOptionElement.getText();
        if (displayingOfSelectedLanguage !== 'Français') {
            this.tapDropdownAndSelectFrenchLanguage()
                .tapBackButton();
        } else {
            this.tapBackButton();
        }

        return this;
    }

    useItalianLanguage() {
        const selectedShadowOptionElement = SettingElement.getShadowSelectedDropdown('language');
        const displayingOfSelectedLanguage = selectedShadowOptionElement.getText();
        if (displayingOfSelectedLanguage !== 'Italiano') {
            this.tapDropdownAndSelectItalianLanguage()
                .tapBackButton();
        } else {
            this.tapBackButton();
        }

        return this;
    }

    useEnglishLanguage() {
        const selectedShadowOptionElement = SettingElement.getShadowSelectedDropdown('language');
        const displayingOfSelectedLanguage = selectedShadowOptionElement.getText();
        if (displayingOfSelectedLanguage !== 'English') {
            this.tapDropdownAndSelectEnglishLanguage()
                .tapBackButton();
        } else {
            this.tapBackButton();
        }

        return this;
    }

    tapBackButton() {
        this.toolbar
            .baseToolbar
            .tapToToolbarButton(ButtonName.Back);

        return this;
    }
}
