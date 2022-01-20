import {Document} from "@apps/iaa/screen-objects/document/document.action";

export class DocumentValidator {
    constructor(private docScreen: Document) {
    }

    expectFoundNumberOfDocuments(numberOfDocuments: number) {
        const actual = this.docScreen.getTotalDocuments();
        expect(actual).toEqual(numberOfDocuments);

        return this;
    }

    expectDocumentsDownloadedSuccessfully() {
        const numberOfGreenIcons = this.docScreen.getTotalGreenIcons();
        const numberOfDocuments = this.docScreen.getTotalDocuments();
        expect(numberOfGreenIcons).toEqual(numberOfDocuments);

        return this;
    }

    expectNumberOfGreenIconOnDocumentCards(numberOfGreenIcons: number) {
        const actual = this.docScreen.getTotalGreenIcons();
        expect(actual).toEqual(numberOfGreenIcons);

        return this;
    }

    expectUploadingDocumentCardDetailsEqual(documentCardDetails: Array<string>) {
        const actual = this.docScreen.getUploadingDocumentCardDetails();
        expect(actual).toEqual(documentCardDetails);

        return this;
    }

    expectFoundMCMUploadedDocumentCardDetails(dateAndTimeUploaded: string, uploadedDocumentCardDetails: Array<string>) {
        const actual = this.docScreen.getUploadedDocumentDetail(dateAndTimeUploaded);
        expect(actual).toEqual(uploadedDocumentCardDetails);

        return this;
    }

    expectInProgressUploadingDocument() {
        const numberOfHourGlassIcons = this.docScreen.getTotalInProgressIcons();
        expect(numberOfHourGlassIcons).toEqual(1);

        return this;
    }
}
