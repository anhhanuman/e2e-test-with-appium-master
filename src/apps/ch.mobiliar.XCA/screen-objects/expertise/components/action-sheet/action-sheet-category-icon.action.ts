import {Contexts} from '@shared/helpers';
import {Screen} from '@shared/helpers/screen';
import {Gallery} from '@apps/xca/screen-objects/expertise/components/gallery/gallery.action';
import {Camera} from '@apps/xca/screen-objects/expertise/components/camera/camera.action';
import {ActionSheetElement} from "@apps/xca/screen-objects/expertise/components/action-sheet/action-sheet.element";

export class ActionSheetCategoryIcon {
    private actionSheetElement = new ActionSheetElement();

    tapCameraOption() {
        Contexts.doTasksInNativeContext(() => {
            this.actionSheetElement.optCamera.click();
        });
        return new Camera();
    }

    tapSelectImageOption() {
        try {
            Screen.waitForElementDisplay(this.actionSheetElement.optSelectImages);
        } catch (e) {
            console.error('You may forget to turn on the choose image from gallery', e.stack);
        }
        this.actionSheetElement.optSelectImages.click();

        return new Gallery();
    }

    tapEitherSelectImageOrImage() {
        if (this.actionSheetElement.optSelectImages.isExisting()) {
            this.actionSheetElement.optSelectImages.click();
        } else {
            this.actionSheetElement.optImages.click();
        }

        return new Gallery();
    }

    tapImagesOption() {
        this.actionSheetElement.optImages.click();

        return new Gallery();
    }


}
