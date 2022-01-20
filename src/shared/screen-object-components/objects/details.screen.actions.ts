import {BaseDetailsElement} from '../../screen-objects/partner-details/base-details.element';
import {Screen} from '../../helpers/screen';

export class DetailsScreen {
    static waitForDisplay() {
        Screen.waitForElementDisplay(BaseDetailsElement.baseiPadDetailsScreenTitle);

        return this;
    }

    static getiPadDetailsScreenTitle(): string {
        return BaseDetailsElement.baseiPadDetailsScreenTitle.getText();
    }

    static waitForEmptyPartnerScreenDisplay() {
        Screen.waitForElementDisplay(BaseDetailsElement.searchButtonToSearchModalScreen);

        return this;
    }

    static waitForPartnerDetailsScreenDisplay() {
        Screen.waitForElementDisplay(BaseDetailsElement.partnerInfoSection);

        return this;
    }

    static tapSearchButton() {
        BaseDetailsElement.searchButtonToSearchModalScreen.click();

        return this;
    }

    static waitForPartnerInfoNotDisplay() {
        Screen.waitUntilElementNotDisplay(BaseDetailsElement.partnerInfoSection);

        return this;
    }

    static waitForLoadingCompleted() {
        Screen.waitUntilElementsNotDisplay(BaseDetailsElement.spinnerLoadingContents);

        return this;
    }
}
