export class AlertDialogElement {
    private static readonly selectors = {
        alertDialog: 'div.alert-wrapper',
        alertTitle: 'h2.alert-title',
        alertDialogContentMessage: 'div.alert-message',
        alertDialogButtons: 'div.alert-button-group button'
    };

    static get alertDialog() {
        return $(this.selectors.alertDialog);
    }

    static get alertTitle() {
        return $(this.selectors.alertTitle);
    }

    static get alertContentMessage() {
        return browser.$(this.selectors.alertDialogContentMessage);
    }

    static get alertDialogButtons() {
        return $$(this.selectors.alertDialogButtons);
    }
}
