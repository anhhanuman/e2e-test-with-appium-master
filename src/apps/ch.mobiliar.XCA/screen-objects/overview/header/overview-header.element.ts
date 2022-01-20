export class OverviewHeaderElement {
    private readonly selectors = {
        settingsButton: '#btn-go-to-settings',
        overviewTitle: 'ion-toolbar ion-title'
    }

    get settingsButton() {
        return $(this.selectors.settingsButton);
    }

    get overViewTitle() {
        return $(this.selectors.overviewTitle);
    }
}
