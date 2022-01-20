export class CameraElement {
    private readonly selectors = {
        photoCapture: '~PhotoCapture',
        frontBackCameraChooser: 'FrontBackFacingCameraChooser',
        zoom: '~Zoom',
        flashButton: '~FlashButton',
        usePhotoButton: '~Use Photo',
        retakePhotoButton: `~Retake`
    }

    get photoCaptureButton() {
        return $(this.selectors.photoCapture);
    }

    get usePhotoButton() {
        return $(this.selectors.usePhotoButton);
    }

    get frontCameraButton() {
        return $(this.selectors.frontBackCameraChooser);
    }

    get retakePhotoButton() {
        return $(this.selectors.retakePhotoButton);
    }
}
