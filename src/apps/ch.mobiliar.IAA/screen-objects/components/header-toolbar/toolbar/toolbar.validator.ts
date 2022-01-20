import {Toolbar} from "@apps/iaa/screen-objects/components/header-toolbar/toolbar/toolbar.action";

export class ToolbarValidator {
    constructor(private screen: Toolbar) {
    }

    expectTitle(title: string) {
        const actualHeaderTitle = this.screen.headerTitle.getHeaderTitle()
        expect(actualHeaderTitle).toEqual(title)

        return this;
    }

    expectErrorDisplayOnHeader(errorDisplay: boolean) {
        const actual = this.screen.notification.isErrorDisplayed()
        expect(actual).toEqual(errorDisplay);

        return this;
    }

    expectSpinnerDisplayOnHeader(spinnerDisplay: boolean) {
        const actual = this.screen.notification.isSpinnerDisplayed();
        expect(actual).toEqual(spinnerDisplay);

        return this;
    }
}
