import {SummaryElement} from '../selectors/summaryElement';
import {Screen} from '@shared/helpers/screen';

class SummaryScreen extends Screen {
    private element = new SummaryElement();

    private defineScreenElements(): Array<WebdriverIO.Element> {
        const summaryScreenElements: Array<WebdriverIO.Element> = [];
        summaryScreenElements.push(
            this.element.pageTitle
            //todo
        );
        return summaryScreenElements;
    }

    waitForDisplay() {
        Screen.waitForElementsDisplay(this.defineScreenElements());
    }

    tapGetClaimNumberButton(): void {
        this.element.getClaimNumberButton.click();
    }

    tapBeginInspectionButton(): void {
        this.element.beginInspectionButton.click();
    }

    tapRegisterAnotherClaimButton(): void {
        this.element.registerAnotherClaimButton.click();
    }
}

export const summaryScreen = new SummaryScreen();
