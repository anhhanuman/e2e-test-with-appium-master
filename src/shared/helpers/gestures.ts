import {Contexts} from './contexts';

let SCREEN_SIZE;

/**
 * The values in the below object are percentages of the screen
 */
const SWIPE_DIRECTION = {
    down: {
        start: {x: 50, y: 40},
        end: {x: 50, y: 85}
    },
    left: {
        start: {x: 95, y: 50},
        end: {x: 5, y: 50}
    },
    right: {
        start: {x: 5, y: 50},
        end: {x: 95, y: 50}
    },
    up: {
        start: {x: 50, y: 85},
        end: {x: 50, y: 40}
    }
};

/**
 * See more at: http://appium.io/docs/en/writing-running-appium/ios/ios-xctest-mobile-gestures
 */
class Gestures {
    /**
     * Calculate the x y object coordinates based on a percentage
     * @param param
     * @param {number} percentage
     */
    private static calculateXY({x, y}, percentage: number) {
        return {
            x: x * percentage,
            y: y * percentage
        };
    }

    /**
     * Get the screen coordinates based on a device his screensize
     * @param screenSize
     * @param coordinates
     */
    private static getDeviceScreenCoordinates(screenSize: Screen, coordinates: any) {
        return {
            x: Math.round(screenSize.width * (coordinates.x / 100)),
            y: Math.round(screenSize.height * (coordinates.y / 100))
        };
    }

    private static swipe(from: object, to: object): void {
        browser.touchPerform([
            {
                action: 'press',
                options: from
            },
            {
                action: 'wait',
                options: {ms: 1000}
            },
            {
                action: 'moveTo',
                options: to
            },
            {
                action: 'release'
            }
        ]);
    }

    private static swipeOnPercentage(from: object, to: object) {
        SCREEN_SIZE = SCREEN_SIZE || browser.getWindowRect();
        const pressOptions = Gestures.getDeviceScreenCoordinates(SCREEN_SIZE, from);
        const moveToScreenCoordinates = Gestures.getDeviceScreenCoordinates(SCREEN_SIZE, to);

        Gestures.swipe(pressOptions, moveToScreenCoordinates);
    }

    /**
     * Swipe down based on a percentage
     * @param {number} percentage from 0 - 1
     */
    static swipeContentDown(percentage = 1): void {
        browser.pause(2000);
        Gestures.swipeOnPercentage(
            Gestures.calculateXY(SWIPE_DIRECTION.down.start, percentage),
            Gestures.calculateXY(SWIPE_DIRECTION.down.end, percentage)
        );
        browser.pause(2000);
    }

    /**
     * Swipe up based on a percentage
     * @param {number} percentage from 0 - 1
     */
    static swipeContentUp(percentage: number = 1): void {
        browser.pause(2000);
        Gestures.swipeOnPercentage(
            Gestures.calculateXY(SWIPE_DIRECTION.up.start, percentage),
            Gestures.calculateXY(SWIPE_DIRECTION.up.end, percentage)
        );
        browser.pause(2000);
    }

    /**
     * Swipe left based on a percentage
     * @param {number} percentage from 0 - 1
     */
    static swipeLeft(percentage = 1) {
        Gestures.swipeOnPercentage(
            Gestures.calculateXY(SWIPE_DIRECTION.left.start, percentage),
            Gestures.calculateXY(SWIPE_DIRECTION.left.end, percentage)
        );
    }

    /**
     * Swipe right based on a percentage
     * @param {number} percentage from 0 - 1
     */
    static swipeRight(percentage: number = 1): void {
        Gestures.swipeOnPercentage(
            Gestures.calculateXY(SWIPE_DIRECTION.right.start, percentage),
            Gestures.calculateXY(SWIPE_DIRECTION.right.end, percentage)
        );
    }

    static checkIfDisplayedWithScrollDown(element: WebdriverIO.Element, maxScrolls: number, amount: number = 0) {
        if ((!element.isExisting() || !element.isDisplayed()) && amount <= maxScrolls) {
            Gestures.swipeContentDown(0.85);
            Gestures.checkIfDisplayedWithScrollDown(element, maxScrolls, amount + 1);
        } else if (amount > maxScrolls) {
            throw new Error(`The element '${JSON.stringify(element)}' could not be found or is not visible.`);
        }
    }

    /**
     * Touch action bease on provided element
     * @param {WebdriverIO.Element} element
     */
    static tapNativeElement(element: WebdriverIO.Element): void {
        Contexts.doTasksInNativeContext(() => {
            browser.touchAction({
                action: 'tap',
                element: element
            } as WebdriverIO.TouchActions);
        });
    }

    static tapWebviewElement(element: WebdriverIO.Element): void {
        const {x, y} = element.getLocation();
        const {width, height} = element.getSize();
        const startPointX = width / 2 + x;
        const startPointY = height / 2 + y;

        Contexts.doTasksInNativeContext(() => {
            browser.touchAction({
                action: 'tap',
                x: startPointX,
                y: startPointY
            });
        });
    }

    static dragAndDropWebviewElement(
        element: WebdriverIO.Element,
        right: number = 0,
        up: number = 0,
        adjustBySize: boolean = true
    ): void {
        const {x, y} = element.getLocation();
        let width = 0;
        let height = 0;

        if (adjustBySize) {
            ({width, height} = element.getSize());
        }

        const startPointX = width / 2 + x;
        const startPointY = height / 2 + y;

        Contexts.doTasksInNativeContext(() => {
            browser.touchPerform([
                {
                    action: 'longPress',
                    options: {
                        x: Math.round(startPointX),
                        y: Math.round(startPointY)
                    }
                },
                {
                    action: 'moveTo',
                    options: {
                        x: startPointX + right,
                        y: startPointY + up
                    }
                },
                {
                    action: 'release',
                    options: {}
                }
            ]);
        });
    }

    static scrollIntoView(element: WebdriverIO.Element) {
        try {
            if (element.isExisting()) {
                if (!element.isDisplayed()) {
                    element.scrollIntoView();
                    browser.pause(2000);
                } else {
                    return;
                }
            } else {
                browser.waitUntil(
                    () => {
                        return element.isExisting();
                    },
                    5000,
                    `ERROR:element ${element} still NOT Existing after waiting for ${
                        5000 / 1000
                    }s, so that can't scroll into view`
                );
                if (!element.isDisplayed()) {
                    element.scrollIntoView();
                    browser.pause(2000);
                } else {
                    return;
                }
            }
        } catch (e) {
            throw Error(e);
        }
    }

    static clickAndWaitForNotDisplay(element: WebdriverIO.Element) {
        this.scrollIntoView(element);
        if (browser.isKeyboardShown()) {
            browser.$('body').click();
        }
        element.click();
        browser.waitUntil(
            () => {
                return !element.isDisplayed();
            },
            35000,
            `ERROR:element ${element} still display after waiting for ${35000 / 1000}s`
        );
    }
}

export default Gestures;
