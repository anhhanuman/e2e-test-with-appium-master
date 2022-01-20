import {Contexts} from "@shared/helpers";
import {Screen} from "@shared/helpers/screen";
import {ImagePreview} from "@shared/screen-object-components/image-preview/image-preview.action";
import {AlertDialogElement} from "@shared/screen-object-components/alert-dialog/alert-dialog.element";
import {AlertDialog, expectedRemoveImageAlertDialog} from "@shared/screen-object-components";

export class ActionSheetOverImage {
    private readonly selectors = {
        optViewFullScreen: '~View full screen',
        optExportToGallery: '~Export to gallery',
        optRemoveImage: '~Remove image',
    }

    get optViewFullScreen() {
        return $(this.selectors.optViewFullScreen);
    }

    get optExportToGallery() {
        return $(this.selectors.optExportToGallery);
    }

    get optRemoveImage() {
        return $(this.selectors.optRemoveImage);
    }

    viewImageFullScreen() {
        Contexts.doTasksInNativeContext(() => {
            this.optViewFullScreen.click();
            Screen.waitUntilElementNotExist(this.optViewFullScreen);
            ImagePreview.tapCloseButton();
        });

        return this;
    }

    exportToGallery() {
        Contexts.doTasksInNativeContext(() => {
            this.optExportToGallery.click();
            Screen.waitUntilElementNotExist(this.optExportToGallery);
            Contexts.acceptPermission();
        });

        return this;
    }

    removeImage() {
        Contexts.doTasksInNativeContext(() => {
            this.optRemoveImage.click();
            Screen.waitUntilElementNotExist(this.optRemoveImage);
        });
        Screen.waitForElementDisplay(AlertDialogElement.alertDialog);
        AlertDialog.tapAlertDialogButtonAndWaitForAlertNotDisplay(expectedRemoveImageAlertDialog[3]);

        return this;
    }

    getImagedActionSheetOptions() {
        let actionSheetOptions = [];
        Contexts.doTasksInNativeContext(() => {
            actionSheetOptions.push(
                this.optViewFullScreen.getText(),
                this.optExportToGallery.getText(),
                this.optRemoveImage.getText()
            );
        });

        return actionSheetOptions;
    }

    verify() {
        return this;
    }

    expectedImagedActionSheetOptions(expectedList: Array<string>) {
        const actual = this.getImagedActionSheetOptions();
        expect(actual).toEqual(expectedList);

        return this;
    }

}
