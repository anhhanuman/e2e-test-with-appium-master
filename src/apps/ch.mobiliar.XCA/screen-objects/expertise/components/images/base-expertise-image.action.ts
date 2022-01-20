import {Screen} from '@shared/helpers/screen';
import {Category} from "@apps/xca/screen-objects/expertise/components/category/category.action";
import {Util} from "@shared/helpers/util";

export class BaseExpertiseImage extends Category {
    getImageNames(): Array<string> {
        const numberOfAddedPhotos = this.getNumberOfAddedImages()
        let addedCategoryNames = Screen.getTextOfElements(this.expertiseImagesElement.addedPhotoCategoryNames);
        const additionalPhoto = numberOfAddedPhotos - addedCategoryNames.length

        if (additionalPhoto > 0) {
            for (let i = 1; i <= additionalPhoto; i++)
                addedCategoryNames.push('');
        }
        return addedCategoryNames;

    }

    getAllRandomImageNames(categoryIndexes: Array<number>, isClaimExpertiseType?: boolean): Array<string> {
        const newIndexes = Util.increaseOneEachIndex(categoryIndexes);
        const randomAddedImageNames: Array<string> = [];
        for (let index of newIndexes) {
            const element = this.expertiseImagesElement.getAddedImage(index);
            if (element.isExisting()) {
                randomAddedImageNames.push(Screen.getTextOfElement(element));
            } else {
                if (isClaimExpertiseType) {
                    randomAddedImageNames.push(Screen.getTextOfElement(this.expertiseImagesElement.claimImageName));
                } else {
                    randomAddedImageNames.push('');
                }
            }
        }

        return randomAddedImageNames;
    }

    getNumberOfAddedImages(): number {
        return this.expertiseImagesElement.addedPhotos.length;
    }
}
