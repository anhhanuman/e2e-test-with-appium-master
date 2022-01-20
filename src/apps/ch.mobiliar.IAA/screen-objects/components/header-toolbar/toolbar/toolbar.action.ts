import {ButtonName} from "@shared/helpers/testdata";
import {ActionMenu} from "@apps/iaa/screen-objects/components/header-toolbar/action-menu/action-menu.action";
import {BaseToolbar} from "@apps/iaa/screen-objects/components/header-toolbar/base-toolbar/base-toolbar.action";
import {Title} from "@apps/iaa/screen-objects/components/header-toolbar/title/title.action";
import {ToolbarValidator} from "@apps/iaa/screen-objects/components/header-toolbar/toolbar/toolbar.validator";
import {Notification} from "@apps/iaa/screen-objects/components/header-toolbar/notification/notification.action";

export class Toolbar {
    private _headerTitle: Title;
    private readonly _baseToolbar: BaseToolbar

    constructor(private screenName: string) {
        this._baseToolbar = new BaseToolbar(this.screenName);
    }

    get baseToolbar(): BaseToolbar {
        return this._baseToolbar;
    }

    get notification(): Notification {
        return new Notification(this.screenName);
    }

    get headerTitle(): Title {
        this._headerTitle = new Title(this.screenName);
        return this._headerTitle
    }

    tapHomeButton(waitForNotDisplay: boolean) {
        if (waitForNotDisplay) {
            this._baseToolbar.tapToToolbarButton(ButtonName.Home);
        } else {
            this._baseToolbar.headerButtonOne.click();
            browser.pause(500);//must have
        }
    }

    tapBackButton(waitForNotDisplay: boolean) {
        if (waitForNotDisplay) {
            this._baseToolbar.tapToToolbarButton(ButtonName.Back)
        } else {
            this._baseToolbar.headerButtonOne.click();
        }

        return this;
    }

    get actionMenu(): ActionMenu {
        return new ActionMenu(this.screenName);
    }


    verify() {
        return new ToolbarValidator(this);
    }

}
