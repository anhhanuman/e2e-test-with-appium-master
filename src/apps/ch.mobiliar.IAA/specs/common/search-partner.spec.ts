import {Contexts} from '@shared/helpers';
import {AlertDialog, fatalErrorAlertDialog} from '@shared/screen-object-components';
import {SearchPartnerScreen} from '../../screen-objects/search-partner/search-partner.screen.actions';
import {
    expectedSearchInfoEllipsis,
    expectedSearchPartnerCriteriaInfo
} from '@shared/screen-object-components/objects/base-search-partner.screen';
import {AutoCompleteScreen} from '@shared/screen-object-components/auto-complete/auto-complete.screen';
import {LoadingContent} from '@shared/screen-object-components/loading-content/loading.content';
import {Precondition} from "@apps/iaa/precondition/precondition";

const searchPartnerScreen = new SearchPartnerScreen();

describe('Quick search test suites: ', () => {
    beforeEach(() => {
        Contexts.switchToWebview();
        Precondition.displayQuickSearchPartnerScreen();
    });
    afterEach(() => {
        browser.reloadSession();
    });
    it('should display the loading message after tapping from partner from search result', () => {
        searchPartnerScreen
            .inputQuickPartnerData('10079196')
            .tapQuickSearchButtonAndWait()
            .tapFoundPartnerOnSearchResult(0);
        LoadingContent.verify().expectedLoadingContentDisplayed(true);
    });

    it('HAN-962: should display the proper search partner result after search by quick search', () => {
        searchPartnerScreen
            .inputQuickPartnerData('10092738')
            .tapQuickSearchButtonAndWait()
            .verify()
            .expectSearchCriteriaInfoEqual(['Search Criteria', '10092738'])
            .expectFoundPartnerInfoEqual(['Paul Kenel', '02.12.1960 (59)', 'Boletstrasse, 8914 Aeugst am Albis'])
            .expectFoundNumberOfPartnerEqual(1);
        searchPartnerScreen
            .tapPenIcon()
            .verify()
            .expectQuickSearchInputFocused(true)
            .expectInputtedQuickSearchValueEqual('10092738');
        searchPartnerScreen
            .tapClearIconOnQuickSearch()
            .inputQuickPartnerData('13324789')
            .tapQuickSearchButtonAndWait()
            .verify()
            .expectSearchCriteriaInfoEqual(['Search Criteria', '13324789'])
            .expectFoundPartnerInfoEqual(['Paul Wicki', '18.03.1974 (46)', 'Im Fahr, 5105 Auenstein'])
            .expectFoundNumberOfPartnerEqual(1);
    });

    it('should display the Fatal Alert Error message when searching by 4 digits', () => {
        searchPartnerScreen.tapQuickSearchInput().inputQuickPartnerData('1111').tapQuickSearchButton();
        AlertDialog
            .waitForAlertDialog()
            .verify()
            .expectAlertMessage(fatalErrorAlertDialog);
    });
});

