import {OverviewElement} from '../selectors/overview.selectors';
import {Screen} from '@shared/helpers/screen';

export class OverviewScreen {
    private overviewElement = new OverviewElement();

    isOverviewScreenDisplay() {
        return this.overviewElement.overviewTitle.isDisplayed();
    }

    private defineScreenElements(): Array<WebdriverIO.Element> {
        const overviewElements: Array<WebdriverIO.Element> = [];
        overviewElements.push(
            this.overviewElement.overviewTitle,
            this.overviewElement.settingsButton,
            this.overviewElement.topRightNewClaimCaseButton,
            this.overviewElement.createNewClaimCaseButton
        );
        return overviewElements;
    }

    waitForDisplay() {
        Screen.waitForElementsDisplay(this.defineScreenElements());

        return this;
    }

    private waitUntilNotDisplay() {
        Screen.waitUntilElementsNotDisplay(this.defineScreenElements());

        return this;
    }

    tapCreateNewClaimCaseButton() {
        this.overviewElement.createNewClaimCaseButton.click();
        this.waitUntilNotDisplay();

        return this;
    }

    tapTopRightNewClaimCaseButton() {
        this.overviewElement.topRightNewClaimCaseButton.click();
        this.waitUntilNotDisplay();
    }

    tapSettingsButton() {
        this.overviewElement.settingsButton.click();
        this.waitUntilNotDisplay();
    }

    getOverviewScreenTitle(): string {
        return this.overviewElement.overviewTitle.getText();
    }
}

const expectedOverviewScreenTitle: string = 'Claims';
export {expectedOverviewScreenTitle};
