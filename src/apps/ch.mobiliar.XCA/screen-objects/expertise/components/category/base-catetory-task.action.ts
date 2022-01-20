import {ExpertiseImageElement} from "@apps/xca/screen-objects/expertise/components/images/expertise-image.element";
import {CategoryElement} from "@apps/xca/screen-objects/expertise/components/category/category.element";
import {Screen} from "@shared/helpers/screen";
import {Camera} from "@apps/xca/screen-objects/expertise/components/camera/camera.action";
import {ActionSheetCategoryIcon} from "@apps/xca/screen-objects/expertise/components/action-sheet/action-sheet-category-icon.action";
import {Contexts} from "@shared/helpers";
import {Util} from "@shared/helpers/util";

export class BaseCategoryTask {
    protected expertiseImagesElement = new ExpertiseImageElement();
    protected categoryElement = new CategoryElement();

    isExpertiseImageDisplayed(): boolean {
        return Screen.getElementDisplayingState(this.expertiseImagesElement.expertiseImages);
    }

    getDefaultCategoryNames(): Array<string> {
        const defaultCategoryNames = Screen.getTextOfElements(this.categoryElement.categoryNames);
        const defaultAdditionalCategoryNames = Screen.getTextOfElements(this.categoryElement.additionalCategory);

        return defaultCategoryNames.concat(defaultAdditionalCategoryNames);
    }

    getTotalCategoryIcons(): number {
        return this.categoryElement.categoryIcons.length;
    }

    tapCategoryIcon(categoryIconElement: WebdriverIO.Element) {
        Screen.tapToElement(categoryIconElement);

        return this;
    }

    getCamera() {
        return new Camera()
    }

    getActionSheet() {
        return new ActionSheetCategoryIcon();
    }

    capturePhotoAndUse(isActionSheetDisplayed: boolean) {
        if (isActionSheetDisplayed) {
            this.tapCameraActionSheetAndCatchPhotoAndUse();
        } else {
            this.getCamera()
                .catchPhotoAndUse();
        }

        return this;
    }

    tapIconAndAddPhotoByCamera(isActionSheetDisplayed: boolean, iconElement: WebdriverIO.Element) {
        this.tapCategoryIcon(iconElement)
            .capturePhotoAndUse(isActionSheetDisplayed)

        return this;
    }

    tapCameraActionSheetAndCatchPhotoAndUse() {
        this.getActionSheet()
            .tapCameraOption()
            .catchPhotoAndUse();

        return this;
    }

    selectOnePhotoFromGallery(photoPositionInGrid?: number) {
        Contexts.doTasksInNativeContext(() => {
            this.getActionSheet()
                .tapEitherSelectImageOrImage()
                .tapCameraRoll()
                .selectOnePhoto(photoPositionInGrid)
                .tapDoneButtonOnCameraRoll();
        });

        return this;
    }

    addPhotoToCategory(categoryIconElement: WebdriverIO.Element, byCamera: boolean, isActionSheetDisplayed: boolean) {
        this.tapCategoryIcon(categoryIconElement);
        if (byCamera) {
            this.capturePhotoAndUse(isActionSheetDisplayed);
        } else {
            this.selectOnePhotoFromGallery();
        }

        return this;
    }

    getRandomCategoryIndexes(): Array<number> {
        const categoryIconElements = this.categoryElement.categoryIcons;
        const randomNumberOfCategoryIcons = Util.getRandomElements(categoryIconElements);

        return Util.getRandomArrayElementIndexesNoRepetition(categoryIconElements, randomNumberOfCategoryIcons);
    }


    getRandomCategoryNames(categoryIndexes: Array<number>): Array<string> {
        const categoryNameElements = this.categoryElement.categoryNames;
        const categoryContainers = this.categoryElement.categoryContainers;
        const randomCategoryNames: Array<string> = [];
        for (const index of categoryIndexes) {
            try {
                const element = categoryNameElements[index];
                randomCategoryNames.push(Screen.getTextOfElement(element));
            } catch (e) {
                randomCategoryNames.push(Screen.getTextOfElement(categoryContainers[index]));
            }
        }

        return randomCategoryNames;
    }

    getRandomCategoryNamesAndIndexes(): [][] {
        let namesAndIndexes = []
        const indexes: number[] = this.getRandomCategoryIndexes()
        const names: string[] = this.getRandomCategoryNames(indexes)
        namesAndIndexes.push(names, indexes)

        return namesAndIndexes
    }

    getRandomCategoryIcons(categoryIndexes: Array<number>): Array<WebdriverIO.Element> {
        const categoryIconElements = this.categoryElement.categoryIcons;
        let randomNoRepeatCategoryElements: Array<WebdriverIO.Element> = [];
        for (const index of categoryIndexes) {
            randomNoRepeatCategoryElements.push(categoryIconElements[index]);
        }

        return randomNoRepeatCategoryElements
    }
}
