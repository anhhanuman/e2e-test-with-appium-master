import {Icon} from "@apps/iaa/screen-objects/base/icon.action";

export class TopRightIcon extends Icon {

    private _starOrEllipsisSelector = ' mobi-icon.top-right-icon ion-icon';

    constructor(protected screenName: string) {
        super(screenName)
    }

    get starOrEllipsisSelector(): string {
        return this._starOrEllipsisSelector;
    }
}
