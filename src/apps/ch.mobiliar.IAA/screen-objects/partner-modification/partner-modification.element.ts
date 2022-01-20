import {BaseSelector} from '@shared/selectors/base-selector.selector';
import {BaseElement} from '@shared/screen-object-components/elements/base.element';

export class PartnerModificationElement {
    private readonly mainCommunicationSelector = {
        communicationCards: BaseSelector.getPartnerModification().concat(' communication ', BaseSelector.commonSelectors.mobiCard),
        communicationCard: BaseSelector.getPartnerModification().concat(' communication:nth-of-type(index) ', BaseSelector.commonSelectors.mobiCard),
        mobiCardTitle: BaseSelector.getPartnerModification().concat(' communication:nth-of-type(index) ').concat(BaseSelector.getInfoTitle()),
        mobiCardContent: BaseSelector.getPartnerModification()
            .concat(' communication:nth-of-type(index) ')
            .concat(BaseSelector.getInfoContent()),
        mobiCardTitles: BaseSelector.getPartnerModification()
            .concat(' communication ')
            .concat(BaseSelector.getInfoTitle()),
        mobiCardContents: BaseSelector.getPartnerModification()
            .concat(' communication ')
            .concat(BaseSelector.getInfoContent())
    };

    private readonly editMainCommunicationSelector = {
        backButton: BaseSelector.getCommunicationDetails().concat(' ', BaseSelector.getMobiButton(), ' div'),
        undoButton: BaseSelector.getCommunicationDetails().concat(' ', BaseSelector.getIonButton())
    };

    get communicationCards() {
        return $$(this.mainCommunicationSelector.communicationCards);
    }

    getCommunicationCard(position: number) {
        return $(this.mainCommunicationSelector.communicationCard.replace('index', position.toString()));
    }

    getCommunicationCardTitle(communicationCardPosition: number) {
        return $(this.mainCommunicationSelector.mobiCardTitle.replace('index', communicationCardPosition.toString()));
    }

    get communicationCardTitles() {
        return $$(this.mainCommunicationSelector.mobiCardTitles);
    }

    get communicationCardContents() {
        return $$(this.mainCommunicationSelector.mobiCardContents);
    }

    getCommunicationCardContent(mobiCardPosition: number) {
        return $(this.mainCommunicationSelector.mobiCardContent.replace('index', mobiCardPosition.toString()));
    }

    get backButton() {
        return $(this.editMainCommunicationSelector.backButton);
    }

    getUndoButton() {
        return $(this.editMainCommunicationSelector.undoButton);
    }

    get inputFields() {
        return BaseElement.input;
    }

    get communicationInput() {
        return BaseElement.input[0];
    }
}
