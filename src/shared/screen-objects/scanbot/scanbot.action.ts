import {Contexts} from "@shared/helpers";
import {Screen} from "@shared/helpers/screen";
import {ScanbotElement} from "@shared/screen-objects/scanbot/scanbot.element";
import {ScannedImagePreview} from "@shared/screen-objects/scannedImage/scanned-image-preview.action";
import {LoadingContent} from "@shared/screen-object-components/loading-content/loading.content";

export class ScanBot {
    private scanBotElement = new ScanbotElement();

    waitForScanBotSDKReady() {
        Contexts.doTasksInNativeContext(() => {
            const sdkElements = this.defineInitialScanBotSDKElements();
            Screen.waitForElementsDisplay(sdkElements);
        });

        return this;
    }

    private defineInitialScanBotSDKElements() {
        let sdkElements = [];
        sdkElements.push(
            this.scanBotElement.cancelScanButton,
            this.scanBotElement.multiPageButton,
            this.scanBotElement.flashButton,
            this.scanBotElement.autoButton
        );

        return sdkElements;
    }

    scan() {
        Contexts.acceptPermission()
            .doTasksInNativeContext(() => {
                this.tapNativeScanButton()
                    .tapScannedPage()
            });
        LoadingContent.waitForLoadingContentDismiss();

        return this;
    }

    scanAndDisplayNextScreen(isForeignContract: boolean) {
        this.scan()
            .getImagePreview(isForeignContract)
            .tapDoneButton();
    }

    tapNativeScanButton() {
        Screen.waitForElementDisplay(this.scanBotElement.nativeScanButton);
        this.scanBotElement.nativeScanButton.click();

        return this;
    }

    tapScannedPage() {
        Screen.tapAndWaitForNotDisplay(this.scanBotElement.scannedPage);
    }

    getImagePreview(isForeignContract: boolean) {
        return new ScannedImagePreview(isForeignContract);
    }
}
