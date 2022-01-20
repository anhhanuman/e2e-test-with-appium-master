import {Icon} from "@apps/iaa/screen-objects/base/icon.action";
import {SegmentName} from "@shared/helpers/testdata";

export class Segment extends Icon {

    private readonly _segmentButtonSelector = ' ion-segment-button';
    private readonly _segmentSelector = ' ion-segment';

    constructor(protected screenName: string) {
        super(screenName)
    }

    get segmentElement() {
        return this.baseComponent.getComponentElement(this._segmentSelector);
    }

    get segmentButtonElements(): WebdriverIO.Element[] {
        return this.getComponentIcons(this._segmentButtonSelector)
    }

    private getSegmentClassAttribute(segmentName: string) {
        if (!this.isSegmentExisting()) {
            return 'undefined';
        } else {
            const elements = this.segmentButtonElements;
            switch (segmentName) {
                case SegmentName.Favorites:
                    return elements[0].getAttribute('class');
                case SegmentName.Recent:
                    return elements[1].getAttribute('class');
            }
        }
    }

    isSegmentFocused(segmentName: string): boolean {
        const segmentAttribute: string = this.getSegmentClassAttribute(segmentName);

        if (segmentAttribute === 'undefined') {
            return undefined;
        } else {
            return segmentAttribute.includes('segment-button-checked');
        }
    }

    isSegmentDisplayed(segmentName: string): boolean {
        const segmentFocused: boolean = this.isSegmentFocused(segmentName);
        switch (segmentName) {
            case SegmentName.Favorites:
                if (segmentFocused === undefined) {
                    return true;
                } else {
                    return segmentFocused
                }
        }
    }

    isSegmentExisting(): boolean {
        return this.segmentElement.isExisting();
    }
}
