export class MtanElement {
    static get mtanCodeScreenIdentity() {
        const mtanCodeScreenIdentity: string = 'p*=Please confirm the four-digit code we have sent to your mobile.';

        return $(mtanCodeScreenIdentity);
    }

    static get mtanCodeInput() {
        const mtanCodeRequestButton: string = '#btn-request-mtan';

        return $(mtanCodeRequestButton);
    }

    static get mtanCodeRequestButton() {
        const mtanCodeInput: string = 'input.native-input';

        return $(mtanCodeInput);
    }
}
