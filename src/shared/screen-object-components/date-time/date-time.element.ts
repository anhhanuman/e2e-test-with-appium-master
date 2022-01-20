export class DateTimeElement {
    private static readonly selectors = {
        datePicker: 'div.date-picker ion-datetime',
        calendarIcon: 'mobi-icon.calendar-icon',
        timePicker: 'div.time-picker ion-datetime',
        pickerColumns: 'div.picker-columns ion-picker-column',
        pickerButtons: 'div.picker-toolbar div button'
    };

    static get datePicker() {
        return $(this.selectors.datePicker);
    }

    static getDatePicker(datePickerPosition: number) {
        if (datePickerPosition < 0) {
            throw Error('date picker position not correct');
        } else {
            return $$(this.selectors.datePicker)[datePickerPosition];
        }
    }

    static get timePicker() {
        return $(this.selectors.timePicker);
    }

    static get calendarIcon() {
        return $(this.selectors.calendarIcon);
    }

    static get donePickerButton() {
        return $$(this.selectors.pickerButtons)[1];
    }

    static getPickerColumnAtIndex(index: number) {
        return $$(this.selectors.pickerColumns)[index].$('.picker-opts');
    }

    static getButtonsAtPickerColumn(pickerColumn: string) {
        const days: string = 'div.picker-columns ion-picker-column:nth-of-type(1) button';
        const months: string = 'div.picker-columns ion-picker-column:nth-of-type(2) button';
        const years: string = 'div.picker-columns ion-picker-column:nth-of-type(3) button';

        switch (pickerColumn.toLowerCase()) {
            case 'days':
                return $$(days);
            case 'months':
                return $$(months);
            case 'years':
                return $$(years);
            default:
                throw Error('Please specify the correct picker column');
        }
    }
}
