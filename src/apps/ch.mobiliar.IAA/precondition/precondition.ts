import {SearchPartnerScreen,} from "@apps/iaa/screen-objects/search-partner/search-partner.screen.actions";
import {MenuNavigationScreen} from "@apps/iaa/static/menu-navigation-screen.action";
import {Document} from "@apps/iaa/screen-objects/document/document.action";
import {StartScreen} from "@apps/iaa/screen-objects/start/start.screen.actions";
import {ActionMenu} from "@apps/iaa/screen-objects/components/header-toolbar/action-menu/action-menu.action";
import {ComponentIcon, MenuName, ScreenName, SegmentName} from "@shared/helpers/testdata";
import {Toolbar} from "@apps/iaa/screen-objects/components/header-toolbar/toolbar/toolbar.action";

const deviceType = browser.capabilities['deviceType'];

export class Precondition {
    static addPartnerAsAFavoritePartner(whatPartner: string) {
        this.doQuickSearchAndDisplayPartnerOverview(whatPartner);
        const actionMenuButton = new ActionMenu(ScreenName.Menu);
        actionMenuButton.markAsFavorite();
    }

    static displayQuickSearchPartnerScreen() {
        const startScreen = new StartScreen();
        startScreen.tapSearchButton();
        const searchPartnerScreen = new SearchPartnerScreen();
        searchPartnerScreen.waitForDisplay();
    }

    static doQuickSearchAndDisplayPartnerOverview(whatPartnerToDisplay: string) {
        this.doQuickSearchAndTapOnFoundPartner(whatPartnerToDisplay)
            .waitForDownloadingBasicPartnerData();

        return this;
    }

    static displayFavoritePartnerName(partnerName: string) {
        const startScreen = new StartScreen();
        startScreen.tapToPartnerName(partnerName, SegmentName.Favorites);
        this.waitForDownloadingBasicPartnerData();

        return this;
    }

    static downloadAllDocumentsAndBackToOverview() {
        const toolbar = new Toolbar(ScreenName.Menu);
        toolbar.actionMenu
            .downloadAllDocuments(false)
        toolbar.tapHomeButton(false);

        return this;
    }

    static doQuickSearchAndTapOnFoundPartner(whatPartnerToSearch: string) {
        this.displayQuickSearchPartnerScreen();
        const searchPartnerScreen = new SearchPartnerScreen();
        searchPartnerScreen.inputQuickPartnerAndSearchAndTapFoundPartner(whatPartnerToSearch);

        return this;
    }

    static doQuickSearch(whatPartnerToSearch: string) {
        this.displayQuickSearchPartnerScreen();
        const searchPartnerScreen = new SearchPartnerScreen();
        searchPartnerScreen.inputQuickPartnerAndSearch(whatPartnerToSearch);

        return this;
    }

    static downloadMultiplePartners(
        partnerOne: string,
        partnerTwo: string,
        partnerThree: string,
        partnerFour: string,
        partnerFive: string
    ) {
        let partners = [];
        partners.push(partnerOne, partnerTwo, partnerThree, partnerFour, partnerFive);
        for (const partner of partners) {
            this.doQuickSearchAndDisplayPartnerOverview(partner);
        }

        return this;
    }

    static displayBasicDataScreen(whatPartnerToDisplay: string) {
        this.doQuickSearchAndDisplayPartnerOverview(whatPartnerToDisplay);
        MenuNavigationScreen.tapMenuName(MenuName.BasicData)

        return this;
    }

    static displayPartnerRelationsScreen(whatPartnerToDisplay: string) {
        this.doQuickSearchAndDisplayPartnerOverview(whatPartnerToDisplay)
            .reSyncIfError();
        MenuNavigationScreen.tapMenuName(MenuName.PartnerRelation)

        return this;
    }

    static displayContractsScreen(whatPartnerToDisplay: string) {
        this.doQuickSearchAndDisplayPartnerOverview(whatPartnerToDisplay)
            .reSyncIfError()
        MenuNavigationScreen.tapMenuName(MenuName.Contracts)

        return this;
    }

    static displayOffersScreen(whatPartnerToDisplay: string) {
        this.doQuickSearchAndDisplayPartnerOverview(whatPartnerToDisplay)
            .reSyncIfError();
        MenuNavigationScreen.tapMenuName(MenuName.Offers)

        return this;
    }

    static displayClaimsScreen(whatPartnerToDisplay: string) {
        this.doQuickSearchAndDisplayPartnerOverview(whatPartnerToDisplay);
        MenuNavigationScreen.tapMenuName(MenuName.Claims)

        return this;
    }

    static displayDocumentsScreen(whatPartnerToDisplay: string) {
        this.doQuickSearchAndDisplayPartnerOverview(whatPartnerToDisplay)
            .reSyncIfError();
        MenuNavigationScreen.tapMenuName(MenuName.Documents)


        return this;
    }

    static displayAddDocumentModal() {
        const document = new Document();
        document
            .tapScanDocButton()
            .scanAndDisplayNextScreen(false)

        return this;
    }

    static removeAllRecentPartners() {
        const startScreen = new StartScreen();
        startScreen.removeAllRecentPartners();

        return this;
    }

    static waitForDownloadingBasicPartnerData() {
        MenuNavigationScreen
            .waitForMenuLoadedCompleted()
            .waitForLoadingBasicPartnerData();

        return this;
    }

    static reSyncIfError() {
        const totalError: number = MenuNavigationScreen.getTotalComponentIcons(ComponentIcon.ErrorIcon);
        if (totalError !== 0) {
            const actionMenu = new ActionMenu(ScreenName.Menu)
            actionMenu.syncPartnerData(true);
            if (MenuNavigationScreen.getTotalComponentIcons(ComponentIcon.ErrorIcon) !== 0) {
                throw Error('Check partner - Error in loading services')
            }
        }

        return this;
    }

    static displayNewFreeTextTaskForm() {
        const actionMenu = new ActionMenu(ScreenName.Menu);
        actionMenu.displayNewFreeTextTaskModal()
        browser.pause(5000);

        return this;
    }

    static downloadAllDocumentButSendBackground() {
        const toolbar = new Toolbar(ScreenName.Menu);
        toolbar.actionMenu
            .downloadAllDocuments(true);
        browser.reloadSession();
    }
}
