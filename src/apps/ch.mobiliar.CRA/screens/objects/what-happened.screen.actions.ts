import Input from '../../../../shared/helpers/input';
import {WhatHappenedElement} from '../selectors/what-happened.element';
import {Screen} from '@shared/helpers/screen';

class WhatHappenedScreen {
    private element = new WhatHappenedElement();

    private defineScreenElements(): Array<WebdriverIO.Element> {
        let whatHappenedScreenElements: Array<WebdriverIO.Element> = [];
        whatHappenedScreenElements.push(this.element.headerTitle, this.element.searchClaimCategoryInput);
        const mainClaimEventCategoriesElements = this.element.mainClaimEventCategories;
        whatHappenedScreenElements = [...whatHappenedScreenElements, ...mainClaimEventCategoriesElements];
        return whatHappenedScreenElements;
    }

    waitForDisplay() {
        Screen.waitForElementsDisplay(this.defineScreenElements());
    }

    isClaimEventScreenDisplayed(): boolean {
        return this.element.headerTitle.isDisplayed();
        //todo: should return all elements list
    }

    getMainClaimEventCategories(): Array<string> {
        const mainClaimEventCategories: Array<string> = [];

        const mainClaimEventCategoriesElements = this.element.mainClaimEventCategories;
        for (let index in mainClaimEventCategoriesElements) {
            mainClaimEventCategories.push(mainClaimEventCategoriesElements[index].getText());
        }
        return mainClaimEventCategories;
    }

    tapBackButton(): void {
        let currentBackButton: WebdriverIO.Element = browser.$('');
        if (this.element.fourClaimEventCategories[0].isDisplayed()) {
            currentBackButton = this.element.fourClaimEventCategories[0];
            currentBackButton.click();
        } else if (this.element.thirdClaimEventCategories[0].isDisplayed()) {
            currentBackButton = this.element.thirdClaimEventCategories[0];
            currentBackButton.click();
        } else if (this.element.secondClaimEventCategories[0].isDisplayed()) {
            currentBackButton = this.element.secondClaimEventCategories[0];
            currentBackButton.click();
        } else {
            return;
        }
    }

    enterSearchInput(enterWhatClaimEventToSearchFor: string) {
        Input.setInputValue(this.element.searchClaimCategoryInput, enterWhatClaimEventToSearchFor);
    }

    tapOnCategoryEvent(eventName: string) {
        const claimCategoryButton = browser.$$(`ion-label*=${eventName}`)[0]; //todo: redefine this
        claimCategoryButton.click();
    }

    tapSelectButton(): void {
        this.element.selectButton.click();
    }

    selectCategory(categories: string[]) {
        for (let category of categories) {
            this.tapOnCategoryEvent(category);
        }

        this.tapSelectButton();
    }

    enterDescriptionValue(description: string) {
        Input.setInputValue(this.element.descriptionInput, description);
    }

    tapNextButton(): void {
        this.element.nextButton.click();
    }
}

const expectedClaimEventFirstCategories: Array<string> = ['People', 'My property', 'Foreign property', 'Further'];
export {expectedClaimEventFirstCategories};

export const whatHappenedScreen = new WhatHappenedScreen();
