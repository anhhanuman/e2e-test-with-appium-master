import {StartElement} from './start.element';
import {Screen} from '@shared/helpers/screen';
import {Contexts} from '@shared/helpers';
import {StartValidators} from './start.validators';
import {AlertDialog} from '@shared/screen-object-components';
import {LoadingContent} from '@shared/screen-object-components/loading-content/loading.content';
import {ScreenName, SegmentName} from "@shared/helpers/testdata";
import {BaseScreen} from "@apps/iaa/screen-objects/base/base-screen.action";

export class StartScreen extends BaseScreen {
    private readonly element: StartElement

    constructor() {
        super(ScreenName.Start);
        this.element = new StartElement(ScreenName.Start);
    }

    tapToPartnerName(partnerName: string, segmentName: string) {
        if (segmentName === SegmentName.Favorites) {
            this.displayFavoritePartner();
        } else {
            this.tapRecentSegment();
        }
        this.element.cardElement.tapMobiCard(partnerName);
    }

    tapToPartnerAt(position: number) {
        this.element.cardElement.tapMobiCardAt(position);

        return this;
    }

    tapToFirstPartner() {
        this.element.cardElement.tapMobiCardAt(1);
        return this;
    }

    waitForPartnerCardDisplay(position: number) {
        this.element.cardElement.waitForCardElementDisplay(position)
    }

    getRecentPartnerNames() {
        const segmentExisting = this.isSegmentExisting();
        if (!segmentExisting) {
            return [];
        } else {
            this.tapRecentSegment();
            const recentPartnerNameElements = this.element.partnerNames

            return Screen.getTextOfElements(recentPartnerNameElements);
        }
    }

    getFavoritePartnerNames() {
        this.displayFavoritePartner();
        const partnerNames = this.element.partnerNames

        return Screen.getTextOfElements(partnerNames);
    }

    getPartnerNameAtIndex(index: number) {
        return this.element.cardElement.getCardTitleAtIndex(index);
    }

    getPartnerContentAtIndex(index: number) {
        return this.element.cardElement.getCardContentAtIndex(index);
    }

    tapSearchButton() {
        const searchPartnerButton: WebdriverIO.Element = this.element.searchPartnerButton;
        Screen.tapToElement(searchPartnerButton);

        return this;
    }

    verify() {
        return new StartValidators(this);
    }

    isSegmentExisting() {
        return this.element.segment.isSegmentExisting();
    }

    tapRecentSegment() {
        const isFavoriteSegmentFocused: boolean = this.element.segment.isSegmentFocused(SegmentName.Favorites);

        if (isFavoriteSegmentFocused) {
            const recentSegmentButton = this.element.segment.segmentButtonElements[1]
            this.element.segment.tapComponent(recentSegmentButton);
        }

        return this;
    }

    tapFavoritesSegment() {
        const favoriteSegmentButton = this.element.segment.segmentButtonElements[0]
        this.element.segment.tapComponent(favoriteSegmentButton);

        return this;
    }

    displayFavoritePartner() {
        if (this.element.segment.isSegmentDisplayed(SegmentName.Favorites)) {
            return this;
        } else {
            this.tapFavoritesSegment()

            return this;
        }
    }

    private tapPartnerHeaderButton() {
        this.element.partnerHeaderButton.click();
        return this;
    }

    tapSynchronizeAllPartners() {
        Contexts.doTasksInNativeContext(() => {
            Screen.tapAndWaitForNotDisplay(this.element.syncAllPartnerActionSheetOpt);
        });
        return this;
    }

    syncAllPartners() {
        this.tapRecentSegment().tapPartnerHeaderButton().tapSynchronizeAllPartners();


        return this;
    }

    getNonFavoritePartnerElementsInRecentList() {
        const favoritePartnerNames = this.getFavoritePartnerNames();
        const recentPartnerNames = this.getRecentPartnerNames();
        const recentPartnerElements = this.element.partnerCards;

        return Screen.getTheDifferenceElementsOfTheSecondSetOfElementsAfterCompared(
            favoritePartnerNames,
            recentPartnerNames,
            recentPartnerElements
        );
    }

    getTotalRecentPartners(): number {
        const segmentExisting: boolean = this.element.segment.isSegmentExisting();
        if (segmentExisting) {
            this.tapRecentSegment();
            return this.getTotalPartnerCards();
        } else {
            return 0;
        }
    }

    removeAllRecentPartners() {
        const segmentState: boolean = this.element.segment.isSegmentExisting()

        if (segmentState === true) {
            this.tapRecentSegment()
                .tapEllipsisButtonAndConfirmAndRepeat();

            return this;
        } else {
            return this;
        }
    }

    getTotalPartnerCards(): number {
        return this.element.partnerCards.length;
    }

    getInfoMessageNoFavoritePartner(): string {
        const mobiHintContainer: WebdriverIO.Element = this.element.mobiHintInfo;

        return mobiHintContainer.getText();
    }

    removeAllFavoritePartners() {
        this.displayFavoritePartner()
            .tapStarButtonAndConfirmAndRepeat();

        return this;
    }

    private tapStarButtonAndConfirmAndRepeat() {
        const startButtonElements = this.element.topRightCardIcons;
        if (startButtonElements.length > 0) {
            for (const element of startButtonElements) {
                this.element.starOrEllipsis.tapComponent(element);
                this.tapUnmarkOnAlertDialog();
                LoadingContent.waitForLoadingContentDismiss();
            }

            return this;
        } else {
            return this;
        }
    }

    private tapEllipsisButtonAndConfirmAndRepeat() {
        const ellipsisButtonElements = this.element.topRightCardIcons;

        for (const element of ellipsisButtonElements) {
            Screen.tapToElement(element);
            Contexts.doTasksInNativeContext(() => {
                const removeButton: WebdriverIO.Element = this.element.removePartnerButtonActionSheet;
                Screen.tapAndWaitForNotDisplay(removeButton);
            });
        }

        return this;
    }

    tapUnmarkOnAlertDialog() {
        AlertDialog.tapAlertDialogButtonSecond();

        return this;
    }
}
