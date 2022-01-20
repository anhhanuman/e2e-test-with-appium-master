import Input from '../../helpers/input';
import {Screen} from '../../helpers/screen';
import {LoginElement} from './login.element';
import {MtanScreen} from '@shared/screen-object-components';

export class LoginScreen {
    static waitForDisplay() {
        Screen.waitForElementDisplay(LoginElement.loginScreenTitle);
        return this;
    }

    static waitUntilElementNotExist() {
        Screen.waitUntilElementNotExist(LoginElement.usernameInput);
        return this;
    }

    isLoginScreenDisplayed() {
        return LoginElement.loginScreenTitle.isDisplayed();
    }

    static tapCloseLoginButton() {
        LoginElement.closeLoginButton.click();
        Screen.waitUntilElementNotExist(LoginElement.loginScreenTitle);

        return this;
    }

    static enterUsername(value: string) {
        Input.setInputValue(LoginElement.usernameInput, value);

        return this;
    }

    static enterPassword(value: string) {
        Input.setInputValue(LoginElement.passwordInput, value);

        return this;
    }

    static getUsernameValue() {
        return LoginElement.usernameInput.getValue();

    }

    static getPasswordValue() {
        return LoginElement.passwordInput.getValue();
    }

    static tapLoginButton() {
        LoginElement.loginButton.click();

        return this;
    }

    static waitUntilScreenNotExist() {
        let loginElements = [];
        loginElements.push(LoginElement.usernameInput, LoginElement.passwordInput, LoginElement.loginButton);
        Screen.waitUntilElementsNotExist(loginElements);

        return this;
    }

    static tapLoginButtonAndWaitForMtan() {
        LoginElement.loginButton.click();
        this.waitUntilScreenNotExist();
        MtanScreen.waitForDisplay();

        return this;
    }

    static loginWithCredentials(username: string, password: string) {
        this.enterUsername(username)
            .enterPassword(password)
            .tapLoginButtonAndWaitForMtan();

        return this;
    }
}
