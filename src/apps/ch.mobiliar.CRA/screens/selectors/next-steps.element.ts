export class NextStepsElement {
    private readonly selectors = {
        claimActionsScreenIdentity: '',
        backButton: '',
        nextButton: '',
        sendConfirmationToggle: '',
        commentInput: '',
        responsibleGA: ''
    };

    get responsibleGA() {
        return $(this.selectors.responsibleGA);
    }

    get claimActionsScreenIdentity() {
        return $(this.selectors.claimActionsScreenIdentity);
    }

    get backButton() {
        return $(this.selectors.backButton);
    }

    get nextButton() {
        return $(this.selectors.nextButton);
    }

    get sendConfirmationToggle() {
        return $(this.selectors.sendConfirmationToggle);
    }

    get commentInput() {
        return $(this.selectors.commentInput);
    }
}
