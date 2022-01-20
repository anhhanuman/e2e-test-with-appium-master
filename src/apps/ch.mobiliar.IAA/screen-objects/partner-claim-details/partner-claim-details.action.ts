import {PartnerClaimDetailsElement} from './partner-claim-details.element';
import Gestures from '../../../../shared/helpers/gestures';
import {Screen} from '@shared/helpers/screen';
import {PartnerClaimDetailsValidator} from './partner-claim-details.validator';
import {ButtonName, ScreenName} from "@shared/helpers/testdata";
import {BaseScreen} from "@apps/iaa/screen-objects/base/base-screen.action";
import {Toolbar} from "@apps/iaa/screen-objects/components/header-toolbar/toolbar/toolbar.action";

class PartnerClaimDetails extends BaseScreen {
    private partnerClaimDetailsElement = new PartnerClaimDetailsElement();
    private readonly _toolbar: Toolbar

    constructor() {
        //super(ScreenName.ClaimOverview);
        super(ScreenName.Offers);
        this._toolbar = new Toolbar(ScreenName.ClaimOverview)
    }

    get toolbar() {
        return this._toolbar;
    }

    verify() {
        return new PartnerClaimDetailsValidator(this);
    }

    getClaimDetails(): Array<string>[] {
        let claimDetails: Array<string>[] = [];

        const size: number = this.partnerClaimDetailsElement.claimDetails.length;
        const claimLabelElements = this.partnerClaimDetailsElement.claimLabels;
        const claimContentElements = this.partnerClaimDetailsElement.claimContents;

        let label: string = '';
        let content: string = '';

        for (let i = 0; i < size; i++) {
            Gestures.scrollIntoView(claimLabelElements[i]);
            label = claimLabelElements[i].getText();

            Gestures.scrollIntoView(claimContentElements[i]);
            content = claimContentElements[i].getText();

            claimDetails.push([label, content]);
        }
        return claimDetails;
    }

    getPaymentInformation(): Array<string>[] {
        let paymentInformation: Array<string>[] = [];

        let compensation: Array<string> = this.getCompensation();
        paymentInformation.push(compensation);

        let netCosts = this.getNetCosts();
        paymentInformation.push(netCosts);

        return paymentInformation;
    }

    getCompensation() {
        return Screen.getTextOfElements(this.partnerClaimDetailsElement.compensation);
    }

    getNetCosts() {
        return Screen.getTextOfElements(this.partnerClaimDetailsElement.netCost);
    }

    getResponsibleEmployeeForPartialClaim() {
        let employeeTitleAndContent = this.partnerClaimDetailsElement.employeeCardTitleAndContent;

        return Screen.getTextOfElements(employeeTitleAndContent);
    }

    getPaymentErrorInformation() {
        Gestures.scrollIntoView(this.partnerClaimDetailsElement.paymentErrorMessage);

        return this.partnerClaimDetailsElement.paymentErrorMessage.getText();
    }

    isPaymentErrorIconDisplayed() {
        return this.partnerClaimDetailsElement.paymentErrorIcon.isDisplayed();
    }

    tapBackButton() {
        this.toolbar
            .baseToolbar
            .tapToToolbarButton(ButtonName.Back);

        return this;
    }
}

const expectedPaymentErrorInfo = 'The payment information cannot be displayed at the moment.';

export {expectedPaymentErrorInfo};

export const partnerClaimDetailsScreen = new PartnerClaimDetails();
