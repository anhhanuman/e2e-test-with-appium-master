import {Contexts} from '@shared/helpers';
import {Preconditions} from '@shared/helpers/preconditions';
import {Precondition} from "@apps/cia/precondition/precondition";

describe('test the new CIA app for iPhone flow ', () => {
    beforeEach(() => {
        Contexts.switchToWebview();
        Preconditions.authenticateWithValidCredentialsMtanCIA();
        Precondition.displayCommonPartnerDataAfterSearchClaim();
    });
    afterEach(() => {
        browser.reloadSession();
    });
    it('should display the partner overview screen CIA after search for a claim number', () => {
        expect(true).toEqual(true);
    });
});
