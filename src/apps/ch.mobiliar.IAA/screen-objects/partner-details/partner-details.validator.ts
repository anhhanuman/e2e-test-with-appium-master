export class PartnerDetailsValidator {
    constructor(private partnerDetails: any) {
    }

    expectedTextOfMobiAccount(expectedTextOfMobiAccount: Array<string>) {
        const actual = this.partnerDetails.getTextOfMobiAccount();
        expect(actual).toEqual(expectedTextOfMobiAccount);

        return this;
    }

    expectedTextBankAccount(expectedTextBankAccount: Array<string>) {
        const actual = this.partnerDetails.getTextBankAccount();
        expect(actual).toEqual(expectedTextBankAccount);

        return this;
    }

    expectedTextResponsibleAgent(expectedTextResponsibleAgent: Array<string>) {
        const actual = this.partnerDetails.getTextResponsibleAgent();
        expect(actual).toEqual(expectedTextResponsibleAgent);

        return this;
    }

    expectedContactInfo(expectedContactInfo: Array<string>) {
        const actual = this.partnerDetails.getContactInfo();
        expect(actual).toEqual(expectedContactInfo);

        return this;
    }

    expectedMBAcommunicationDisplayingStates(expectedMBAcommunicationDisplayingStates: Array<boolean>) {
        const actual = this.partnerDetails.getMBAcommunicationDisplayingStates();
        expect(actual).toEqual(expectedMBAcommunicationDisplayingStates);

        return this;
    }
}
