import {ExpertiseHeader} from "@apps/xca/screen-objects/expertise/header/expertise-header.action";

export class ExpertiseHeaderValidator {
    constructor(private header: ExpertiseHeader) {
    }

    expectedUploadButtonDisplay(displayOrNot: boolean) {
        const actualUploadButtonState: boolean = this.header.isUploadButtonDisplayed();
        expect(actualUploadButtonState).toBe(displayOrNot);
        return this;
    }

    expectedPenEditIconDisplay(displayOrNot: boolean) {
        const actual: boolean = this.header.getPenEditIconDisplayingState();
        expect(actual).toBe(displayOrNot);
        return this;
    }

    expectedAfterUploadedState(expectedUploadedState: string) {
        const actualUploadedState: string = this.header.getUploadedToMCMStatus();
        expect(actualUploadedState).toEqual(expectedUploadedState);
        return this;
    }

    expectedCheckMarkTopRightDisplayed(displayOrNot: boolean) {
        const actualTickedButtonState: boolean = this.header.isCheckMarkIconTopRightDisplayed();
        expect(actualTickedButtonState).toBe(displayOrNot);
        return this;
    }

    headerDisplayProperlyAfterUploaded() {
        this.expectedPenEditIconDisplay(false)
            .expectedAfterUploadedState('Uploaded')
            .expectedUploadButtonDisplay(false)
            .expectedCheckMarkTopRightDisplayed(true);

        return this;
    }

    expectedDispatchNumber(expectedDispatchNumber: string) {
        expect(this.header.dispatchNumber).toEqual(expectedDispatchNumber)
    }
}
