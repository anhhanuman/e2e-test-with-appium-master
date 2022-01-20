import {PartnerOffersElement} from './partner-offers.element';
import {PartnerOffersValidator} from './partner-offers.validator';
import {Screen} from '@shared/helpers/screen';
import {BaseScreen} from "@apps/iaa/screen-objects/base/base-screen.action";
import {ScreenName} from "@shared/helpers/testdata";
import {Toolbar} from "@apps/iaa/screen-objects/components/header-toolbar/toolbar/toolbar.action";

export class PartnerOffersScreen extends BaseScreen {
    private partnerOffersElement = new PartnerOffersElement();
    private readonly _toolbar: Toolbar

    constructor() {
        super(ScreenName.Offers);
        this._toolbar = new Toolbar(ScreenName.Offers);
    }

    get toolbar() {
        return this._toolbar
    }

    verify() {
        return new PartnerOffersValidator(this);
    }

    getNumberOfOffers(): number {
        return this.partnerOffersElement.offers.length;
    }

    getOffersClickableStates(): Array<boolean> {
        let offerElements = this.partnerOffersElement.offers;
        let offerStates = [];
        for (const element of offerElements) {
            offerStates.push(element.isClickable());
        }
        return offerStates;
    }

    getOffersInfo() {
        let offers = this.partnerOffersElement.offerTitlesAndContents;

        return Screen.getTextOfElements(offers);
    }
}

export const OffersInfo = [
    'MobiTour',
    'MobiTour',
    '01.10.2020 - 31.12.2025\nAktiv',
    '14.10.2020 - 31.10.2021\nAktiv'
];
