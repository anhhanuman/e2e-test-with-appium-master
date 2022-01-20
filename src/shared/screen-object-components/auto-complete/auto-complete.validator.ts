export class AutoCompleteValidator {
    constructor(private autoCompleteScreen: any) {
    }

    expectedFoundNumberOfAutoCompletesEqual(expectedNumberOfAutoCompletes: number) {
        const numberOfAutoCompletes = this.autoCompleteScreen.getNumberOfAutoCompleteBoxes();
        expect(numberOfAutoCompletes).toEqual(expectedNumberOfAutoCompletes);

        return this;
    }

    expectedAutoCompleteBoxesDisplay(expectedAutoCompleteBoxesToBeDisplayed: boolean) {
        const autoCompleteBoxes = this.autoCompleteScreen.isAutoCompleteGroupDisplayed();
        expect(autoCompleteBoxes).toBe(expectedAutoCompleteBoxesToBeDisplayed);

        return this;
    }

    expectedValuesOfAutoCompleteBoxes(expectedValuesOfAutoCompleteBoxes: Array<string>) {
        const valuesOfAutoCompleteBoxes = this.autoCompleteScreen.getValuesOfAutoCompleteBoxes();
        expect(valuesOfAutoCompleteBoxes).toEqual(expectedValuesOfAutoCompleteBoxes);

        return this;
    }

    expectedSelectingValueEqual(expected: string) {
        const selectingValue = this.autoCompleteScreen.getSelectingAutoCompleteValue();
        expect(selectingValue).toEqual(expected);

        return this;
    }
}
