export class AddForeignContractValidator {
    constructor(private addForeignContract: any) {
    }

    expectSelectedInsuranceType(expectedSelectedInsuranceType: string) {
        const selectedInsuranceType = this.addForeignContract.getSelectedInsuranceType();
        expect(selectedInsuranceType).toEqual(expectedSelectedInsuranceType);

        return this;
    }

    expectSelectingInsuranceProviderValue(expectedSelectingInsuranceProviderValue: string) {
        const selectingInsuranceProviderValue = this.addForeignContract.getSelectingInsuranceProviderValue();
        expect(selectingInsuranceProviderValue).toEqual(expectedSelectingInsuranceProviderValue);

        return this;
    }

    expectSaleInfoToolTipContent(expectedSaleInfoToolTipContent: string) {
        const saleInfoToolTipContent = this.addForeignContract.getSaleInfoToolTipContent();
        expect(saleInfoToolTipContent).toEqual(expectedSaleInfoToolTipContent);

        return this;
    }

    expectAdditionalAttributesGroupDisplayed(expectedGroupDisplayed: Array<boolean>) {
        const actual = this.addForeignContract.isAdditionalAttributesGroupDisplayed();
        expect(actual).toEqual(expectedGroupDisplayed);

        return this;
    }

    expectInputtedPremiumAndPolicyNumber(expectedPremiumAndPolicyNumber: Array<string>) {
        const actual = this.addForeignContract.getInputtedPremiumAndPolicyNumber();
        expect(actual).toEqual(expectedPremiumAndPolicyNumber);

        return this;
    }

    expectInputtedRemarks(expectedInputtedRemarks: string) {
        const actual = this.addForeignContract.getInputtedRemarks();
        expect(actual).toEqual(expectedInputtedRemarks);

        return this;
    }

    expectScannedDocumentTitleAndContent(scannedDocumentTitleAndContent: string) {
        const actual = this.addForeignContract.getScannedDocumentTitleAndContent();
        expect(actual).toEqual(scannedDocumentTitleAndContent);

        return this;
    }

    expectScannedDocumentDocumentIconSize(expectedScannedDocumentDocumentIconSize: string) {
        const actual = this.addForeignContract.getDocumentIconSize();
        expect(actual).toEqual(expectedScannedDocumentDocumentIconSize);

        return this;
    }

    expectScannedDocumentBorderedByValue(expectedScannedDocumentBorderedByValue: string) {
        const actual = this.addForeignContract.getScannedDocumentBorderedByValue();
        expect(actual).toEqual(expectedScannedDocumentBorderedByValue);

        return this;
    }

    expectScannedDocumentCardDisplayed(expectedScannedDocumentCardDisplayed: boolean) {
        const actual = this.addForeignContract.isScannedDocumentCardDisplayed();
        expect(actual).toEqual(expectedScannedDocumentCardDisplayed);

        return this;
    }
}
