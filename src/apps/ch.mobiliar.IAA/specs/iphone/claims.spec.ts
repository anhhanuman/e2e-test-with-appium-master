import {Contexts} from '@shared/helpers';
import {Preconditions} from '@shared/helpers/preconditions';

describe('', () => {
    beforeEach(() => {
        browser.switchContext(Contexts.WebView);
        Preconditions.authenticateWithValidCredentialsMtanIAA();
    });
    afterEach(() => {
        browser.reloadSession();
    });

    it('should display the proper claims list screen', () => {
    });
});
