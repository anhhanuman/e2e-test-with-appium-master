import {Contexts} from '@shared/helpers';
import {
    MobiAccount,
    NoCustomerPortalAccount,
    PartnerDetailsScreen,
    PaulEbenerBankAccount,
    PaulEbenerContactInfo,
    PaulEbenerMBA,
    PaulGloorBankAccount,
    PaulGloorContactInfo,
    PaulGloorMBA
} from '../../screen-objects/partner-details/partner-details.action';

import {HeaderToolbarScreen} from '@shared/screen-object-components/header-toolbar/header-toolbar.screen.action';
import {Precondition} from "@apps/iaa/precondition/precondition";
import {ScreenName} from "@shared/helpers/testdata";

const partnerDetails = new PartnerDetailsScreen();
describe('Basic partner data test suite: ', () => {
    beforeEach(() => {
        browser.setImplicitTimeout(5000);
    });
    afterEach(() => {
        browser.reloadSession();
    });
    xit('should display the proper partner details Paul Gloor about the contracts info, customer Portal, bank account, MBA', () => {
        Precondition.removeAllRecentPartners();
        for (let i = 0; i < 2; i++) {
            Precondition.displayBasicDataScreen('P-1301-8718');
            partnerDetails.toolbar.verify().expectTitle(ScreenName.BasicData);
            partnerDetails
                .verify()
                .expectedContactInfo(PaulGloorContactInfo)
                .expectedTextOfMobiAccount(NoCustomerPortalAccount)
                .expectedTextBankAccount(PaulGloorBankAccount)
                .expectedTextResponsibleAgent(PaulGloorMBA);
            HeaderToolbarScreen.tapBackButton().tapHomeButton();
        }
    });

    xit('should display the proper partner details Paul Elbener about the contracts info, customer Portal, bank account, MBA', () => {
        Precondition.displayBasicDataScreen('P-1022-4709');
        partnerDetails
            .verify()
            .expectedContactInfo(PaulEbenerContactInfo)
            .expectedTextOfMobiAccount(NoCustomerPortalAccount)
            .expectedTextBankAccount(PaulEbenerBankAccount)
            .expectedTextResponsibleAgent(PaulEbenerMBA);
        partnerDetails
            .displayResponsibleAgentCommunication()
            .verify()
            .expectedMBAcommunicationDisplayingStates([true, true, true]);
        partnerDetails.tapToCallMBA();
    });
});

describe('Partner details: Customer portal login', () => {
    beforeEach(() => {
        Contexts.switchToWebview();
        Precondition.displayBasicDataScreen('P-1471-0550');
    });
    afterEach(() => {
        browser.reloadSession();
    });

    it('should display the proper partner details Katharina Mueller which has customer portal login: C-1000376', () => {
        partnerDetails
            .verify()
            .expectedTextOfMobiAccount(MobiAccount);
    });
});
