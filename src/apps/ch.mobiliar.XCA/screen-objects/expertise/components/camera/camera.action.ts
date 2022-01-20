import {CameraElement} from "@apps/xca/screen-objects/expertise/components/camera/camera.element";
import {Contexts} from "@shared/helpers";
import {Screen} from "@shared/helpers/screen";

export class Camera {
    private element = new CameraElement();

    catchPhotoAndUse() {
        Contexts.acceptPermission()
            .doTasksInNativeContext(() => {
                this.element.photoCaptureButton.click()
                Screen.waitUntilElementNotDisplay(this.element.photoCaptureButton)
                this.element.usePhotoButton.click()
                Screen.waitUntilElementNotDisplay(this.element.usePhotoButton)
                browser.pause(2000)
            })
    }
}
