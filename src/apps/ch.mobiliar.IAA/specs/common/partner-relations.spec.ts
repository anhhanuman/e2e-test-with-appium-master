import {
    numberOfPartnersInRelation,
    partnerRelationsInfo,
    PartnerRelationsScreen,
    relationStates
} from '../../screen-objects/partner-relations/partner-relations.action';
import {Precondition} from "@apps/iaa/precondition/precondition";
import {ScreenName} from "@shared/helpers/testdata";

const partnerRelation = new PartnerRelationsScreen();
describe('Partner Offers Test Suite', () => {
    beforeEach(() => {
        Precondition.displayPartnerRelationsScreen('P-1022-4709');
    });
    afterEach(() => {
        browser.reloadSession();
    });

    xit("Should display the  partner relations screen with proper partner's relations and states", () => {
        partnerRelation
            .toolbar
            .verify()
            .expectTitle(ScreenName.PartnerRelation);
        partnerRelation
            .verify()
            .expectedFoundTotalNumberOfPartnerInRelationEqual(numberOfPartnersInRelation)
            .expectedFoundRelationStatesOfPartnerEqual(relationStates)
            .expectedFoundNumberOfPartnerInStatesEqual(relationStates[0], 3)
            .expectedFoundNumberOfPartnerInStatesEqual(relationStates[1], 3)
            .expectedPartnerRelationInfo(partnerRelationsInfo);
    });
});
