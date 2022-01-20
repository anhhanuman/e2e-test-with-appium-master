import {ScreenSelector} from "@shared/helpers/testdata";

export class ScannedImagePreviewElement {
    private readonly headerButton = ' ion-header ion-button';

    constructor(private isForeignContract: boolean) {
    }

    headerButtons() {
        if (this.isForeignContract) {
            return $$(ScreenSelector.scannedForeignContractPreview.concat(this.headerButton));
        } else {
            return $$(ScreenSelector.scannedDocumentPreview.concat(this.headerButton));
        }
    }

    getDoneButton() {
        if (this.isForeignContract) {
            return $$(ScreenSelector.scannedForeignContractPreview.concat(this.headerButton))[1];
        } else {
            return $$(ScreenSelector.scannedDocumentPreview.concat(this.headerButton))[1];
        }
    }

    getCloseButton() {
        if (this.isForeignContract) {
            return $$(ScreenSelector.scannedForeignContractPreview.concat(this.headerButton))[0];
        } else {
            return $$(ScreenSelector.scannedDocumentPreview.concat(this.headerButton))[0];
        }
    }
}
