import {MenuName} from "@shared/helpers/testdata";
import {MenuElement} from "@apps/iaa/screen-objects/components/menu/menu.element";
import {Screen} from "@shared/helpers/screen";

export class MenuNavigation {
    private menuElement: MenuElement

    constructor() {
        this.menuElement = new MenuElement();
    }

    tapMenuName(menuName: string) {
        const menuElements: WebdriverIO.Element[] = this.menuElement.menu;
        switch (menuName) {
            case MenuName.BasicData:
                menuElements[0].click();
                break

            case MenuName.PartnerRelation:
                menuElements[1].click();
                break

            case MenuName.Contracts:
                menuElements[2].click();
                break

            case MenuName.Offers:
                menuElements[3].click();
                break

            case MenuName.Claims:
                menuElements[4].click();
                break

            case MenuName.Documents:
                menuElements[5].click();
                break
        }
        browser.pause(1000);
    }

    getMenuDetails(menuName: string) {
        const details = this.menuElement.detailsData;
        switch (menuName) {
            case MenuName.BasicData:
                return Screen.getTextOfElement(details[0]);

            case MenuName.PartnerRelation:
                return Screen.getTextOfElement(details[1]);

            case MenuName.Contracts:
                return Screen.getTextOfElement(details[2]);

            case MenuName.Offers:
                return Screen.getTextOfElement(details[3]);

            case MenuName.Claims:
                return Screen.getTextOfElement(details[4]);

            case MenuName.Documents:
                return Screen.getTextOfElement(details[5]);
        }
    }
}
