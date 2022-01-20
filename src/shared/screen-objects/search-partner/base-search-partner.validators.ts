import {Util} from '@shared/helpers/util';

export class BaseSearchPartnerValidators {
    constructor(private screen: any) {
    }

    expectSearchCriteriaInfoEqual(expectedInfo: Array<string>) {
        const returnList = this.screen.getTextOfSearchCriteriaInfoOnSearchResult();
        expect(returnList).toEqual(expectedInfo);

        return this;
    }

    expectEllipsisSearchCriteriaInfoIPhoneEqual(expectedInfo: Array<string>) {
        const returnList = this.screen.getSearchInfoEllipsisIPhone();
        expect(returnList).toEqual(expectedInfo);

        return this;
    }

    expectFoundPartnerInfoEqual(expectedInfo: Array<string>) {
        const returnList = this.screen.getFoundPartnerAfterSearched();

        if (returnList === expectedInfo) {
            expect(returnList).toEqual(expectedInfo);
            return this;
        } else {
            const partnerDOBAndAge = returnList[1];

            const actualDisplayingAge = parseInt(partnerDOBAndAge.substring(12, 14));

            const actualDisplayingBirthDate = partnerDOBAndAge.substring(0, 10);

            const actualPartnerAge = Util.calculatePartnerAge(actualDisplayingBirthDate);

            const expectedAge = parseInt(expectedInfo[1].substring(12, 14));

            if (partnerDOBAndAge.substring(0, 12) === expectedInfo[1].substring(0, 12)) {
                if (actualDisplayingAge === actualPartnerAge && actualDisplayingAge === expectedAge + 1) {
                    expectedInfo[1] = expectedInfo[1].replace(expectedInfo[1], partnerDOBAndAge);
                    expect(returnList).toEqual(expectedInfo);

                    return this;
                } else {
                    expect(returnList).toEqual(expectedInfo);

                    return this;
                }
            } else {
                expect(returnList).toEqual(expectedInfo);

                return this;
            }
        }
    }

    expectFoundPartnerInfoByVehicleSearchEqual(expectedInfo: Array<string>) {
        const returnList = this.screen.getFoundPartnerAfterSearchedByVehicleRegistrationNumber();
        expect(returnList).toEqual(expectedInfo);

        return this;
    }

    expectFoundNumberOfPartnerEqual(expectedNumberOfPartners: number) {
        const numberOfPartner = this.screen.getNumberOfFoundPartnersAfterSearched();
        expect(numberOfPartner).toEqual(expectedNumberOfPartners);

        return this;
    }

    expectInputtedQuickSearchValueEqual(expectedInput: string) {
        const inputtedQuickSearch = this.screen.getTextOfInputtedQuickSearch();
        expect(inputtedQuickSearch).toEqual(expectedInput);

        return this;
    }

    expectEmptySearchResultEqual(expectedEmpty: string) {
        const searchReuslt = this.screen.getEmptySearchResultText();
        expect(searchReuslt).toEqual(expectedEmpty);

        return this;
    }

    expectInputtedLastName(expectedInputtedLastName: string) {
        const inputtedLastName = this.screen.getInputtedLastName();
        expect(inputtedLastName).toEqual(expectedInputtedLastName);

        return this;
    }

    expectInputtedFirstName(expectedInputtedFirstName: string) {
        const inputtedFirstName = this.screen.getInputtedFirstName();
        expect(inputtedFirstName).toEqual(expectedInputtedFirstName);

        return this;
    }

    expectInputtedZipPlace(expectedInputtedZipPlace: string) {
        const inputtedZipPlace = this.screen.getInputtedZip();
        expect(inputtedZipPlace).toEqual(expectedInputtedZipPlace);

        return this;
    }

    expectErrorIconsDisplayOnInput(expected: Array<boolean>) {
        const actual: Array<boolean> = this.screen.isInputErrorIconDisplayed();
        expect(actual).toEqual(expected);

        return this;
    }

    expectErrorInputContent(expectedErrorContent: Array<string>) {
        const actualErrorContent = this.screen.getInputErrorContent();
        expect(actualErrorContent).toEqual(expectedErrorContent);

        return this;
    }

    expectQuickSearchInputFocused(expectedQuickSearchInputFocused: boolean) {
        const actual: boolean = this.screen.isQuickSearchInputFocused();
        expect(actual).toEqual(expectedQuickSearchInputFocused);

        return this;
    }
}
