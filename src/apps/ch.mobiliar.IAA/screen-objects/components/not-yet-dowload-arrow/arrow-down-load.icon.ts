import {Icon} from "@apps/iaa/screen-objects/base/icon.action";

export class ArrowDownLoadIcon extends Icon {
    private _arrowIcon = ' div.overlay-icon.overlay-icon--is-download-ready'

    constructor(protected screenName: string) {
        super(screenName)
    }

    get arrowIcon(): string {
        return this._arrowIcon;
    }

}
