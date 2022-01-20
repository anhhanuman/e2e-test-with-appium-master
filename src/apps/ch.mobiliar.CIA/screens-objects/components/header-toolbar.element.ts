export class HeaderToolbarElement {
    private readonly selectors = {
        sendButton: 'app-menu ion-buttons:nth-of-type(2) ion-button',
        toHomeButton: 'app-menu ion-buttons:nth-of-type(1) ion-button'
    }

    get sendButton() {
        return $(this.selectors.sendButton);
    }

    get homeButton() {
        return $(this.selectors.toHomeButton);
    }

}
