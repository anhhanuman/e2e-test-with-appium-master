import {whoInvolvedScreen} from '../screens/objects/who-involved.screen.actions';
import {whereWhenScreen} from '../screens/objects/where-when.screen.actions';
import {whatHappenedScreen} from '../screens/objects/what-happened.screen.actions';
import {nextStepsScreen} from '../screens/objects/next-steps.screen.actions';
import {attachmentScreen} from '../screens/objects/attachments.screen.actions';
import {Preconditions} from '@shared/helpers/preconditions';
import {Contexts} from '@shared/helpers';
import {menuScreen} from '../screens/objects/menu.action';
import {OverviewScreen} from "@apps/cra/screens/objects/overview.screen.actions";

const overviewScreen = new OverviewScreen();
describe('Overview Screen', () => {
    beforeAll(() => {
        Preconditions.authenticateWithValidCredentialsMtanCRA();
    });

    beforeEach(() => {
        browser.switchContext(Contexts.WebView);
        browser.setImplicitTimeout(5000);
        overviewScreen
            .waitForDisplay()
            .tapCreateNewClaimCaseButton();

        whoInvolvedScreen.waitForDisplay();
    });

    afterEach(() => {
        browser.refresh();
        browser.pause(5000);
    });

    it(`HAN: should navigate to Claim Partner screen when tapping "Who's involved?" navigation tab`, () => {
        menuScreen.tapWhoInvolvedTab();

        whoInvolvedScreen.waitForDisplay();
    });

    it(`should navigate to Claim Place screen when tapping "Where and when did it happen?" navigation tab`, () => {
        menuScreen.tapWhereAndWhenDidItHappenTab();

        whereWhenScreen.waitForDisplay();

        const isClaimPlaceScreenDisplayed = whereWhenScreen.isClaimPlaceScreenDisplayed();
        expect(isClaimPlaceScreenDisplayed).toBeTruthy();

        Contexts.acceptPermission();
    });

    it(`should navigate to Claim Event screen when tapping "What happened" navigation tab`, () => {
        menuScreen.tapWhatHappenedTab();

        whatHappenedScreen.waitForDisplay();

        const isClaimEventScreenDisplayed = whatHappenedScreen.isClaimEventScreenDisplayed();
        expect(isClaimEventScreenDisplayed).toBeTruthy();
    });

    it(`should navigate to Claim Actions screen when tapping "Next Steps" navigation tab`, () => {
        menuScreen.tapNextStepsTab();

        nextStepsScreen.waitForDisplay();

        const isClaimActionsScreenDisplayed = nextStepsScreen.isNextStepsScreenDisplayed();
        expect(isClaimActionsScreenDisplayed).toBeTruthy();
    });

    it(`should navigate to Claim Attachments screen when tapping "Attachments" navigation tab`, () => {
        menuScreen.tapAttachmentsTab();

        attachmentScreen.waitForDisplay();

        const isClaimAttachmentsScreenDisplayed = attachmentScreen.isAttachmentsScreenDisplayed();
        expect(isClaimAttachmentsScreenDisplayed).toBeTruthy();
    });
});
