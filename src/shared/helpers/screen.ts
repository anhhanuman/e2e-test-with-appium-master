import {Contexts} from './contexts';
import {HeaderToolbarElement} from '../screen-object-components/header-toolbar/header-toolbar.element';
import {SegmentElement} from '../screen-object-components/segment/segment.element';
import {LoadingContent} from '../screen-object-components/loading-content/loading.content';
import Gestures from '@shared/helpers/gestures';
import * as _ from 'lodash';
import {BaseNativeElement} from '@shared/screen-object-components/elements/base.element';
import {Coordinate} from '@shared/helpers/coordinate';

const DEFAULT_TIMEOUT: number = 60000;
const deviceType = browser.capabilities['deviceType'];

export class Screen {
    private static readonly actionSheetSelector = {
        actionSheetDoneButton: '~Done'
    };

    private static readonly startScreenSelectors = {
        searchButton: 'app-overview div.search-area'
    };

    private static get searchPartnerButton() {
        return $(this.startScreenSelectors.searchButton);
    }

    private static get actionSheetDoneButton() {
        return $(this.actionSheetSelector.actionSheetDoneButton);
    }


    static waitForProcessingFromSearchResult() {
        const loadingContentElement = LoadingContent.loadingContent;
        const searchButton = this.searchPartnerButton;
        this.waitForElementNotDisplayInShortTimeOut(loadingContentElement);
        this.waitForElementNotDisplayInShortTimeOut(searchButton);

        return this;
    }

    static waitForElementDisplayInShortTimeOut(element: WebdriverIO.Element) {
        if (element.isDisplayed()) {
            return this;
        }

        browser.waitUntil(
            () => {
                return element.isDisplayed();
            },
            20000,
            `ERROR: element ${element} does not display in view after 20s`,
            500
        );
        return this;
    }

    static waitForElementNotDisplayInShortTimeOut(element: WebdriverIO.Element) {
        if (!element.isDisplayed()) {
            return;
        }

        browser.waitUntil(
            () => {
                return !element.isDisplayed();
            },
            5000,
            `ERROR: element ${element} does not display in view after 5s`,
            1000
        );
    }

    static waitForElementDisplay(element: WebdriverIO.Element) {
        if (element.isDisplayed()) {
            return this;
        } else {
            browser.waitUntil(
                () => {
                    return element.isDisplayed();
                },
                DEFAULT_TIMEOUT,
                `ERROR: element ${element} does not display in view after ${DEFAULT_TIMEOUT / 1000}s`,
                2000
            );
            return this;
        }
    }

    static waitUntilElementNotDisplay(element: WebdriverIO.Element) {
        if (element.isDisplayed()) {
            browser.waitUntil(
                () => {
                    return !element.isDisplayed();
                },
                DEFAULT_TIMEOUT,
                `ERROR:element ${element} still display after waiting for ${DEFAULT_TIMEOUT / 1000}s`
            );
        }
        return this;
    }

    static waitForAttributeStatus(element: WebdriverIO.Element, attributeName: string, attributeValue: string) {
        let actualAttributeValue = element.getAttribute(attributeName)
        if (actualAttributeValue !== attributeValue) {
            browser.waitUntil(
                () => {
                    return actualAttributeValue === attributeValue;
                },
                1000,
                `ERROR:element ${element} still display after waiting for 1s`
            );
        }
    }

    static waitUntilProcessingElementNotDisplay(processingElement: WebdriverIO.Element) {
        if (processingElement.isDisplayed()) {
            const loadingTimeOut: number = 450000;
            browser.waitUntil(
                () => {
                    return !processingElement.isDisplayed();
                },
                loadingTimeOut,
                `ERROR:element ${processingElement} still display after waiting for ${loadingTimeOut / (60 * 1000)}min`
            );
        }
        return;
    }

    static waitForElementsDisplay(elements: WebdriverIO.Element[]) {
        for (const element of elements) {
            if (element.isDisplayed()) {
                continue;
            }

            browser.waitUntil(
                () => {
                    return element.isDisplayed();
                },
                DEFAULT_TIMEOUT,
                `ERROR: element ${element} does not display in view after ${DEFAULT_TIMEOUT / 1000}s`,
                2000
            );
        }
        return this;
    }

