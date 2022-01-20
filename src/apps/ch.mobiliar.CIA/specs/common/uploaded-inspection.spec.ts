import {Preconditions} from '@shared/helpers/preconditions';
import {Precondition} from "@apps/cia/precondition/precondition";

describe('test the new CIA app for iPhone flow ', () => {
    beforeEach(() => {
        Preconditions.authenticateWithValidCredentialsMtanCIA();
        Precondition.prepareAnUploadedInspectionReport();
    });
    afterEach(() => {
        browser.reloadSession();
    });
    it('should display the proper start screen after uploaded an inspection report', () => {
    });
});
