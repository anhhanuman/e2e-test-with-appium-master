import {ScreenName, ScreenSelector} from "@shared/helpers/testdata";
import {NotificationElement} from "@apps/iaa/screen-objects/components/header-toolbar/notification/notification.element";

export class ToolbarElement extends NotificationElement {
    private button = ' ion-toolbar ion-buttons ion-button';

    constructor(protected screenName: string) {
        super(screenName);
    }

    get headerButtons(): WebdriverIO.Element[] {
        switch (this.screenName.toLowerCase()) {
            case ScreenName.Settings:
                return $$(ScreenSelector.settingScreen.concat(this.button));

            case ScreenName.Start:
                return $$(ScreenSelector.startScreen.concat(this.button));

            case ScreenName.Menu:
                return $$(ScreenSelector.menuScreen.concat(this.button));

            case ScreenName.BasicData:
                return $$(ScreenSelector.basicDataScreen.concat(this.button));

            case ScreenName.PartnerRelation:
                return $$(ScreenSelector.partnerRelationScreen.concat(this.button));

            case ScreenName.Contracts:
                return $$(ScreenSelector.contractScreen.concat(this.button));

            case ScreenName.ContractDetails:
                return $$(ScreenSelector.contractDetailsScreen.concat(this.button));

            case ScreenName.ForeignContractDetails:
                return $$(ScreenSelector.foreignContractDetailsScreen.concat(this.button));

            case ScreenName.Offers:
                return $$(ScreenSelector.offersScreen.concat(this.button));

            case ScreenName.Claims:
                return $$(ScreenSelector.claimsScreen.concat(this.button));

            case ScreenName.ClaimOverview:
                return $$(ScreenSelector.claimOverviewScreen.concat(this.button));

            case ScreenName.Documents:
                return $$(ScreenSelector.documentsScreen.concat(this.button));

            case ScreenName.AddDocument:
                return $$(ScreenSelector.addDocumentScreen.concat(this.button));

            case ScreenName.EditPartner:
                return $$(ScreenSelector.partnerModification.concat(this.button));

            case ScreenName.ScannedDocPreview:
                return $$(ScreenSelector.scannedDocumentPreview.concat(this.button));
        }
    }
}
