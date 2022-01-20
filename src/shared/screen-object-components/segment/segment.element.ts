import {BaseSelector} from '../../selectors/base-selector.selector';

export class SegmentElement {
    private static getSegmentSelector() {
        return 'ion-segment';
    }

    private static getSegmentButtonSelector() {
        return 'ion-segment-button';
    }

    static getSegment(segmentOfWhatScreen: string) {
        const segmentSelector = this.getSegmentSelector();
        const startSegmentSelector = BaseSelector.getStartScreen().concat(' ', segmentSelector);
        const searchPartnerSegmentSelector = BaseSelector.getSearchPartnerScreen().concat(' ', segmentSelector);
        const claimSegmentSelector = BaseSelector.getClaimsScreen().concat(' ', segmentSelector);

        switch (segmentOfWhatScreen.toLowerCase()) {
            case 'start':
                return $(startSegmentSelector);

            case 'search':
                return $(searchPartnerSegmentSelector);

            case 'claim':
                return $(claimSegmentSelector);

            default:
                break;
        }
    }

    static getSegmentButtons(segmentOfWhatScreen: string) {
        const segmentState: boolean = this.getSegment(segmentOfWhatScreen).isExisting();

        if (!segmentState) {
            return;
        } else {
            const segmentSelector = this.getSegmentSelector();
            const segmentButtonSelector = this.getSegmentButtonSelector();

            const startScreenSegmentButtonSelector = BaseSelector.getStartScreen().concat(
                ' ',
                segmentSelector,
                ' ',
                segmentButtonSelector
            );
            const searchSegmentButtonSelector = BaseSelector.getSearchPartnerScreen().concat(
                ' ',
                segmentSelector,
                ' ',
                segmentButtonSelector
            );
            const claimSegmentButtonSelector = BaseSelector.getClaimsScreen().concat(
                ' ',
                segmentSelector,
                ' ',
                segmentButtonSelector
            );

            switch (segmentOfWhatScreen.toLowerCase()) {
                case 'start':
                    return $$(startScreenSegmentButtonSelector);

                case 'search':
                    return $$(searchSegmentButtonSelector);

                case 'claim':
                    return $$(claimSegmentButtonSelector);

                default:
                    break;
            }
        }
    }
}
