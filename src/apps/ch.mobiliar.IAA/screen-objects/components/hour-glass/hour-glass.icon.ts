import {Icon} from "@apps/iaa/screen-objects/base/icon.action";

export class HourGlassIcon extends Icon {
    private hourGlass = ' div.overlay-icon.overlay-icon--is-loading'

    constructor(protected screenName: string) {
        super(screenName)
    }

    get hourGlassSelector() {
        return this.hourGlass;
    }

    waitForHourGlassIconsDisplay(hourGlassSelector: string) {
        const numberOfHourGlass: number = this.baseComponent.getComponentElements(hourGlassSelector).length;
        if (numberOfHourGlass === 0) {
            browser.waitUntil(
                () => {
                    return this.baseComponent.getComponentElements(hourGlassSelector).length !== 0;
                },
                120000,
                `ERROR: menu still be loading after ${120000 / 60000}min`,
                1000
            );
            return this;
        }
    }

    waitUntilHourGlassesNotDisplay(hourGlassSelector: string) {
        if (this.baseComponent.getComponentElements(hourGlassSelector).length !== 0) {//pay attention: can be short-have to query element
            browser.waitUntil(
                () => {
                    return this.baseComponent.getComponentElements(hourGlassSelector).length === 0;
                },
                120000,
                `ERROR: menu still be loading after ${120000 / 60000}min`,
                1000
            );
        }
    }
}
