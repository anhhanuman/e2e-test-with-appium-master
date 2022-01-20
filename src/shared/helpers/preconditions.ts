import {credentials} from './testdata';
import {LoginScreen, MtanScreen} from '../screen-object-components';
import {OverviewScreen} from '../screen-object-components/objects/base-overview.screen.actions';
import {StartScreen} from "@apps/iaa/screen-objects/start/start.screen.actions";

const deviceType = browser.capabilities['deviceType'];
const startScreen = new StartScreen();

export class Preconditions {
    //**************CIA*****************
    static authenticateWithValidCredentialsMtanCIA() {
        LoginScreen.waitForDisplay()
            .loginWithCredentials(credentials.valid.usernameCIA, credentials.valid.password);
        MtanScreen.enterValidMtanCodeAndWaitForNotExist();
        OverviewScreen.waitForDisplay();
    }

    //**************IAA*****************
    static authenticateWithValidCredentialsMtanIAA() {
        LoginScreen.waitForDisplay()
            .loginWithCredentials(credentials.valid.usernameIAA, credentials.valid.password);
        MtanScreen.enterValidMtanCodeAndWaitForNotExist();
    }

    static authenticateWithValidCredentialsIAA() {
        LoginScreen.waitForDisplay()
            .loginWithCredentials(credentials.valid.usernameIAA, credentials.valid.password);
    }

    //**************CRA*****************
    static authenticateWithValidCredentialsMtanCRA() {
        LoginScreen.waitForDisplay()
            .loginWithCredentials(credentials.valid.usernameCRA, credentials.valid.password);
        MtanScreen.enterValidMtanCodeAndWaitForNotExist();
    }

    static authenticateWithValidCredentialsCRA() {
        LoginScreen.waitForDisplay()
            .loginWithCredentials(credentials.valid.usernameCRA, credentials.valid.password);
    }
}
