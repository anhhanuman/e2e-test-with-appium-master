import {Screen} from '../../helpers/screen';
import {BaseMenuNavigationElement} from '../elements/base-menu-navigation.element';
import {DeviceType} from '../../helpers';
import {MenuNavigationValidators} from '@apps/iaa/screen-objects/components/menu/menu.validators';
import Gestures from '@shared/helpers/gestures';

const deviceType = browser.capabilities['deviceType'];

export class BaseMenuNavigationScreen {

    static displaySpecificMenu(menuPosition: number) {
        const menuElements = BaseMenuNavigationElement.menuNavigation;
        const menuElement = menuElements[menuPosition];

        if (deviceType === DeviceType.iPhone && !menuElement.isDisplayed()) {
            Gestures.scrollIntoView(menuElement);
        }

        return this;
    }

    static getMenuNames() {
        const menuNameElements = BaseMenuNavigationElement.menuTitleH2;

        return Screen.getTextOfElements(menuNameElements);
    }

    static getMenuTitleAndDetails(whichMenu: number) {
        let title = BaseMenuNavigationElement.menuTitleH2[whichMenu];
        let details = BaseMenuNavigationElement.dataDetailsParent[whichMenu];
        let titleAndDetails = [];
        titleAndDetails.push(Screen.getTextOfElement(title), Screen.getTextOfElement(details));

        return titleAndDetails;
    }

    static verify() {
        return new MenuNavigationValidators();
    }

}
