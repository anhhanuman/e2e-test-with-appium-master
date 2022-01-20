import {BaseSelector} from '../../selectors/base-selector.selector';
import {germanTranslation} from '../../assets/german';
import {frenchTranslation} from '../../assets/french';
import {italianTranslation} from '../../assets/italian';
import {englishTranslation} from '../../assets/eng';

export class HeaderToolbarElement {
    private static readonly selectors = {
        homeScreenNavigationButton: 'app-menu ion-buttons:nth-of-type(1) ion-button',
        partnerNameTitle: 'app-menu ion-header ion-toolbar span',
        backButton: 'mobi-back-button ion-button',
    };

    constructor(appName?: string) {
        if (appName === 'IAA') {
            HeaderToolbarElement.selectors.partnerNameTitle = 'app-menu ion-header ion-toolbar ion-title';
        }
    }

    static getHomeButton() {
        const homeButtonSelector = BaseSelector.getMenuScreen().concat(' ion-header ion-buttons:nth-child(1) ion-button');

        return $(homeButtonSelector);
    }

    static get backButton() {
        return $(this.selectors.backButton);
    }


    static getActionSheetUnmarkAsFavorite(appLanguage?: string) {
        const germanOptUnMarkAsFavorite = '~'.concat(germanTranslation.unmarkAsFavorite);
        const frenchOprUnMarkAsFavorite = '~'.concat(frenchTranslation.unmarkAsFavorite);
        const italianOptUnMarkAsFavorite = '~'.concat(italianTranslation.unmarkAsFavorite);
        const englishOptUnMarkAsFavorite = '~'.concat(englishTranslation.unmarkAsFavorite);

        if (appLanguage === undefined) {
            return $(englishOptUnMarkAsFavorite);
        } else if (appLanguage.toLowerCase() === 'german') {
            return $(germanOptUnMarkAsFavorite);
        } else if (appLanguage.toLowerCase() === 'french') {
            return $(frenchOprUnMarkAsFavorite);
        } else if (appLanguage.toLowerCase() === 'italian') {
            return $(italianOptUnMarkAsFavorite);
        } else {
            return $(englishOptUnMarkAsFavorite);
        }
    }

    static getActionSheetMarkAsFavorite(appLanguage?: string) {
        const germanActionSheetMarkAsFavorite = '~'.concat(germanTranslation.markAsFavorite);
        const frenchActionSheetMarkAsFavorite = '~'.concat(frenchTranslation.markAsFavorite);
        const italianActionSheetMarkAsFavorite = '~'.concat(italianTranslation.markAsFavorite);
        const englishActionSheetMarkAsFavorite = '~'.concat(englishTranslation.markAsFavorite);

        if (appLanguage === undefined) {
            return $(englishActionSheetMarkAsFavorite);
        } else if (appLanguage.toLowerCase() === 'german') {
            return $(germanActionSheetMarkAsFavorite);
        } else if (appLanguage.toLowerCase() === 'french') {
            return $(frenchActionSheetMarkAsFavorite);
        } else if (appLanguage.toLowerCase() === 'italian') {
            return $(italianActionSheetMarkAsFavorite);
        } else {
            return $(englishActionSheetMarkAsFavorite);
        }
    }

}
