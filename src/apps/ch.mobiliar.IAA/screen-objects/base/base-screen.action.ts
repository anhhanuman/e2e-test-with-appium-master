import {Toolbar} from "@apps/iaa/screen-objects/components/header-toolbar/toolbar/toolbar.action";
import {BaseScreenInterface} from "@apps/iaa/screen-objects/base/base-screen-interface";
import {ErrorIcon} from "@apps/iaa/screen-objects/components/error-icon/error-icon.action";
import {HourGlassIcon} from "@apps/iaa/screen-objects/components/hour-glass/hour-glass.icon";

export class BaseScreen implements BaseScreenInterface {
    _headerToolbar: Toolbar;
    _errorIcon: ErrorIcon;
    _hourglassIcon: HourGlassIcon

    constructor(protected screenName: string) {
        this._headerToolbar = new Toolbar(this.screenName);
    }

    get toolbar() {
        return this._headerToolbar;
    }

    waitForDisplay() {
        this.toolbar.baseToolbar.headerButtonOne.waitForDisplayed(1000)
    }

    get errorIcon() {
        this._errorIcon = new ErrorIcon(this.screenName);
        return this._errorIcon
    }

    get hourGlassIcon() {
        this._hourglassIcon = new HourGlassIcon(this.screenName);
        return this._hourglassIcon
    }

}
