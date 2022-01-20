export class PartnerClaimsElement {
    private readonly selectors = {
        appClaim: 'app-claim',
        claimsTile: 'app-claim ion-title',
        registerClaimButton: 'mobi-button div.content',
        missingClaimInfo: 'app-claim mobi-hint',
        segments: 'ion-segment',
        claimCards: 'div.child-page-content app-expander mobi-card div.container',
        fullClaims: 'app-expander div.expander',
        furtherPartialClaimExpandCollapseButtons: 'div.bottom-expander',
        claimWithoutFurtherPartialClaims: 'div.full-border'
    };

    get claimsTile() {
        return $(this.selectors.claimsTile);
    }

    get registerClaimButton() {
        return $(this.selectors.registerClaimButton);
    }

    get missingClaimInfo() {
        return $(this.selectors.missingClaimInfo);
    }

    get segments() {
        return $$(this.selectors.segments);
    }

    get fullClaims() {
        return $$(this.selectors.appClaim.concat(' ', this.selectors.fullClaims));
    }

    get furtherPartialClaimExpandCollapseButtons() {
        return $$(
            this.selectors.appClaim.concat(
                ' ',
                this.selectors.fullClaims,
                ' ',
                this.selectors.furtherPartialClaimExpandCollapseButtons
            )
        );
    }

    get claimWithoutFurtherPartialClaims() {
        return $$(
            this.selectors.appClaim.concat(
                ' ',
                this.selectors.fullClaims,
                ' ',
                this.selectors.claimWithoutFurtherPartialClaims
            )
        );
    }

    get claimCardsOnly() {
        return $$(this.selectors.claimCards);
    }
}
