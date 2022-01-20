import {ExpertiseImage} from "@apps/xca/screen-objects/expertise/components/images/expertise-image.action";

export class ExpertiseImageValidator {
    constructor(private expertiseImage: ExpertiseImage) {
    }

    expectedExpertiseImageSectionDisplay(expected: boolean) {
        const actual: boolean = this.expertiseImage.isExpertiseImageDisplayed();
        expect(actual).toEqual(expected);
        return this;
    }

    expectedCategoryNames(expectedCategoryNames: Array<string>) {
        const actualCategoryNames: Array<string> = this.expertiseImage.getDefaultCategoryNames();
        expect(actualCategoryNames).toEqual(expectedCategoryNames);

        return this;
    }

    expectedExpertiseImagesRowLabel(expectedRowLabels: Array<string>) {
        const actual: Array<string> = this.expertiseImage.getExpertiseImagesRowLabel();
        expect(actual).toEqual(expectedRowLabels);
        return this;
    }

    expectedNumberOfAddedImages(totalCategoryIcons: number) {
        const actual = this.expertiseImage.getNumberOfAddedImages();
        expect(actual).toEqual(totalCategoryIcons);
        return this;
    }
}
