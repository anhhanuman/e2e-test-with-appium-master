export class PartnerRelationsValidator {
    constructor(private partnerRelationScreen: any) {
    }

    expectedFoundTotalNumberOfPartnerInRelationEqual(expectedNumberOfPartnersInRelation: number) {
        const numberOfPartner = this.partnerRelationScreen.getNumberOfPartnersInRelation();
        expect(numberOfPartner).toEqual(expectedNumberOfPartnersInRelation);

        return this;
    }

    expectedFoundRelationStatesOfPartnerEqual(expectedRelationStates: Array<string>) {
        const relationStates = this.partnerRelationScreen.getPartnerRelationStates();
        expect(relationStates).toEqual(expectedRelationStates);

        return this;
    }

    expectedFoundNumberOfPartnerInStatesEqual(whatState: string, expectedNumberOfPartnersInRelationState: number) {
        const numberOfPartnerInState: number = this.partnerRelationScreen.getNumberOfPartnersInStates(whatState);
        expect(numberOfPartnerInState).toEqual(expectedNumberOfPartnersInRelationState);

        return this;
    }

    expectedPartnerRelationInfo(expectedRelationInfo: Array<string>) {
        const relationInfo = this.partnerRelationScreen.getPartnerRelationsInfo().sort();
        expect(relationInfo).toEqual(expectedRelationInfo);

        return this;
    }
}
