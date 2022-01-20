export class PartnerClaimDetailsValidator {
    constructor(private claimDetailsScreen: any) {
    }

    expectedPaymentInformation(expectedPaymentInformation: Array<string>[]) {
        const actual = this.claimDetailsScreen.getPaymentInformation();
        expect(actual).toEqual(expectedPaymentInformation);

        return this;
    }

    expectedResponsibleEmployeeForPartialClaim(responsibleEmployeeForPartialClaim: Array<string>) {
        const actual = this.claimDetailsScreen.getResponsibleEmployeeForPartialClaim();
        expect(actual).toEqual(responsibleEmployeeForPartialClaim);

        return this;
    }

    expectedClaimDetails(expectedClaimDetails: Array<string>[]) {
        const actual = this.claimDetailsScreen.getClaimDetails();
        expect(actual).toEqual(expectedClaimDetails);

        return this;
    }
}
