export class WhereWhenSelector {
    private readonly selectors = {
        claimPlaceScreenIdentity: '',
        backButton: '',
        nextButton: '',
        searchInput: '',
        suggestionTitle: '',
        suggestionList: '',
        suggestionItems: '',
        partnerCurrentLocation: '',
        partnerHomeAddressItem: '',
        dateSelectBox: '',
        timeSelectBox: '',
        searchedLocationItems: '',
        pickerButtons: '',
        pickerColumns: ''
    };

    get claimPlaceScreenIdentity() {
        return $(this.selectors.claimPlaceScreenIdentity);
    }

    get backButton() {
        return $(this.selectors.backButton);
    }

    get nextButton() {
        return $(this.selectors.nextButton);
    }

    get searchInput() {
        return $(this.selectors.searchInput);
    }

    get suggestionList() {
        return $(this.selectors.suggestionList);
    }

    get suggestionItems() {
        return $(this.selectors.suggestionItems);
    }

    get suggestionTitle() {
        return $(this.selectors.suggestionTitle);
    }

    get partnerCurrentLocation() {
        return $(this.selectors.partnerCurrentLocation);
    }

    get searchedLocationItems() {
        return $$(this.selectors.searchedLocationItems);
    }

    get partnerHomeAddressItem() {
        return $(this.selectors.partnerHomeAddressItem);
    }

    get dateSelectBox() {
        return $(this.selectors.dateSelectBox);
    }

    get timeSelectBox() {
        return $(this.selectors.timeSelectBox);
    }

    get donePickerButton() {
        return $$(this.selectors.pickerButtons)[1];
    }

    get cancelPickerButton() {
        return $$(this.selectors.pickerButtons)[0];
    }

    getPickerColumnAtIndex(index: number) {
        return $$(this.selectors.pickerColumns)[index].$('.picker-opts');
    }
}
