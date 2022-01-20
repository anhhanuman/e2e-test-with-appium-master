import {Keyboard} from '@shared/helpers';
import {
    AlertDialog,
    expectedAlertMtanDialog,
    expectedLoginErrorAlertDialog,
    expectedMtanScreenContent,
    LoginScreen
} from '../../../../shared/screen-object-components';
import {MtanScreen} from '@shared/screen-object-components';
import {expectedOverviewScreenTitle, OverviewScreen} from '../../screen-objects/overview/overview.action';
import {credentials} from '@shared/helpers/testdata';
import {Precondition} from "@apps/xca/precondition/precondition";

const overviewScreen = new OverviewScreen();
xdescribe('Screen: Login', () => {
    beforeEach(() => {
        LoginScreen.waitForDisplay();
    });

    afterEach(() => {
        browser.reloadSession();
    });

    it('HAN-633: should allow user to dismiss login modal and see overview screen', () => {
        LoginScreen.tapCloseLoginButton();

        expect(overviewScreen.isOverviewScreenDisplay()).toBe(true);
        expect(overviewScreen.header.getOverviewScreenTitle()).toEqual(expectedOverviewScreenTitle);
    });

    it('HAN-626: should display the mtan screen if user provides valid credentials and tap login button', () => {
        Precondition.authenticateWithValidCredentials();

        expect(MtanScreen.isMtanScreenDisplayed()).toBe(true);
        expect(MtanScreen.getMtanScreenContentTexts()).toEqual(expectedMtanScreenContent);
    });

    it('HAN-627: should display the mtan screen if user provides valid credentials and tap the Done button on native plugin keyboard', () => {
        LoginScreen.enterUsername(credentials.valid.usernameXCA).enterPassword(credentials.valid.password);
        Keyboard.tapDoneKeyboardButton();
        LoginScreen.tapLoginButtonAndWaitForMtan();

        expect(MtanScreen.isMtanScreenDisplayed()).toBe(true);
        expect(MtanScreen.getMtanScreenContentTexts()).toEqual(expectedMtanScreenContent);
    });

    it('HAN-634: should display ERROR if user provide either invalid username or password or both invalid', () => {
        LoginScreen.loginWithCredentials(credentials.invalid.username, credentials.invalid.password);
        AlertDialog.waitForAlertDialog();
        expect(AlertDialog.getAlertDialog()).toEqual(expectedLoginErrorAlertDialog);
        AlertDialog.tapAlertDialogButtonAndWaitForAlertNotDisplay(expectedLoginErrorAlertDialog[2]);
        expect(AlertDialog.isAlertDialogDisplayed()).toBe(false);
        expect(LoginScreen.getUsernameValue()).toEqual(credentials.invalid.username);
        expect(LoginScreen.getPasswordValue()).toEqual(credentials.invalid.password);

        expect(Keyboard.isNativeKeyboardButtonsShown()).toBe(true);
    });

    it('HAN-635: should display ERROR continuously if user provide invalid credential and attempt to login several times', () => {
        LoginScreen.loginWithCredentials(credentials.invalid.username, credentials.invalid.password);
        AlertDialog.waitForAlertDialog();

        expect(AlertDialog.isAlertDialogDisplayed()).toBe(true);
        expect(AlertDialog.getAlertDialog()).toEqual(expectedLoginErrorAlertDialog);
        AlertDialog.tapAlertDialogButtonAndWaitForAlertNotDisplay(expectedLoginErrorAlertDialog[2]);
        expect(LoginScreen.getUsernameValue()).toEqual(credentials.invalid.username);
        expect(LoginScreen.getPasswordValue()).toEqual(credentials.invalid.password);
        expect(Keyboard.isNativeKeyboardButtonsShown()).toBe(true);

        for (let x = 0; x < 10; x++) {
            LoginScreen.tapLoginButton();
            AlertDialog.waitForAlertDialog();
            expect(AlertDialog.isAlertDialogDisplayed()).toBe(true);
            expect(AlertDialog.getAlertDialog()).toEqual(expectedLoginErrorAlertDialog);
            AlertDialog.tapAlertDialogButtonAndWaitForAlertNotDisplay(expectedLoginErrorAlertDialog[2]);
            expect(LoginScreen.getUsernameValue()).toEqual(credentials.invalid.username);
            expect(LoginScreen.getPasswordValue()).toEqual(credentials.invalid.password);
            expect(Keyboard.isNativeKeyboardButtonsShown()).toBe(true);
        }
    });
});

xdescribe('Screen: Mtan', () => {
    beforeEach(() => {
        Precondition.authenticateWithValidCredentials();
    });

    afterEach(() => {
        browser.reloadSession();
    });
    xit('HAN-664: should allow user to dismiss login modal of Mtan screen and see overview screen', () => {
        LoginScreen.tapCloseLoginButton();

        expect(overviewScreen.isOverviewScreenDisplay()).toBe(true);
    });
    it('HAN-727: should display ERROR if user provide invalid mtancode and allow proceeding if re-enter correct mtan', () => {
        MtanScreen.enterInvalidMtanCode();
        AlertDialog.waitForAlertDialog();

        expect(AlertDialog.getAlertDialog()).toEqual(expectedAlertMtanDialog);

        AlertDialog.tapAlertDialogButtonAndWaitForAlertNotDisplay(expectedLoginErrorAlertDialog[2]);
        expect(MtanScreen.getMtanCodeValue()).toEqual('');
        MtanScreen.enterValidMtanCodeAndWaitForNotExist();
        expect(overviewScreen.isOverviewScreenDisplay()).toBe(true);
        expect(overviewScreen.header.getOverviewScreenTitle()).toEqual(expectedOverviewScreenTitle);
    });
});
