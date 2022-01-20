import {SearchPartnerSeletors} from '../selectors/search-partner.seletors';

class SearchPartnerScreen {
    private selector = new SearchPartnerSeletors();

    waitForDisplay() {
    }

    private hideKeyboard(): void {
        if (browser.isKeyboardShown()) {
            browser.hideKeyboard();
        }
    }
}

export const searchPartnerScreen = new SearchPartnerScreen();
