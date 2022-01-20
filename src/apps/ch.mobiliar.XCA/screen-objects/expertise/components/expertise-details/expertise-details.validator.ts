import {ExpertiseDetails} from "@apps/xca/screen-objects/expertise/components/expertise-details/expertise-details.action";

export class ExpertiseDetailsValidator {
    constructor(private expertiseDetails: ExpertiseDetails) {
    }

    expectedExpertiseTypes(expectedExpertiseTypes: Array<string>) {
        const actual: Array<string> = this.expertiseDetails.getExpertiseTypes();
        expect(actual).toEqual(expectedExpertiseTypes);
        return this;
    }

    expectedRbGroupAttributes(expectedRbGroupAttributes: Array<string>) {
        const actual = this.expertiseDetails.getRbGroupAttributes();
        expect(actual).toEqual(expectedRbGroupAttributes);
        return this;
    }

    expertiseDetailsDisplayProperlyAfterUploaded(selectedType: string) {
        this.expectedReadOnlyType(selectedType);

        return this;
    }


    expectedReadOnlyType(selectedExpertiseType: string) {
        const actualExpertiseType = this.expertiseDetails.getReadOnlySelectingExpertiseType();
        expect(actualExpertiseType).toEqual(selectedExpertiseType);
        this.expectedSelectIconDisplay(false);

        return this;
    }

    expectedSelectIconDisplay(displayOrNot: boolean) {
        const actual: boolean = this.expertiseDetails.getIconSelectExistingState();
        expect(actual).toBe(displayOrNot);

        return this;
    }
}
