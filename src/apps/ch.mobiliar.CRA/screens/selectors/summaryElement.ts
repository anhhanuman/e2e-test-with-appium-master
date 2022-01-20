export class SummaryElement {
    private readonly selectors = {
        claimStatusLabel: '',
        pageTitle: '',
        homeButton: '',
        claimStatusDescriptionLabel: '',
        claimInfo: '',
        partnerTitleLabel: '',
        partnerDOB: '',
        partnerAddress: '',
        getClaimNumberButton: '',
        beginInspectionButton: '',
        registerAnotherClaimButton: ''
    };

    get pageTitle() {
        return $(this.selectors.pageTitle);
    }

    get claimStatusLabel() {
        return $(this.selectors.claimStatusLabel);
    }

    get claimStatusDescriptionLabel() {
        return $(this.selectors.claimStatusDescriptionLabel);
    }

    get claimNumberLabel() {
        return $$(this.selectors.claimInfo)[0];
    }

    get claimDateLabel() {
        return $$(this.selectors.claimInfo)[1];
    }

    get claimPlaceLabel() {
        return $$(this.selectors.claimInfo)[2];
    }

    get claimDescriptionLabel() {
        return $$(this.selectors.claimInfo)[3];
    }

    get partnerTitleLabel() {
        return $(this.selectors.partnerTitleLabel);
    }

    get partnerDOB() {
        return $(this.selectors.partnerDOB);
    }

    get partnerAddress() {
        return $(this.selectors.partnerAddress);
    }

    get getClaimNumberButton() {
        return $(this.selectors.getClaimNumberButton);
    }

    get beginInspectionButton() {
        return $(this.selectors.beginInspectionButton);
    }

    get registerAnotherClaimButton() {
        return $(this.selectors.registerAnotherClaimButton);
    }
}