    private static waitForElementsHaveText(elements: WebdriverIO.Element[]) {
        for (const element of elements) {
            if (element.getText().trim().length !== 0) {
            } else {
                browser.waitUntil(
                    () => {
                        return element.getText().length !== 0;
                    },
                    DEFAULT_TIMEOUT,
                    `ERROR: element ${element} does not display in view after ${DEFAULT_TIMEOUT / 1000}s`,
                    2000
                );
            }
        }
    }

    private static waitForElementHaveText(element: WebdriverIO.Element) {
        if (element.getText().trim().length === 0) {
            browser.waitUntil(
                () => {
                    return element.getText().length !== 0;
                },
                DEFAULT_TIMEOUT,
                `ERROR: element ${element} does not display in view after ${DEFAULT_TIMEOUT / 1000}s`,
                2000
            );
        }
    }

    static waitForElementsHasValue(elements: Array<WebdriverIO.Element>) {
        this.waitForElementsDisplay(elements)
            .waitForElementsHaveText(elements);
    }

    static waitForElementHasValue(element) {
        this.waitForElementHaveText(element);
    }

    static waitForElementsExist(elements: WebdriverIO.Element[]) {
        for (const element of elements) {
            if (element.isExisting()) {
                browser.waitUntil(
                    () => {
                        return element.isExisting();
                    },
                    DEFAULT_TIMEOUT,
                    `ERROR: element ${element} still exists in DOM after waiting for ${
                        DEFAULT_TIMEOUT / 1000
                    }s`,
                    2000
                );
            } else {
                return;
            }
        }
    }

    static waitUntilElementNotExist(element: WebdriverIO.Element) {
        if (element.isExisting()) {
            browser.waitUntil(
                () => {
                    return !element.isExisting();
                },
                DEFAULT_TIMEOUT,
                `ERROR: element ${element} still exists in DOM after waiting for ${DEFAULT_TIMEOUT / 1000}s`,
                5000
            );
        }
        return this;
    }

    static waitUntilElementsNotExist(elements: Array<WebdriverIO.Element>) {
        for (const element of elements) {
            if (element.isExisting()) {
                browser.waitUntil(
                    () => {
                        return !element.isExisting();
                    },
                    DEFAULT_TIMEOUT,
                    `ERROR: element ${element} still exists in DOM after waiting for ${DEFAULT_TIMEOUT / 1000}s`,
                    2000
                );
            } else {
                return;
            }
        }
    }

    static waitUntilElementsNotDisplay(elements: Array<WebdriverIO.Element>) {
        for (const element of elements) {
            if (element.isDisplayed()) {
                browser.waitUntil(
                    () => {
                        return !element.isDisplayed();
                    },
                    DEFAULT_TIMEOUT,
                    `ERROR: element ${element} still display after ${DEFAULT_TIMEOUT / 1000}s`,
                    2000
                );
            } else {
                return;
            }
        }
    }

    static waitUntilElementNotExistingStateReturn(element: WebdriverIO.Element): boolean {
        browser.waitUntil(
            () => {
                return !element.isExisting();
            },
            DEFAULT_TIMEOUT,
            `ERROR: ${element}'s existing state is still true after waiting for ${
                DEFAULT_TIMEOUT / 1000
            }s. It should be false`,
            5000
        );
        return element.isExisting();
    }

    static tapAndWaitForNotDisplay(element: WebdriverIO.Element) {
        this.waitForElementDisplay(element);
        browser.pause(2000);
        element.click();
        this.waitUntilElementNotDisplay(element);
        browser.pause(2000);

        return this;
    }

    static tapWhenDisplay(element: WebdriverIO.Element) {
        this.waitForElementDisplay(element);
        element.click();
        browser.pause(1000);
        return this;
    }

    static tapNativeElementAndWaitForNotDisplay(nativeElement: WebdriverIO.Element) {
        Contexts.doTasksInNativeContext(() => {
            this.tapAndWaitForNotDisplay(nativeElement);
        });

        return this;
    }

