import {ScannedImagePreviewElement} from "@shared/screen-objects/scannedImage/scanned-image-preview.element";
import {Screen} from "@shared/helpers/screen";

export class ScannedImagePreview {
    private readonly element: ScannedImagePreviewElement;

    constructor(isForeignContract: boolean) {
        this.element = new ScannedImagePreviewElement(isForeignContract);
    }

    tapDoneButton() {
        const doneButton = this.element.getDoneButton()
        Screen.tapWhenDisplay(doneButton)
        browser.pause(2000);
    }

    tapCloseButton() {
        const xButton = this.element.getCloseButton()
        Screen.tapWhenDisplay(xButton);
    }

}
