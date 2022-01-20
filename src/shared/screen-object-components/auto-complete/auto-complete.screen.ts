import Gestures from '../../helpers/gestures';
import {AutoCompleteValidator} from './auto-complete.validator';
import {Screen} from '../../helpers/screen';
import Input from '../../helpers/input';

export class AutoCompleteScreen {
    private static readonly selectors = {
        autoCompleteGroup: 'ul',
        autoCompleteInput: 'mobi-auto-complete ion-input input.native-input'
    };

    static get autoCompleteBoxes() {
        return $$(this.selectors.autoCompleteGroup.concat(' li span'));
    }

    static get autoCompleteInput() {
        return $(this.selectors.autoCompleteInput);
    }

    static get autoCompleteBoldValueBoxes() {
        return $$(this.selectors.autoCompleteGroup.concat(' li span b'));
    }

    static get autoCompleteGroup() {
        return $(this.selectors.autoCompleteGroup);
    }

    static waitForAutoCompleteGroupDisplay() {
        Screen.waitForElementDisplay(this.autoCompleteGroup);
    }

    static inputValue(whatValueToInput: string) {
        Input.inputValue(this.autoCompleteInput, whatValueToInput);
    }

    static selectValueInAutoComplete(whichAutoCompletePosition: number) {
        this.waitForAutoCompleteGroupDisplay();
        Gestures.scrollIntoView(this.autoCompleteBoxes[whichAutoCompletePosition]);
        this.autoCompleteBoxes[whichAutoCompletePosition].click();
        Screen.waitUntilElementNotDisplay(this.autoCompleteGroup);

        return this;
    }

    static verify() {
        return new AutoCompleteValidator(this);
    }

    static getNumberOfAutoCompleteBoxes() {
        this.waitForAutoCompleteGroupDisplay();

        return this.autoCompleteBoxes.length;
    }

    static getValuesOfAutoCompleteBoxes() {
        this.waitForAutoCompleteGroupDisplay();

        return Screen.getTextOfElements(this.autoCompleteBoxes);
    }

    static isAutoCompleteGroupDisplayed() {
        return this.autoCompleteGroup.isDisplayed();
    }

    static getSelectingAutoCompleteValue() {
        return this.autoCompleteInput.getValue();
    }
}
