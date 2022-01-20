import {searchPartnerScreen} from '../screens/objects/search-partner.screen.actions';
import {whoInvolvedScreen} from '../screens/objects/who-involved.screen.actions';
import {Preconditions} from '@shared/helpers/preconditions';
import {Contexts} from '@shared/helpers';
import {menuScreen} from '../screens/objects/menu.action';
import {OverviewScreen} from "@apps/cra/screens/objects/overview.screen.actions";

const overviewScreen = new OverviewScreen();
describe('Search Partner Screen', () => {
    beforeEach(() => {
        Contexts.switchToWebview();
        Preconditions.authenticateWithValidCredentialsMtanCRA();
        overviewScreen
            .waitForDisplay()
            .tapCreateNewClaimCaseButton();
        whoInvolvedScreen.waitForDisplay();

        menuScreen.tapWhoInvolvedTab();

        whoInvolvedScreen.waitForDisplay();

        whoInvolvedScreen.tapSearchPartnerButton();

        searchPartnerScreen.waitForDisplay();
    });

    afterEach(() => {
        browser.reloadSession();
    });

    it('should be able to search by partner attributes and display proper result', () => {
    });

    it('should not prompt errorIcon if verify partner number with valid pattern', () => {
    });
});
