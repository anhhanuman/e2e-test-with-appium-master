import {Screen} from "@shared/helpers/screen";

export class ImagePreview {
    private static readonly selectors = {
        close: '~Close'
    }

    private static get closeButton() {
        return $(this.selectors.close);
    }

    static tapCloseButton() {
        Screen.tapAndWaitForNotDisplay(this.closeButton);

        return this;
    }
}
