import {LoginScreen} from '@shared/screen-object-components';
import {Precondition} from "@apps/xca/precondition/precondition";
import {SettingScreen} from '../../screen-objects/setttings/setting.action';
import {Coordinate} from '@shared/helpers/coordinate';
import {OverviewScreen} from "@apps/xca/screen-objects/overview/overview.action";

const overviewScreen = new OverviewScreen();
const settingScreen = new SettingScreen();
describe('Screen: Setting && Overview', () => {
    beforeEach(() => {
        LoginScreen.waitForDisplay();
        Precondition.authenticateAndProvideValidMtan();
    });

    afterEach(() => {
        browser.reloadSession();
    });

    xit('should display the overview screen after user tap to back button multiple times', () => {
        for (let x = 0; x < 20; x++) {
            overviewScreen
                .waitForDisplay()
                .header
                .tapSettingButton();
            settingScreen.waitForDisplay();
            Coordinate.tapBackButton();
            settingScreen.waitUntilElementNotExist();
        }

        expect(overviewScreen.isOverviewScreenDisplay()).toBe(true);
    });
});
