import {Contexts} from '@shared/helpers';
import {
    expectedActionSheet,
    expectedActionSheetStates,
    NewExpertiseScreen
} from '../../screen-objects/new-expertise/new-expertise.action';
import {AlertDialog, expectedCameraAlertError} from '../../../../shared/screen-object-components';
import {ExpertiseScreen} from '../../screen-objects/expertise/content/expertise.action';
import {Coordinate} from '@shared/helpers/coordinate';
import {expectedExpertiseListComboBoxNotDisplay} from '@apps/xca/specs/test-data/combo-boxes';
import {expectedDefaultExpertiseDetails} from '@apps/xca/specs/test-data/default-expertise-details';
import {Precondition} from "@apps/xca/precondition/precondition";
import {OverviewScreen} from "@apps/xca/screen-objects/overview/overview.action";

const coordinate = new Coordinate();
const expertiseDetails = new ExpertiseScreen();
const overviewScreen = new OverviewScreen();
const newExpertiseScreen = new NewExpertiseScreen();
describe('Screen: New Expertise - Accept Permission', () => {
    beforeEach(() => {
        Precondition
            .authenticateAndProvideValidMtan()
            .displayNewExpertiseScannerScreen();
    });
    afterEach(() => {
        browser.reloadSession();
    });

    xit('HAN:729: should display all the attributes such as header, close button, action sheet options', () => {
        expect(newExpertiseScreen.isNewExpertiseScreenDisplayed()).toBe(true);
        expect(newExpertiseScreen.getNewExpertiseTitle()).toEqual('New Expertise');
        newExpertiseScreen.tapCloseButton();

        const actualStates = newExpertiseScreen.isActionSheetOptionsDisplayed();
        expect(actualStates).toEqual(expectedActionSheetStates);

        const actualActionSheetValues: Array<string> = newExpertiseScreen.getActionSheetOptions();

        expect(actualActionSheetValues).toEqual(expectedActionSheet);
    });

    xit('HAN-163: should be able to cancel the abortion of camera qr-code', () => {
        newExpertiseScreen.tapCloseButton();

        const optScanQRCodeLaterElement = newExpertiseScreen.getActionSheet();
        coordinate.tapOptCancel(optScanQRCodeLaterElement);

        expect(newExpertiseScreen.isActionSheetOptionsDisplayed()).toEqual([false, false]);
        expect(newExpertiseScreen.isNewExpertiseScreenDisplayed()).toBe(true);
    });
    it('HAN-161: should be able to scan qr code later and navigate to expertise details screen with default content', () => {
        newExpertiseScreen
            .tapCloseButton()
            .tapOptScanQRcodeLater();
        const carDetails: Array<string> = expertiseDetails.onCarDetails.getCarDetails()

        expect(carDetails).toEqual(expectedDefaultExpertiseDetails);

        const expertiseTypesInComboBoxState: Array<boolean> = expertiseDetails
            .onExpertiseDetails
            .getComboBoxDisplayingState();

        expect(expertiseTypesInComboBoxState).toEqual(expectedExpertiseListComboBoxNotDisplay);

        let popoverState: boolean = expertiseDetails.onExpertiseDetails.getPopoverDisplayingState();

        expect(popoverState).toBe(false);

        const expertiseItemsGridState = expertiseDetails.onExpertiseImages.isExpertiseImageDisplayed();

        expect(expertiseItemsGridState).toBe(false);
        expect(expertiseDetails.onHeader.isUploadButtonDisplayed()).toBe(false);
    });
});
xdescribe('Screen: New Expertise - Dismiss Permission', () => {
    beforeEach(() => {
        Precondition.authenticateAndProvideValidMtan();
        overviewScreen.tapPlusButton();
        Contexts.dismissPermission();
    });

    afterEach(() => {
        browser.reloadSession();
    });

    it('HAN-728: should display the ERROR when user dismiss camera permission', () => {
        AlertDialog.waitForAlertDialog();
        expect(AlertDialog.getAlertDialog()).toEqual(expectedCameraAlertError);
    });
});