    static tapAndWaitForNotExist(element: WebdriverIO.Element) {
        this.waitForElementDisplay(element);
        element.click();
        this.waitUntilElementNotExist(element);

        return this;
    }

    static tapBackButtonOnHeader() {
        const backButtonOnHeader = HeaderToolbarElement.backButton;
        backButtonOnHeader.click();
        this.waitForElementNotDisplayInShortTimeOut(backButtonOnHeader);

        return this;
    }

    static tapDropdown(dropDownElement: WebdriverIO.Element) {
        dropDownElement.click();
    }

    static tapOnElementInListAfterFoundAndWaitForLoadingContentDismiss(
        elementText: string,
        elementsList: Array<WebdriverIO.Element>
    ) {
        this.tapOnElementInListAfterFound(elementText, elementsList);
        LoadingContent.waitForLoadingContentDismiss();
    }

    static tapOnElementInListAfterFound(elementText: string, elementsList: Array<WebdriverIO.Element>) {
        const elementPosition = this.getElementPositionInElementsList(elementText, elementsList);
        elementsList[elementPosition].click();
    }

    static tapOnOtherElementInListAfterFound(
        elementText: string,
        elementsList: Array<WebdriverIO.Element>,
        otherElementsList: Array<WebdriverIO.Element>
    ) {
        const elementPosition = this.getElementPositionInElementsList(elementText, elementsList);
        otherElementsList[elementPosition].click();
    }

    static tapToElement(element: WebdriverIO.Element) {
        if (element.isDisplayed()) {
            element.click();
        } else {
            element.scrollIntoView();
            browser.pause(2000);
            element.click();
            browser.pause(2000);

        }
        return this;
    }

    static tapToElementAndWaitForLoading(element: WebdriverIO.Element) {
        this.tapToElement(element);
        LoadingContent.waitForLoadingContentDismiss();
    }

    static tapToWebviewElementAndSwitchNativeContext(element: WebdriverIO.Element) {
        element.click();
        Contexts.switchToNative();
    }

    static tapToElementAndWaitForNotDisplay(element: WebdriverIO.Element) {
        this.tapToElement(element).waitUntilElementNotDisplay(element);
        return this;
    }

    static tapToSegment(projectName: string, segmentOfWhatScreen: string, segmentName: string) {
        const segmentButtons = SegmentElement.getSegmentButtons(segmentOfWhatScreen);
        const segmentButtonOne = segmentButtons[0];
        const segmentButtonTwo = segmentButtons[1];
        const segmentButtonThee = segmentButtons[2];
        const segmentButtonFour = segmentButtons[3];
        switch (projectName.toUpperCase()) {
            case 'IAA':
                switch (segmentName.toLowerCase()) {
                    case 'favorites':
                        this.tapToElement(segmentButtonOne);
                        break;

                    case 'recent':
                        this.tapToElement(segmentButtonTwo);
                        break;

                    case 'quick search':
                        this.tapToElement(segmentButtonOne);
                        break;

                    case 'partner search':
                        this.tapToElement(segmentButtonTwo);
                        break;

                    case 'partner number':
                        this.tapToElement(segmentButtonThee);
                        break;

                    case 'contracts number':
                        this.tapToElement(segmentButtonFour);
                        break;

                    case 'pending':
                        this.tapToElement(segmentButtonOne);
                        break;

                    case 'finished':
                        this.tapToElement(segmentButtonTwo);
                        break;

                    default:
                        break;
                }
                break;
            case 'CRA':
                switch (segmentName.toLowerCase()) {
                    case 'partner number':
                        segmentButtons[0].click();
                        break;
                    case 'contracts number':
                        segmentButtons[1].click();
                        break;
                    default:
                        break;
                }
                break;
            default:
                break;
        }
    }

    static tapDoneButtonActionSheet() {
        Contexts.switchToNative();
        const doneButton = this.actionSheetDoneButton;
        doneButton.click();
        Contexts.switchToWebview();
    }

    static tapCancelButtonActionSheet() {
        this.tapToElementAndWaitForNotDisplay(BaseNativeElement.cancelOnActionSheet);
        Contexts.switchToWebview();
    }

