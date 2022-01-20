import {BaseSelector} from '@shared/selectors/base-selector.selector';
import {ScreenName} from '@shared/helpers/testdata';
import {MobiCard} from "@apps/iaa/screen-objects/components/mobi-card/mobi-card.action";
import {TopRightIcon} from "@apps/iaa/screen-objects/components/top-right-icon/top-right-icon";
import {Segment} from "@apps/iaa/screen-objects/components/segment/segment";

export class StartElement {

    private readonly selectors = {
        partnerInfo: BaseSelector.getMobiCardContainer(ScreenName.Start, true),
        searchPartnerButton: 'app-overview div.search-area mobi-area',
        markedPartnerLabel: '',
        partnerHeaderButton: 'div.partners__title mobi-icon',
        syncAllButton: '~Synchronize all these partners',
        functionIcons: 'div.icons mobi-icon',
        partnerListTitle: 'div.partners__header div.partners__title span',
        removePartner: '~Remove this partner from the device',
        mobiHint: 'mobi-hint.partners__container--is-empty',
    };

    private readonly _cardElement: MobiCard;
    private readonly _starOrEllipsis: TopRightIcon;
    private readonly _segment: Segment

    constructor(private screenName: string) {
        this._cardElement = new MobiCard(this.screenName);
        this._starOrEllipsis = new TopRightIcon(this.screenName);
        this._segment = new Segment(this.screenName);
    }

    get cardElement() {
        return this._cardElement
    }

    get starOrEllipsis(): TopRightIcon {
        return this._starOrEllipsis;
    }

    get segment(): Segment {
        return this._segment
    }

    get mobiHintInfo() {
        return $(this.selectors.mobiHint);
    }

    get removePartnerButtonActionSheet() {
        return $(this.selectors.removePartner);
    }

    get partnerCards() {
        const cardSelector = this.cardElement.cardSelector;
        return this.cardElement.getComponentElements(cardSelector);
    }

    get partnerNames() {
        const cardTitleSelector = this.cardElement.cardTitleSelector;
        return this.cardElement.getCardTitleElements(cardTitleSelector)
    }

    getPartnerInfo() {
        return $$(this.selectors.partnerInfo);
    }

    get topRightCardIcons() {
        const starOrEllipsisSelector = this.starOrEllipsis.starOrEllipsisSelector;

        return this.starOrEllipsis.getComponentIcons(starOrEllipsisSelector);
    }

    get searchPartnerButton() {
        return $(this.selectors.searchPartnerButton);
    }

    get markedPartnerLabel() {
        return $(this.selectors.markedPartnerLabel);
    }

    get partnerHeaderButton() {
        return $(this.selectors.partnerHeaderButton);
    }

    get syncAllPartnerActionSheetOpt() {
        return $(this.selectors.syncAllButton);
    }

}