describe('Partner search test suites: Partner number and Contract number', () => {
    beforeEach(() => {
        Contexts.switchToWebview();
        Precondition.displayQuickSearchPartnerScreen();
        searchPartnerScreen.navigateToPartnerSearchSegment();
    });
    afterEach(() => {
        browser.reloadSession();
    });

    it('HAN - : should be able to search by partner number and display proper result with only 1 partner found P-1009-2738', () => {
        searchPartnerScreen
            .enterNumberInput('10092738')
            .tapSearchPartnerButtonAndWait()
            .verify()
            .expectSearchCriteriaInfoEqual(expectedSearchPartnerCriteriaInfo)
            .expectFoundPartnerInfoEqual(['Paul Kenel', '02.12.1960 (59)', 'Boletstrasse, 8914 Aeugst am Albis'])
            .expectFoundNumberOfPartnerEqual(1);
    });

    it('should be able to search by partner attributes, and edit the search criteria and display proper result ', () => {
        searchPartnerScreen
            .inputPartnerAttributes('paul', 'kenel', '8914 Aeugst ', 'street test', '')
            .tapSearchPartnerButtonAndWait()
            .verify()
            .expectSearchCriteriaInfoEqual(['Search Criteria', 'paul, kenel, 8914 Aeugst am Albis, street test'])
            .expectEmptySearchResultEqual('No Partners match your search');
        searchPartnerScreen
            .tapPenIcon()
            .clearInputtedStreetAndInputNewStreet('')
            .tapSearchPartnerButtonAndWait()
            .verify()
            .expectSearchCriteriaInfoEqual(['Search Criteria', 'paul, kenel, 8914 Aeugst am Albis'])
            .expectFoundPartnerInfoEqual(['Paul Kenel', '02.12.1960 (59)', 'Boletstrasse, 8914 Aeugst am Albis']);
        searchPartnerScreen
            .tapPenIcon()
            .clearInputtedStreetAndInputNewStreet('Boletstrasse')
            .tapSearchPartnerButtonAndWait()
            .verify()
            .expectEllipsisSearchCriteriaInfoIPhoneEqual(expectedSearchInfoEllipsis)
            .expectFoundPartnerInfoEqual(['Paul Kenel', '02.12.1960 (59)', 'Boletstrasse, 8914 Aeugst am Albis']);
    });

    it('should display the search result if search by partner attributes and phone number', () => {
        searchPartnerScreen
            .inputPartnerAttributes('Wicki', 'Paul', '5105 Auenstein', 'Im Fahr', '41625870680')
            .tapSearchPartnerButtonAndWait()
            .verify()
            .expectSearchCriteriaInfoEqual(['Search Criteria', 'Wicki, Paul, 5105 Auenstein, Im Fahr, 41625870680'])
            .expectFoundPartnerInfoEqual(['Paul Wicki', '18.03.1974 (46)', 'Im Fahr, 5105 Auenstein']);
    });

    it('should display the search result if search by phone number', () => {
        searchPartnerScreen
            .inputPhoneNumber('41625870680')
            .tapSearchPartnerButtonAndWait()
            .verify()
            .expectSearchCriteriaInfoEqual(['Search Criteria', '41625870680']) //41448633183
            .expectFoundPartnerInfoEqual(['Paul Wicki', '18.03.1974 (46)', 'Im Fahr, 5105 Auenstein']);
        searchPartnerScreen
            .tapPenIcon()
            .inputPhoneNumber('41752788380')
            .tapSearchPartnerButtonAndWait()
            .verify()
            .expectSearchCriteriaInfoEqual(['Search Criteria', '41752788380'])
            .expectFoundNumberOfPartnerEqual(5);
    });

    it('should display the partners when user searches by Vehicle Registration Number', () => {
        searchPartnerScreen
            .inputVehicleRegistrationNumber('BL40680')
            .tapSearchPartnerButtonAndWait()
            .verify()
            .expectSearchCriteriaInfoEqual(['Search Criteria', 'BL40680'])
            .expectFoundNumberOfPartnerEqual(1)
            .expectFoundPartnerInfoByVehicleSearchEqual(['Bruno Zebert', '27.03.1972 (48)']);
        searchPartnerScreen
            .tapPenIcon()
            .inputVehicleRegistrationNumber('VD315609')
            .tapSearchPartnerButtonAndWait()
            .verify()
            .expectSearchCriteriaInfoEqual(['Search Criteria', 'VD315609'])
            .expectFoundNumberOfPartnerEqual(4);
        //todo: partner address can be changed because of the story partner modification, need to find 1 more vehicle registration number which return 1 partner
    });
});

describe('Partner search - Validation - switching segmentButtons', () => {
    beforeEach(() => {
        Contexts.switchToWebview();
        Precondition.displayQuickSearchPartnerScreen();
        searchPartnerScreen.navigateToPartnerSearchSegment();
    });
    afterEach(() => {
        browser.reloadSession();
    });
    it('HAN-1111: should remains proper inputted data when switching between contracts and partner tabs ', () => {
        searchPartnerScreen
            .inputLastNameOrCompanyInput('bruno')
            .inputFirstNameOrCompanyInput('zebert')
            .enterZipInput('8537');
        AutoCompleteScreen.verify().expectedFoundNumberOfAutoCompletesEqual(2);
        AutoCompleteScreen.selectValueInAutoComplete(1);
        searchPartnerScreen
            .tapContractNumberTab()
            .tapPartnerNumberTab()
            .verify()
            .expectInputtedLastName('bruno')
            .expectInputtedFirstName('zebert')
            .expectInputtedZipPlace('8537 Nussbaumen TG');
        AutoCompleteScreen
            .verify()
            .expectedAutoCompleteBoxesDisplay(false);
    });

    it('should display the errorIcon validation of contracts', () => {
        searchPartnerScreen
            .tapContractNumberTab()
            .tapSearchButton()
            .verify()
            .expectErrorIconsDisplayOnInput([true]);
        searchPartnerScreen
            .tapErrorInput(0)
            .verify()
            .expectErrorInputContent(['Invalid Text', 'Enter a Contract Number to search for']);
    });
});
