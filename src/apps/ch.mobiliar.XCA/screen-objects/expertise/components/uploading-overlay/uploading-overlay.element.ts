export class UploadingOverlayElement {
    private readonly selectors = {
        uploadingMessage: 'div.loading-container div.loading-inner'
    };

    get uploadingMessage() {
        return $(this.selectors.uploadingMessage);
    }

    get uploadingSpinner() {
        return $(this.selectors.uploadingMessage.concat(' div img'));
    }

    get uploadingContent() {
        return $(this.selectors.uploadingMessage.concat(' div.loading-content div:nth-child(2)'));
    }

    get uploadingStatus() {
        return $(this.selectors.uploadingMessage.concat(' '));
    }
}
