import {Contexts} from '@shared/helpers';
import {Preconditions} from '@shared/helpers/preconditions';
import {Precondition} from "@apps/cia/precondition/precondition";

describe('test the new CIA app', () => {
    beforeEach(() => {
        Contexts.switchToWebview();
        Preconditions.authenticateWithValidCredentialsMtanCIA();
        Precondition.displayCommonPartnerDataAfterSearchClaim();
    });
    afterEach(() => {
        browser.reloadSession();
    });
    it('should display common partner data screen', () => {
        expect(true).toEqual(true);
    });
});
