import {DocumentElement} from './document.element';
import {DocumentValidator} from './document.validator';
import {Screen} from '@shared/helpers/screen';
import {BaseElement} from '@shared/screen-object-components/elements/base.element';
import {HeaderToolbarElement} from '@shared/screen-object-components/header-toolbar/header-toolbar.element';
import {ButtonName, ScreenName} from '@shared/helpers/testdata';
import {ScanBot} from "@shared/screen-objects/scanbot/scanbot.action";
import {BaseScreen} from "@apps/iaa/screen-objects/base/base-screen.action";
import {Toolbar} from "@apps/iaa/screen-objects/components/header-toolbar/toolbar/toolbar.action";

export class Document extends BaseScreen {
    private element: DocumentElement
    private readonly _toolbar: Toolbar

    constructor() {
        super(ScreenName.Documents);
        this._toolbar = new Toolbar(ScreenName.Documents);
        this.element = new DocumentElement(ScreenName.Documents);
    }

    get toolbar() {
        return this._toolbar
    }

    verify() {
        return new DocumentValidator(this);
    }

    tapScanDocButton() {
        Screen.waitForElementDisplay(this.element.scanDocButton);
        this.element.scanDocButton.click();

        return new ScanBot();
    }

    tapBackButtonAndWait() {
        this.toolbar
            .baseToolbar
            .tapToToolbarButton(ButtonName.Back);

        return this;
    }

    tapBackButton() {
        const backButtonOnHeader = HeaderToolbarElement.backButton;
        backButtonOnHeader.click();
        browser.pause(2000);
        return this;
    }

    getTotalDocuments() {
        return this.element.cardDocuments.length;
    }

    getTotalGreenIcons() {
        const greenCheckIcons = this.element.successfulDownloadedIcons;

        return Screen.getTotalDisplayingElements(greenCheckIcons);
    }

    getUploadingDocumentTitle() {
    }

    getUploadingDocumentCardType() {
    }

    getUploadingDocumentDateTime() {
    }

    getUploadingDocumentCardDetails(): Array<string> {
        const documentCardTitleElement = BaseElement.getMobiCardTitle(ScreenName.Documents, false)[0];
        const documentCardContentElement = BaseElement.getMobiCardContent(ScreenName.Documents, false)[0];

        return Screen.getMobiCardDetails(documentCardTitleElement, documentCardContentElement);
    }

    findDocumentPosition(dateAndTimeUploaded: string) {
        const dateAndTimeOfUploadedOfDocuments = Screen.getCardContentSecondLineTexts(BaseElement.getMobiCardContent(ScreenName.Documents, false));

        return Screen.getTextPositionInTexts(dateAndTimeUploaded, dateAndTimeOfUploadedOfDocuments);
    }

    getUploadedDocumentDetail(dateAndTimeUploaded: string): Array<string> {
        const elementPosition = this.findDocumentPosition(dateAndTimeUploaded);
        const documentCardTitleElement = BaseElement.getMobiCardTitle(ScreenName.Documents, false)[elementPosition];
        const documentCardContentElement = BaseElement.getMobiCardContent(ScreenName.Documents, false)[elementPosition];

        return Screen.getMobiCardDetails(documentCardTitleElement, documentCardContentElement);
    }

    getTotalInProgressIcons() {
        const hourGlassIcons = BaseElement.overlayHourGlassIcon(ScreenName.Documents);

        return Screen.getTotalDisplayingElements(hourGlassIcons);
    }
}

