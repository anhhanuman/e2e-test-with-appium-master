import {AppointmentsSelectors} from '../selectors/appointments.selectors';

export class AppoitmentsScreenActions {
    private appointmentScreenSelector = new AppointmentsSelectors();

    waitForDisplay(): void {
    }

    getEnabledDisabledStates(): Array<boolean> {
        let appointmentInputtedStates: Array<boolean> = [];
        appointmentInputtedStates.push(this.getInputtedDateState());
        appointmentInputtedStates.push(this.getInputtedTimeState());
        appointmentInputtedStates.push(this.getInspectionLocationState());
        appointmentInputtedStates.push(this.getContactPersonNameState());
        appointmentInputtedStates.push(this.getContactPersonPhoneState());

        return appointmentInputtedStates;
    }

    getInputtedDateState(): boolean {
        return this.appointmentScreenSelector.inputtedDate.isEnabled();
    }

    getInputtedTimeState(): boolean {
        return this.appointmentScreenSelector.inputtedTime.isEnabled();
    }

    getInspectionLocationState(): boolean {
        return this.appointmentScreenSelector.inspectionLocation.isEnabled();
    }

    getContactPersonNameState(): boolean {
        return this.appointmentScreenSelector.contacts[0].isEnabled();
    }

    getContactPersonPhoneState(): boolean {
        return this.appointmentScreenSelector.contacts[1].isEnabled();
    }

    getContactPerson(): string {
        return this.appointmentScreenSelector.contacts[0].getText();
    }

    getInputtedDate(): string {
        return this.appointmentScreenSelector.inputtedDate.getText();
    }

    getInputtedTime(): string {
        return this.appointmentScreenSelector.inputtedTime.getText();
    }

    getInputtedInspectionLocation(): string {
        return this.appointmentScreenSelector.inspectionLocation.getText();
    }

    getAddingButtonsDisplayingStates(): Array<boolean> {
        let plusButtons: Array<boolean> = [];
        let plusButtonSelectors: Array<WebdriverIO.Element> = this.appointmentScreenSelector
            .plusButtonsInsuranceAndPerson;
        for (let index in plusButtonSelectors) {
            plusButtons.push(plusButtonSelectors[index].isDisplayed());
        }
        return plusButtons;
    }
}
