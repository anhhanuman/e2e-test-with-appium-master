export class SettingElement {
    private readonly selectors = {
        backButtonSetting: 'page-settings ion-header ion-button',
        configurationHeader: 'ion-content div.configuration span.page__title'
    };

    get backButtonSetting() {
        return $(this.selectors.backButtonSetting);
    }

    get configurationHeader() {
        return $(this.selectors.configurationHeader);
    }
}
