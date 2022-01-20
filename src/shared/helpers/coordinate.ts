import {Contexts} from './contexts';
import {Screen} from './screen';

const deviceName: any = browser.capabilities['deviceName'];

export class Coordinate {
    static tapBackButton() {
        Contexts.switchToNative();
        const isIPhoneX = deviceName.indexOf('iPhone X') >= 0;
        const isIPhone7 = deviceName.indexOf('iPhone 7') >= 0;
        const isIPhone6Plus = deviceName.indexOf('iPhone 6S Plus') >= 0;
        let buttonCoordinates = {};
        switch (buttonCoordinates) {
            case isIPhoneX:
                buttonCoordinates = {
                    x: 6,
                    y: 50
                };
                break;
            case isIPhone7:
                buttonCoordinates = {
                    x: 6,
                    y: 26
                };
                break;
            case isIPhone6Plus:
                buttonCoordinates = {
                    x: 6,
                    y: 55
                };
                break;
            default:
                buttonCoordinates = {
                    x: 6,
                    y: 60
                };
                break;
        }
        browser.touchAction({
            action: 'tap',
            x: buttonCoordinates['x'],
            y: buttonCoordinates['y']
        });
        Contexts.switchToWebview();
        browser.pause(2000);
        return this;
    }

    tapOptCancel(actionSheetElement: WebdriverIO.Element): void {
        Contexts.switchToNative();
        Screen.waitForElementDisplay(actionSheetElement);
        const isIPhoneX = deviceName.indexOf('iPhone X') >= 0;
        const buttonCoordinates = isIPhoneX
            ? {
                x: 8,
                y: 721
            }
            : {
                x: 8,
                y: 602
            };
        browser.touchAction({
            action: 'tap',
            x: buttonCoordinates['x'],
            y: buttonCoordinates['y']
        });
        Contexts.switchToWebview();
    }

    static tapAllowPermission(): void {
        browser.switchContext(Contexts.NativeApp);
        browser.pause(3000);

        browser.touchPerform([
            {
                action: 'tap',
                options: {
                    x: 253,
                    y: 445
                }
            }
        ]);
        browser.switchContext(Contexts.WebView);
    }

    static scrollToElement(element: WebdriverIO.Element) {
        browser.switchContext(Contexts.NativeApp);
        browser.pause(3000);

        browser.touchPerform([
            {
                action: 'press',
                x: 200,
                y: 200
            },
            {
                action: 'wait',
                options: {ms: 1000}
            },
            {
                action: 'moveTo',
                options: element
            },
            {
                action: 'release'
            }
        ]);
    }

    static scrollToNextDocumentType() {
        //todo: failed testing
        browser.pause(1000);
        browser.touchPerform([
            {
                action: 'press',
                options: {
                    x: 185,
                    y: 733
                }
            },
            {
                action: 'wait',
                options: {ms: 1000}
            },
            {
                action: 'moveTo',
                options: {
                    x: 185,
                    y: 701
                }
            },
            {
                action: 'release',
                options: {}
            }
        ]);
    }

    private static defineYCoordinate(documentTypePosition: number): number {
        return 733 - documentTypePosition * 32;
    }

    static scrollToDocumentType(documentTypes: Array<string>, documentType: string) {
        browser.pause(1000);
        const documentTypePosition = Screen.getTextPositionInTexts(documentType, documentTypes);
        const yCoordinate = this.defineYCoordinate(documentTypePosition);
        if (documentTypePosition <= 10) {
            this.scrollToYCoordinate(yCoordinate);
        } else {
            this.scrollManyTimesOnPickerWheel(documentTypePosition);
        }
    }

    private static scrollManyTimesOnPickerWheel(documentTypePosition: number) {
        const numberOfLongScrollTimes: number = Math.floor(documentTypePosition / 10);
        const remainderPositionIfDivideTo10: number = documentTypePosition % 10;
        const yCoordinateForLongScroll: number = this.defineYCoordinate(10);
        const remainderCoordinate: number = this.defineYCoordinate(remainderPositionIfDivideTo10);

        for (let i = 1; i <= numberOfLongScrollTimes; i++) {
            this.scrollToYCoordinate(yCoordinateForLongScroll);
        }

        this.scrollToYCoordinate(remainderCoordinate);
    }

    private static scrollToYCoordinate(yCoordinate: number) {
        browser.touchPerform([
            {
                action: 'longPress',
                options: {
                    x: 320,
                    y: 733
                }
            },
            {
                action: 'wait',
                options: {ms: 1000}
            },
            {
                action: 'moveTo',
                options: {
                    x: 320,
                    y: yCoordinate
                }
            },
            {
                action: 'release',
                options: {}
            }
        ]);
    }
}
