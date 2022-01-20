import {ScreenName} from '../helpers/testdata';

export class BaseSelector {
    static overlayIconHasBackground() {
        return ' '.concat('div.overlay-layer.overlay-layer--has-background');
    }

    static overlayArrowReadyForDownloadIcons() {
        return this.overlayIconHasBackground().concat(' div.overlay-icon.overlay-icon--is-download-ready');
    }

    static overlayErrorIcon() {
        return ' '.concat('mobi-overlay-icon div.overlay-icon.overlay-icon--is-error');
    }

    static overlayHourGlassIcon() {
        return ' '.concat('div.overlay-icon.overlay-icon--is-loading');
    }

    static overlaySuccessIcon() {
        return ' '.concat('div.overlay-icon.overlay-icon--is-success');
    }

    static getSettingsScreen() {
        return 'app-settings';
    }

    static getStartScreen() {
        return 'app-overview';
    }

    static getNotificationModalScreen() {
        return 'ion-modal notification-modal';
    }

    static getTaskListScreen() {
        return 'app-task-list';
    }

    static getNewFreeTextTaskScreen() {
        return 'app-freetext-task';
    }

    static getMenuScreen() {
        return 'app-menu';
    }

    static getBasicDataScreen() {
        return 'app-basic-partner';
    }

    static getPartnerRelationScreen() {
        return 'app-partner-relations';
    }

    static getContractScreen() {
        return 'app-contract';
    }

    static getContractDetailsScreen() {
        return 'app-contract-detail';
    }

    static getForeignContractDetailsScreen() {
        return 'app-foreign-contract-detail';
    }

    static getOffersScreen() {
        return 'app-offer';
    }

    static getClaimsScreen() {
        return 'app-claim';
    }

    static getClaimOverviewScreen() {
        return 'app-claim-detail';
    }

    static getDocumentsScreen() {
        return 'app-document';
    }

    static getAddDocumentScreen() {
        return 'app-add-document';
    }

    static getSearchPartnerScreen() {
        return 'page-partner-search';
    }

    static getPartnerModification() {
        return 'partner-modification-modal';
    }

    static getCommunicationDetails() {
        return 'communication-detail';
    }

    static getMobiButton() {
        return 'mobi-button';
    }

    static getIonButton() {
        return 'ion-button';
    }

    static getInfoContainter() {
        return 'div.container';
    }

    static getInfoTitle() {
        return 'span.title';
    }

    static getInfoContent() {
        return 'div.content';
    }

    static readonly commonSelectors = {
        mobiCard: 'mobi-card',
        mobiCardContainer: 'div.container',
        mobiIconButtonWithPopUp: 'div.icons mobi-icon ion-icon',
        menuNavigation: 'ion-content',
        dropdownSelect: 'mobi-item-select ion-select',
        popOverOption: 'ion-popover ion-item:nth-child(index) ion-radio',
        shadowDropdownSelect: 'div.select-text',
        mobiCardTitle: 'div span.title',
        mobiCardContent: 'div.content'
    };

    private static menuNavigation() {
        return ' '.concat('ion-content');
    }

    private static mobiIconButtonWithPopUp() {
        return ' '.concat('div.partners__container div.icons mobi-icon ion-icon');
    }

    static readonly commonClasses = {
        viewOnly: '.view-only',
        partnersCard: '.partners__card'
    };

    private static partnerCard() {
        return ' '.concat('mobi-card.partners__card');
    }

    private static mobiCardTitle() {
        return ' '.concat('div span.title');
    }

    private static mobiCardContent() {
        return ' '.concat('div.content div');
    }

    private static mobiCardContentSecondLine() {
        return this.mobiCardContent().concat(' br');
    }

    private static mobiCardViewOnly() {
        return 'mobi-card.view-only';
    }

    private static mobiCardContainer() {
        return ' '.concat('div.container');
    }

    private static mobiCardContainerViewOnly() {
        return this.mobiCardViewOnly().concat(this.mobiCardContainer());
    }

    private static startScreenPartnerCard() {
        return this.getStartScreen().concat(this.partnerCard());
    }

    private static notificationModalScreenPartnerCard() {
        return this.getNotificationModalScreen().concat(this.partnerCard());
    }

    private static newFreeTextTaskModalScreenPartnerCard() {
        return this.getNewFreeTextTaskScreen().concat(' ', this.mobiCardViewOnly());
    }

    private static scannedDocCard() {
        return this.getDocumentsScreen().concat(' ', this.commonSelectors.mobiCard);
    }

    private static contractCard() {
        return this.getContractScreen().concat(' ', this.commonSelectors.mobiCard);
    }

    private static contractDocumentCard() {
        return this.getContractDetailsScreen().concat(' ', this.commonSelectors.mobiCard);
    }

    private static foreignContractDetailsCard() {
        return this.getForeignContractDetailsScreen().concat(' ', this.commonSelectors.mobiCard);
    }

    private static offerCard() {
        return this.getOffersScreen().concat(' ', this.mobiCardViewOnly());
    }

    static getMobiCard(whatScreen: string, isPartnerCard: boolean) {
        if (isPartnerCard) {
            switch (whatScreen.toLowerCase()) {
                case ScreenName.Start:
                    return this.startScreenPartnerCard();

                case ScreenName.Notification:
                    return this.notificationModalScreenPartnerCard();

                case ScreenName.NewFreeTextTask:
                    return this.newFreeTextTaskModalScreenPartnerCard();
            }
        } else {
            switch (whatScreen.toLowerCase()) {
                case ScreenName.Documents:
                    return this.scannedDocCard();

                case ScreenName.Contracts:
                    return this.contractCard();

                case ScreenName.ContractDetails:
                    return this.contractDocumentCard();

                case ScreenName.ForeignContractDetails:
                    return this.foreignContractDetailsCard();

                case ScreenName.Offers:
                    return this.offerCard();
            }
        }
    }

