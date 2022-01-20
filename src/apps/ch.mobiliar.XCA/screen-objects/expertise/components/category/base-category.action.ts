import {Contexts} from "@shared/helpers";
import {BaseCategoryTask} from "@apps/xca/screen-objects/expertise/components/category/base-catetory-task.action";
import {Error} from "ts-lint/lib/error";

export class BaseCategory extends BaseCategoryTask {
    addOnePhotoToNamedCategories(byCamera: boolean, isActionSheetDisplayed: boolean) {
        const namedCategoryIconElements = this.categoryElement.namedCategoryIcons;
        for (const iconElement of namedCategoryIconElements) {
            this.addPhotoToCategory(iconElement, byCamera, isActionSheetDisplayed)
        }

        return this;
    }

    addPhotoToAllCategoriesByGallery(numberOfAdditionalPhotosImageType: number, numberOfAdditionalPhotosDocType: number) {
        this.addOnePhotoToNamedCategories(false, false)
            .addPhotosToAdditionalCategories(true, numberOfAdditionalPhotosImageType, numberOfAdditionalPhotosDocType, false);

        return this;
    }

    addPhotoToAllCategoriesByCamera(
        numberOfAdditionalImageTypePhotos: number,
        numberOfAdditionalDocTypePhotos: number,
        isActionSheetDisplayed: boolean,) {
        this.addOnePhotoToNamedCategories(true, isActionSheetDisplayed)
            .addPhotosToAdditionalCategories(true, numberOfAdditionalImageTypePhotos, numberOfAdditionalDocTypePhotos, isActionSheetDisplayed);
        return this;
    }

    addPhotosToAdditionalCategories(
        byCamera: boolean,
        numberOfPhotosImageType: number,
        numberOfPhotosDocType: number,
        isActionSheetForCameraDisplayed: boolean,
    ) {
        const numberOfAdditionalCategory = this.categoryElement.additionalCategoryIcons.length;
        if (numberOfAdditionalCategory === 1) {
            this.addPhotosToAdditionalIconOfSpecialExpertise(isActionSheetForCameraDisplayed, numberOfPhotosImageType, byCamera);
        } else if (numberOfAdditionalCategory === 2) {
            this.addPhotosToAdditionalIconOfNormalExpertise(isActionSheetForCameraDisplayed, numberOfPhotosImageType, numberOfPhotosDocType, byCamera);
        } else {
            throw new Error('Problem with Expertise Type, the additional category icons !=1 or !=2');
        }
    }

    private addPhotosToAdditionalIconOfSpecialExpertise(
        isActionSheetForCameraDisplayed: boolean,
        numberOfPhotosImageType: number,
        byCamera: boolean) {
        if (byCamera) {
            this.addPhotosToAdditionalCategoryByCamera(isActionSheetForCameraDisplayed, this.categoryElement.additionalImageTypeIcon, numberOfPhotosImageType);
        } else {
            this.addPhotosToAdditionalIconByGallery(this.categoryElement.additionalImageTypeIcon, numberOfPhotosImageType);
        }
    }

    private addPhotosToAdditionalIconOfNormalExpertise(
        isActionSheetForCameraDisplayed: boolean,
        numberOfPhotosImageType: number,
        numberOfPhotosDocType: number,
        byCamera: boolean) {
        if (byCamera) {
            this.addPhotosToAdditionalCategoryByCamera(isActionSheetForCameraDisplayed, this.categoryElement.additionalImageTypeIcon, numberOfPhotosImageType)
                .addPhotosToAdditionalCategoryByCamera(isActionSheetForCameraDisplayed, this.categoryElement.additionalDocTypeIcon, numberOfPhotosDocType);
        } else {
            this.addPhotosToAdditionalIconByGallery(this.categoryElement.additionalImageTypeIcon, numberOfPhotosImageType)
                .addPhotosToAdditionalIconByGallery(this.categoryElement.additionalDocTypeIcon, numberOfPhotosDocType);
        }
    }

    addPhotosToAdditionalIconByGallery(additionalIconElement, numberOfPhotos: number) {
        this.tapCategoryIcon(additionalIconElement)
            .selectManyPhotosForAdditionalCategory(numberOfPhotos);
        return this;

    }

    addPhotosToAdditionalCategoryByCamera(isActionSheetForCameraDisplayed: boolean, additionalCategoryIconElement: WebdriverIO.Element, numberOfPhotos: number) {
        for (let i = 1; i <= numberOfPhotos; i++) {
            this.tapIconAndAddPhotoByCamera(isActionSheetForCameraDisplayed, additionalCategoryIconElement);
        }

        return this;
    }


    addPhotoToRandomCategories(byCamera: boolean, isActionSheetDisplayed: boolean, randomElements: Array<WebdriverIO.Element>) {
        if (byCamera) {
            this.addPhotoToRandomCategoriesByCamera(randomElements, isActionSheetDisplayed);
        } else {
            this.addPhotoToRandomCategoriesByGallery(randomElements);
        }

        return this;
    }

    addPhotoToRandomCategoriesByCamera(randomElements: Array<WebdriverIO.Element>, isActionSheetDisplayed: boolean) {
        for (const element of randomElements) {
            this.addPhotoToCategory(element, true, isActionSheetDisplayed);
        }
    }

    private addPhotoToRandomCategoriesByGallery(randomElements: Array<WebdriverIO.Element>) {
        for (const element of randomElements) {
            this.addPhotoToCategory(element, false, true);
        }
    }

    selectManyPhotosForAdditionalCategory(numberOfPhotos: number) {
        Contexts.doTasksInNativeContext(() => {
            this.getActionSheet()
                .tapImagesOption()
                .openCameraRollAndSelectPhotos(numberOfPhotos)
                .tapDoneButtonOnCameraRoll();
        });

        return this;
    }
}
