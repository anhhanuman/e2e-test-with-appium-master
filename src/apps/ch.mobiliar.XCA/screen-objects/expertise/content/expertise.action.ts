import {Screen} from '@shared/helpers/screen';
import {BaseExpertise} from "@apps/xca/screen-objects/expertise/content/base-expertise.action";
import {ExpertiseValidator} from "@apps/xca/screen-objects/expertise/content/expertise.validator";

export class ExpertiseScreen extends BaseExpertise {

    verify() {
        return new ExpertiseValidator(this);
    }

    selectExpertiseType(whatType: string) {
        this.onExpertiseDetails
            .selectType(whatType);

        return this;
    }

    private triggerUpload() {
        this.onHeader
            .tapUploadButton()
            .waitForUploading();

        return this;
    }

    upload() {
        this.triggerUpload()
            .checkFailedUploaded()

        return this;
    }

    private checkFailedUploaded() {
        const numberOfFailedUpload = this.onExpertiseImages.getNumberOfErrorRedIcons();
        if (numberOfFailedUpload > 0) {
            this.triggerUpload()
        }

        return this;
    }

    addPhotosToCategoriesByCamera(
        fullCategories: boolean,
        numberOfAdditionalPhotosImageType: number,
        numberOfAdditionalPhotosDocType: number,
        isActionSheetDisplayed: boolean,
    ): [][] {
        let categoryAndImageNames = []
        if (fullCategories) {
            this.onExpertiseImages
                .addPhotoToAllCategoriesByCamera(numberOfAdditionalPhotosImageType, numberOfAdditionalPhotosDocType, isActionSheetDisplayed);

            return categoryAndImageNames
        } else {
            const namesAndIndexes = this.onExpertiseImages.getRandomCategoryNamesAndIndexes()
            const names = namesAndIndexes[0]
            const indexes = namesAndIndexes[1]
            const randomCategoryIconElements = this.onExpertiseImages.getRandomCategoryIcons(indexes);
            this.onExpertiseImages
                .addPhotoToRandomCategories(true, isActionSheetDisplayed, randomCategoryIconElements);

            const isClaimExpertiseType: boolean = this.onExpertiseDetails.isClaimExpertiseType()
            const addedImageNames = this.onExpertiseImages.getAllRandomImageNames(indexes, isClaimExpertiseType);
            categoryAndImageNames.push(names, addedImageNames)

            return categoryAndImageNames
        }


    }

    addPhotosToCategoriesByGallery(
        fullCategories: boolean,
        numberOfAdditionalPhotosToImageType: number,
        numberOfAdditionalPhotosDocType: number,
        randomElements: Array<WebdriverIO.Element>) {
        if (fullCategories) {
            this.onExpertiseImages
                .addPhotoToAllCategoriesByGallery(numberOfAdditionalPhotosToImageType, numberOfAdditionalPhotosDocType);
        } else {
            this.onExpertiseImages
                .addPhotoToRandomCategories(false, true, randomElements);
        }

        return this;
    }

    addPhotoToTheFirstCategoryIcon(byCamera: boolean, isActionSheetForCameraDisplayed: boolean) {
        const iconElement = this.categoryElement.categoryIcons[0];
        this.onExpertiseImages
            .addPhotoToCategory(iconElement, byCamera, isActionSheetForCameraDisplayed);

        return this;
    }

    tapUploadAgainButton() {
        Screen.tapToElement(this.expertiseImagesElement.uploadAllImagesAgain)
            .waitForElementDisplay(this.overlayElement.uploadingMessage)
            .waitUntilElementNotDisplay(this.overlayElement.uploadingMessage);

        return this;
    }
}
