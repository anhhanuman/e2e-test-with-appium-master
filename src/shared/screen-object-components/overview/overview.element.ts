export class OverviewElement {
    private static readonly baseSelectors = {
        baseSettingButton: 'ion-buttons ion-button mobi-icon.setting-icon',
        basePlusButton: 'ion-buttons ion-button mobi-icon.plus-icon',
        baseOverviewTitle: 'ion-toolbar ion-title'
    };

    static get baseSettingButton(): WebdriverIO.Element {
        return $(this.baseSelectors.baseSettingButton);
    }

    static get basePlusButton(): WebdriverIO.Element {
        return $(this.baseSelectors.basePlusButton);
    }

    static get baseOverviewTitle(): WebdriverIO.Element {
        return $(this.baseSelectors.baseOverviewTitle);
    }
}