    static getMobiCardTitle(whatScreen: string, isPartnerCard: boolean) {
        return this.getMobiCard(whatScreen, isPartnerCard).concat(this.mobiCardTitle());
    }

    static getMobiCardContent(whatScreen: string, isPartnerCard: boolean) {
        return this.getMobiCard(whatScreen, isPartnerCard).concat(this.mobiCardContent());
    }

    static getMobiCardContentSecondLine(whatScreen: string, isPartnerCard: boolean) {
        return this.getMobiCard(whatScreen, isPartnerCard).concat(this.mobiCardContentSecondLine());
    }

    static getMobiCardContainer(whatScreen: string, isPartnerCard: boolean) {
        return this.getMobiCard(whatScreen, isPartnerCard).concat(this.mobiCardContainer());
    }

    static getIconWithPopUp(whatScreen: string) {
        switch (whatScreen.toLowerCase()) {
            case ScreenName.Start:
                return this.getStartScreen().concat(this.mobiIconButtonWithPopUp());
            default:
                break;
        }
    }

    static getMenuNavigation(whatScreen: string) {
        switch (whatScreen.toLowerCase()) {
            case ScreenName.Menu:
                return this.getMenuScreen().concat(this.menuNavigation());
            default:
                break;
        }
    }

    static getOverlayIconsHasBackground(whatScreen: string) {
        switch (whatScreen.toLowerCase()) {
            case ScreenName.Contracts:
                return this.getContractScreen().concat(this.overlayIconHasBackground());

            case ScreenName.ForeignContractDetails:
                return this.getForeignContractDetailsScreen().concat(this.overlayIconHasBackground());

            case ScreenName.Documents:
                return this.getDocumentsScreen().concat(this.overlayIconHasBackground());

            case ScreenName.ContractDetails:
                return this.getContractDetailsScreen().concat(this.overlayIconHasBackground());
        }
    }

    static getOverlayArrowReadyForDownloadIcon(whatScreen: string) {
        switch (whatScreen.toLowerCase()) {
            case ScreenName.Contracts:
                return this.getContractScreen().concat(this.overlayArrowReadyForDownloadIcons());

            case ScreenName.ForeignContractDetails:
                return this.getForeignContractDetailsScreen().concat(this.overlayArrowReadyForDownloadIcons());

            case ScreenName.Documents:
                return this.getDocumentsScreen().concat(this.overlayArrowReadyForDownloadIcons());

            case ScreenName.ContractDetails:
                return this.getContractDetailsScreen().concat(this.overlayArrowReadyForDownloadIcons());
        }
    }

    static getOverlayHourGlassIcon(whatScreen: string) {
        switch (whatScreen.toLowerCase()) {
            case ScreenName.Start:
                return this.getStartScreen().concat(this.overlayHourGlassIcon());

            case ScreenName.Menu:
                return this.getMenuScreen().concat(this.overlayHourGlassIcon());

            case ScreenName.Contracts:
                return this.getContractScreen().concat(this.overlayHourGlassIcon());

            case ScreenName.ContractDetails:
                return this.getContractDetailsScreen().concat(this.overlayHourGlassIcon());

            case ScreenName.Documents:
                return this.getDocumentsScreen().concat(this.overlayHourGlassIcon());
        }
    }

    static getOverlaySuccessIcon(whatScreen: string) {
        switch (whatScreen.toLowerCase()) {
            case ScreenName.Start:
                return this.getStartScreen().concat(this.overlaySuccessIcon());

            case ScreenName.Menu:
                return this.getMenuScreen().concat(this.overlaySuccessIcon());

            case ScreenName.Documents:
                return this.getDocumentsScreen().concat(this.overlaySuccessIcon());

            case ScreenName.ForeignContractDetails:
                return this.getForeignContractDetailsScreen().concat(this.overlaySuccessIcon());

            case ScreenName.Contracts:
                return this.getContractScreen().concat(this.overlaySuccessIcon());

            case ScreenName.Offers:
                return this.getOffersScreen().concat(this.overlaySuccessIcon());

            case ScreenName.ContractDetails:
                return this.getContractDetailsScreen().concat(this.overlaySuccessIcon());
        }
    }

    static getOverlayErrorIcon(whatScreen: string) {
        switch (whatScreen.toLowerCase()) {
            case ScreenName.Start:
                return this.getStartScreen().concat(this.overlayErrorIcon());

            case ScreenName.Menu:
                return this.getMenuScreen().concat(this.overlayErrorIcon());

            case ScreenName.Contracts:
                return this.getContractScreen().concat(this.overlayErrorIcon());

            case ScreenName.ContractDetails:
                return this.getContractDetailsScreen().concat(this.overlayErrorIcon());
        }
    }

    static getDropdownSelect(whatScreen: string) {
        switch (whatScreen.toLowerCase()) {
            case ScreenName.Settings:
                return this.getSettingsScreen().concat(' ', this.commonSelectors.dropdownSelect);
        }
    }

    static getPopoverOption(position: number) {
        return this.commonSelectors.popOverOption.replace('index', position.toString());
    }

    static getInputs() {
        return 'mobi-item-input input.native-input';
    }

    static getTextArea() {
        return 'div.input__content ion-textarea textarea';
    }

    static getExpandCollapseSection() {
        return 'div #aspect-content div.aspect-tab label';
    }

    static getSubmitButton() {
        return 'div.button-content button';
    }

    static getItemContent() {
        return ' div.item__content.item__content--readonly';
    }

    static getItemLabel() {
        return ' mobi-item-text ion-label';
    }
}
