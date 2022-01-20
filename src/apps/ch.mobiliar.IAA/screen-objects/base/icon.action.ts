import {BaseComponent} from "@apps/iaa/screen-objects/base/base-component";
import {MobiCard} from "@apps/iaa/screen-objects/components/mobi-card/mobi-card.action";

export class Icon {
    private readonly _baseComponent: BaseComponent

    constructor(protected screenName: string) {
        this._baseComponent = new BaseComponent(this.screenName);
    }

    get baseComponent() {
        return this._baseComponent;
    }

    tapComponent(iconElement: WebdriverIO.Element) {
        this.baseComponent.tapComponentElement(iconElement)
    }

    getComponentIcons(iconSelector: string): WebdriverIO.Element[] {
        return this.baseComponent.getComponentElements(iconSelector);
    }

    getTotalIcons(iconSelector: string) {
        return this.baseComponent.getComponentElements(iconSelector).length
    }

    isIconDisplayedOn(menuName: string, iconSelector: string) {
        return this.baseComponent.getComponentIconOnMenu(menuName, iconSelector).isDisplayed();
    }

    isIconDisplayedOnCard(cardTitle: string, iconSelector: string): boolean {
        const card = new MobiCard(this.screenName);
        return this.baseComponent.getComponentElementAtCardIndex(cardTitle, card.cardTitleSelector, card.cardSelector, iconSelector).isDisplayed();
    }

}
