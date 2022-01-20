export class AttachmentSelectors {
    private readonly selectors = {
        claimAttachmentsScreenIdentity: '',
        backButton: '',
        addButton: '',
        registerButton: '',
        documentItems: '',
        iPhoneUploadingDialog: '',
        iPadUploadingDialog: '',
        cameraButton: '~Camera',
        picturesButton: '~Pictures',
        videoButton: '~Video',
        audioButton: '~Audio',
        fileButton: '~File',
        photoCaptureButton: '~PhotoCapture',
        usePhotoButton: '~Use Photo',
        retakePhotoButton: '~Retake',
        cameraRollButton: '~Camera Roll',
        selectPhotoDoneButton: '~Done',
        photoItemButton: `//XCUIElementTypeApplication[@name="Claim"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeCollectionView/XCUIElementTypeCell`,
        videoCaptureButton: '~VideoCapture',
        useVideoButton: '~Use Video',
        retakeVideoButton: '~Retake',
        toggleAudioRecordingButton: '~toggle audio recording',
        doneAudioButton: '~Done',
        fileBrowseButton: '~Browse',
        browseOnDropboxButton: '~Dropbox — Personal',
        samplePdfButton: '~sample, pdf',
        samplePdf2Button: '~sample2, pdf'
    };

    get claimAttachmentsScreenIdentity() {
        return $(this.selectors.claimAttachmentsScreenIdentity);
    }

    get backButton() {
        return $(this.selectors.backButton);
    }

    get addButton() {
        return $(this.selectors.addButton);
    }

    get registerButton() {
        return $(this.selectors.registerButton);
    }

    get iPhoneUploadingDialog() {
        return $(this.selectors.iPhoneUploadingDialog);
    }

    get iPadUploadingDialog() {
        return $(this.selectors.iPadUploadingDialog);
    }

    get documentItems() {
        return $$(this.selectors.documentItems);
    }

    get cameraButton() {
        return $(this.selectors.cameraButton);
    }

    get picturesButton() {
        return $(this.selectors.picturesButton);
    }

    get videoButton() {
        return $(this.selectors.videoButton);
    }

    get audioButton() {
        return $(this.selectors.audioButton);
    }

    get fileButton() {
        return $(this.selectors.fileButton);
    }

    get photoCaptureButton() {
        return $(this.selectors.photoCaptureButton);
    }

    get usePhotoButton() {
        return $(this.selectors.usePhotoButton);
    }

    get retakePhotoButton() {
        return $(this.selectors.retakePhotoButton);
    }

    get cameraRollButton() {
        return $(this.selectors.cameraRollButton);
    }

    get selectPhotoDoneButton() {
        return $(this.selectors.selectPhotoDoneButton);
    }

    getPhotoItemButtonAtIndex(index: number) {
        return $(`${this.selectors.photoItemButton}[${index}]`);
    }

    get videoCaptureButton() {
        return $(this.selectors.videoCaptureButton);
    }

    get useVideoButton() {
        return $(this.selectors.useVideoButton);
    }

    get retakeVideoButton() {
        return $(this.selectors.retakeVideoButton);
    }

    get toggleAudioRecordingButton() {
        return $(this.selectors.toggleAudioRecordingButton);
    }

    get doneAudioButton() {
        return $(this.selectors.doneAudioButton);
    }

    get fileBrowseButton() {
        return $(this.selectors.fileBrowseButton);
    }

    get browseOnDropboxButton() {
        return $(this.selectors.browseOnDropboxButton);
    }

    get samplePdfButton() {
        return $(this.selectors.samplePdfButton);
    }

    get samplePdf2Button() {
        return $(this.selectors.samplePdf2Button);
    }
}
