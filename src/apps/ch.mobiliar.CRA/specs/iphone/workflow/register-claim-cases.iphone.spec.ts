import {searchPartnerScreen} from '../../../screens/objects/search-partner.screen.actions';
import {searchResultScreen} from '../../../screens/objects/search-result.screen.actions';
import {whereWhenScreen} from '../../../screens/objects/where-when.screen.actions';
import {whatHappenedScreen} from '../../../screens/objects/what-happened.screen.actions';
import {nextStepsScreen} from '../../../screens/objects/next-steps.screen.actions';
import {attachmentScreen} from '../../../screens/objects/attachments.screen.actions';
import {summaryScreen} from '../../../screens/objects/summary.screen.actions';
import {Preconditions} from '@shared/helpers/preconditions';
import {Contexts} from '@shared/helpers';
import {whoInvolvedScreen} from '../../../screens/objects/who-involved.screen.actions';
import {menuScreen} from '../../../screens/objects/menu.action';
import {OverviewScreen} from "@apps/cra/screens/objects/overview.screen.actions";

const overviewScreen = new OverviewScreen();
describe('Register Claim Cases', function () {
    beforeAll(function () {
        browser.switchContext(Contexts.WebView);
        Preconditions.authenticateWithValidCredentialsMtanCRA();
    });

    beforeEach(function () {
        browser.setImplicitTimeout(10000);

        overviewScreen.waitForDisplay();

        overviewScreen.tapCreateNewClaimCaseButton();

        whoInvolvedScreen.waitForDisplay();

        menuScreen.tapWhoInvolvedTab(); //todo: iPhone Specific

        whoInvolvedScreen.waitForDisplay();

        whoInvolvedScreen.tapSearchPartnerButton();

        searchPartnerScreen.waitForDisplay();
    });

    afterEach(function () {
        browser.refresh();
        browser.pause(5000);
    });

    it('HAN-589: Register a claim case with Personal Partner', () => {
        const partnerNumber = '11752272';
        const description = 'Hello Vietnam';
        const comment = 'Hi Switzerland';
        const categories = ['People', 'Third person injured'];
        const childrenCategories = ['By a defect', 'Something else', 'By my motor vehicle'];
        const randomChildCategory = childrenCategories[Math.floor(Math.random() * childrenCategories.length)];
        categories.push(randomChildCategory);

        //searchPartnerScreen.searchPartnerByPartnerNumber(partnerNumber); Error
        //need to wait here
        searchResultScreen.waitForDisplay();

        searchResultScreen.selectFirstResult();
        //browser.pause(2000);

        whoInvolvedScreen.waitForDisplay();
        whoInvolvedScreen.tapNextButton();

        whereWhenScreen.waitForDisplay();
        Contexts.acceptPermission();
        whereWhenScreen.selectPartnerHomeAddress();
        whereWhenScreen.selectDateTime();
        whereWhenScreen.tapNextButton();

        whatHappenedScreen.waitForDisplay();
        whatHappenedScreen.selectCategory(categories);
        whatHappenedScreen.enterDescriptionValue(description);
        whatHappenedScreen.tapNextButton();

        nextStepsScreen.waitForDisplay();
        nextStepsScreen.processData(comment);
        nextStepsScreen.tapNextButton();

        attachmentScreen.waitForDisplay();
        attachmentScreen.addAllKindsOfAttachments();

        attachmentScreen.tapRegisterButton();

        summaryScreen.waitForDisplay();

        browser.pause(5000);

        //TODO: Write assertions here
    });
    xit('HAN-:register a claim case with company number ', () => {
        // searchPartnerScreen.enterNumberInput(partnerNumber.companyList.company1);Error
        searchResultScreen.selectFirstResult();
        whoInvolvedScreen.waitForDisplay();
    });
});
