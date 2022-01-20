import {Contract} from "@apps/iaa/screen-objects/contract/contract.action";

export class ContractValidator {
    constructor(private contract: Contract) {
    }

    /* expectUploadingSpinnerUploadedState( expectedNotificationIconDisplayed: Array<boolean>) {
         const actual = this.contractScreen.getUploadingUploadedStates();
         expect(actual).toEqual(expectedNotificationIconDisplayed);

         return this;
     }*/

    expectStartUploadingForeignContract() {
        const numberOfHourGlassIcons = this.contract.getTotalInProgressIcons();
        expect(numberOfHourGlassIcons).toEqual(1);

        return this;
    }

    expectDisplayActiveContracts() {
        const totalActiveContracts = this.contract.getTotalActiveContracts();
        const totalArrowIcons = this.contract.getTotalArrowDownloadIcons();
        expect(totalActiveContracts).toEqual(totalArrowIcons);

        return this;
    }

    expectDownloadedContracts() {
        const totalActiveContracts = this.contract.getTotalActiveContracts();
        const totalGreenCheckIcons = this.contract.getTotalDownloadedIcons();
        expect(totalActiveContracts).toEqual(totalGreenCheckIcons);

        return this;
    }

}
