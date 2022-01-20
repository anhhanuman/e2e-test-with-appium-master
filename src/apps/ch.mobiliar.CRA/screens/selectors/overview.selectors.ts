import {DeviceType} from '@shared/helpers';

const deviceType: string = browser.capabilities['deviceType'];

export class OverviewElement {
    private readonly selectors = {
        settingsButton: 'ion-buttons:nth-of-type(1) mobi-icon',
        overviewTitle: '',
        topRightNewClaimCaseButton: 'ion-buttons:nth-of-type(2) mobi-icon',
        createNewClaimCaseButton: ''
    };

    get settingsButton() {
        return $(this.selectors.settingsButton);
    }

    get topRightNewClaimCaseButton() {
        return $(this.selectors.createNewClaimCaseButton);
    }

    get createNewClaimCaseButton() {
        return $(this.selectors.createNewClaimCaseButton);
    }

    get overviewTitle() {
        if (deviceType === DeviceType.iPhone) {
            this.selectors.overviewTitle = 'ion-header ion-toolbar ion-title';
        } else {
            this.selectors.overviewTitle = 'ion-content span';
        }

        return $(this.selectors.overviewTitle);
    }
}
