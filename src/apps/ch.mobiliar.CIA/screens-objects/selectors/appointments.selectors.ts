export class AppointmentsSelectors {
    private readonly selectors = {
        dateAndTimeLabel: 'mobi-item-datetime ion-label',
        inputtedDate: 'mobi-item-datetime div.date-picker',
        inputtedTime: 'mobi-item-datetime div.time-picker',
        locationOfInspectionLabel: 'mobi-item-textarea ion-label',
        inspectionLocation: 'mobi-item-textarea div.input__content',
        contacts: 'mobi-item-input div.input__content div',
        plusButtons: 'ion-grid ion-row ion-col.subtitle__action'
    };

    get dateAndTimeLabel() {
        return $(this.selectors.dateAndTimeLabel);
    }

    get inputtedDate() {
        return $(this.selectors.inputtedDate);
    }

    get inputtedTime() {
        return $(this.selectors.inputtedTime);
    }

    get inspectionLocation() {
        return $(this.selectors.inspectionLocation);
    }

    get contacts() {
        return $$(this.selectors.contacts);
    }

    get plusButtonsInsuranceAndPerson() {
        return $$(this.selectors.plusButtons);
    }
}
