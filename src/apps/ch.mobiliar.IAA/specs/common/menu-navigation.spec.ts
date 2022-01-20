import {BaseMenuNavigationScreen} from '@shared/screen-object-components/objects/base-menu-navigation.screen.action';
import {Precondition} from "@apps/iaa/precondition/precondition";
import {MenuNavigationScreen} from "@apps/iaa/static/menu-navigation-screen.action";
import {MenuName} from "@shared/helpers/testdata";
import {Contract} from "@apps/iaa/screen-objects/contract/contract.action";

describe('', () => {
    beforeEach(() => {
        Precondition
            .doQuickSearchAndDisplayPartnerOverview('P-1175-2272')
            .reSyncIfError();
    });
    afterEach(() => {
        browser.reloadSession();
    });

    it('display proper contract values', () => {
        const contractMenuValue = MenuNavigationScreen.getMenuDetails(MenuName.Contracts);
        const contract = new Contract();
        const totalActiveContracts = contract.getTotalActiveContracts();
        expect(contractMenuValue).toEqual(totalActiveContracts.toString().concat(' active'));
        // todo: how about the foreign contract
    })
});

xdescribe('MenuNavigation navigation test suite: ', () => {
    beforeEach(() => {
        Precondition.doQuickSearchAndDisplayPartnerOverview('P-1022-4709');
    });
    afterEach(() => {
        browser.reloadSession();
    });

    it('should display the proper menu navigation for Customer partner', () => {
        browser.pause(5000);
        const expectedMenuTitle = [
            'Basic Data',
            'Partner Relations',
            'Contracts',
            'Offers',
            'Claims',
            'Documents'
        ];
        const actualMenuTitle = BaseMenuNavigationScreen.getMenuNames();
        expect(actualMenuTitle).toEqual(expectedMenuTitle);

        const expectedBasicData = ['Basic Data', '17.08.1959 (61)\nSpitzwaldhof, 4123 Allschwil'];
        const actualBasicData = BaseMenuNavigationScreen.getMenuTitleAndDetails(0);
        expect(actualBasicData).toEqual(expectedBasicData);
        const expectedPartnerRelation = ['Partner Relations', '3 active'];
        const actualPartnerRelation = BaseMenuNavigationScreen.getMenuTitleAndDetails(1);
        expect(actualPartnerRelation).toEqual(expectedPartnerRelation);
    });
});

xdescribe('MenuNavigation navigation test suite: ', () => {
    beforeEach(() => {
        Precondition.doQuickSearchAndDisplayPartnerOverview('P-1049-9732');
    });
    afterEach(() => {
        browser.reloadSession();
    });
    it('should display the proper menu navigation for Company partner', () => {
        browser.pause(5000);
        const actualMenuTitle = BaseMenuNavigationScreen.getMenuNames();
        const expectedMenuTitle = [
            'Basic Data',
            'Partner Relations',
            'Contracts',
            'Offers',
            'Claims',
            'Documents'
        ];
        expect(actualMenuTitle).toEqual(expectedMenuTitle);

        const expectedBasicData = ['Basic Data', 'chemin du Closy, 1692 Massonnens'];
        const actualBasicData = BaseMenuNavigationScreen.getMenuTitleAndDetails(0);
        expect(actualBasicData).toEqual(expectedBasicData);

        const expectedPartnerRelation = ['Partner Relations', ''];
        const actualPartnerRelation = BaseMenuNavigationScreen.getMenuTitleAndDetails(1);
        expect(actualPartnerRelation).toEqual(expectedPartnerRelation);

        const expectedContracts = ['Contracts', '2 active'];
        const actualContracts = BaseMenuNavigationScreen.getMenuTitleAndDetails(2);
        expect(actualContracts).toEqual(expectedContracts);

        const expectedOffers = ['Offers', ''];
        const actualOffers = BaseMenuNavigationScreen.getMenuTitleAndDetails(3);
        expect(actualOffers).toEqual(expectedOffers);

        const expectedClaims = ['Claims', ''];
        const actualClaims = BaseMenuNavigationScreen.getMenuTitleAndDetails(4);
        expect(actualClaims).toEqual(expectedClaims);

        const expectedDocuments = ['Documents', '8 documents'];
        const actualDocs = BaseMenuNavigationScreen.getMenuTitleAndDetails(5);
        expect(actualDocs).toEqual(expectedDocuments);
    });
});
