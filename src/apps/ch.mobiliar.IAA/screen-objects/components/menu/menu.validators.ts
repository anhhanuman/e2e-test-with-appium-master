import {MenuName} from "@shared/helpers/testdata";
import {MenuNavigationScreen} from "@apps/iaa/static/menu-navigation-screen.action";

export class MenuNavigationValidators {

    expectComponentIconDisplayedOn(componentIconName: string, menuName: string, isDisplayed: boolean) {
        if (MenuNavigationScreen.getMenuDetails(menuName) !== '') {
            const actual = MenuNavigationScreen.isComponentIconDisplayOn(componentIconName, menuName)
            expect(actual).toEqual(isDisplayed);
        }

        return this;
    }


    expectFoundFreeTextTaskCreatedNotification(expectedMessage: string) {
        const actual = MenuNavigationScreen.getCreatedFreeTextTaskAlert();
        expect(actual).toEqual(expectedMessage);

        return this;
    }

    expectCreatedFreeTextTaskAlertDisplayed(isDisplayed: boolean) {
        const actual = MenuNavigationScreen.isCreatedFreeTextTaskAlertDisplayed();
        expect(actual).toEqual(isDisplayed);

        return this;
    }

    expectFoundOneDocumentBeingUploaded() {
        const actual = MenuNavigationScreen.getMenuDetails(MenuName.Documents);
        expect(actual).toContain('1 to upload');

        return this;
    }

    expectNotFoundDocumentBeingUploaded() {
        const actual = MenuNavigationScreen.getMenuDetails(MenuName.Documents);
        expect(actual).not.toContain('to upload');

        return this;
    }
}