    static tapToExpandSection(
        expandSectionButtonElement: WebdriverIO.Element,
        collapsedElement: WebdriverIO.Element
    ) {
        this.tapToElement(expandSectionButtonElement);
        Gestures.scrollIntoView(collapsedElement);
    }


    static selectOptionInDropDown(optionElement: WebdriverIO.Element) {
        this.tapAndWaitForNotDisplay(optionElement);
    }

    /*static getUploadingUploadedStates(headerOfWhatScreen: string): Array<boolean> {
        const spinnerState = this.isSpinnerNotificationDisplayedAfterUploadedDoc(headerOfWhatScreen);
        const spinner = HeaderToolbarElement.getSpinnerIcon(headerOfWhatScreen);
        this.waitUntilElementNotDisplay(spinner);
        const errorState = this.isErrorNotificationDisplayed(headerOfWhatScreen);
        let uploadingUploadedStates = [];
        uploadingUploadedStates.push(spinnerState, errorState);

        return uploadingUploadedStates;
    }*/


    static getInfoTitle(titleElement: WebdriverIO.Element) {
        return titleElement.getText();
    }

    static getInfoContent(contentElement: WebdriverIO.Element) {
        return contentElement.getText();
    }

    static getSegmentNames(projectName: string, segmentOfWhatScreen: string, segmentName: string): string {
        const segmentButtons = SegmentElement.getSegmentButtons(segmentOfWhatScreen);
        switch (projectName.toUpperCase()) {
            case 'IAA':
                switch (segmentName.toLowerCase()) {
                    case 'favorites':
                        return segmentButtons[0].getText();

                    case 'recent':
                        return segmentButtons[1].getText();

                    case 'quick search':
                        return segmentButtons[0].getText();

                    case 'partner search':
                        return segmentButtons[1].getText();

                    case 'partner number':
                        return segmentButtons[2].getText();

                    case 'contracts number':
                        return segmentButtons[3].getText();

                    case 'pending':
                        return segmentButtons[0].getText();

                    case 'finished':
                        return segmentButtons[1].getText();

                    default:
                        break;
                }
                break;
            case 'CRA':
                switch (segmentName.toLowerCase()) {
                    case 'partner number':
                        return segmentButtons[0].getText();
                    case 'contracts number':
                        return segmentButtons[1].getText();
                    default:
                        break;
                }
                break;
            default:
                break;
        }
    }

    static getSegmentClassAttribute(
        projectName: string,
        segmentOfWhatScreen: string,
        segmentName: string
    ): string {
        const segmentButtons = SegmentElement.getSegmentButtons(segmentOfWhatScreen);
        if (segmentButtons === undefined) {
            return 'undefined';
        } else {
            switch (segmentName.toLowerCase()) {
                case 'pending':
                    return segmentButtons[0].getAttribute('class');
                case 'finished':
                    return segmentButtons[1].getAttribute('class');
                case 'favorites':
                    return segmentButtons[0].getAttribute('class');
                case 'recent':
                    return segmentButtons[1].getAttribute('class');
            }
        }
    }

    static getSegmentFocus(projectName: string, segmentOfWhatScreen: string, segmentName: string): boolean {
        const segmentAttribute: string = this.getSegmentClassAttribute(projectName, segmentOfWhatScreen, segmentName);
        if (segmentAttribute === 'undefined') {
            return undefined;
        } else {
            return segmentAttribute.includes('segment-button-checked');
        }
    }

    static getElement(element: WebdriverIO.Element) {
        if (element.isExisting()) {
            return element;
        } else {
            return;
        }
    }

    static getTextOfElements(elements: Array<WebdriverIO.Element>): Array<string> {
        let elementTexts = [];
        for (const element of elements) {
            const elementText = this.getTextOfElement(element);
            elementTexts.push(elementText);
        }

        return elementTexts;
    }

    static getTextOfElementsAtPositions(
        elements: Array<WebdriverIO.Element>,
        elementPositions: Array<number>
    ): Array<string> {
        let elementTexts = [];
        for (let index = 0; index < elements.length; index++) {
            if (index < elementPositions.length) {
                elementTexts.push(elements[elementPositions[index]].getText());
            }
        }
        return elementTexts;
    }

