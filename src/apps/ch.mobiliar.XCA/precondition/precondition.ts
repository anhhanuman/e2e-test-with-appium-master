import {LoginScreen} from "@shared/screen-objects/login/login.screen";
import {credentials} from "@shared/helpers/testdata";
import {MtanScreen} from "@shared/screen-object-components";
import {Contexts} from "@shared/helpers";
import {SettingScreen} from "@apps/xca/screen-objects/setttings/setting.action";
import {ExpertiseScreen} from "@apps/xca/screen-objects/expertise/content/expertise.action";
import {OverviewScreen} from "@apps/xca/screen-objects/overview/overview.action";
import {NewExpertiseScreen} from "@apps/xca/screen-objects/new-expertise/new-expertise.action";

const expertiseScreen = new ExpertiseScreen();
const overviewScreen = new OverviewScreen();
const newExpertiseScreen = new NewExpertiseScreen();
const settingScreen = new SettingScreen();

export class Precondition {
    static authenticateWithValidCredentials() {
        LoginScreen
            .waitForDisplay()
            .loginWithCredentials(credentials.valid.usernameXCA, credentials.valid.password);

        return this;
    }

    static authenticateAndProvideValidMtan() {
        this.authenticateWithValidCredentials();
        MtanScreen.enterValidMtanCodeAndWaitForNotExist();

        return this;
    }

    static displayExpertiseScreenWithoutQRCode() {
        this.displayNewExpertiseScannerScreen();
        newExpertiseScreen.tapCloseButton().tapOptScanQRcodeLater();
        expertiseScreen.onHeader.waitForDisplay();
        return this;
    }

    static displayExpertiseDetails() {
        overviewScreen
            .waitForDisplay()
            .tapPlusButton();
        Contexts.acceptPermission();
        expertiseScreen.onHeader.waitForDisplay();
    }

    static displayNewExpertiseScannerScreen() {
        overviewScreen.tapPlusButton();
        Contexts.acceptPermission();
        newExpertiseScreen.waitForDisplay();
        return this;
    }

    static turnOnChooseImagesFromGallery() {
        overviewScreen.header.tapSettingButtonAndWaitForNotDisplay();
        settingScreen.waitForDisplay()
            .turnOnChooseImageFromGallery()
            .tapBackButtonAndWaitForNotDisplay();

        return this;
    }

    static turnOffChooseImagesFromGallery() {
        overviewScreen.header.tapSettingButtonAndWaitForNotDisplay();
        settingScreen.waitForDisplay().turnOffChooseImageFromGallery().tapBackButtonAndWaitForNotDisplay();

        return this;
    }
}
