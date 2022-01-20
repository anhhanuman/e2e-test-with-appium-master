import {OverviewElement} from '../selectors/overview.selectors';
import {OverviewScreen} from '@shared/screen-object-components/objects/base-overview.screen.actions';
import Gestures from '../../../../shared/helpers/gestures';
import {AlertDialog} from '@shared/screen-object-components';
import {Screen} from '@shared/helpers/screen';

class OverviewScreenActionsCIA {
    private element = new OverviewElement();

    waitForAnInspectionReportDisplay() {
        OverviewScreen.waitForDisplay();
        Screen.waitForElementDisplay(this.element.incompleteInspectionReport);
    }

    tapPlusButton() {
        OverviewScreen.tapPlusButton();
    }

    getEmptyReportInformation(): Array<any> {
        let emptyInformationElements = [];
        emptyInformationElements.push(this.element.emptyTitle.getText());
        let emptyReportInformationList = this.element.emptyReportInformation;

        for (let dataOfSecondCol in emptyReportInformationList) {
            emptyInformationElements.push(emptyReportInformationList[dataOfSecondCol].getText());
        }

        return emptyInformationElements;
    }

    removeAnIncompleteInspectionReportViaTrashBinIcon() {
        Gestures.dragAndDropWebviewElement(this.element.incompleteInspectionReport, -100, 0, true);
        this.tapTrashBinIcon();
        this.selectConfirmToDeleteAndWaitForInspectionReportNotDisplay();
    }

    removeAnIncompleteInspectionReportViaAlert() {
        Gestures.dragAndDropWebviewElement(this.element.incompleteInspectionReport, -200, 0, true);
        this.selectConfirmToDeleteAndWaitForInspectionReportNotDisplay();
    }

    tapTrashBinIcon() {
        this.element.deleteInspectionIcon.click();
    }

    private selectConfirmToDeleteAndWaitForInspectionReportNotDisplay() {
        AlertDialog.tapAlertDialogButtonSecond();
        Screen.waitUntilElementNotDisplay(this.element.incompleteInspectionReport);
    }
}

export const overviewScreenCIA = new OverviewScreenActionsCIA();
const expectedEmptyReportInformation = [
    'You have not created report yet.',
    'A report contains following information:',
    'Data from the policy holder concerned',
    'Claims industry, sum, AB issue, etc.',
    'Place and time of the appointment as well as contact persons',
    'Space for taking inspection objects including photos',
    'Defining a further procedure'
];

export {expectedEmptyReportInformation};
