import {ScreenName, ScreenSelector} from "@shared/helpers/testdata";

export class BaseNotificationElement {
    protected selector: ScreenSelector
    protected notificationSpinner = ' mobi-spinner img.loading-spinner';

    constructor(protected screenName: string) {
    }

    getSpinnerIcon() {
        switch (this.screenName.toLowerCase()) {
            case ScreenName.Start:
                return $(ScreenSelector.startScreen.concat(this.notificationSpinner));

            case ScreenName.Menu:
                return $(ScreenSelector.menuScreen.concat(this.notificationSpinner));

            case ScreenName.BasicData:
                return $(ScreenSelector.basicDataScreen.concat(this.notificationSpinner));

            case ScreenName.PartnerRelation:
                return $(ScreenSelector.partnerRelationScreen.concat(this.notificationSpinner));

            case ScreenName.Contracts:
                return $(ScreenSelector.contractScreen.concat(this.notificationSpinner));

            case ScreenName.ContractDetails:
                return $(ScreenSelector.contractDetailsScreen.concat(this.notificationSpinner));

            case ScreenName.ForeignContractDetails:
                return $(ScreenSelector.foreignContractDetailsScreen.concat(this.notificationSpinner));

            case ScreenName.Offers:
                return $(ScreenSelector.offersScreen.concat(this.notificationSpinner));

            case ScreenName.Claims:
                return $(ScreenSelector.claimsScreen.concat(this.notificationSpinner));

            case ScreenName.ClaimOverview:
                return $(ScreenSelector.claimOverviewScreen.concat(this.notificationSpinner));

            case ScreenName.Documents:
                return $(ScreenSelector.documentsScreen.concat(this.notificationSpinner));

            default:
                break;
        }
    }


}
