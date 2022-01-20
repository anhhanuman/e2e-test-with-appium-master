import {AddDocumentElement} from '@apps/iaa/screen-objects/document/add-document/add-document.element';
import {Screen} from '@shared/helpers/screen';
import {BaseElement} from '@shared/screen-object-components/elements/base.element';
import {AddDocumentValidator} from '@apps/iaa/screen-objects/document/add-document/add-document.validator';
import Input from '@shared/helpers/input';
import {ScannedImagePreview} from "@shared/screen-objects/scannedImage/scanned-image-preview.action";
import {BaseScreen} from "@apps/iaa/screen-objects/base/base-screen.action";
import {ScreenName} from "@shared/helpers/testdata";

export class AddDocument extends BaseScreen {
    private readonly element: AddDocumentElement

    constructor() {
        super(ScreenName.AddDocument);
        this.element = new AddDocumentElement();
    }

    verify() {
        return new AddDocumentValidator(this);
    }

    isErrorIconOnToolTipDisplayed() {
        return this.element.errorIconOnToolTip.isDisplayed();
    }

    isHintNoDocsGroupDisplayed(): Array<boolean> {
        const hintDocs = this.element.hintNoDocumentsBox;
        const hintIcon = this.element.hintIcon;
        const hintTitleContent = this.element.hintNoDocumentsTitleContent;
        let hintGroupStates = [];
        hintGroupStates.push(hintDocs.isDisplayed(), hintIcon.isDisplayed(), hintTitleContent.isDisplayed());

        return hintGroupStates;
    }

    tapTaskHintIcon() {
        this.element.hintTaskCreationIcon.click();
        browser.pause(2000);

        return this;
    }

    getHintDocTitleContent() {
        return this.element.hintNoDocumentsTitleContent.getText();
    }

    getHintIconProperties(): Array<string> {
        const hintIcon = this.element.hintIcon;
        let hintIconCSSProperties: Array<string> = [];
        hintIconCSSProperties.push(
            hintIcon.getCSSProperty('font-size').value,
            hintIcon.getCSSProperty('color').parsed.rgba,
            hintIcon.getCSSProperty('align-self').value,
            hintIcon.getCSSProperty('margin-right').value,
            hintIcon.getCSSProperty('margin-top').value
        );

        return hintIconCSSProperties;
    }

    getHintBoxProperties(): Array<string> {
        const hintBox = this.element.hintNoDocumentsBox;
        let hintBoxCSSProperties = [];
        hintBoxCSSProperties.push(
            hintBox.getCSSProperty('border').value,
            hintBox.getCSSProperty('padding').value,
            hintBox.getCSSProperty('box-shadow').value,
            hintBox.getCSSProperty('align-items').value,
            hintBox.getCSSProperty('flex').value,
            hintBox.getCSSProperty('display').value,
            hintBox.getCSSProperty('margin-bottom').value
        );

        return hintBoxCSSProperties;
    }

    uploadScannedDocument() {
        Screen.tapAndWaitForNotDisplay(this.element.addButton);

        return this;
    }

    tapAddButton() {
        Screen.tapToElement(this.element.addButton);

        return this;
    }

    getErrorToolTipContent() {
        return this.element.toolTipContent.getText();
    }

    isErrorIconOnDocumentCategoryDisplayed() {
        return this.element.errorIconDocumentCategory.isDisplayed();
    }

    fillData(documentName: string, documentType?: string, task?: string) {
        if (task === 'no') {
            this.inputDocumentName(documentName)
                .selectDocumentType(documentType)
                .tapToggleButton();

        } else {
            this.inputDocumentName(documentName)
                .selectDocumentType(documentType);
        }

        return this;
    }

    fillDataAndUpload(documentName: string, documentType?: string, task?: string) {
        this.fillData(documentName, documentType, task)
            .uploadScannedDocument();

        return this;
    }

    tapToggleButton() {
        Screen.tapToElement(BaseElement.toggleButton);

        return this;
    }

    getToggleStatus() {
        return BaseElement.toggleStatus.getText();
    }

    getDocumentTypeCSSProperty() {
        return this.element.selectedDocumentContainer.getCSSProperty('background').value;
    }

    getDocumentIconCSSProperties(): Array<string> {
        const documentIcon = this.element.documentIcon;
        let properties: Array<string> = [];
        properties.push(
            documentIcon.getCSSProperty('font-size').value,
            documentIcon.getCSSProperty('color').value,
            documentIcon.getCSSProperty('align-self').value,
            documentIcon.getCSSProperty('margin-right').value
        );

        return properties;
    }

    getDefaultDocumentName() {
        return this.element.documentNameInput.getValue();
    }

    getTaskCreationHint() {
        return this.element.hintTaskCreation.getText();
    }

    inputDocumentName(whatDocumentNameToInput: string) {
        browser.pause(3000);
        const documentNameInputElement = this.element.documentNameInput;
        Input.inputValue(documentNameInputElement, whatDocumentNameToInput);

        return this;
    }

    tapPenIcon() {
        this.element.penIcon.click();
        browser.switchContext('NATIVE_APP');

        return this;
    }

    selectPickerWheelValue(documentType: string) {
        this.element.pickerWheel.addValue(documentType);
        Screen.tapDoneButtonActionSheet();

        return this;
    }

    getPickerWheelValue() {
        const pickerWheel = this.element.pickerWheel;

        return pickerWheel.getValue();
    }

    selectDocumentType(documentType?: string) {
        this.tapPenIcon();
        if (documentType === undefined) {
            this.tapDoneButtonAfterSelectedDocumentType();
        } else {
            this.selectPickerWheelValue(documentType);
        }
        return this;
    }

    tapDoneButtonAfterSelectedDocumentType() {
        Screen.tapDoneButtonActionSheet();

        return this;
    }

    displayDocumentTypeWheelAndSelectDefaultDocumentType() {
        this.tapPenIcon().tapDoneButtonAfterSelectedDocumentType();
        return this;
    }

    tapCloseButton() {
        Screen.tapToElementAndWaitForNotDisplay(this.toolbar.baseToolbar.headerButtonOne);
        return new ScannedImagePreview(false)
    }

    getSelectedDocumentType(): string {
        return Screen.getCardContentSecondLine(this.element.selectedDocumentContent);
    }

    getMappedDocumentCategory(): string {
        return Screen.getCardContentFirstLine(this.element.selectedDocumentContent);
    }

    getSelectedDocumentAndCategory(): string {
        return this.element.selectedDocumentContent.getText();
    }

    getDocumentPreviewCardContent(): string {
        const content = this.element.documentPreviewCardContent;
        return content.getText();
    }

    getDocumentPreviewCardContentCSSProperties(): Array<string> {
        const titleAndContent = this.element.documentPreviewCardContent;
        let properties: Array<string> = [];

        const title = this.element.documentPreviewCardTitle;
        properties.push(titleAndContent.getCSSProperty('font-size').value, title.getCSSProperty('font-weight').value);

        return properties;
    }
}

