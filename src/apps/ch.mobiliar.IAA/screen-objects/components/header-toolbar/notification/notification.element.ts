import {ScreenName, ScreenSelector} from "@shared/helpers/testdata";
import {BaseNotificationElement} from "@apps/iaa/screen-objects/components/header-toolbar/notification/base-notification.element";

export class NotificationElement extends BaseNotificationElement {
    protected overviewScreenError = ' mobi-icon.header-icon--error';
    protected notificationError = ' mobi-icon#menu-error-icon';

    getErrorNotificationIcon() {
        switch (this.screenName.toLowerCase()) {
            case ScreenName.Start:
                return $(ScreenSelector.startScreen.concat(this.overviewScreenError));

            case ScreenName.Menu:
                return $(ScreenSelector.menuScreen.concat(this.notificationError));

            case ScreenName.BasicData:
                return $(ScreenSelector.basicDataScreen.concat(this.notificationError));

            case ScreenName.PartnerRelation:
                return $(ScreenSelector.partnerRelationScreen.concat(this.notificationError));

            case ScreenName.Contracts:
                return $(ScreenSelector.contractScreen.concat(this.notificationError));

            case ScreenName.ForeignContractDetails:
                return $(ScreenSelector.foreignContractDetailsScreen.concat(this.notificationError));

            case ScreenName.Offers:
                return $(ScreenSelector.offersScreen.concat(this.notificationError));

            case ScreenName.Claims:
                return $(ScreenSelector.claimsScreen.concat(this.notificationError));

            case ScreenName.ClaimOverview:
                return $(ScreenSelector.claimOverviewScreen.concat(this.notificationError));

            case ScreenName.Documents:
                return $(ScreenSelector.documentsScreen.concat(this.notificationError));

            default:
                break;
        }
    }

}
