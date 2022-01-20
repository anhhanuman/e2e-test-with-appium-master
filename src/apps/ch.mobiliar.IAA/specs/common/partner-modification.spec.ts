/*
import {PartnerModification} from '@apps/iaa/screen-objects/partner-modification/partner.modification';
import {PartnerDetailsScreen} from '@apps/iaa/screen-objects/partner-details/partner-details.action';
import {Precondition} from "@apps/iaa/precondition/precondition";

const partnerDetailsScreen = new PartnerDetailsScreen();
const editPartnerDataModal = new PartnerModification();

describe('', () => {
    beforeEach(() => {
        Precondition.displayBasicDataScreen('P-2103-9741'); //P-2103-9741, P-1007-9279
    });
    afterEach(() => {
        browser.reloadSession();
    });
    it('should display the edit partner data modal screen properly', () => {
        const mainCommunication = partnerDetailsScreen.getMainCommunication();
        partnerDetailsScreen
            .toolbar
            .getActionMenu()
            .displayEditPartnerDataModal()
            .verify()
            .expectedMainCommunicationEqualTo(mainCommunication);
        editPartnerDataModal.tapPrivateNumberCard()
            .inputNumber(12345)
            .tapBackButton();
    });
});
*/
