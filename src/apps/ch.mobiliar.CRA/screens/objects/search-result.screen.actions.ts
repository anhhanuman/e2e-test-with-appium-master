import {SearchResultElement} from '../selectors/search-result.element';
import {Screen} from '@shared/helpers/screen';

class SearchResultScreen {
    private element = new SearchResultElement();

    private defineScreenElements(): Array<WebdriverIO.Element> {
        const searchResultScreenElements: Array<WebdriverIO.Element> = [];
        searchResultScreenElements.push(
            this.element.searchCriteriaInfo,
            this.element.searchResultItems[0],
            this.element.searchResultItemTitle[0]
        );
        return searchResultScreenElements;
    }

    waitForDisplay(): void {
        Screen.waitForElementsDisplay(this.defineScreenElements());
    }

    private waitForNotDisplay(): void {
        const searchResultElements: Array<WebdriverIO.Element> = [];
        searchResultElements.push(this.element.searchCriteriaInfo, this.element.editButton);
        Screen.waitUntilElementsNotDisplay(searchResultElements);
    }

    selectFirstResult() {
        this.element.searchResultItems[0].click();
        this.waitForNotDisplay();
    }

    selectResultAtIndex(index: number) {
        this.element.searchResultItems[index].click();
        this.waitForNotDisplay();
    }

    tapEditButton(): void {
        this.element.editButton.click();
        this.waitForNotDisplay();
    }
}

export const searchResultScreen = new SearchResultScreen();
