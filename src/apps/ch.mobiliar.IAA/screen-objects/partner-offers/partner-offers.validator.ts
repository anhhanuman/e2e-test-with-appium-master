import {PartnerOffersScreen} from "@apps/iaa/screen-objects/partner-offers/partner-offers.screen.action";

export class PartnerOffersValidator {
    constructor(private partnerOfferScreen: PartnerOffersScreen) {
    }

    expectedTotalOffers(expectedFoundTotalNumberOfPartnerOffer: number) {
        const numberOfOffer = this.partnerOfferScreen.getNumberOfOffers();
        expect(numberOfOffer).toEqual(expectedFoundTotalNumberOfPartnerOffer);

        return this;
    }

    expectOffersClickableStates(expectedOffersClickableStates: Array<boolean>) {
        const actual = this.partnerOfferScreen.getOffersClickableStates();
        expect(actual).toEqual(expectedOffersClickableStates);

        return this;
    }

    expectOffersInfo(expectedOffersInfo: Array<string>) {
        const headers = this.partnerOfferScreen.getOffersInfo();
        expect(headers).toEqual(expectedOffersInfo);

        return this;
    }
}
