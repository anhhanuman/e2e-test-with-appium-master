import {Icon} from "@apps/iaa/screen-objects/base/icon.action";

export class ErrorIcon extends Icon {
    private _errorSelector = ' mobi-overlay-icon div.overlay-icon.overlay-icon--is-error'

    constructor(protected screenName: string) {
        super(screenName)
    }

    get errorSelector() {
        return this._errorSelector
    }
}
