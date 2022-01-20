import {Preconditions} from '@shared/helpers/preconditions';
import {expectedEmptyReportInformation, overviewScreenCIA} from '../../screens-objects/objects/overview.screen.actions';
import {Precondition} from "@apps/cia/precondition/precondition";

describe('test the new CIA app for iPhone flow ', () => {
    beforeEach(() => {
        Preconditions.authenticateWithValidCredentialsMtanCIA();
        Precondition.createAnIncompleteReportOnOverviewScreen();
    });
    afterEach(() => {
        browser.reloadSession();
    });
    it('should be able to remove a yet uploaded inspection report by long press and trash bin icon', () => {
        overviewScreenCIA.removeAnIncompleteInspectionReportViaTrashBinIcon();
        expect(overviewScreenCIA.getEmptyReportInformation()).toEqual(expectedEmptyReportInformation);
    });
    it('should be able to remove a yet uploaded inspection report by long press until the aler displaying', () => {
        overviewScreenCIA.removeAnIncompleteInspectionReportViaAlert();
    });
});
