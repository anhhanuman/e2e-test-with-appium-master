export class ActionSheetElement {
    private readonly selectors = {
        optImages: '~Images',
        optCamera: '~Camera',
        optSelectImages: '~Select image',
    }

    get optImages() {
        return $(this.selectors.optImages);
    }

    get optSelectImages() {
        return $(this.selectors.optSelectImages);
    }

    get optCamera() {
        return $(this.selectors.optCamera);
    }
}
