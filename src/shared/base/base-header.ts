import {Screen} from '@shared/helpers/screen';

export class BaseHeader implements HeaderInterface {
    getName(): string {
        return '';
    }

    tapButton(): void {
    }

    tapBackButton() {
        const backButtonSelector = 'ion-buttons mobi-back-button #btn-back';
        Screen.tapAndWaitForNotDisplay($(backButtonSelector));
    }
}
