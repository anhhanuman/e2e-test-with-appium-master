import {Workflow} from '@apps/iaa/screen-objects/workflow/workflow';
import {AlertDialog, expectedSyncMultiplePartnersAlertDialog} from '@shared/screen-object-components';
import {Screen} from '@shared/helpers/screen';
import {Precondition} from "@apps/iaa/precondition/precondition";
import {StartScreen} from "@apps/iaa/screen-objects/start/start.screen.actions";
import {ComponentIcon, MenuName, ScreenName} from "@shared/helpers/testdata";
import {Toolbar} from "@apps/iaa/screen-objects/components/header-toolbar/toolbar/toolbar.action";
import {MenuNavigationScreen} from "@apps/iaa/static/menu-navigation-screen.action";

const startScreen = new StartScreen();
xdescribe('Single Partner Sync: ', () => {
    beforeEach(() => {
        browser.setImplicitTimeout(3000);
        startScreen.removeAllRecentPartners();
    });
    afterEach(() => {
        browser.reloadSession();
    });
    xit('should display the correct Error states of bulk downloading after re-sync', () => {
        Precondition.doQuickSearchAndDisplayPartnerOverview('P-2047-8718')
            .reSyncIfError();
        const toolbar = new Toolbar(ScreenName.Menu);
        toolbar.actionMenu
            .downloadAllDocuments(true);
        browser.background(5);
        toolbar.actionMenu
            .syncPartnerData(true);
        toolbar
            .verify()
            .expectErrorDisplayOnHeader(true);
        MenuNavigationScreen
            .verify()
            .expectComponentIconDisplayedOn(ComponentIcon.ErrorIcon, MenuName.Documents, true)
    });
});

describe('Syncing Multiple partners: Favorite and non-favorite partners', () => {
    beforeEach(() => {
        startScreen.removeAllRecentPartners();
    });
    afterEach(() => {
        browser.reloadSession();
    });

    xit('syncs favorite partners, one by one, then no error on overview', () => {
        Workflow.displayEachPartnerOnFavoritePartners()
            .verifyStartScreenNotHaveError();
    });

    xit('searches partners, one by one, then no error on overview', () => {
        Workflow.walkThroughSearchResults('peter');
        Workflow.verifyStartScreenNotHaveError();
    });

    xit('syncs favorite partner, then no error in the details', () => {
        startScreen.displayFavoritePartner();
        const totalPartner = startScreen.getTotalPartnerCards();

        for (let i = 1; i <= totalPartner; i++) {
            startScreen.tapToPartnerAt(i);
            Precondition.waitForDownloadingBasicPartnerData();
            Workflow.verifyMenuAndDetailsScreenNotHaveError();
        }
    });

});

xdescribe('Multiple syncing partners', () => {
    beforeEach(() => {
        //todo: remove partner has error
        Workflow.displayMoreRecentPartnersToSync();

    });
    afterEach(() => {
        browser.reloadSession();
    });

    xit('syncs non-favorite partners, then no error in the details', () => {
        Workflow.walkThroughSearchResults('peter');
        const recentNonFavoritePartners = startScreen.getNonFavoritePartnerElementsInRecentList();

        recentNonFavoritePartners.forEach((nonFavoritePartner) => {
            Screen.tapToElement(nonFavoritePartner);
            browser.pause(1000);
            Workflow.verifyMenuAndDetailsScreenNotHaveError();
        });
    });

    it('syncs more than 10 partners, then no error in overview', () => {
        startScreen
            .syncAllPartners();
        AlertDialog
            .verify()
            .expectAlertMessage(expectedSyncMultiplePartnersAlertDialog);
        AlertDialog.tapAlertDialogButtonAndWaitForAlertNotDisplay(expectedSyncMultiplePartnersAlertDialog[3]);
        startScreen.toolbar.verify().expectSpinnerDisplayOnHeader(true);
        Workflow.verifyStartScreenNotHaveError();
    });
});
