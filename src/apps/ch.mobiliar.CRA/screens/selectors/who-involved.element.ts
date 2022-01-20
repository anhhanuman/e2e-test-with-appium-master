export class WhoInvolvedElement {
    private readonly selectors = {
        title: "ion-header div ion-title.title div.headerToolbar-title=Who's involved?",
        defaultYetPartnerIcon: 'div.default-avatar',
        yetPartnerInfo: 'div.avatar p',
        searchPartnerButton: '',
        claimPartnerScreenIdentity: '',
        partnerName: 'div.general h2',
        partnerDOB: 'div.personal span:nth-of-type(1)',
        partnerNumber: 'div.personal span:nth-of-type(2)',
        partnerContractLabels: 'div.child-page-content mobi-item-text',
        partnerContacts: 'div.child-page-content mobi-item-text div',
        phoneNumbersButton: 'span.btn-action ion-icon.test_btnShowPhoneNumbers',
        openMailComposerButton: 'span.btn-action ion-icon.test_btnOpenMailComposer',
        removePartnerDataButton: '',
        backButton: '',
        nextButton: ''
    };

    get partnerContactLabels() {
        return $$(this.selectors.partnerContractLabels);
    }

    get partnerContacts() {
        return $$(this.selectors.partnerContacts);
    }

    get partnerName() {
        return $(this.selectors.partnerName);
    }

    get partnerDOB() {
        return $(this.selectors.partnerDOB);
    }

    get partnerNumber() {
        return $(this.selectors.partnerNumber);
    }

    get yetPartnerInfo() {
        return $(this.selectors.yetPartnerInfo);
    }

    get searchPartnerButton() {
        return $(this.selectors.searchPartnerButton);
    }

    get title() {
        return $(this.selectors.title);
    }

    get defaultYetPartnerIcon() {
        return $(this.selectors.defaultYetPartnerIcon);
    }

    get claimPartnerScreenIdentity() {
        return $(this.selectors.claimPartnerScreenIdentity);
    }

    get phoneNumbersButton() {
        return $(this.selectors.phoneNumbersButton);
    }

    get openMailComposerButton() {
        return $(this.selectors.openMailComposerButton);
    }

    get removePartnerDataButton() {
        return $(this.selectors.removePartnerDataButton);
    }

    get backButton() {
        return $(this.selectors.backButton);
    }

    get nextButton() {
        return $(this.selectors.nextButton);
    }
}
