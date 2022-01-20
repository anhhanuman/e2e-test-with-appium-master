import {ScreenName} from '@shared/helpers/testdata';
import {ContractElement} from "@apps/iaa/screen-objects/contract/contract.element";
import {MobiCard} from "@apps/iaa/screen-objects/components/mobi-card/mobi-card.action";
import {SuccessIcon} from "@apps/iaa/screen-objects/components/success-icon/success.icon";

export class ContractDetailElement extends ContractElement {
    constructor() {
        super(ScreenName.ContractDetails);
        this._mobiCardElement = new MobiCard(ScreenName.ContractDetails);
        this._successIconElement = new SuccessIcon(ScreenName.ContractDetails);
    }


    get documentElements() {
        const cardSelector = this.mobiCardElement.cardSelector;

        return this.mobiCardElement.getComponentElements(cardSelector)
    }
}
