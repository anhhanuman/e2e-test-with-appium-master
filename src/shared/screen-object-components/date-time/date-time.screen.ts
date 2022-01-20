import {DateTimeElement} from './date-time.element';
import {Screen} from '../../helpers/screen';
import Gestures from '../../helpers/gestures';

export class DateTimeScreen {
    constructor() {
        //super();
    }

    static waitForDisplay() {
        Screen.waitForElementDisplay(DateTimeElement.datePicker)
            .waitForElementDisplay(DateTimeElement.timePicker);

        return this;
    }

    static selectDefaultDateTime(datePickerPosition?: number) {
        this.waitForDisplay()
            .selectDefaultDate(datePickerPosition)
            .selectDefaultTime();

        return this;
    }

    static selectDefaultDate(datePickerPosition?: number) {
        this.tapDatePicker(datePickerPosition);
        DateTimeElement.donePickerButton.click();
        Screen.waitUntilElementNotDisplay(DateTimeElement.donePickerButton);

        return this;
    }

    static tapDatePicker(datePickerPosition?: number) {
        if (datePickerPosition === undefined) {
            DateTimeElement.datePicker.click();
        } else {
            Screen.tapWhenDisplay(DateTimeElement.getDatePicker(datePickerPosition))
        }

        return this;
    }

    static selectDefaultTime() {
        DateTimeElement.timePicker.click();
        DateTimeElement.donePickerButton.click();
        Screen.waitUntilElementNotDisplay(DateTimeElement.donePickerButton);

        return this;
    }

    static selectRandomDate() {
        Screen.waitForElementDisplay(DateTimeElement.datePicker);
        DateTimeElement.datePicker.click();
        Gestures.dragAndDropWebviewElement(DateTimeElement.getPickerColumnAtIndex(0), 0, -200, false);
        Gestures.dragAndDropWebviewElement(DateTimeElement.getPickerColumnAtIndex(1), 0, -200, false);
        Gestures.dragAndDropWebviewElement(DateTimeElement.getPickerColumnAtIndex(2), 0, -50, false);

        DateTimeElement.donePickerButton.click();

        return this;
    }

    static selectDayMonthYear(whatDate: string, whatMonth: string, whatYear: string) {
        DateTimeElement.datePicker.click();
        const dayElements = DateTimeElement.getButtonsAtPickerColumn('days');
        const monthElements = DateTimeElement.getButtonsAtPickerColumn('months');
        const yearElements = DateTimeElement.getButtonsAtPickerColumn('days');
        Screen.getElementPositionInElementsList(whatDate, dayElements);
        Screen.getElementPositionInElementsList(whatMonth, monthElements);
        Screen.getElementPositionInElementsList(whatYear, yearElements);
    }

    static selectDay(whatDate: number) {
        DateTimeElement.datePicker.click();
        const dayElements = DateTimeElement.getButtonsAtPickerColumn('days');
        const dayColumnElement = DateTimeElement.getPickerColumnAtIndex(0);
        dayColumnElement.moveTo();
        browser.pause(10000);
    }
}
