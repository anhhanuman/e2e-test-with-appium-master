export class LoginElement {
    private static readonly selectors = {
        closeLoginButton: 'page-login ion-button mobi-icon',
        loginScreenTitle: 'ion-title.login-title',
        loginButton: 'ion-button.ion-color',
        usernameInput: '#username input',
        passwordInput: '#password input'
    };

    static get closeLoginButton() {
        return $(this.selectors.closeLoginButton);
    }

    static get loginScreenTitle() {
        return $(this.selectors.loginScreenTitle);
    }

    static get loginButton() {
        return $(this.selectors.loginButton);
    }

    static get usernameInput() {
        return $(this.selectors.usernameInput);
    }

    static get passwordInput() {
        return $(this.selectors.passwordInput);
    }
}
