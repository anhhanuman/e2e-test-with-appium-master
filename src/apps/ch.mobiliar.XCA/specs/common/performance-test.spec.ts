import {ExpertiseScreen} from '@apps/xca/screen-objects/expertise/content/expertise.action';
import {expertiseParam} from '@apps/xca/specs/test-data/expertise-param';
import {ExpertiseType} from '@apps/xca/specs/test-data/expertise-type';
import {Workflow} from '@apps/xca/screen-objects/workflow/workflow';
import {Precondition} from "@apps/xca/precondition/precondition";
import {OverviewScreen} from "@apps/xca/screen-objects/overview/overview.action";

const expertiseScreen = new ExpertiseScreen();
const overviewScreen = new OverviewScreen();
xdescribe('The app should not crash when capturing a lot of images - use camera direct', () => {
    beforeEach(() => {
        Precondition.turnOffChooseImagesFromGallery().displayExpertiseScreenWithoutQRCode();
    });

    afterEach(() => {
        browser.reloadSession();
    });
    /*
    mvanh@aavn-minimac40 mobiliar-libs % npm ci && npm run build
    mvanh@aavn-minimac40 ios % npm ci
    mvanh@aavn-minimac40 mobiliar-libs % npm run copy xpertcenter-app2
    mvanh@aavn-minimac40 ios % npm run qc-build
    */
    it('should be able to capture more than 400 times continuously', () => {
        expertiseScreen
            .onExpertiseDetails
            .selectType(ExpertiseType.PartialDamage);
        Workflow.performanceTestCapturingPhotos(200, 200);
    });
});
xdescribe('Performance test', () => {
    beforeEach(() => {
        Precondition
            .turnOnChooseImagesFromGallery()
            .displayExpertiseScreenWithoutQRCode();
    });

    afterEach(() => {
        browser.reloadSession();
    });

    it('should display the proper report when re-visiting the report', () => {
        const scannedDispatchDetails = expertiseScreen.onCarDetails.getCarDetails()
        expertiseScreen
            .onExpertiseDetails
            .selectType(ExpertiseType.PartialDamage);
        expertiseScreen
            .onExpertiseImages
            .addPhotoToAllCategoriesByGallery(1, 1);
        const numberOfAddedImages = expertiseScreen.onExpertiseImages.getNumberOfAddedImages();
        expertiseScreen
            .onHeader
            .tapBackButton();
        Workflow.displayExpertiseDetailsAndBackToOverviewScreenContinuously(
            1,
            scannedDispatchDetails,
            numberOfAddedImages
        );
    });

    xit('should be able to display the expertise details screen with about 450 images from gallery', () => {
        expertiseScreen
            .onExpertiseDetails
            .selectType(ExpertiseType.ReturnExtern);
        expertiseScreen
            .onExpertiseImages
            .addPhotosToAdditionalCategories(true, 15, 15, false);
    });

    xit('should be able to add photos to 5 claims', () => {
        expertiseScreen
            .onExpertiseDetails
            .selectType(ExpertiseType.ReturnExtern);
        expertiseScreen
            .onExpertiseImages
            .addPhotoToClaimsByGallery(5, 5);
    });

    xit('should be able to navigate between expertise reports without interruption', () => {
        overviewScreen.displayAllExpertiseReports();
    });
});

describe('Performance test', () => {
    beforeEach(() => {
    });

    afterEach(() => {
        browser.reloadSession();
    });

    xit('should be able to add photos to categories by camera and select lot of photos for lot of claims ', () => {
        Precondition.turnOnChooseImagesFromGallery();
        for (const expertise of expertiseParam) {
            if (
                expertise.targetExpertiseType !== ExpertiseType.ReturnStuden &&
                expertise.targetExpertiseType !== ExpertiseType.ReturnExtern &&
                expertise.targetExpertiseType !== ExpertiseType.Autoscout24
            ) {
                continue;
            }

            Precondition.displayExpertiseScreenWithoutQRCode();
            expertiseScreen
                .onExpertiseDetails
                .selectType(expertise.targetExpertiseType);
            expertiseScreen
                .onExpertiseImages
                //.addPhotoToRandomCategories(true,true)
                .addPhotoToClaimsByGallery(3, 15);
            expertiseScreen.onHeader.tapBackButton();
        }
    });

    it('add photos to categories and claim for an existing report', () => {
        Precondition.turnOffChooseImagesFromGallery();
        const numberOfPhotosSelector =
            'ion-list div.expertise__container:nth-child(1) ion-row:nth-of-type(2) ion-col:nth-of-type(2) span:nth-of-type(1)';
        for (let processTimes = 1; processTimes <= 5; processTimes++) {
            console.log('Now the expertise report has : ' + $(numberOfPhotosSelector).getText() + 'photos');
            overviewScreen.displayExpertiseReport(1);
            expertiseScreen
                .onExpertiseImages
                //.addPhotoToRandomCategories(true,false)
                .addRandomPhotosToRandomClaimsByCamera(false);
            expertiseScreen
                .onHeader
                .tapBackButton();
        }
    });

    xit('should be able to create 5 expertise reports of Return Studen with all categories photos', () => {
        for (let times = 1; times <= 5; times++) {
            Precondition.displayExpertiseScreenWithoutQRCode();
            expertiseScreen
                .onExpertiseDetails
                .selectType(ExpertiseType.ReturnStuden);
            expertiseScreen
                .onExpertiseImages
                .addPhotoToAllCategoriesByCamera(1, 1, false);
            expertiseScreen
                .onHeader
                .tapBackButton();
        }
    });

    xit('should be able to add photos to all existing expertise reports', () => {
        overviewScreen.displayExistingExpertiseReportAndAddPhotosToCategories(false, 1, 1);
    });
});
