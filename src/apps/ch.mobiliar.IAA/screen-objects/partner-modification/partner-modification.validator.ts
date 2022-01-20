export class PartnerModificationValidator {
    constructor(private partnerModificationScreen: any) {
    }

    expectedMainCommunicationEqualTo(expectedMainCommunication: Array<string>[]) {
        let communicationInfo: Array<string>[] = this.partnerModificationScreen.getMainCommunicationInfo();
        if (communicationInfo.length > 0) {
            if (communicationInfo[0][0] === 'Private number') {
                communicationInfo[0].shift();
                communicationInfo[0].unshift('Telephone number');
            }
        }
        expect(communicationInfo).toEqual(expectedMainCommunication);

        return this;
    }
}
