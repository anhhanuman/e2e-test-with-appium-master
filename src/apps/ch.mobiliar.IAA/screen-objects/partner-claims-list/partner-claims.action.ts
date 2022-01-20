import {PartnerClaimsElement} from './partner-claims.element';
import {Screen} from '@shared/helpers/screen';
import {PartnerClaimsValidator} from './partner-claims.validator';
import Gestures from '../../../../shared/helpers/gestures';
import {ButtonName, ScreenName} from "@shared/helpers/testdata";
import {BaseScreen} from "@apps/iaa/screen-objects/base/base-screen.action";
import {Toolbar} from "@apps/iaa/screen-objects/components/header-toolbar/toolbar/toolbar.action";

export class PartnerClaims extends BaseScreen {
    private partnerClaimsListElement = new PartnerClaimsElement();
    private readonly _toolbar: Toolbar;

    constructor() {
        super(ScreenName.Claims);
        this._toolbar = new Toolbar(ScreenName.Claims);
    }

    get toolbar() {
        return this._toolbar
    }

    waitForDisplay() {
        Screen.waitForElementDisplay(this.partnerClaimsListElement.claimsTile);

        return this;
    }

    tapClaim(whichClaimPosition: number) {
        let claimCardsOnlyElement = this.partnerClaimsListElement.claimCardsOnly[whichClaimPosition];
        Screen.tapToElement(claimCardsOnlyElement)
            .waitUntilElementNotDisplay(claimCardsOnlyElement);

        return this;
    }

    tapSegment(segmentName: string) {
        if (segmentName.toLowerCase() === 'finished') {
            Screen.tapToSegment('IAA', 'claim', 'finished');
        } else {
            Screen.tapToSegment('IAA', 'claim', 'pending');
        }

        return this;
    }

    tapPendingSegment() {
        Screen.tapToSegment('IAA', 'claim', 'pending');

        return this;
    }

    displayPendingClaimsList() {
        if (this.getPendingSegmentFocus()) {
            return;
        } else {
            this.tapPendingSegment();
        }
    }

    displayFinishedClaimsList() {
        if (this.getFinishedSegmentFocus()) {
            return;
        } else {
            this.tapFinishedSegment();
        }
    }

    getPendingSegmentFocus(): boolean {
        return Screen.getSegmentFocus('IAA', 'claim', 'pending');
    }

    getFinishedSegmentFocus(): boolean {
        return Screen.getSegmentFocus('IAA', 'claim', 'finished');
    }

    tapFinishedSegment() {
        Screen.tapToSegment('IAA', 'claim', 'finished');

        return this;
    }

    verify() {
        return new PartnerClaimsValidator(this);
    }

    getSegmentNames() {
        const pendingSegmentName = Screen.getSegmentNames('IAA', 'claim', 'pending');
        const finishedSegmentName = Screen.getSegmentNames('IAA', 'claim', 'finished');
        let segmentNames = [];
        segmentNames.push(pendingSegmentName, finishedSegmentName);

        return segmentNames;
    }

    getNumberOfPendingFullClaims() {
        this.displayPendingClaimsList();

        return this.partnerClaimsListElement.fullClaims.length;
    }

    getNumberOfFinishedFullClaims() {
        this.displayFinishedClaimsList();

        return this.partnerClaimsListElement.fullClaims.length;
    }

    getNumberOfMobiCardClaims() {
        return this.partnerClaimsListElement.claimCardsOnly.length;
    }

    tapFurtherPartialClaim(furtherPartialClaimPosition: number) {
        const furtherPartnerClaim = this.partnerClaimsListElement.furtherPartialClaimExpandCollapseButtons[furtherPartialClaimPosition];
        Screen.tapToElement(furtherPartnerClaim);

        return this;
    }

    getClaimWithoutFurtherPartialClaimsContents(claimPosition: number) {
        const claimContentElement = this.partnerClaimsListElement.fullClaims[claimPosition];

        return Screen.getTextOfElement(claimContentElement);
    }

    getPendingClaimCards() {
        this.displayPendingClaimsList();

        return Screen.getTextOfElements(this.partnerClaimsListElement.claimCardsOnly);
    }

    getFinishedClaimCards() {
        this.displayFinishedClaimsList();

        return Screen.getTextOfElements(this.partnerClaimsListElement.claimCardsOnly);
    }

    getClaimWithFurtherPartialClaimsContent(claimPosition: number, furtherPartialClaimPosition: number) {
        const furtherPartialClaimExpander = this.partnerClaimsListElement
            .furtherPartialClaimExpandCollapseButtons[furtherPartialClaimPosition];
        Gestures.scrollIntoView(furtherPartialClaimExpander);

        const claimContentElement = this.partnerClaimsListElement.fullClaims[claimPosition];

        return claimContentElement.getText();
    }

    tapBackButton() {
        this.toolbar
            .baseToolbar
            .tapToToolbarButton(ButtonName.Back);

        return this;
    }
}

