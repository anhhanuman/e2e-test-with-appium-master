import {BaseSelector} from '@shared/selectors/base-selector.selector';
import {ScreenSelector} from "@shared/helpers/testdata";

export class PartnerDetailsElement {
    private readonly selectors = {
        mobiItemText: 'mobi-item-text',
        mobiItemCardTitle: 'mobi-item-card:nth-of-type(index) div span.title',
        mobiItemCardContent: 'mobi-item-card:nth-of-type(index) div.content div',
        ellipsisIcons: 'mobi-item-card div.icons mobi-icon ion-icon',
        mbaCommunicationLabel: '~MBA <<Basel>> Actions',
        mbaCommunicationPhone: '~Call:061 266 62 70',
        mbaCommunicationEmail: '~Email:anonym3@mobi.ch',
        phoneWhenClick: '(//XCUIElementTypeStaticText[@name="Call ‭+41 61 266 62 70‬"])[2]',
        partnerNumber: ScreenSelector.basicDataScreen.concat(' div.personal span')
    };

    get partnerNumber() {
        const numberAndDOB = $$(this.selectors.partnerNumber);
        if (numberAndDOB.length === 2) {
            return numberAndDOB[1];
        } else {
            return numberAndDOB[0];
        }
    }

    getMobiItemTextContents() {
        return $$(BaseSelector.getBasicDataScreen().concat(BaseSelector.getItemContent()));
    }

    getMobiItemTextLabels() {
        return $$(BaseSelector.getBasicDataScreen().concat(BaseSelector.getItemLabel()));
    }

    get mobiItemTextLabelAndContent() {
        const labels = $$(this.selectors.mobiItemText.concat(' ion-label'));
        const contents = $$(this.selectors.mobiItemText.concat(BaseSelector.getItemContent()));
        let labelsAndContents;
        labelsAndContents = labels.concat(contents);

        return labelsAndContents;
    }

    getMobiItemCardTitleAndContent(index: number) {
        let titleElement = $(this.selectors.mobiItemCardTitle.replace('index', index.toString()));
        let contentElement = $(this.selectors.mobiItemCardContent.replace('index', index.toString()));
        let titleAndContent = [];
        titleAndContent.push(titleElement, contentElement);

        return titleAndContent;
    }

    getMobiItemCardContent(index: number) {
        return $(this.selectors.mobiItemCardContent.replace('index', index.toString()));
    }

    get ellipsisIcons() {
        return $$(this.selectors.ellipsisIcons);
    }

    get mbaCommunicationLabel() {
        return $(this.selectors.mbaCommunicationLabel);
    }

    get mbaCommunicationPhone() {
        return $(this.selectors.mbaCommunicationPhone);
    }

    get mbaCommunicationEmail() {
        return $(this.selectors.mbaCommunicationEmail);
    }

    get phoneWhenClick() {
        return $(this.selectors.phoneWhenClick);
    }
}
