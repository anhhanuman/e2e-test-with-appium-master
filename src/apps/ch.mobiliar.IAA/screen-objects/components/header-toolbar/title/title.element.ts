import {ScreenName, ScreenSelector} from "@shared/helpers/testdata";

export class TitleElement {
    private title = ' ion-toolbar ion-title';

    constructor(private screenName: string) {
    }

    getHeaderTitle() {
        switch (this.screenName.toLowerCase()) {
            case ScreenName.Settings:
                return $(ScreenSelector.settingScreen.concat(this.title));

            case ScreenName.Start:
                return $(ScreenSelector.startScreen.concat(this.title));

            case ScreenName.Menu:
                return $(ScreenSelector.menuScreen.concat(this.title));

            case ScreenName.BasicData:
                return $(ScreenSelector.basicDataScreen.concat(this.title));

            case ScreenName.PartnerRelation:
                return $(ScreenSelector.partnerRelationScreen.concat(this.title));

            case ScreenName.Contracts:
                return $(ScreenSelector.contractScreen.concat(this.title));

            case ScreenName.ContractDetails:
                return $(ScreenSelector.contractDetailsScreen.concat(this.title));

            case ScreenName.ForeignContractDetails:
                return $(ScreenSelector.foreignContractDetailsScreen.concat(this.title));

            case ScreenName.Offers:
                return $(ScreenSelector.offersScreen.concat(this.title));

            case ScreenName.Claims:
                return $(ScreenSelector.claimsScreen.concat(this.title));

            case ScreenName.ClaimOverview:
                return $(ScreenSelector.claimOverviewScreen.concat(this.title));

            case ScreenName.Documents:
                return $(ScreenSelector.documentsScreen.concat(this.title));

            case ScreenName.AddDocument:
                return $(ScreenSelector.addDocumentScreen.concat(this.title));

            case ScreenName.EditPartner:
                return $(ScreenSelector.partnerModification.concat(this.title));

            case ScreenName.ScannedDocPreview:
                return $(ScreenSelector.scannedDocumentPreview.concat(this.title));
        }
    }
}
