import {SearchClaimScreen} from "@apps/cia/screens-objects/objects/search-claim.screen.actions";
import {commonClaimNumberForInspection} from "@shared/helpers/testdata";
import {DetailsScreen} from "@shared/screen-object-components/objects/details.screen.actions";
import {DateTimeScreen} from "@shared/screen-object-components/date-time/date-time.screen";
import {overviewScreenCIA} from "@apps/cia/screens-objects/objects/overview.screen.actions";
import {baseSearchPartnerScreen} from "@shared/screen-object-components/objects/base-search-partner.screen";
import {OverviewScreen} from "@shared/screen-object-components/objects/base-overview.screen.actions";
import {HeaderToolbar} from "@apps/cia/screens-objects/components/header-toolbar.action";

const searchClaimScreenCIA = new SearchClaimScreen();
const header = new HeaderToolbar()
export class Precondition {
    static displayCommonPartnerDataAfterSearchClaim() {
        this.displaySearchCriteriaScreen();
        searchClaimScreenCIA.searchByNumber(commonClaimNumberForInspection);
        searchClaimScreenCIA.tapFoundClaimBySearchClaimNumberOnSearchResult();
        DetailsScreen.waitForPartnerDetailsScreenDisplay();
    }

    static displayPartnerDetailsAfterSearchByNumber() {
        searchClaimScreenCIA.searchByNumber(commonClaimNumberForInspection);
        searchClaimScreenCIA.tapFoundClaimBySearchClaimNumberOnSearchResult();
        DetailsScreen.waitForPartnerDetailsScreenDisplay();
    }

    static prepareClaimForSendingInspectionReport() {
        this.displaySearchCriteriaScreen();
        this.displayPartnerDetailsAfterSearchByNumber();
        this.prepareAppointment();
    }

    static prepareAppointment() {
        DateTimeScreen.selectDefaultDateTime();
    }

    static prepareAnUploadedInspectionReport() {
        this.prepareClaimForSendingInspectionReport();
        header.tapSendButtonAndConfirm();
        overviewScreenCIA.waitForAnInspectionReportDisplay();
    }

    static displaySearchCriteriaScreen() {
        this.createAnEmptyInspectionReportAndDisplayEmptyMenu();
        DetailsScreen.waitForEmptyPartnerScreenDisplay().tapSearchButton();

        baseSearchPartnerScreen.waitForDisplay();
        baseSearchPartnerScreen.waitForPartnerNumberAndAttributes();
    }

    static createAnIncompleteReportOnOverviewScreen() {
        this.createAnEmptyInspectionReportAndDisplayEmptyMenu();
        //HeaderToolbarScreen.displayOverviewScreen();
        overviewScreenCIA.waitForAnInspectionReportDisplay();
    }

    static createAnEmptyInspectionReportAndDisplayEmptyMenu() {
        OverviewScreen.tapPlusButton();
        //HeaderToolbarScreen.waitForDisplay();
    }
}
