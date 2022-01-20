import {AddForeignContract} from '@apps/iaa/screen-objects/contract/add-forein-contract/add-foreign-contract.action';
import {AutoCompleteScreen} from '@shared/screen-object-components/auto-complete/auto-complete.screen';
import {Precondition} from "@apps/iaa/precondition/precondition";
import {Contract} from "@apps/iaa/screen-objects/contract/contract.action";
import {ScreenName} from "@shared/helpers/testdata";

const contract = new Contract();
const addForeignContract = new AddForeignContract();
describe('Partner Contracts test suite: Foreign contracts --- ', () => {
    beforeEach(() => {
        Precondition
            .removeAllRecentPartners()
            .displayContractsScreen('P-1007-9196');
        contract.scanForeignContract();
    });
    afterEach(() => {
        browser.reloadSession();
    });
    it('display the first part properly', () => {
        addForeignContract
            .verify()
            .expectScannedDocumentDocumentIconSize('30px')
            .expectScannedDocumentTitleAndContent('Document\nForeign Contract')
            .expectScannedDocumentBorderedByValue('1px solid rgb(234, 235, 236)');
        addForeignContract
            .selectDefaultInsuranceType()
            .verify()
            .expectSelectedInsuranceType('Haushalt');
        addForeignContract.inputInsuranceProvider('axa');

        AutoCompleteScreen.verify()
            .expectedFoundNumberOfAutoCompletesEqual(3)
            .expectedValuesOfAutoCompleteBoxes(['AXA Corporate Solutions', 'AXA Leben AG', 'AXA Winterthur']);

        addForeignContract
            .selectInsuranceProvider(2)
            .verify()
            .expectSelectingInsuranceProviderValue('AXA Winterthur');
    });

    xit('displays the second part properly', () => {
        addForeignContract
            .turnOnSalesInfoContent()
            .verify()
            .expectSaleInfoToolTipContent(
                'Sales Opportunity\nSetting the expiration date will automatically trigger a sales opportunity within the Sales Portal (VP).'
            );

        addForeignContract
            .selectDefaultStartDate()
            .selectDefaultExpirationDate()
            .turnOffSaleInfoContent()
            .verify()
            .expectAdditionalAttributesGroupDisplayed([false, false]);
        addForeignContract
            .tapExpandButton()
            .inputAdditionalAttributes('300.500', 'VF48200', 'automation test')
            .verify()
            .expectInputtedPremiumAndPolicyNumber(['300.50', 'VF48200'])
            .expectInputtedRemarks('automation test');
        addForeignContract
            .editAnnualPremium('300')
            .verify()
            .expectInputtedPremiumAndPolicyNumber(['300.00', 'VF48200']);
    });
});
xdescribe('Partner Contracts test suite: should be ale to upload the foreign contracts Foreign contracts with dataset', () => {
    beforeEach(() => {
        Precondition.displayContractsScreen('P-1301-8718');
    });
    afterEach(() => {
        browser.reloadSession();
    });

    const parameters = [
        {
            description: 'should be able to upload without the additional info',
            howMuchPremium: '',
            whatIsPolicyNumber: ''
        },
        {
            description: 'should be able to upload with normal premium and blank policy number',
            howMuchPremium: '500',
            whatIsPolicyNumber: ''
        },
        {
            description: 'should be able to upload with normal premium and policy number is numeric',
            howMuchPremium: '100',
            whatIsPolicyNumber: '123456'
        },
        {
            description: 'should be able to upload with .. premium and policy number is numeric',
            howMuchPremium: '100..50',
            whatIsPolicyNumber: '123456'
        },
        {
            description: 'should be able to upload with normal premium and string policy number',
            howMuchPremium: '500.500',
            whatIsPolicyNumber: 'No. G-1208-2815'
        },
        {
            description: 'should be able to upload with .500 mistake premium and string policy number',
            howMuchPremium: '500.500',
            whatIsPolicyNumber: 'chubbxyz'
        }
    ];

    parameters.forEach((parameter) => {
        it(parameter.description, () => {
            contract.scanForeignContract();
            addForeignContract.fillInDataAndUpload(
                'Chubb',
                2,
                parameter.howMuchPremium,
                parameter.whatIsPolicyNumber,
                'automation test'
            );
            contract.verify()
                .expectStartUploadingForeignContract();
            //expect(contract.toolbar.isSpinnerDisplayed()).toBe(true);
            contract
                .toolbar
                .verify()
                .expectTitle(ScreenName.Contracts)

            /* Screen.verify()
                 .expectUploadingSpinnerUploadedState('contracts', [true, false]);*/
        });
    });
});
