import Input from '../../helpers/input';
import {Screen} from '../../helpers/screen';
import {MtanElement} from '../../screen-objects/mtan/mtan.element';
import {LoginElement} from '../../screen-objects/login/login.element';

export class MtanScreen {
    static waitForDisplay() {
        Screen.waitForElementDisplay(MtanElement.mtanCodeScreenIdentity);

        return this;
    }

    static isMtanScreenDisplayed() {
        return (
            MtanElement.mtanCodeScreenIdentity.isDisplayed() &&
            MtanElement.mtanCodeInput.isDisplayed() &&
            MtanElement.mtanCodeRequestButton.isDisplayed()
        );
    }

    static getMtanScreenContentTexts() {
        const mtanScreenElementsText = [];
        mtanScreenElementsText.push(
            LoginElement.loginScreenTitle.getText(),
            MtanElement.mtanCodeScreenIdentity.getText(),
            MtanElement.mtanCodeInput.getText(),
            MtanElement.mtanCodeRequestButton.getText()
        );
        return mtanScreenElementsText;
    }

    static waitUntilScreenNotExist() {
        let screenElements = [];
        screenElements.push(
            MtanElement.mtanCodeInput,
            MtanElement.mtanCodeScreenIdentity,
            MtanElement.mtanCodeRequestButton
        );
        Screen.waitUntilElementsNotExist(screenElements);

        return this;
    }

    static enterValidMtanCodeAndWaitForNotExist() {
        Input.setInputValue(MtanElement.mtanCodeInput, 'aaaa');
        this.waitUntilScreenNotExist();

        return this;
    }

    static enterInvalidMtanCode() {
        Input.setInputValue(MtanElement.mtanCodeInput, 'abcf');

        return this;
    }

    static getMtanCodeValue(): string {
        return MtanElement.mtanCodeInput.getValue();
    }
}

const expectedMtanScreenContent: Array<string> = [
    'Login',
    'Please confirm the four-digit code we have sent to your mobile.',
    '',
    'Request new text message code'
];
export {expectedMtanScreenContent};
