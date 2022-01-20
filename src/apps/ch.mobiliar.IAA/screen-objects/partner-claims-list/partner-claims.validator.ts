export class PartnerClaimsValidator {
    constructor(private claimListScreen: any) {
    }

    expectedSegmentNames(expectedSegmentNames: Array<string>) {
        const actual = this.claimListScreen.getSegmentNames();
        expect(actual).toEqual(expectedSegmentNames);

        return this;
    }

    expectedNumberOfPendingFullClaims(expectedNumberOfFullClaims: number) {
        const actual = this.claimListScreen.getNumberOfPendingFullClaims();
        expect(actual).toEqual(expectedNumberOfFullClaims);

        return this;
    }

    expectedNumberOfFinishedFullClaims(expectedNumberOfFinishedFullClaims: number) {
        const actual = this.claimListScreen.getNumberOfFinishedFullClaims();
        expect(actual).toEqual(expectedNumberOfFinishedFullClaims);

        return this;
    }

    expectedClaimWithoutFurtherPartialClaimsContents(claimPosition: number, expectedClaimsContent: string) {
        const actual = this.claimListScreen.getClaimWithoutFurtherPartialClaimsContents(claimPosition);
        expect(actual).toEqual(expectedClaimsContent);

        return this;
    }

    expectedClaimWithFurtherPartialClaimsContent(
        claimPosition: number,
        furtherPartialClaimPosition: number,
        claimWithFurtherPartialClaims: string
    ) {
        const actual = this.claimListScreen.getClaimWithFurtherPartialClaimsContent(
            claimPosition,
            furtherPartialClaimPosition
        );
        expect(actual).toEqual(claimWithFurtherPartialClaims);

        return this;
    }

    expectedFoundPendingClaimCardsList(expectedFoundClaimsList: Array<string>) {
        const actual = this.claimListScreen.getPendingClaimCards();
        expect(actual).toEqual(expectedFoundClaimsList);

        return this;
    }

    expectedFoundFinishedClaimCardsList(expectedFoundClaimsList: Array<string>) {
        const actual = this.claimListScreen.getFinishedClaimCardsList();
        expect(actual).toEqual(expectedFoundClaimsList);

        return this;
    }
}
