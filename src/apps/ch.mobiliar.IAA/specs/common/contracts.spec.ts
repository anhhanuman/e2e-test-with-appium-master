import {Precondition} from "@apps/iaa/precondition/precondition";
import {Contract} from "@apps/iaa/screen-objects/contract/contract.action";
import {MenuNavigationScreen} from "@apps/iaa/static/menu-navigation-screen.action";
import {MenuName} from "@shared/helpers/testdata";

describe('Partner Contracts test suite: Company partner --- ', () => {
    const contract = new Contract();
    beforeEach(() => {
        Precondition
            .removeAllRecentPartners()
            .doQuickSearchAndDisplayPartnerOverview('P-1175-2272');
    });
    afterEach(() => {
        browser.reloadSession();
    });

    it('displays proper contracts for a company partner ', () => {
        MenuNavigationScreen.tapMenuName(MenuName.Contracts);
        contract.verify().expectDisplayActiveContracts();
    });
});
