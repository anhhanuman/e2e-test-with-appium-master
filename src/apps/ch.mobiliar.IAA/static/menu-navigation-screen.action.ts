import {MenuNavigation} from "@apps/iaa/screen-objects/components/menu/menu.action";
import {Screen} from "@shared/helpers/screen";
import {ComponentIcon, ScreenName} from "@shared/helpers/testdata";
import {MenuNavigationValidators} from "@apps/iaa/screen-objects/components/menu/menu.validators";
import {HourGlassIcon} from "@apps/iaa/screen-objects/components/hour-glass/hour-glass.icon";
import {MenuElement} from "@apps/iaa/screen-objects/components/menu/menu.element";
import {SuccessIcon} from "@apps/iaa/screen-objects/components/success-icon/success.icon";
import {ErrorIcon} from "@apps/iaa/screen-objects/components/error-icon/error-icon.action";

export class MenuNavigationScreen {
    static tapMenuName(whatMenuName: string) {
        const menu = new MenuNavigation();
        menu.tapMenuName(whatMenuName);

        return this;
    }

    static waitForMenuLoadedCompleted() {
        const hourGlassIcon = new HourGlassIcon(ScreenName.Menu);
        hourGlassIcon.waitUntilHourGlassesNotDisplay(hourGlassIcon.hourGlassSelector);

        return this;
    }

    static waitForLoadingBasicPartnerData() {
        const menuData = new MenuElement()
        Screen.waitForElementHasValue(menuData.detailsData[0]);

        return this;
    }

    static isComponentIconDisplayOn(componentIconName: string, menuName: string): boolean {
        const screenName = ScreenName.Menu;
        switch (componentIconName) {
            case ComponentIcon.ErrorIcon:
                const icon = new ErrorIcon(screenName);
                return icon.isIconDisplayedOn(menuName, icon.errorSelector);

            case ComponentIcon.HourGlassIcon:
                const hourGlassIcon = new HourGlassIcon(screenName)
                return hourGlassIcon.isIconDisplayedOn(menuName, hourGlassIcon.hourGlassSelector);

            case ComponentIcon.SuccessIcon:
                const successIcon = new SuccessIcon(screenName)
                return successIcon.isIconDisplayedOn(menuName, successIcon.successIconSelector);
        }
    }

    static getCreatedFreeTextTaskAlert(): string {
        return new MenuElement().createdFreeTextTaskAlert.getText();
    }

    static isCreatedFreeTextTaskAlertDisplayed(): boolean {
        return new MenuElement().createdFreeTextTaskAlert.isDisplayed()
    }

    static getTotalComponentIcons(componentIconName: string): number {
        const screenName = ScreenName.Menu;
        switch (componentIconName) {
            case ComponentIcon.ErrorIcon:
                const icon = new ErrorIcon(screenName);
                return icon.getTotalIcons(icon.errorSelector)

            case ComponentIcon.HourGlassIcon:
                const hourGlassIcon = new HourGlassIcon(screenName);
                return hourGlassIcon.getTotalIcons(hourGlassIcon.hourGlassSelector);

            case ComponentIcon.SuccessIcon:
                const successIcon = new SuccessIcon(screenName);
                return successIcon.getTotalIcons(successIcon.successIconSelector)
        }
    }

    static getMenuDetails(menuName: string): string {
        const menu = new MenuNavigation();

        return menu.getMenuDetails(menuName)
    }

    static verify() {
        return new MenuNavigationValidators();
    }


}
