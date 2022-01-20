import {OffersInfo, PartnerOffersScreen} from '../../screen-objects/partner-offers/partner-offers.screen.action';
import {Precondition} from "@apps/iaa/precondition/precondition";
import {ScreenName} from "@shared/helpers/testdata";


describe('Partner Offers Test Suite', () => {
    beforeEach(() => {
        Precondition.displayOffersScreen('P-1301-8718');
    });
    afterEach(() => {
        browser.reloadSession();
    });

    xit('Should display the proper Partner Offers screen', () => {
        const partnerOffers = new PartnerOffersScreen();
        partnerOffers
            .toolbar
            .verify()
            .expectTitle(ScreenName.Offers);
        partnerOffers
            .verify()
            .expectedTotalOffers(2)
            .expectOffersClickableStates([false, false])
            .expectOffersInfo(OffersInfo);
    });
});