    static getTextOfElement(element: WebdriverIO.Element): string {
        if (element.isDisplayed()) {
            return element.getText().trim();
        } else {
            element.scrollIntoView();
            return element.getText().trim();
        }
    }

    static getTextOfMobiCard(
        titleElement: WebdriverIO.Element,
        contentElement: WebdriverIO.Element
    ): Array<string> {
        const title = this.getTextOfElement(titleElement);
        const content = this.getTextOfElement(contentElement);
        let titleAndContent = [];
        titleAndContent.push(title, content);

        return titleAndContent;
    }

    static getMobiCardDetails(
        titleElement: WebdriverIO.Element,
        contentElement: WebdriverIO.Element
    ): Array<string> {
        const title = this.getTextOfElement(titleElement);
        const firstLine = this.getCardContentFirstLine(contentElement);
        const secondLine = this.getCardContentSecondLine(contentElement);
        let titleAndContent = [];
        titleAndContent.push(title, firstLine, secondLine);

        return titleAndContent;
    }

    static getCardContentFirstLine(cardContentElement: WebdriverIO.Element): string {
        const cardContent = this.getTextOfElement(cardContentElement);

        return cardContent.substring(cardContent.search('\n'), 0).trim();
    }

    static getCardContentSecondLine(cardContentElement: WebdriverIO.Element): string {
        const cardContent: string = this.getTextOfElement(cardContentElement);

        return cardContent.substring(cardContent.search('\n')).trim();
    }

    static getSubstringToEnd(text: string, searchForText: string) {
        return text.substring(text.search(searchForText)).trim();
    }

    static getCardContentSecondLineTexts(cardContentElement: Array<WebdriverIO.Element>): Array<string> {
        const cardContents: Array<string> = this.getTextOfElements(cardContentElement);
        let cardContentSecondLines: Array<string> = [];
        for (let item of cardContents) {
            cardContentSecondLines.push(this.getSubstringToEnd(item, '\n'));
        }
        return cardContentSecondLines;
    }

    static getElementDisplayingState(element: WebdriverIO.Element): boolean {
        try {
            return element.isDisplayed();
        } catch (e) {
            return false;
        }
    }

    static scrollToGetElementDisplayingState(element: WebdriverIO.Element): boolean {
        if (!element.isExisting()) {
            return false;
        } else {
            element.scrollIntoView();
            return true;
        }
    }

    static getTotalDisplayingElements(elements: Array<WebdriverIO.Element>): number {
        const elementDisplayingStates: Array<boolean> = this.scrollToGetElementDisplayingStates(elements);

        let actualElementDisplayingStates: Array<boolean> = [];

        for (const elementDisplayingState of elementDisplayingStates) {
            if (elementDisplayingState === true) {
                actualElementDisplayingStates.push(elementDisplayingState);
            } else {
                break;
            }
        }

        return actualElementDisplayingStates.length;
    }

    static scrollToGetElementDisplayingStates(elements: Array<WebdriverIO.Element>): Array<boolean> {
        let elementDisplayingStates: Array<boolean> = [];
        for (const element of elements) {
            element.scrollIntoView();
            elementDisplayingStates.push(element.isDisplayed());
        }

        return elementDisplayingStates;
    }

    static getElementPositionInElementsList(elementText: string, elements: Array<WebdriverIO.Element>): number {
        const textOfElements = this.getTextOfElements(elements);
        if (textOfElements.includes(elementText, 0)) {
            const elementTextPosition: number = textOfElements.indexOf(elementText);
            if (!elements[elementTextPosition].isDisplayed()) {
                elements[elementTextPosition].scrollIntoView();
            }

            return elementTextPosition;
        } else {
            throw Error('Cannot find the text');
        }
    }

    static getTextPositionInTexts(text: string, texts: Array<string>): number {
        if (texts.includes(text, 0)) {
            return texts.indexOf(text);
        } else {
            throw Error('Cannot find the text');
        }
    }

    static findAnElementInElements(elementText: string, elements: Array<WebdriverIO.Element>) {
        const elementTextPosition: number = this.getElementPositionInElementsList(elementText, elements);

        return elements[elementTextPosition];
    }

