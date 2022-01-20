import {MenuNavigationScreen} from "@apps/iaa/static/menu-navigation-screen.action";
import {Document} from '@apps/iaa/screen-objects/document/document.action';
import {Contract} from '@apps/iaa/screen-objects/contract/contract.action';
import {Precondition} from "@apps/iaa/precondition/precondition";
import {StartScreen} from "@apps/iaa/screen-objects/start/start.screen.actions";
import {Toolbar} from "@apps/iaa/screen-objects/components/header-toolbar/toolbar/toolbar.action";
import {ComponentIcon, MenuName, ScreenName, SegmentName} from "@shared/helpers/testdata";
import {PartnerDetailsScreen} from "@apps/iaa/screen-objects/partner-details/partner-details.action";
import {Error} from "ts-lint/lib/error";
import {BaseSearchPartnerElement} from "@shared/screen-objects/search-partner/base-search-partner.element";
import {SearchPartnerScreen} from "@apps/iaa/screen-objects/search-partner/search-partner.screen.actions";
import {ActionMenu} from "@apps/iaa/screen-objects/components/header-toolbar/action-menu/action-menu.action";

const startScreen = new StartScreen();
const contract = new Contract();
const document = new Document();

export class Workflow {

    static downloadDocsForMultiplePartners(partners: Array<string>) {
        const actionMenuButton = new ActionMenu(ScreenName.Menu);
        const toolbar = new Toolbar(ScreenName.Menu);
        for (const partner of partners) {
            Precondition.doQuickSearchAndDisplayPartnerOverview(partner);
            actionMenuButton.downloadAllDocuments(true);
            toolbar.tapHomeButton(true)
        }

        return this;
    }

    static verifyDownloadingDocsForMultiplePartners(partners: Array<string>) {
        const toolbar = new Toolbar(ScreenName.Menu)
        for (const partner of partners) {
            Precondition.doQuickSearchAndDisplayPartnerOverview(partner);
            if (MenuNavigationScreen.getMenuDetails(MenuName.Contracts) !== '') {
                MenuNavigationScreen
                    .verify()
                    .expectComponentIconDisplayedOn(ComponentIcon.SuccessIcon, MenuName.Contracts, true)
                MenuNavigationScreen.tapMenuName(MenuName.Contracts);
                contract
                    .verify()
                    .expectDownloadedContracts()
                contract.toolbar.tapBackButton(true);
            }
            if (MenuNavigationScreen.getMenuDetails(MenuName.Documents) !== '') {
                MenuNavigationScreen
                    .verify()
                    .expectComponentIconDisplayedOn(ComponentIcon.SuccessIcon, MenuName.Documents, true)

                MenuNavigationScreen.tapMenuName(MenuName.Documents);
                document
                    .verify()
                    .expectDocumentsDownloadedSuccessfully();
                document.tapBackButton();
            }
            toolbar.tapHomeButton(true)
        }
    }

    static displayEachPartnerOnFavoritePartners() {
        startScreen.displayFavoritePartner();
        const totalPartners = startScreen.getTotalPartnerCards()
        const toolbar = new Toolbar(ScreenName.Menu);

        for (let i = 1; i <= totalPartners; i++) {
            startScreen.tapToPartnerAt(i)
            toolbar.tapHomeButton(false);
            browser.pause(500);
        }
        return this;
    }

    static displayMoreRecentPartnersToSync() {
        const totalRecentPartners = startScreen.getTotalRecentPartners();
        const totalRequireRecentPartners = 11;
        const toolbar = new Toolbar(ScreenName.Menu);

        if (totalRecentPartners < totalRequireRecentPartners) {
            startScreen.displayFavoritePartner();
            const favoritePartners = startScreen.getTotalPartnerCards();
            const needPartners = totalRequireRecentPartners - totalRecentPartners;
            if (favoritePartners > needPartners) {
                for (let i = 1; i <= needPartners; i++) {
                    startScreen.tapToPartnerAt(i);
                    Precondition.waitForDownloadingBasicPartnerData()
                    toolbar.tapHomeButton(true);
                }
            } else {
                throw new Error('Not enough favorite partners, need to search more partners, check test case');
            }
        }
    }

