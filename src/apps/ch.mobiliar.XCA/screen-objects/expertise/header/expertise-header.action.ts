import {BaseHeader} from '@shared/base/base-header';
import {Screen} from '@shared/helpers/screen';
import {UploadingOverlay} from '@apps/xca/screen-objects/expertise/components/uploading-overlay/uploading-overlay.action';
import {ExpertiseHeaderValidator} from "@apps/xca/screen-objects/expertise/header/expertise-header.validator";
import {ExpertiseHeaderElement} from "@apps/xca/screen-objects/expertise/header/expertise-header.element";

const expertiseHeaderElement = new ExpertiseHeaderElement();

export class ExpertiseHeader extends BaseHeader {
    verify() {
        return new ExpertiseHeaderValidator(this);
    }

    waitForDisplay() {
        Screen.waitForElementDisplay(expertiseHeaderElement.dispatchNumber);
    }

    get dispatchNumber(): string {
        return expertiseHeaderElement.dispatchNumber.getText()
    }

    tapPenEdit() {
        expertiseHeaderElement.penEdit.click();
        return this;
    }

    getPenEditIconDisplayingState(): boolean {
        return expertiseHeaderElement.penEdit.isDisplayed();
    }

    isUploadButtonDisplayed(): boolean {
        return expertiseHeaderElement.uploadButton.isDisplayed();
    }

    getUploadedToMCMStatus(): string {
        return expertiseHeaderElement.uploadedStatus.getText();
    }

    isCheckMarkIconTopRightDisplayed(): boolean {
        return expertiseHeaderElement.greenTickedIconOnTopRight.isDisplayed();
    }

    tapUploadButton() {
        Screen.tapToElement(expertiseHeaderElement.uploadButton);

        return new UploadingOverlay();
    }
}
