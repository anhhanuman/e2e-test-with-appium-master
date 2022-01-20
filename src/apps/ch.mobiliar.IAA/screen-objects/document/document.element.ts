import {BaseSelector} from '@shared/selectors/base-selector.selector';
import {MobiCard} from "@apps/iaa/screen-objects/components/mobi-card/mobi-card.action";
import {SuccessIcon} from "@apps/iaa/screen-objects/components/success-icon/success.icon";
import {ArrowDownLoadIcon} from "@apps/iaa/screen-objects/components/not-yet-dowload-arrow/arrow-down-load.icon";

export class DocumentElement {
    private readonly selectors = {
        scanDocButton: 'app-document ion-content div mobi-area mobi-icon',
        scannedDocumentCard: BaseSelector.getMobiCard('documents', false),
        greenIcon: BaseSelector.getOverlaySuccessIcon('documents')
    };
    private _mobiCardElement: MobiCard;
    private _successIconElement: SuccessIcon
    private arrowIconElement: ArrowDownLoadIcon;

    constructor(protected screenName: string) {
        this._mobiCardElement = new MobiCard(this.screenName);
        this.arrowIconElement = new ArrowDownLoadIcon(this.screenName);
    }


    get cardDocuments() {
        return this._mobiCardElement.getComponentElements(this._mobiCardElement.cardSelector)
    }

    get successfulDownloadedIcons() {
        this._successIconElement = new SuccessIcon(this.screenName);
        const successIconSelector = this._successIconElement.successIconSelector;

        return this._successIconElement.getComponentIcons(successIconSelector)
    }

    get scanDocButton() {
        return $(this.selectors.scanDocButton);
    }
}
