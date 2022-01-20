import {ExpertiseScreen} from '../../screen-objects/expertise/content/expertise.action';
import {expertiseParam} from '@apps/xca/specs/test-data/expertise-param';
import {Workflow} from '@apps/xca/screen-objects/workflow/workflow';
import {scannedCarDetails, scannedDispatchNumber} from '@apps/xca/specs/test-data/dispatch-details';
import {Precondition} from "@apps/xca/precondition/precondition";

const expertiseScreen = new ExpertiseScreen();

xdescribe('Screen: Expertise Details with QRCode', () => {
    beforeEach(() => {
        Precondition
            .turnOffChooseImagesFromGallery()
            .displayExpertiseDetails();
    });

    afterEach(() => {
        browser.reloadSession();
    });

    it('HAN-: should display the correct scanned dispatch number', () => {
        expertiseScreen
            .onHeader
            .verify()
            .expectedDispatchNumber(scannedDispatchNumber)
        expertiseScreen
            .onCarDetails
            .verify()
            .expectedCarDetails(scannedCarDetails)
    });
});

describe('Create expertise report - QRCode scanning - Using direct Camera', () => {
    beforeEach(() => {
        Precondition.turnOffChooseImagesFromGallery();
    });

    afterEach(() => {
        browser.reloadSession();

    });

    expertiseParam.forEach((param) => {
        xit('should upload expertise ' + param.targetExpertiseType + ' with one photo successfully', () => {
            Precondition.displayExpertiseDetails();
            expertiseScreen
                .selectExpertiseType(param.targetExpertiseType)
                .addPhotoToTheFirstCategoryIcon(true, false)
                .upload()
            Workflow.verifyHeaderAfterUploaded()
                .verifyCarDetailsAfterUploaded(scannedCarDetails)
                .verifyExpertiseTypeAfterUploaded(param.targetExpertiseType)
        });
    })

    expertiseParam.forEach((param) => {
        it('uploads expertise ' + param.targetExpertiseType + ' with random photos successfully', () => {
            Precondition.displayExpertiseDetails();
            expertiseScreen.selectExpertiseType(param.targetExpertiseType);
            const categoriesAndImageNames = Workflow.addPhotoToRandomCategories(true, false);
            expertiseScreen.upload();
            Workflow.verifyHeaderAfterUploaded()
                .verifyCarDetailsAfterUploaded(scannedCarDetails)
                .verifyExpertiseTypeAfterUploaded(param.targetExpertiseType)
                .verifyCategoriesAndImagesAfterUploaded(categoriesAndImageNames)
                .verifyOverviewUploadedReport(1, categoriesAndImageNames)
        });
    });
});

xdescribe('Create expertise report - QRCode scanning - Choose Images From Gallery turning ON - Using Camera', () => {
    beforeEach(() => {
        Precondition.turnOnChooseImagesFromGallery();
    });

    afterEach(() => {
        browser.reloadSession();
    });
    expertiseParam.forEach((param) => {
        it('should upload expertise ' + param.targetExpertiseType + ' with random photos successfully - Camera Action Sheet', () => {
            Precondition.displayExpertiseDetails();
            expertiseScreen.selectExpertiseType(param.targetExpertiseType);
        });
    });
});

xdescribe('Create expertise report - QRCode scanning - Using Gallery', () => {
    beforeEach(() => {
        Precondition.turnOnChooseImagesFromGallery();
    });

    afterEach(() => {
        browser.reloadSession()
    });

    expertiseParam.forEach((param) => {
        it('should upload expertise ' + param.targetExpertiseType + ' with random photos successfully - Using Gallery', () => {
            Precondition.displayExpertiseDetails();
            expertiseScreen.selectExpertiseType(param.targetExpertiseType);
        });
    });
});
