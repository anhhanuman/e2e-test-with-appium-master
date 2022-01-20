import {AddDocument} from "@apps/iaa/screen-objects/document/add-document/add.document";

export class AddDocumentValidator {
    constructor(private addDocument: AddDocument) {
    }

    expectSelectedDocumentType(expectedSelectedDocumentType: string) {
        const actual = this.addDocument.getSelectedDocumentType();
        expect(actual).toEqual(expectedSelectedDocumentType);

        return this;
    }

    expectDocumentPreviewCardContent(expectedDocumentPreviewCardContent: string) {
        const actual = this.addDocument.getDocumentPreviewCardContent();
        expect(actual).toEqual(expectedDocumentPreviewCardContent);

        return this;
    }

    expectHintNoDocsGroupDisplayed(expectedHintNoDocsDisplayed: Array<boolean>) {
        const actual = this.addDocument.isHintNoDocsGroupDisplayed();
        expect(actual).toEqual(expectedHintNoDocsDisplayed);

        return this;
    }

    expectHintDocTitleContent(expectedHintDocTitleContent: string) {
        const actual = this.addDocument.getHintDocTitleContent();
        expect(actual).toEqual(expectedHintDocTitleContent);

        return this;
    }

    expectHintIconProperties(expectedHintIconProperties: Array<string>) {
        const actual = this.addDocument.getHintIconProperties();
        expect(actual).toEqual(expectedHintIconProperties);

        return this;
    }

    expectedHintBoxProperties(expectedHintBoxProperties: Array<string>) {
        const actual = this.addDocument.getHintBoxProperties();
        expect(actual).toEqual(expectedHintBoxProperties);

        return this;
    }

    expectMappedDocumentCategory() {
        const actual = this.addDocument.getMappedDocumentCategory();
        expect(actual).not.toEqual('');
        expect(actual).not.toEqual('undefined');
        expect(actual).not.toEqual('null');

        return this;
    }

    expectSelectedDocumentTypeAndCategory(expectedSelectedDocumentAndCategory: string) {
        const actual = this.addDocument.getSelectedDocumentAndCategory();
        expect(actual).toEqual(expectedSelectedDocumentAndCategory);
        return this;
    }

    expectSelectedDocumentTypeCSSProperty(expectedSelectedDocumentTypeCSSProperty: string) {
        const actual = this.addDocument.getDocumentTypeCSSProperty();
        expect(actual).toEqual(expectedSelectedDocumentTypeCSSProperty);
        return this;
    }

    expectDocumentIconCSSProperties(expectedDocumentIconCSSProperties: Array<string>) {
        const actual = this.addDocument.getDocumentIconCSSProperties();

        expect(actual).toEqual(expectedDocumentIconCSSProperties);
        return this;
    }

    expectDefaultDocumentName(expectedDefaultDocumentName: string) {
        const actual = this.addDocument.getDefaultDocumentName();
        expect(actual).toEqual(expectedDefaultDocumentName);
        return this;
    }

    expectDocumentPreviewCardContentCSSProperties(expectedCSSProperties: Array<string>) {
        const actual = this.addDocument.getDocumentPreviewCardContentCSSProperties();
        expect(actual).toEqual(expectedCSSProperties);

        return this;
    }

    expectErrorToolTipContent(expectedErrorToolTipContent: string) {
        const actual = this.addDocument.getErrorToolTipContent();
        expect(actual).toEqual(expectedErrorToolTipContent);

        return this;
    }

    expectFoundErrorIconOnDocumentCategory() {
        const actual = this.addDocument.isErrorIconOnDocumentCategoryDisplayed();
        expect(actual).toEqual(true);

        return this;
    }

    expectFoundErrorIconOnToolTip() {
        const actual = this.addDocument.isErrorIconOnToolTipDisplayed();
        expect(actual).toEqual(true);

        return this;
    }

    expectToggleStatus(status: string) {
        const actual = this.addDocument.getToggleStatus();
        expect(actual).toEqual(status);

        return this;
    }

    expectTaskCreationHint(hint: string) {
        const actual = this.addDocument.getTaskCreationHint();
        expect(actual).toEqual(hint);

        return this;
    }
}
