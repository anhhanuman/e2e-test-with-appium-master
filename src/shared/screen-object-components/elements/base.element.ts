import {BaseSelector} from '@shared/selectors/base-selector.selector';

export class BaseElement {
    static get input() {
        const inputSelector: string = BaseSelector.getInputs();

        return $$(inputSelector);
    }

    static get textArea() {
        const autoCompleteSelector: string = BaseSelector.getTextArea();

        return $$(autoCompleteSelector);
    }

    static get expandCollapse() {
        return $(BaseSelector.getExpandCollapseSection());
    }

    static get submitButton() {
        return $(BaseSelector.getSubmitButton());
    }

    static get toggleButton() {
        const toggle: string = 'div.toggle ion-toggle';

        return $(toggle);
    }

    static get toggleStatus() {
        const toggle: string = 'div.toggle div.toggle-selection-status span';

        return $(toggle);
    }

    /* overlay elements */

    static getSuccessfulDownloadedIcons(whatScreen: string) {
        return $$(BaseSelector.getOverlaySuccessIcon(whatScreen));
    }

    static arrowReadyForDownloadIcon(whatScreen: string) {
        return $$(BaseSelector.getOverlayArrowReadyForDownloadIcon(whatScreen));
    }

    static overlayIconsHasBackground(whatScreen: string) {
        return $$(BaseSelector.getOverlayIconsHasBackground(whatScreen));
    }

    static overlayHourGlassIcon(whatScreen: string) {
        return $$(BaseSelector.getOverlayHourGlassIcon(whatScreen));
    }

    static overlayErrorIcons(whatScreen: string) {
        return $$(BaseSelector.getOverlayErrorIcon(whatScreen));
    }

    /* mobi-card elements*/

    static getMobiCard(whatScreen: string, isPartnerCard: boolean) {
        return $$(BaseSelector.getMobiCard(whatScreen, isPartnerCard));
    }

    static getMobiCardTitle(whatScreen: string, isPartnerCard: boolean) {
        return $$(BaseSelector.getMobiCardTitle(whatScreen, isPartnerCard));
    }

    static getMobiCardContent(whatScreen: string, isPartnerCard: boolean) {
        return $$(BaseSelector.getMobiCardContent(whatScreen, isPartnerCard));
    }

    static getCardContentSecondLine(whatScreen: string, isPartnerCard: boolean) {
        return $$(BaseSelector.getMobiCardContentSecondLine(whatScreen, isPartnerCard));
    }
}

export class BaseNativeElement {
    static get pickerWheel() {
        const pickerWheelSelector: string = '//XCUIElementTypePicker/XCUIElementTypePickerWheel';

        return $(pickerWheelSelector);
    }

    static get cancelOnActionSheet() {
        const cancelSelector: string = '~Cancel';

        return $(cancelSelector);
    }
}
