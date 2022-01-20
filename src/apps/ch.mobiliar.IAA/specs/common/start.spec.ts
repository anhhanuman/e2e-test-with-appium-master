import {StartScreen} from "@apps/iaa/screen-objects/start/start.screen.actions";
import {Workflow} from "@apps/iaa/screen-objects/workflow/workflow";
import {Toolbar} from "@apps/iaa/screen-objects/components/header-toolbar/toolbar/toolbar.action";
import {MenuName, ScreenName} from "@shared/helpers/testdata";
import {Precondition} from "@apps/iaa/precondition/precondition";
import {MenuNavigation} from "@apps/iaa/screen-objects/components/menu/menu.action";
import {englishTranslation} from "@shared/assets/eng";

const startScreen = new StartScreen();

describe('Favorite partners: Mobi Hint test suites', () => {
    beforeEach(() => {
    });
    afterEach(() => {
        browser.reloadSession();
    });


    xit('displays proper favorite partner info', () => {
        const totalFavoritePartners = startScreen.getTotalPartnerCards();
        const menuToolbar = new Toolbar(ScreenName.Menu);

        for (let i = 1; i <= totalFavoritePartners; i++) {
            const partnerName = startScreen.getPartnerNameAtIndex(i);
            const partnerContent = startScreen.getPartnerContentAtIndex(i);
            startScreen.tapToPartnerAt(i);
            Precondition.waitForDownloadingBasicPartnerData();
            const menu = new MenuNavigation();
            const menuBasicData = menu.getMenuDetails(MenuName.BasicData);
            expect(partnerContent).toEqual(menuBasicData);
            expect(menuToolbar.headerTitle.getHeaderTitle()).toEqual(partnerName);
            menuToolbar.tapHomeButton(true);
        }
    });

    xit('displays proper recent partner info', () => {
        const partnerName = startScreen.getPartnerNameAtIndex(1);
        const partnerContent = startScreen.getPartnerContentAtIndex(1);
        startScreen.tapToPartnerAt(1);
        Precondition.waitForDownloadingBasicPartnerData();
        const menuToolbar = new Toolbar(ScreenName.Menu);
        menuToolbar.tapHomeButton(true);
        startScreen.tapRecentSegment();
        const recentPartnerName = startScreen.getPartnerNameAtIndex(1);
        const recentPartnerContent = startScreen.getPartnerContentAtIndex(1);
        expect(partnerName).toEqual(recentPartnerName);
        expect(partnerContent).toEqual(recentPartnerContent);
    });

    it('unmark favorite partners and add again by action menu', () => {
        Workflow.removeFirstFavoritePartnerAndAddAgain();
        const favoritePartnerNumbers: string[] = Workflow.getFavoritePartnerNumbers();
        const totalPartners = startScreen.getTotalPartnerCards();
        const toolbarMenu = new Toolbar(ScreenName.Menu);

        startScreen.removeAllFavoritePartners();
        const message = englishTranslation.emptyFavoritesTitle.concat('\n', englishTranslation.emptyFavoritesContent);
        startScreen.verify().expectInfoNoFavoritePartner(message)
        for (let i = 0; i < favoritePartnerNumbers.length; i++) {
            Precondition.doQuickSearchAndDisplayPartnerOverview(favoritePartnerNumbers[i]);

            toolbarMenu.actionMenu.markAsFavorite();
            toolbarMenu.tapHomeButton(true);
        }
        startScreen.waitForPartnerCardDisplay(favoritePartnerNumbers.length)
        const currentTotalPartners = startScreen.getTotalPartnerCards();
        expect(totalPartners).toEqual(currentTotalPartners);
    });

});


