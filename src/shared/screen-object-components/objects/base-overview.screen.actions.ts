import {Screen} from '../../helpers/screen';
import {OverviewElement} from '../overview/overview.element';

export class OverviewScreen {
    constructor() {
    }

    static waitForDisplay() {
        Screen.waitForElementDisplay(OverviewElement.baseSettingButton)
            .waitForElementDisplay(OverviewElement.basePlusButton);

        return this;
    }

    static tapPlusButton() {
        OverviewElement.basePlusButton.click();
        Screen.waitUntilElementNotDisplay(OverviewElement.basePlusButton);

        return this;
    }
}
