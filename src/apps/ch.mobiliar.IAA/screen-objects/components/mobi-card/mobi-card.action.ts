import {BaseComponent} from "@apps/iaa/screen-objects/base/base-component";
import {LoadingContent} from "@shared/screen-object-components/loading-content/loading.content";
import {Screen} from "@shared/helpers/screen";

export class MobiCard extends BaseComponent {

    private card = ' mobi-card';
    private cardTitle = ' span.title';
    private _cardContent = ' div.content'
    private viewOnly = '.view-only';
    private _cardViewOnlySelector = this.card.concat(this.viewOnly);

    constructor(protected screenName: string) {
        super(screenName);
    }

    get cardTitleSelector() {
        return this.cardTitle
    }

    get cardContent(): string {
        return this._cardContent;
    }

    get cardSelector() {
        return this.card;
    }

    get cardViewOnlySelector() {
        return this._cardViewOnlySelector;
    }

    tapMobiCard(cardTitle: string) {
        this.findMobiCard(cardTitle).click();
        if (LoadingContent.loadingContent.isDisplayed()) {
            LoadingContent.waitForLoadingContentDismiss();
        }
    }

    tapMobiCardElement(cardElement: WebdriverIO.Element) {
        this.tapComponentElement(cardElement);
        if (LoadingContent.loadingContent.isDisplayed()) {
            LoadingContent.waitForLoadingContentDismiss();
        }
    }

    tapMobiCardAt(position: number) {
        const cardElements = this.getComponentElements(this.cardSelector);
        const realPosition = position - 1;
        try {
            const cardElement = cardElements[realPosition]
            this.tapMobiCardElement(cardElement);
        } catch (e) {
            Error('Check Position should be from 1 on the partner cards')
        }

    }

    isMobiCardElementDisplayed(position: number) {
        const cardElements = this.getComponentElements(this.cardSelector);
        const realPosition = position - 1;
        if (position === 0) {
            throw new Error('Real position can not be 0')
        }
        return cardElements[realPosition].isDisplayed();
    }

    waitForCardElementDisplay(position: number) {
        const cardElement = this.getCardElementAtIndex(this.cardSelector, position);
        cardElement.waitForExist(5000);
        cardElement.scrollIntoView();
    }

    findMobiCard(cardTitle: string): WebdriverIO.Element {
        const cardElement = this.getCardElementAtCardIndex(cardTitle, this.cardTitleSelector, this.cardSelector);
        if (!cardElement.isDisplayed()) {
            cardElement.scrollIntoView();
        }
        browser.pause(500);

        return cardElement;
    }

    getCardTitleAtIndex(index: number): string {
        return Screen.getTextOfElement(this.getCardTitleElementAtIndex(this.cardSelector, this.cardTitleSelector, index));

    }

    getCardContentAtIndex(index: number): string {
        return Screen.getTextOfElement(this.getCardTitleElementAtIndex(this.cardSelector, this.cardContent, index));

    }
}
