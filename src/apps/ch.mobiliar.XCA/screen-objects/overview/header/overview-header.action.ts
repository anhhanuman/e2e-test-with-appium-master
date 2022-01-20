import {Screen} from "@shared/helpers/screen";
import {OverviewHeaderElement} from "@apps/xca/screen-objects/overview/header/overview-header.element";

export class OverviewHeader {
    private headerElement = new OverviewHeaderElement()

    waitForDisplay() {
        Screen.waitForElementDisplay(this.headerElement.settingsButton)
            .waitForElementDisplay(this.headerElement.overViewTitle);
    }

    tapSettingButton() {
        this.headerElement.settingsButton.click();

        return this;
    }

    tapSettingButtonAndWaitForNotDisplay() {
        this.tapSettingButton();
        Screen.waitUntilElementNotDisplay(this.headerElement.settingsButton)
        //Screen.tapAndWaitForNotDisplay(this.headerElement.settingsButton);

        return this;
    }

    isOverviewHeaderDisplayed() {
        return this.headerElement.settingsButton.isDisplayed() && this.headerElement.overViewTitle.isDisplayed();
    }

    getOverviewScreenTitle() {
        return this.headerElement.overViewTitle.getText();
    }
}
