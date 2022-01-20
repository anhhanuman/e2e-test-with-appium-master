import {ExpertiseScreen} from "@apps/xca/screen-objects/expertise/content/expertise.action";

export class ExpertiseValidator {
    constructor(private expertiseScreen: ExpertiseScreen) {
    }

    expectedAddedPhotoCategoryNamesEqualTo(expectedList: Array<string>) {
        const actual = this.expertiseScreen.onExpertiseImages.getImageNames();
        expect(actual).toEqual(expectedList);

        return this;
    }

    expectedDisplayProperExpertiseImages(addedCategoryNames: Array<string>, totalCategoryIcons: number) {
        this.expectedAddedPhotoCategoryNamesEqualTo(addedCategoryNames).expectedTotalCategoryIcons(totalCategoryIcons);

        return this;
    }

    imagesDisplayProperAfterUploaded(categoryNamesAndImageNames: [][]) {
        expect(categoryNamesAndImageNames[0]).toEqual(categoryNamesAndImageNames[1]);
        const numberOfGreenIcon = this.expertiseScreen.onExpertiseImages.getNumberOfGreenIcons();
        expect(numberOfGreenIcon).toEqual(categoryNamesAndImageNames[1].length);

        return this;
    }

    expectedTotalCategoryIcons(totalCategoryIcons: number) {
        const actual = this.expertiseScreen.onExpertiseImages.getTotalCategoryIcons();
        expect(actual).toEqual(totalCategoryIcons);
        return this;
    }

}
