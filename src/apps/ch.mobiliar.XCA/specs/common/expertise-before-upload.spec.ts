import {ExpertiseType, expertiseTypeValues} from "@apps/xca/specs/test-data/expertise-type";
import {defaultRbGroupAttributes} from "@apps/xca/specs/test-data/default-radio-buttons";
import {ExpertiseScreen} from "@apps/xca/screen-objects/expertise/content/expertise.action";
import {expertiseParam} from "@apps/xca/specs/test-data/expertise-param";
import {beforeScanningCarDetails} from "@apps/xca/specs/test-data/dispatch-details";
import {expectedImagedActionSheet} from "@apps/xca/specs/test-data/action-sheet";
import {Precondition} from "@apps/xca/precondition/precondition";
import {HeaderToolbarScreen} from "@shared/screen-object-components/header-toolbar/header-toolbar.screen.action";

const expertiseScreen = new ExpertiseScreen();
xdescribe('Component: Expertise Details and Expertise Image', () => {
    beforeEach(() => {
        Precondition.displayExpertiseScreenWithoutQRCode();
    });
    afterEach(() => {
        browser.reloadSession();
    });

    it('displays the proper popover list and state of selection radio button', () => {
        expertiseScreen
            .onExpertiseDetails
            .tapIconSelect()
            .verify()
            .expectedExpertiseTypes(expertiseTypeValues)
            .expectedRbGroupAttributes(defaultRbGroupAttributes)
    });

    it('displays expertise type with associated categories properly', () => {
        expertiseParam.forEach((param) => {
            expertiseScreen
                .selectExpertiseType(param.targetExpertiseType)
                .onExpertiseImages
                .verify()
                .expectedCategoryNames(param.categoryNames)
            expertiseScreen
                .onHeader
                .verify()
                .expectedUploadButtonDisplay(false)
            expertiseScreen
                .onHeader
                .verify()
                .expectedDispatchNumber('...')
            expertiseScreen.onCarDetails
                .verify()
                .expectedCarDetails(beforeScanningCarDetails)

            const specialExpertiseType = expertiseScreen.onExpertiseDetails.isSpecialExpertiseType(param.targetExpertiseType);

            if (specialExpertiseType) {
                expertiseScreen
                    .onExpertiseImages
                    .verify()
                    .expectedExpertiseImagesRowLabel(param.rowLabel);
            }
        });
    });
})
describe('Component: Expertise selection and expertise images from gallery', () => {
    beforeEach(() => {
        Precondition.turnOnChooseImagesFromGallery()
            .displayExpertiseScreenWithoutQRCode();
    });

    afterEach(() => {
        browser.reloadSession();
    });
    it('displays the proper the action sheet for an imaged category', () => {
        expertiseScreen
            .selectExpertiseType(ExpertiseType.PartialDamage)
            .addPhotoToTheFirstCategoryIcon(false, true)
            .onExpertiseImages
            .tapTheFirstImage()
            .verify()
            .expectedImagedActionSheetOptions(expectedImagedActionSheet);
    });

    it('displays the proper expertise type selection state after added image', () => {
        const expertiseTypes = [ExpertiseType.PartialDamage, ExpertiseType.XpertCheck, ExpertiseType.CommercialHail, ExpertiseType.Autoscout24, ExpertiseType.HailDriveIn]
        for (const expertiseType of expertiseTypes) {
            expertiseScreen
                .selectExpertiseType(expertiseType)
                .addPhotoToTheFirstCategoryIcon(false, true);
            const isSpecialExpertiseType = expertiseScreen.onExpertiseDetails.isSpecialExpertiseType(expertiseType);
            if (isSpecialExpertiseType) {
                expertiseScreen
                    .onExpertiseDetails
                    .verify()
                    .expectedSelectIconDisplay(false);
            } else {
                expertiseScreen
                    .onExpertiseDetails
                    .verify()
                    .expectedSelectIconDisplay(true);
            }
            HeaderToolbarScreen.tapBackButtonAndWaitForNotDisplay();
            Precondition.displayExpertiseScreenWithoutQRCode();
        }
    });
});
