export class GalleryElement {
    private readonly selectors = {
        cameraRoll: '~Camera Roll',
        photoInCameraRoll: '//XCUIElementTypeCell[1]/XCUIElementTypeImage',
        doneInCameraRoll: '~Done',

    }

    get cameraRoll() {
        return $(this.selectors.cameraRoll);
    }

    getPhotoInCameraRoll(positionInGrid: number) {
        return $(this.selectors.photoInCameraRoll.replace('1', positionInGrid.toString()));
    }

    get doneInCameraRoll() {
        return $(this.selectors.doneInCameraRoll);
    }


}
