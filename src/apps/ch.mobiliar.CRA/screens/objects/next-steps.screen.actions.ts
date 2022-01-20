import Input from '../../../../shared/helpers/input';
import {NextStepsElement} from '../selectors/next-steps.element';
import {Screen} from '@shared/helpers/screen';

class NextStepsScreen {
    private element = new NextStepsElement();

    private defineScreenElements(): Array<WebdriverIO.Element> {
        const nextStepsScreenElements: Array<WebdriverIO.Element> = [];
        nextStepsScreenElements.push(
            this.element.claimActionsScreenIdentity,
            this.element.sendConfirmationToggle,
            this.element.responsibleGA,
            this.element.commentInput,
            this.element.nextButton
        );
        return nextStepsScreenElements;
    }

    waitForDisplay() {
        Screen.waitForElementsDisplay(this.defineScreenElements());
    }

    isNextStepsScreenDisplayed(): boolean {
        return this.element.claimActionsScreenIdentity.isDisplayed();
    }

    enterComment(comment: string) {
        Input.setInputValue(this.element.commentInput, comment);
    }

    toggleSendConfirmation() {
        this.element.sendConfirmationToggle.click();
    }

    tapNextButton(): void {
        this.element.nextButton.click();
    }

    processData(comment: string) {
        this.toggleSendConfirmation();
        this.enterComment(comment);
    }
}

export const nextStepsScreen = new NextStepsScreen();
