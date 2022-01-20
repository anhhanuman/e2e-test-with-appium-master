import {SettingElement} from './settingElement';
import {Screen} from '@shared/helpers/screen';
import {BaseElement} from '@shared/screen-object-components/elements/base.element';

export class SettingScreen {
    private element = new SettingElement();

    waitForDisplay() {
        Screen.waitForElementDisplay(this.element.backButtonSetting);
        Screen.waitForElementDisplay(this.element.configurationHeader);
        return this;
    }

    waitUntilElementNotExist() {
        Screen.waitUntilElementNotExist(this.element.backButtonSetting);

        return this;
    }

    tapToggleButton() {
        Screen.tapToElement(BaseElement.toggleButton);

        return this;
    }

    getToggleStatus(): string {
        return Screen.getTextOfElement(BaseElement.toggleStatus);
    }

    turnOnChooseImageFromGallery() {
        const currentToggleStatus: string = this.getToggleStatus();
        if (currentToggleStatus === 'No') {
            this.tapToggleButton();
            const nowToggleStatus: string = this.getToggleStatus();
            expect(nowToggleStatus).toEqual('Yes');
            return this;
        } else {
            return this;
        }
    }

    turnOffChooseImageFromGallery() {
        const currentToggleStatus: string = this.getToggleStatus();
        if (currentToggleStatus === 'Yes') {
            this.tapToggleButton();
            Screen.waitForAttributeStatus(BaseElement.toggleButton, 'aria-checked', 'false')
            const nowToggleStatus: string = this.getToggleStatus();
            expect(nowToggleStatus).toEqual('No');
        }

        return this;
    }

    tapBackButton() {
        Screen.tapToElement(this.element.backButtonSetting);
        return this;
    }

    tapBackButtonAndWaitForNotDisplay() {
        this.element.backButtonSetting.click()
        Screen.waitUntilElementNotDisplay(this.element.backButtonSetting);
    }
}
