export class ScanbotElement {
    private readonly selectors = {
        nativeScanButton: '//XCUIElementTypeOther[3]/XCUIElementTypeOther/XCUIElementTypeButton[1]',
        scannedPage: '//XCUIElementTypeStaticText[@name="1 Page(s)"]',
        cancelScanButton: '//XCUIElementTypeButton[@name="Cancel"]',
        multiPageButton: '//XCUIElementTypeButton[@name="Multi-Page"]',
        flashButton: '//XCUIElementTypeButton[@name="Flash"]',
        autoButton: '//XCUIElementTypeButton[@name="Auto"]',
    }

    get scannedPage() {
        return $(this.selectors.scannedPage);
    }

    get nativeScanButton() {
        return $(this.selectors.nativeScanButton);
    }

    get cancelScanButton() {
        return $(this.selectors.cancelScanButton);
    }

    get multiPageButton() {
        return $(this.selectors.cancelScanButton);
    }

    get flashButton() {
        return $(this.selectors.cancelScanButton);
    }

    get autoButton() {
        return $(this.selectors.autoButton);
    }
}
