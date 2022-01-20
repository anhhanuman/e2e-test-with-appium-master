import {OverviewElement} from './overview.element';
import {Screen} from '@shared/helpers/screen';
import {OverviewValidator} from '@apps/xca/screen-objects/overview/overview.validator';
import {LoadingContent} from '@shared/screen-object-components/loading-content/loading.content';
import {ExpertiseScreen} from '@apps/xca/screen-objects/expertise/content/expertise.action';
import Gestures from '@shared/helpers/gestures';
import {OverviewHeader} from "@apps/xca/screen-objects/overview/header/overview-header.action";

const expertiseScreen = new ExpertiseScreen();

export class OverviewScreen {
    private overviewScreenElement = new OverviewElement();

    get header() {
        return new OverviewHeader();
    }

    verify() {
        return new OverviewValidator(this);
    }

    waitForDisplay() {
        this.header.waitForDisplay();
        Screen.waitForElementDisplay(this.overviewScreenElement.plusButton);

        return this;
    }

    isOverviewScreenDisplay() {
        return this.header.isOverviewHeaderDisplayed() && this.overviewScreenElement.plusButton.isDisplayed();

    }

    tapPlusButton() {
        Screen.tapToElement(this.overviewScreenElement.plusButton);
        LoadingContent.waitForLoadingContentDismiss();

        return this;
    }

    getNumberOfExpertiseReports(): number {
        return this.overviewScreenElement.expertiseReports.length;
    }

    displayExpertiseReport(reportPosition: number) {
        const expertiseReports = this.overviewScreenElement.expertiseReports;
        const toBeOpenedReport = expertiseReports[reportPosition - 1];
        toBeOpenedReport.click();
        Screen.waitUntilElementNotDisplay(toBeOpenedReport);

        return this;
    }

    displayAllExpertiseReports() {
        const expertiseReports: Array<WebdriverIO.Element> = this.overviewScreenElement.expertiseReports;
        for (const report of expertiseReports) {
            Screen.tapToElement(report);
            Gestures.swipeContentUp();
            expertiseScreen.onHeader.tapBackButton();
        }
        return this;
    }

    displayExistingExpertiseReportAndAddPhotosToCategories(
        isActionSheetDisplayed: boolean,
        numberOfAdditionalImageTypePhotos: number,
        numberOfAdditionalDocTypePhotos: number
    ) {
        const expertiseReportElements = this.overviewScreenElement.expertiseReports;
        let capturedPhotos = 0;
        for (const element of expertiseReportElements) {
            Screen.tapToElement(element);
            //capturedPhotos += expertiseDetails.addPhotosToAllTheCurrentCategories(isActionSheetDisplayed, numberOfAdditionalImageTypePhotos, numberOfAdditionalDocTypePhotos);
            //todo: review this because refactored
            expertiseScreen.onHeader.tapBackButton();
        }
        return this;
    }

    getTheFirstReportDetails(): Array<string> {
        const details = this.overviewScreenElement.expertiseReportDetails;

        return Screen.getTextOfElements(details);
    }

    getNumberOfPhotosInReport(reportPosition: number) {
        const numberOfPhotos = Screen.getTextOfElement(this.overviewScreenElement.getExpertiseReport(reportPosition));

        return parseInt(numberOfPhotos.substring(0, numberOfPhotos.indexOf('Photos')).trim());
    }
}

const expectedOverviewScreenTitle = 'XpertCenter';
const defaultExpertiseReports = [];
const expectedDraftExpertiseReportNoQRCodeNoPhoto = ['', 'Draft', '', '', 'No Photo', ''];
export {defaultExpertiseReports, expectedDraftExpertiseReportNoQRCodeNoPhoto, expectedOverviewScreenTitle};
