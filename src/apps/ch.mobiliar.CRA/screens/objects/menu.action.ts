import {MenuSelectors} from '../selectors/menu.selectors';
import {DeviceType} from '@shared/helpers';
import {Screen} from '@shared/helpers/screen';
import {AlertDialog} from '@shared/screen-object-components';

const deviceType: string = browser.capabilities['deviceType'];

class MenuClaim {
    private selector = new MenuSelectors();

    private defineDefaultMenuScreenElements(): Array<WebdriverIO.Element> {
        const menuScreenElements: Array<WebdriverIO.Element> = [];
        const menuNavigationElments = this.selector.menuNavigation;
        if (deviceType === DeviceType.iPad) {
            menuScreenElements.push(
                this.selector.homeButton,
                this.selector.topRightDeleteClaimButton,
                this.selector.topRightRegisterButton
            );
            menuScreenElements.concat(menuNavigationElments);
            return menuScreenElements;
        } else {
            menuScreenElements.push(
                this.selector.homeButton,
                this.selector.topRightRegisterButton,
                this.selector.bottomRegisterButton,
                this.selector.bottomDeleteButton
            );
            menuScreenElements.concat(menuNavigationElments);
            return menuScreenElements;
        }
    }

    waitForDisplay() {
        Screen.waitForElementsDisplay(this.defineDefaultMenuScreenElements());
    }

    private waitForNotDisplay() {
        Screen.waitUntilElementsNotDisplay(this.defineDefaultMenuScreenElements());
    }

    tapHomeButton(): void {
        this.selector.homeButton.click();
        this.waitForNotDisplay();
    }

    private processDeleteClaimAlert() {
        AlertDialog.waitForAlertDialog();
        AlertDialog.tapAlertDialogButtonAndWaitForAlertNotDisplay('Delete');
        this.waitForNotDisplay();
    }

    deleteClaim(): void {
        if (deviceType === DeviceType.iPad) {
            this.selector.topRightDeleteClaimButton.click();
            this.processDeleteClaimAlert();
        } else {
            this.selector.bottomDeleteButton.click();
            this.processDeleteClaimAlert();
        }
    }

    tapTopRightRegisterButton(): void {
        this.selector.topRightRegisterButton.click();
    }

    tapBottomRegisterButtoniPhone(): void {
        if (deviceType === DeviceType.iPhone) {
            this.selector.bottomRegisterButton.click();
        } else {
            return;
        }
    }

    tapBottomBeginInspectionButton(): void {
        this.selector.bottomBeginInspectionButton.click();
    }

    tapBottomGetClaimNumberButton(): void {
        this.selector.bottomGetClaimNumberButton.click();
    }

    tapToggleButtoniPad(): void {
        if (deviceType === DeviceType.iPad) {
            this.selector.menuNavigation[0].click();
        } else return;
    }

    tapWhoInvolvedTab(): void {
        this.selector.menuNavigation[1].click();
    }

    tapWhereAndWhenDidItHappenTab(): void {
        this.selector.menuNavigation[2].click();
    }

    tapWhatHappenedTab(): void {
        this.selector.menuNavigation[3].click();
    }

    tapNextStepsTab(): void {
        this.selector.menuNavigation[4].click();
    }

    tapAttachmentsTab(): void {
        this.selector.menuNavigation[5].click();
    }

    private getNavigationContent(): Array<string> {
        const menuContent: Array<string> = [];
        const menuNavigation = this.selector.menuNavigation;
        for (let i = 1; i < menuNavigation.length; i++) {
            menuContent.push(menuNavigation[i].getText());
        }
        return menuContent;
    }

    getExpandNavigationContent(): void {
        if (deviceType === DeviceType.iPad && this.selector.menuNavigationContent[0].isDisplayed() == false) {
            this.tapToggleButtoniPad();
            Screen.waitForElementDisplay(this.selector.menuExpand);
            this.getNavigationContent();
        } else {
            this.getNavigationContent();
        }
    }

    tapTopRightInspectionButton(): void {
        this.selector.topRightInspectionButton.click();
    }

    tapTopRightGetClaimNumberButton(): void {
        this.selector.topRightGetClaimNumberButton.click();
    }
}

export const menuScreen = new MenuClaim();
