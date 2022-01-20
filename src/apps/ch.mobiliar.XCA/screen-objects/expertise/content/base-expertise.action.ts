import {ExpertiseHeader} from "@apps/xca/screen-objects/expertise/header/expertise-header.action";
import {ExpertiseDetails} from "@apps/xca/screen-objects/expertise/components/expertise-details/expertise-details.action";
import {ExpertiseImage} from "@apps/xca/screen-objects/expertise/components/images/expertise-image.action";
import {CategoryElement} from "@apps/xca/screen-objects/expertise/components/category/category.element";
import {ExpertiseImageElement} from "@apps/xca/screen-objects/expertise/components/images/expertise-image.element";
import {UploadingOverlayElement} from "@apps/xca/screen-objects/expertise/components/uploading-overlay/uploading-overlay.element";
import {CarDetails} from "@apps/xca/screen-objects/expertise/components/car-details/car-details";

export class BaseExpertise {
    protected categoryElement = new CategoryElement();
    protected expertiseImagesElement = new ExpertiseImageElement();
    protected overlayElement = new UploadingOverlayElement();

    get onHeader() {
        return new ExpertiseHeader();
    }

    get onCarDetails() {
        return new CarDetails()
    }

    get onExpertiseDetails() {
        return new ExpertiseDetails();
    }

    get onExpertiseImages() {
        return new ExpertiseImage();
    }

}
