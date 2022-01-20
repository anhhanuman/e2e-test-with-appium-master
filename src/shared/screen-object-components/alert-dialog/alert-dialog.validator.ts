export class AlertDialogValidator {
    constructor(private alertScreen: any) {
    }

    expectAlertMessage(expectedDialogMessage: Array<string>) {
        const alertTitleAndContent = this.alertScreen.getAlertDialog();
        expect(alertTitleAndContent).toEqual(expectedDialogMessage);

        return this;
    }
}