    static findTextPositionsInTexts(text: string, elements: Array<WebdriverIO.Element>): Array<number> {
        const texts: Array<string> = this.getTextOfElements(elements);
        let textPositions: Array<number> = [];
        if (texts.includes(text, 0)) {
            let textPosition: number = texts.indexOf(text);
            elements[textPosition].scrollIntoView();
            textPositions.push(textPosition);
        }
        return textPositions;
    }

    static findElementTextInList(elementText: string, elements: Array<WebdriverIO.Element>) {
        const elementTexts = this.getTextOfElements(elements);

        if (elementTexts.includes(elementText, 0)) {
            const elementTextPosition: number = elementTexts.indexOf(elementText);
            Gestures.scrollIntoView(elements[elementTextPosition]);

            return elementText;
        } else {
            return;
        }
    }

    static findElementTextInListState(elementText: string, elementsList: Array<WebdriverIO.Element>): boolean {
        let foundElementTextState: boolean;
        const elementsListTexts = this.getTextOfElements(elementsList);
        if (elementsListTexts.includes(elementText, 0)) {
            const elementTextPosition: number = elementsListTexts.indexOf(elementText);
            Gestures.scrollIntoView(elementsList[elementTextPosition]);
            foundElementTextState = true;

            return foundElementTextState;
        } else {
            return foundElementTextState;
        }
    }

    static compareTwoArraysAndReturnDifferenceInPositions(
        arrayOne: Array<string>,
        arrayTwo: Array<string>
    ): Array<number> {
        let positions: Array<number> = [];
        for (let i = 0; i < arrayTwo.length; i++) {
            let name: string = arrayTwo[i];
            if (!arrayOne.includes(name, 0)) {
                positions.push(i);
            }
        }
        return positions;
    }

    static getTheDifferenceElementsOfTheSecondSetOfElementsAfterCompared(
        arrayOne: Array<string>,
        arrayTwo: Array<string>,
        arrayTwoElements: Array<WebdriverIO.Element>
    ): Array<WebdriverIO.Element> {
        const positions: Array<number> = this.compareTwoArraysAndReturnDifferenceInPositions(arrayOne, arrayTwo);

        let resultElements = [];
        for (let position of positions) {
            resultElements.push(arrayTwoElements[position]);
        }
        return resultElements;
    }

    static getExcludedDuplicateTextsInTexts(
        elementTexts: Array<string>,
        duplicateTexts: Array<string>,
        recentPartnerNames: Array<string>
    ): Array<number> {
        const notDuplicateTexts: Array<string> = _.difference(elementTexts, duplicateTexts);
        const notIncludeRecentPartnerNames: Array<string> = _.difference(notDuplicateTexts, recentPartnerNames);

        let positions: Array<number> = [];
        for (let i = 0; i < notIncludeRecentPartnerNames.length; i++) {
            let notIncludeRecentPartnerName: string = notIncludeRecentPartnerNames[i];
            if (elementTexts.includes(notIncludeRecentPartnerName, 0)) {
                positions.push(elementTexts.indexOf(notIncludeRecentPartnerName));
            }
        }

        return positions;
    }

    static getElementsOfIntersectedArrayInAnArray(
        originalElements: Array<WebdriverIO.Element>,
        originalTexts: Array<string>,
        intersectedTexts: Array<string>
    ): Array<WebdriverIO.Element> {
        let expectedElements = [];
        for (let i = 0; i < intersectedTexts.length; i++) {
            let text = intersectedTexts[i];
            if (originalTexts.includes(text, 0)) {
                expectedElements.push(originalElements[originalTexts.indexOf(text)]);
            }
        }
        return expectedElements;
    }

    static getDuplicateValues(elementTexts: Array<string>): Array<string> {
        let duplicates: Array<string> = [];
        const tempArray: Array<string> = [...elementTexts].sort();

        for (let i = 0; i < tempArray.length; i++) {
            if (tempArray[i + 1] === tempArray[i]) {
                duplicates.push(tempArray[i]);
            }
        }
        return duplicates;
    }

    static isElementHTMLIncluded(element: WebdriverIO.Element, HTMLIncludeWhat: string): boolean {
        return element.getHTML().includes(HTMLIncludeWhat);
    }

