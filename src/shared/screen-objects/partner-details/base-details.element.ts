export class BaseDetailsElement {
    private static readonly selectors = {
        iPadScreenTitle: 'ion-header ion-toolbar ion-title',
        searchButtonToSearchModalScreen: 'div.general ion-button',
        partnerInfoSection: 'div.info-container div.general',
        spinnerLoadingContent: 'div.spinner-container'
    };

    static get baseiPadDetailsScreenTitle() {
        return $(this.selectors.iPadScreenTitle);
    }

    static get searchButtonToSearchModalScreen() {
        return $(this.selectors.searchButtonToSearchModalScreen);
    }

    static get partnerInfoSection() {
        return $(this.selectors.partnerInfoSection);
    }

    static get spinnerLoadingContents() {
        return $$(this.selectors.spinnerLoadingContent);
    }
}
