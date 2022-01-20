import {BaseSearchPartnerElement} from '@shared/screen-objects/search-partner/base-search-partner.element';

export class SearchPartnerElement {
    private readonly selectors = {
        searchSegments: 'div.search-header ion-segment ion-segment-button',
        partnerSearchSegment: 'span.segment-text.content--ellipsis=Partner search',
        quickSearchInput: 'ion-row.search-bar__container input',
        quickSearchInputFocusBorder: 'ion-row.search-bar__container--has-border-purple',
        quickSearchButton: 'div.search-btn ion-button',
        vehicleRegistrationNumber: '(//XCUIElementTypeOther[@name="main"])[2]/XCUIElementTypeTextField[6]',
        clearIconOnQuickSearch: 'mobi-search-bar mobi-icon ion-icon'
    };

    get quickSearchInputFocusBorder() {
        return $(this.selectors.quickSearchInputFocusBorder);
    }

    get searchSegments() {
        return $$(this.selectors.searchSegments);
    }

    get partnerSearchSegment() {
        return $(this.selectors.partnerSearchSegment);
    }

    get quickSearchInput() {
        return $(this.selectors.quickSearchInput);
    }

    get quickSearchButton() {
        return $(this.selectors.quickSearchButton);
    }

    get vehicleRegistrationNumber() {
        if (BaseSearchPartnerElement.basicLabels[0].getText() === 'Number') {
            return $(this.selectors.vehicleRegistrationNumber);
        } else {
            return $(this.selectors.vehicleRegistrationNumber.replace('[6]', '[5]'));
        }
    }

    get clearIconOnQuickSearch() {
        return $(this.selectors.clearIconOnQuickSearch);
    }
}