    static verifyStartScreenNotHaveError() {
        startScreen.toolbar.notification.waitForSpinnerNotificationLoadingCompleted();
        startScreen.toolbar.verify().expectErrorDisplayOnHeader(false)
        startScreen
            .verify()
            .expectNotDisplayErrorIconOnSegment(SegmentName.Favorites)
            .expectNotDisplayErrorIconOnSegment(SegmentName.Recent);

        return this;
    }

    static walkThroughSearchResults(searchForPartnerName: string) {
        const toolbar = new Toolbar(ScreenName.Menu);
        startScreen.tapSearchButton();
        const searchPartnerScreen = new SearchPartnerScreen();
        searchPartnerScreen.waitForDisplay();
        searchPartnerScreen.inputQuickPartnerAndSearch(searchForPartnerName);
        const totalFoundPartner = BaseSearchPartnerElement.partnerCardsOnSearchResult.length;
        searchPartnerScreen.tapPenIcon()
            .tapQuickSearchButtonAndWait()
        for (let i = 0; i < totalFoundPartner; i++) {
            searchPartnerScreen.tapFoundPartnerOnSearchResultAndWait(i);
            toolbar.tapHomeButton(true);
            if (i === totalFoundPartner - 1) break
            startScreen.tapSearchButton();
            searchPartnerScreen.inputQuickPartnerAndSearch(searchForPartnerName);
        }
    }

    static verifyMenuAndDetailsScreenNotHaveError() {
        const toolbar = new Toolbar(ScreenName.Menu);
        toolbar.verify().expectErrorDisplayOnHeader(false)
        MenuNavigationScreen.tapMenuName(MenuName.BasicData);
        const partnerDetails = new PartnerDetailsScreen();
        browser.pause(1000);
        partnerDetails
            .toolbar
            .verify()
            .expectErrorDisplayOnHeader(false);
        partnerDetails.toolbar
            .tapBackButton(true);
        toolbar.tapHomeButton(true)

        return this;
    }

    static removeFirstFavoritePartnerAndAddAgain() {
        const partnerNames = startScreen.getFavoritePartnerNames();
        const initialTotalPartner = partnerNames.length;
        startScreen.tapToFirstPartner();
        Precondition.waitForDownloadingBasicPartnerData();
        const menuToolbar = new Toolbar(ScreenName.Menu);
        menuToolbar.actionMenu.unmarkAsFavorite();
        menuToolbar.tapHomeButton(true);
        startScreen.verify().expectNumberOfFavoritePartners(initialTotalPartner - 1);
        startScreen.tapRecentSegment().tapToFirstPartner();
        menuToolbar.actionMenu.markAsFavorite();
        menuToolbar.tapHomeButton(true);
        startScreen.waitForPartnerCardDisplay(initialTotalPartner);

        startScreen.verify().expectPartnerNames(SegmentName.Favorites, partnerNames)
    }

    static getFavoritePartnerNumbers(): string[] {
        const totalFavoritePartners = startScreen.getTotalPartnerCards();
        const partnerDetails = new PartnerDetailsScreen();
        const toolbar = new Toolbar(ScreenName.Menu);
        let favoritePartnerNumber = [];
        for (let i = 1; i <= totalFavoritePartners; i++) {
            startScreen.tapToPartnerAt(i);
            Precondition.waitForDownloadingBasicPartnerData();
            MenuNavigationScreen.tapMenuName(MenuName.BasicData);
            const partnerNumber = partnerDetails.getPartnerNumber();
            partnerDetails.toolbar.tapBackButton(true);
            toolbar.tapHomeButton(true);
            favoritePartnerNumber.push(partnerNumber);
        }

        return favoritePartnerNumber;
    }

}
