import {DeviceType} from '@shared/helpers';

const deviceType = browser.capabilities['deviceType'];

export class BaseSearchPartnerElement {
    private static readonly headerModalSelectors = {
        closeModalButton: 'ion-modal ion-toolbar ion-buttons',
        searchPartnerScreenIdentity: 'ion-modal ion-header ion-title',
        searchPartnerScreenIdentityiPad: 'ion-modal ion-header ion-toolbar span'
    };

    private static readonly searchFormSelectors = {
        segmentButtons: 'div.search-form ion-segment ion-segment-button',
        rowAttribute: 'mobi-item-input ion-input',
        searchInputs: 'mobi-item-input ion-input input.native-input',
        phone: '(//XCUIElementTypeOther[@name="main"])[2]/XCUIElementTypeTextField[4]',
        zipInput: 'mobi-auto-complete ion-input input.native-input',
        zipSelectBox: 'ul li',
        contractNumberInput: '',
        inputErrorIcon: 'div.invalid-icon mobi-icon.icon-error',
        inputErrorContent: 'div.input-tooltip__content span',
        searchCriteriaLabel: '',
        numberTypeLabel: 'ion-item ion-label',
        zipPlaceLabel: 'mobi-auto-complete ion-label',
        basicLabels: 'mobi-item-input ion-label', //number,last,first,street
        searchPartnerButton: 'form div.search-btn ion-button'
    };

    private static readonly searchResultSelectors = {
        searchCriteriaLabelOnSearchResult: 'div.search-info div.header',
        penEditIcon: 'div.edit-icon ion-icon',
        searchCriteriaBy: 'div.criteria',
        searchPartnerResult: 'div.search-result',
        foundPartnerFullNames: 'div.search-item-title div',
        foundPartnerDOBAndAddress: 'div.search-item-detail div'
    };

    constructor(appName?: string) {
        if (appName === 'IAA') {
            BaseSearchPartnerElement.searchFormSelectors.searchPartnerButton = 'form div.search-btn ion-button';
        }
    }

    static get searchInputs() {
        return $$(this.searchFormSelectors.searchInputs);
    }

    static get searchCriteriaBy() {
        return $(this.searchResultSelectors.searchCriteriaBy);
    }

    static get penEditIcon() {
        return $(this.searchResultSelectors.penEditIcon);
    }

    static get searchCriteriaLabelOnSearchResult() {
        return $(this.searchResultSelectors.searchCriteriaLabelOnSearchResult);
    }

    static get foundPartnerFullNames() {
        return $$(this.searchResultSelectors.foundPartnerFullNames);
    }

    static get foundPartnerDOBAndAddress() {
        return $$(this.searchResultSelectors.foundPartnerDOBAndAddress);
    }

    static get closeModalButton() {
        return $(this.headerModalSelectors.closeModalButton);
    }

    static get rowAttribute() {
        return $$(this.searchFormSelectors.rowAttribute);
    }

    static get searchPartnerButton() {
        return $(this.searchFormSelectors.searchPartnerButton);
    }

    static get searchPartnerScreenIdentity() {
        if (deviceType === DeviceType.iPhone) {
            return $(this.headerModalSelectors.searchPartnerScreenIdentity);
        } else {
            return $(this.headerModalSelectors.searchPartnerScreenIdentityiPad);
        }
    }

    static get partnerNumberSegment() {
        return $$(this.searchFormSelectors.segmentButtons)[0];
    }

    static get contractNumberSegment() {
        return $$(this.searchFormSelectors.segmentButtons)[1];
    }

    static get numberInput() {
        return $$(this.searchFormSelectors.searchInputs)[0];
    }

    static get lastNameOrCompanyInput() {
        return $$(this.searchFormSelectors.searchInputs)[1];
    }

    static get firstNameOrCompanyInput() {
        return $$(this.searchFormSelectors.searchInputs)[2];
    }

    static get zipInput() {
        return $(this.searchFormSelectors.zipInput);
    }

    static get inputtedZip() {
        return $(this.searchFormSelectors.zipInput).shadow$('div');
    }

    static get zipSelectBox() {
        return $(this.searchFormSelectors.zipSelectBox);
    }

    static get streetInput() {
        return $$(this.searchFormSelectors.searchInputs)[3];
    }

    static get phoneNativeInput() {
        if (this.basicLabels[0].getText() === 'Number') {
            return $(this.searchFormSelectors.phone.replace('[4]', '[5]'));
        } else return $(this.searchFormSelectors.phone);
    }

    static get contractNumberInput() {
        return $(this.searchFormSelectors.searchInputs);
    }

    static get inputErrorIcon() {
        return $$(this.searchFormSelectors.inputErrorIcon);
    }

    static get inputErrorContent() {
        const errorTitle = this.searchFormSelectors.inputErrorContent.concat('.input-tooltip__title');
        const errorContent = this.searchFormSelectors.inputErrorContent.concat('.input-tooltip__message');

        let errorTitleAndContent = [];
        errorTitleAndContent.push($(errorTitle), $(errorContent));

        return errorTitleAndContent;
    }

    static get numberTypeLabel() {
        return $(this.searchFormSelectors.numberTypeLabel);
    }

    static get numberLabel() {
        return $$(this.searchFormSelectors.basicLabels)[0];
    }

    static get lastNameLabel() {
        return $$(this.searchFormSelectors.basicLabels)[1];
    }

    static get firstNameLabel() {
        return $$(this.searchFormSelectors.basicLabels)[2];
    }

    static get zipPlaceLabel() {
        return $(this.searchFormSelectors.zipPlaceLabel);
    }

    static get streetLabel() {
        return $$(this.searchFormSelectors.basicLabels)[3];
    }

    static get searchCriteriaLabel() {
        return $(this.searchFormSelectors.searchCriteriaLabel);
    }

    static get searchFoundPartner() {
        return $(this.searchResultSelectors.searchPartnerResult.concat(' div.search-item'));
    }

    static get partnerCardsOnSearchResult() {
        return $$(this.searchResultSelectors.searchPartnerResult.concat(' div.search-item'));
    }

    static get emptyPartnerOnSearchResult() {
        return $(this.searchResultSelectors.searchPartnerResult.concat(' div.empty-result span'));
    }

    static get partnerAttributesAndNumber() {
        let partnerAttributes = [];
        const basicLabels = $$(this.searchFormSelectors.basicLabels);
        for (let i = 1; i < basicLabels.length; i++) {
            partnerAttributes.push(basicLabels[i]);
        }
        return partnerAttributes;
    }

    static get basicLabels() {
        return $$(this.searchFormSelectors.basicLabels);
    }
}
