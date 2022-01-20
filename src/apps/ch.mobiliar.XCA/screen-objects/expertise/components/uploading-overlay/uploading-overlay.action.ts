import {ExpertiseImage} from '@apps/xca/screen-objects/expertise/components/images/expertise-image.action';
import {UploadingOverlayElement} from '@apps/xca/screen-objects/expertise/components/uploading-overlay/uploading-overlay.element';
import {Screen} from '@shared/helpers/screen';

export class UploadingOverlay {
    private overlayElement = new UploadingOverlayElement();

    waitForUploading() {
        const expertiseImage = new ExpertiseImage();
        const numberOfUploadingImages = expertiseImage.getNumberOfAddedImages();
        const timeout = numberOfUploadingImages * 60 * 1000 + 60 * 5 * 1000;
        Screen.waitForElementDisplay(this.overlayElement.uploadingMessage);
        const uploadingMessageElement = this.overlayElement.uploadingMessage;
        if (uploadingMessageElement.isDisplayed()) {
            browser.waitUntil(
                () => {
                    return !uploadingMessageElement.isDisplayed();
                },
                timeout,
                `ERROR:element uploadingMessage still display after waiting for ${numberOfUploadingImages} images to be uploaded in ${
                    timeout / 60000
                } min + 5 ADDITIONAL minutes, the timeout for uploading 1 image is just 60s. There for, the uploading to MCM is failed.`,
                1000
            );
        }

        return this;
    }

    getUploadingSpinnerAttribute(): string {
        return this.overlayElement.uploadingSpinner.getAttribute('src');
    }
}
