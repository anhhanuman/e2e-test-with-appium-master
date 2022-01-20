import {BaseExpertiseImage} from '@apps/xca/screen-objects/expertise/components/images/base-expertise-image.action';
import {ExpertiseImageValidator} from "@apps/xca/screen-objects/expertise/components/images/expertise-image.validator";
import {Screen} from "@shared/helpers/screen";
import {ActionSheetOverImage} from "@apps/xca/screen-objects/expertise/components/action-sheet/action-sheet-image.action";
import {expectedImagedActionSheet} from "@apps/xca/specs/test-data/action-sheet";

export class ExpertiseImage extends BaseExpertiseImage {
    verify() {
        return new ExpertiseImageValidator(this);
    }

    tapTheFirstImage() {
        Screen.tapToElement(this.expertiseImagesElement.addedPhotos[0]);

        return new ActionSheetOverImage()
    }

    tapRandomImage() {
        const imagedCategoryElements = this.expertiseImagesElement.imagedCategories;
        const oneRandomImageCategoryElement = imagedCategoryElements[Math.floor(Math.random() * imagedCategoryElements.length)];
        Screen.tapToElement(oneRandomImageCategoryElement);

        return new ActionSheetOverImage()
    }

    tapRandomImagedCategoryAndAction(action: string) {
        switch (action) {
            case expectedImagedActionSheet[0]:
                this.tapRandomImage()
                    .viewImageFullScreen();
                break;
            case expectedImagedActionSheet[1]:
                this.tapRandomImage()
                    .exportToGallery();
                break;
            case expectedImagedActionSheet[2]:
                this.tapRandomImage()
                    .removeImage();
                break;
            default:
                break;
        }

        return this;
    }

    getNumberOfGreenIcons(): number {
        return this.expertiseImagesElement.uploadedGreenIcons.length;
    }

    getNumberOfErrorRedIcons(): number {
        return this.expertiseImagesElement.uploadedErrorRedIcons.length;
    }
}
