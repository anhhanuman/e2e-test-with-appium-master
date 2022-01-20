import {ExpertiseScreen} from '@apps/xca/screen-objects/expertise/content/expertise.action';
import {CategoryElement} from "@apps/xca/screen-objects/expertise/components/category/category.element";
import {OverviewScreen} from "@apps/xca/screen-objects/overview/overview.action";
import {HeaderToolbarScreen} from "@shared/screen-object-components/header-toolbar/header-toolbar.screen.action";

const expertiseScreen = new ExpertiseScreen();
const categoryElement = new CategoryElement();
const overviewScreen = new OverviewScreen()

export class Workflow {

    static addPhotoToRandomCategories(byCamera: boolean, isActionSheetDisplayed: boolean): [][] {
        if (byCamera) {
            return expertiseScreen.addPhotosToCategoriesByCamera(
                false,
                1,
                1,
                isActionSheetDisplayed);

        } else {
            /*expertiseScreen.addPhotosToCategoriesByGallery(
                false,
                1,
                1,
                randomCategoryIconElements);*/
        }
    }

    static verifyHeaderAfterUploaded() {
        expertiseScreen
            .onHeader
            .verify()
            .headerDisplayProperlyAfterUploaded()

        return this;
    }

    static verifyCarDetailsAfterUploaded(carDetails: Array<string>) {
        expertiseScreen
            .onCarDetails
            .verify()
            .expectedCarDetails(carDetails)

        return this;
    }

    static verifyExpertiseTypeAfterUploaded(selectedExpertiseType: string) {
        expertiseScreen
            .onExpertiseDetails
            .verify()
            .expectedReadOnlyType(selectedExpertiseType);

        return this;
    }

    static verifyCategoriesAndImagesAfterUploaded(categoryNamesAndImageNames: [][]) {
        const isClaimExpertiseType = expertiseScreen.onExpertiseDetails.isClaimExpertiseType()

        if (isClaimExpertiseType) {
            this.checkRandomCategoryNames(categoryNamesAndImageNames[0]);
        }
        expertiseScreen
            .verify()
            .imagesDisplayProperAfterUploaded(categoryNamesAndImageNames);

        return this
    }

    static verifyOverviewUploadedReport(reportPosition: number, categoriesAndImageNames: [][]) {
        HeaderToolbarScreen.tapBackButtonAndWaitForNotDisplay();
        overviewScreen
            .verify()
            .expectedNumberOfUploadedPhotos(1, categoriesAndImageNames[1].length);
    }

    private static checkRandomCategoryNames(randomCategoryNames: Array<string>) {
        if (randomCategoryNames.includes('', 0)) {
            const index = randomCategoryNames.indexOf('');
            randomCategoryNames.splice(index, 1, 'Claim 1.1');
        }

        return this;
    }

    private static createPhotoNames(specialType: boolean, defaultCategoryNames: Array<string>) {
        if (specialType) {
            this.createPhotoNamesForThreeSpecialType(defaultCategoryNames);
        } else {
            this.createPhotoNamesForNormalType(defaultCategoryNames);
        }
    }


    private static createPhotoNamesForThreeSpecialType(defaultCategoryNames: Array<string>) {
        defaultCategoryNames.splice(-1, 1, 'Claim 1.1');

        return this;
    }

    private static createPhotoNamesForNormalType(defaultCategoryNames: Array<string>) {
        defaultCategoryNames.splice(-2, 2);
    }

    static displayExpertiseDetailsAndBackToOverviewScreenContinuously(
        reportPosition: number,
        whatScannedDispatch: Array<string>,
        numberOfAddedImages: number
    ) {
        for (let i = 0; i < 20; i++) {
            overviewScreen.displayExpertiseReport(reportPosition);
            expertiseScreen
                .onCarDetails
                .expectedCarDetails(whatScannedDispatch)
            expertiseScreen
                .onExpertiseImages
                .verify()
                .expectedNumberOfAddedImages(numberOfAddedImages);
            expertiseScreen
                .onHeader
                .tapBackButton();
        }
        return this;
    }

    static performanceTestCapturingPhotos(numberOfImageTypePhotos: number, numberOfDocTypePhotos: number) {
        this.addManyOfPhotos(numberOfImageTypePhotos, categoryElement.additionalImageTypeIcon)
            .addManyOfPhotos(numberOfDocTypePhotos, categoryElement.additionalDocTypeIcon);

        return this;
    }

    private static addManyOfPhotos(numberOfPhotos: number, element: WebdriverIO.Element) {
        for (let i = 1; i <= numberOfPhotos; i++) {
            expertiseScreen.onExpertiseImages
                .tapCategoryIcon(element)
                .getCamera()
                .catchPhotoAndUse();
        }
        return this;
    }
}
