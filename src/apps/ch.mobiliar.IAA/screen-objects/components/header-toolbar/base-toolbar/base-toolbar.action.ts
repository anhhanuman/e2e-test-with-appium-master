import {ButtonName} from "@shared/helpers/testdata";
import {Screen} from "@shared/helpers/screen";
import {ToolbarElement} from "@apps/iaa/screen-objects/components/header-toolbar/toolbar/toolbar.element";

export class BaseToolbar {
    private element: ToolbarElement;
    private _headerButtonOne: WebdriverIO.Element
    private _headerButtonTwo: WebdriverIO.Element
    private _headerButtonThree: WebdriverIO.Element

    constructor(private screenName: string) {
        this.element = new ToolbarElement(this.screenName);
    }

    get headerButtonOne(): WebdriverIO.Element {
        this._headerButtonOne = this.element.headerButtons[0];
        return this._headerButtonOne;
    }

    get headerButtonTwo(): WebdriverIO.Element {
        this._headerButtonTwo = this.element.headerButtons[1];
        return this._headerButtonTwo;
    }

    get headerButtonThree(): WebdriverIO.Element {
        this._headerButtonThree = this.element.headerButtons[2];
        return this._headerButtonThree;
    }

    tapToToolbarButton(buttonName: string) {
        switch (buttonName.toLowerCase()) {
            case ButtonName.Setting:
                Screen.tapAndWaitForNotDisplay(this.headerButtonOne);
                break;

            case ButtonName.Home:
                Screen.tapAndWaitForNotDisplay(this.headerButtonOne);
                break;

            case ButtonName.ActionMenu:
                this._headerButtonThree.click();
                break;

            case ButtonName.Notification:
                this._headerButtonTwo.click();
                break;

            case ButtonName.Back:
                Screen.tapAndWaitForNotExist(this.headerButtonOne);
                break;

            case ButtonName.Done:
                Screen.tapWhenDisplay(this.headerButtonOne);
                break;

            case ButtonName.Close:
                Screen.tapWhenDisplay(this.headerButtonOne);
                break;

            default:
                break;
        }

        return this;
    }
}
