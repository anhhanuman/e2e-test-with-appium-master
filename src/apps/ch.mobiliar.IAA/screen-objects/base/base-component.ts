import {MenuName, ScreenName, ScreenSelector} from "@shared/helpers/testdata";
import {Screen} from "@shared/helpers/screen";
import {MenuElement} from "@apps/iaa/screen-objects/components/menu/menu.element";

export class BaseComponent {
    constructor(protected screenName: string) {
    }

    getComponentIconOnMenu(menuName: string, componentSelector: string) {
        const menuSelector: string = new MenuElement().menuSelector;
        switch (menuName) {
            case MenuName.BasicData:
                return $(menuSelector.concat(':nth-child(1)', componentSelector));

            case MenuName.PartnerRelation:
                return $(menuSelector.concat(':nth-child(2)', componentSelector));

            case MenuName.Contracts:
                return $(menuSelector.concat(':nth-child(3)', componentSelector));

            case MenuName.Offers:
                return $(menuSelector.concat(':nth-child(4)', componentSelector));

            case MenuName.Claims:
                return $(menuSelector.concat(':nth-child(5)', componentSelector));

            case MenuName.Documents:
                return $(menuSelector.concat(':nth-child(6)', componentSelector));
        }
    }

    getComponentElements(componentSelector: string): WebdriverIO.Element[] {
        switch (this.screenName) {
            case ScreenName.Start:
                return $$(ScreenSelector.startScreen.concat(componentSelector))

            case ScreenName.Menu:
                return $$(ScreenSelector.menuScreen.concat(componentSelector))

            case ScreenName.Contracts:
                return $$(ScreenSelector.contractScreen.concat(componentSelector))

            case ScreenName.ContractDetails:
                return $$(ScreenSelector.contractDetailsScreen.concat(componentSelector))

            case ScreenName.Documents:
                return $$(ScreenSelector.documentsScreen.concat(componentSelector))

        }
    }

    getComponentElement(componentSelector: string): WebdriverIO.Element {
        switch (this.screenName) {
            case ScreenName.Start:
                return $(ScreenSelector.startScreen.concat(componentSelector))

            case ScreenName.Menu:
                return $(ScreenSelector.menuScreen.concat(componentSelector))

            case ScreenName.Contracts:
                return $(ScreenSelector.contractScreen.concat(componentSelector))

            case ScreenName.ContractDetails:
                return $(ScreenSelector.contractScreen.concat(componentSelector))

            case ScreenName.Documents:
                return $(ScreenSelector.contractScreen.concat(componentSelector))

        }
    }

    getCardTitleElements(cardTitleSelector: string): WebdriverIO.Element[] {
        switch (this.screenName.toLowerCase()) {
            case ScreenName.Contracts:
                return $$(ScreenSelector.contractScreen.concat(cardTitleSelector));

            case ScreenName.Start:
                return $$(ScreenSelector.startScreen.concat(cardTitleSelector));
        }
    }

    getCardTitleElementAtIndex(cardSelector: string, titleOrContentSelector: string, index: number) {
        switch (this.screenName.toLowerCase()) {
            case ScreenName.Contracts:
                return $(ScreenSelector.contractScreen.concat(cardSelector, ':nth-of-type(', index.toString(), ')', titleOrContentSelector));

            case ScreenName.Start:
                return $(ScreenSelector.startScreen.concat(cardSelector, ':nth-of-type(', index.toString(), ')', titleOrContentSelector));
        }

    }

    getCardElementAtIndex(cardSelector: string, index: number) {
        switch (this.screenName.toLowerCase()) {
            case ScreenName.Contracts:
                return $(ScreenSelector.contractScreen.concat(cardSelector, ':nth-of-type(', index.toString(), ')'));

            case ScreenName.Start:
                return $(ScreenSelector.startScreen.concat(cardSelector, ':nth-of-type(', index.toString(), ')'));
        }

    }

    getTitleIndexInCardTitles(title: string, cardTitleSelector: string): number {
        const mobiCardElements: WebdriverIO.Element[] = this.getCardTitleElements(cardTitleSelector);

        return Screen.getElementPositionInElementsList(title, mobiCardElements)
    }

    getComponentElementAtCardIndex(title: string, cardTitleSelector: string, cardSelector: string, componentSelector: string): WebdriverIO.Element {
        const index: number = this.getTitleIndexInCardTitles(title, cardTitleSelector);
        const targetSelector: string = ':nth-of-type('.concat((index + 1).toString(), ')');
        switch (this.screenName) {
            case ScreenName.Start:
                return $(ScreenSelector.startScreen.concat(cardSelector, targetSelector, componentSelector));

            case ScreenName.Contracts:
                return $(ScreenSelector.contractScreen.concat(cardSelector, targetSelector, componentSelector));
        }
    }

    getCardElementAtCardIndex(title: string, cardTitleSelector: string, cardSelector: string): WebdriverIO.Element {
        const index: number = this.getTitleIndexInCardTitles(title, cardTitleSelector);
        const targetSelector: string = ':nth-of-type('.concat((index + 1).toString(), ')');
        switch (this.screenName) {
            case ScreenName.Start:
                return $(ScreenSelector.startScreen.concat(cardSelector, targetSelector));

            case ScreenName.Contracts:
                return $(ScreenSelector.contractScreen.concat(cardSelector, targetSelector));
        }
    }

    tapComponentElement(componentElement: WebdriverIO.Element) {
        if (componentElement.isDisplayed()) {
            componentElement.click();
        } else {
            componentElement.scrollIntoView();
            componentElement.click();
        }
    }

}
