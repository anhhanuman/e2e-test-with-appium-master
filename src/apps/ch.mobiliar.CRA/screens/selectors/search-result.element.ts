export class SearchResultElement {
    private readonly selectors = {
        searchCriteriaInfo: '',
        emptyResult: '',
        searchResultItems: '',
        searchResultItemTitle: '',
        editButton: ''
    };

    get searchCriteriaInfo() {
        return $(this.selectors.searchCriteriaInfo);
    }

    get emptyResult() {
        return $(this.selectors.emptyResult);
    }

    get searchResultItems() {
        return $$(this.selectors.searchResultItems);
    }

    get searchResultItemTitle() {
        return $$(this.selectors.searchResultItemTitle);
    }

    get editButton() {
        return $(this.selectors.editButton);
    }
}
