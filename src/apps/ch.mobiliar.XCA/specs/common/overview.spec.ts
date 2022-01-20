import {
    expectedDraftExpertiseReportNoQRCodeNoPhoto,
    OverviewScreen
} from '../../screen-objects/overview/overview.action';
import {HeaderToolbarScreen} from "@shared/screen-object-components/header-toolbar/header-toolbar.screen.action";
import {Precondition} from "@apps/xca/precondition/precondition";
import {NewExpertiseScreen} from "@apps/xca/screen-objects/new-expertise/new-expertise.action";

const overviewScreen = new OverviewScreen();
const newExpertiseScreen = new NewExpertiseScreen();
describe('Screen: Overview', () => {
    beforeEach(() => {
    });
    afterEach(() => {
        browser.reloadSession();
    });

    it('HAN-162: should be able to abort the expertise creation and navigate back to overview screen', () => {
        const numberOfCurrentReports: number = overviewScreen.getNumberOfExpertiseReports();
        overviewScreen.tapPlusButton();
        newExpertiseScreen
            .tapCloseButton()
            .tapOptAbortCreationOfExpertise();
        overviewScreen.verify().expectedFoundNumberOfExpertiseReports(numberOfCurrentReports);
    });


});

describe('Overview - Draft report', () => {
    beforeEach(() => {
        Precondition.displayExpertiseScreenWithoutQRCode();
    });
    afterEach(() => {
        browser.reloadSession();
    });

    xit('HAN-150: should be able to back to overview to see the draft report', () => {
        HeaderToolbarScreen.tapBackButton();
        overviewScreen
            .verify()
            .expectedTheFirstReportDetails(expectedDraftExpertiseReportNoQRCodeNoPhoto);
    });
})
