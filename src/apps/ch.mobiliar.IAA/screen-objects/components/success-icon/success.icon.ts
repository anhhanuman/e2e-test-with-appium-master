import {Icon} from "@apps/iaa/screen-objects/base/icon.action";

export class SuccessIcon extends Icon {
    private _successIconSelector = ' div.overlay-icon.overlay-icon--is-success';

    constructor(protected screenName: string) {
        super(screenName)
    }

    get successIconSelector() {
        return this._successIconSelector;
    }
}
