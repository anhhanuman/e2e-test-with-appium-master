export class SearchClaimElement {
    private readonly selectors = {
        numberTypeLabel: 'mobi-item-select ion-item ion-label',
        numberTypeSelectOptions: 'ion-select mobi-select-option',
        searchClaimResults: 'div.search-result mobi-card'
    };

    get numberTypeLabel() {
        return $(this.selectors.numberTypeLabel);
    }

    get numberType() {
        return $$(this.selectors.numberTypeSelectOptions);
    }

    get claimNumberOption() {
        return $$(this.selectors.numberTypeSelectOptions)[0];
    }

    get contractNumberOption() {
        return $$(this.selectors.numberTypeSelectOptions)[1];
    }

    get partnerNumberOption() {
        return $$(this.selectors.numberTypeSelectOptions)[2];
    }

    get searchClaimResults() {
        return $$(this.selectors.searchClaimResults);
    }
}
