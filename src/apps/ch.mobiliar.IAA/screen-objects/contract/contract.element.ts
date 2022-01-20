import {BaseSelector} from '@shared/selectors/base-selector.selector';
import {ScreenName} from '@shared/helpers/testdata';
import {MobiCard} from "@apps/iaa/screen-objects/components/mobi-card/mobi-card.action";
import {SuccessIcon} from "@apps/iaa/screen-objects/components/success-icon/success.icon";
import {ArrowDownLoadIcon} from "@apps/iaa/screen-objects/components/not-yet-dowload-arrow/arrow-down-load.icon";

export class ContractElement {
    private readonly contractSelectors = {
        subHeaders: 'div.sub-header',
        contractTitle: 'div.child-page-content mobi-card span.title',
        contractContents: BaseSelector.getMobiCardContent(ScreenName.Contracts, false),
        scanForeignContractButton: 'ion-content div mobi-area mobi-icon',
        unableToLoadForeignContract: 'mobi-hint.warning-box',
    };
    protected _mobiCardElement: MobiCard;
    protected _successIconElement: SuccessIcon
    protected arrowIconElement: ArrowDownLoadIcon;

    constructor(protected screenName: string) {
        this._mobiCardElement = new MobiCard(this.screenName);
        this._successIconElement = new SuccessIcon(this.screenName);
        this.arrowIconElement = new ArrowDownLoadIcon(this.screenName);
    }

    get mobiCardElement() {
        return this._mobiCardElement;
    }

    get successIconElement() {
        return this._successIconElement;
    }

    get subHeaders() {
        return $$(this.contractSelectors.subHeaders);
    }

    get successfulDownloadedIcons() {
        const successIconSelector = this.successIconElement.successIconSelector;

        return this.successIconElement.getComponentIcons(successIconSelector);
    }

    get arrowOverlayIcon() {
        const arrowSelector = this.arrowIconElement.arrowIcon;

        return this.arrowIconElement.getComponentIcons(arrowSelector);
    }

    get contractTitle() {
        return $$(this.contractSelectors.contractTitle);
    }

    get contractContents() {
        return $$(this.contractSelectors.contractContents);
    }

    get scanForeignContractButton() {
        return $$(this.contractSelectors.scanForeignContractButton);
    }

    get unableToLoadForeignContract() {
        return $(this.contractSelectors.unableToLoadForeignContract);
    }

}