    static getElementAttribute(element: WebdriverIO.Element, whatAttribute: string): string {
        return element.getAttribute(whatAttribute);
    }

    static getElementAttributes(elements: Array<WebdriverIO.Element>, whatAttribute: string): Array<string> {
        let elementAttributes = [];
        for (const element of elements) {
            elementAttributes.push(element.getAttribute(whatAttribute));
        }
        return elementAttributes;
    }

    static getOneRandomElement(elements: Array<WebdriverIO.Element>) {
        const oneRandomElement = elements[Math.floor(Math.random() * elements.length)];
        oneRandomElement.scrollIntoView();

        return oneRandomElement;
    }

    static getElementPosition(element: WebdriverIO.Element, elements: Array<WebdriverIO.Element>): number {
        if (elements.includes(element, 0)) {
            return elements.indexOf(element);
        } else {
            throw Error('invalid element in the provided elements');
        }
    }

    static tapRandomElement(elements: Array<WebdriverIO.Element>) {
        const randomElement = this.getOneRandomElement(elements);
        this.tapToElementAndWaitForNotDisplay(randomElement);

        return this;
    }

    static getItemTextTitleAndContent(
        labelElements: Array<WebdriverIO.Element>,
        contentElements: Array<WebdriverIO.Element>,
        size: number
    ): Array<string>[] {
        let labelAndContent: Array<string>[] = [];
        let label: string = '';
        let content: string = '';

        for (let i = 0; i < size; i++) {
            label = this.getTextOfElement(labelElements[i]);
            content = this.getTextOfElement(contentElements[i]);
            labelAndContent.push([label, content]);
        }
        return labelAndContent;
    }

    static getItemTextTitleAndContentAtPositions(
        labelElements: Array<WebdriverIO.Element>,
        contentElements: Array<WebdriverIO.Element>,
        positions: Array<number>
    ): Array<string>[] {
        let labelAndContent: Array<string>[] = [];
        let label: string = '';
        let content: string = '';

        if (positions.length > 0) {
            for (const data of positions) {
                label = this.getTextOfElement(labelElements[data]);
                content = this.getTextOfElement(contentElements[data]);
                labelAndContent.push([label, content]);
            }
        }

        return labelAndContent;
    }

    static getOneRandomElementText(elements: Array<WebdriverIO.Element>): string {
        const elementTexts: Array<string> = this.getTextOfElements(elements);
        return elementTexts[Math.floor(Math.random() * elementTexts.length)];
    }

    static getPickerWheelValue() {
        Contexts.switchToNative();

        return BaseNativeElement.pickerWheel.getValue();
    }

    static getPickerWheelList() {
        Contexts.switchToNative();
        let currentPickerWheelValue = '';
        let afterScrolledPickerWheelValue = '';
        let documentTypes = [];
        let i = 0;
        do {
            currentPickerWheelValue = this.getPickerWheelValue();
            if (currentPickerWheelValue === null || currentPickerWheelValue === '') {
                throw Error('Picker wheel document type does not have value');
            }
            documentTypes.push(currentPickerWheelValue);
            Coordinate.scrollToNextDocumentType();
            afterScrolledPickerWheelValue = this.getPickerWheelValue();
            i++;
        } while (afterScrolledPickerWheelValue !== currentPickerWheelValue);
        {
            this.tapCancelButtonActionSheet();
        }
        return documentTypes;
    }

    static scrollToType(pickerWheelValue: string) {
        Contexts.switchToNative();
        if (this.getPickerWheelValue() !== pickerWheelValue) {
            do {
                Coordinate.scrollToNextDocumentType();
            } while (this.getPickerWheelValue() !== pickerWheelValue);
            {
                this.tapDoneButtonActionSheet();
            }
        } else {
            this.tapDoneButtonActionSheet();
        }
        Contexts.switchToWebview();
    }

    static displayElement(element: WebdriverIO.Element) {
        element.scrollIntoView();
    }

    static getIndexesOfElements(elements): Array<number> {
        let newItems = [];
        for (const index in elements) {
            if (elements.hasOwnProperty(index)) {
                newItems.push(parseInt(index));
            }
        }

        return newItems;
    }
}
