import {HeaderToolbarElement} from './header-toolbar.element';
import {DeviceType} from '@shared/helpers';
import {BaseSelector} from '@shared/selectors/base-selector.selector';
import {Screen} from "@shared/helpers/screen";

const deviceType = browser.capabilities['deviceType'];
export class HeaderToolbarScreen {

    static isBackButtonDisplayed() {
        return HeaderToolbarElement.backButton.isDisplayed();
    }

    static tapHomeButton() {
        HeaderToolbarElement.getHomeButton().click();

        return this;
    }

    static tapBackButton(whatScreen?: string) {
        if (deviceType === DeviceType.iPhone) {
            if (whatScreen === undefined) {
                HeaderToolbarElement.backButton.click();
            } else {
                if (whatScreen.toLowerCase() === 'contract details') {
                    const backButtonSelector = BaseSelector.getContractDetailsScreen().concat(' ion-buttons:nth-of-type(1) ion-button');
                    const backButtonOnContractDetails = $(backButtonSelector);
                    backButtonOnContractDetails.click();
                    browser.pause(1000);
                } else {
                    HeaderToolbarElement.backButton.click();
                }
            }
        } else {
        }
        return this;
    }

    static tapBackButtonAndWaitForNotDisplay() {
        Screen.tapAndWaitForNotDisplay(HeaderToolbarElement.backButton)

        return this;
    }


}
