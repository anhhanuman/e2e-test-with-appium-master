import {StartScreen} from "@apps/iaa/screen-objects/start/start.screen.actions";
import {ComponentIcon, SegmentName} from "@shared/helpers/testdata";

export class StartValidators {
    constructor(private startScreen: StartScreen) {
    }

    expectPartnerNames(segmentName: string, expectNames: string[]) {
        if (segmentName === SegmentName.Favorites) {
            expect(this.startScreen.getFavoritePartnerNames()).toEqual(expectNames)
        } else {
            expect(this.startScreen.getRecentPartnerNames()).toEqual(expectNames);
        }

    }

    expectInfoNoFavoritePartner(expectMessage: string) {
        const actual: string = this.startScreen.getInfoMessageNoFavoritePartner();
        expect(actual).toEqual(expectMessage);

        return this;
    }

    expectNumberOfFavoritePartners(expectedNumberOfFavoritePartners: number) {
        this.startScreen.displayFavoritePartner();
        const actual = this.startScreen.getTotalPartnerCards();
        expect(actual).toEqual(expectedNumberOfFavoritePartners);

        return this;
    }

    private checkComponentTypeOnPartnerName(partnerName: string, componentIconName: string, isDisplayed: boolean) {
        switch (componentIconName) {
            case ComponentIcon.ErrorIcon:
                const actualErrorDisplay = this.startScreen.errorIcon.isIconDisplayedOnCard(partnerName, this.startScreen.errorIcon.errorSelector);
                expect(actualErrorDisplay).toEqual(isDisplayed);
                break

            case ComponentIcon.HourGlassIcon:
                const actualHourGlassDisplay = this.startScreen.hourGlassIcon.isIconDisplayedOnCard(partnerName, this.startScreen.hourGlassIcon.hourGlassSelector);
                expect(actualHourGlassDisplay).toEqual(isDisplayed);
                break
        }
    }

    expectComponentIconDisplayOnPartnerName(segmentName: string, partnerName: string, componentIconName: string, isDisplayed: boolean) {
        if (segmentName === SegmentName.Favorites) {
            this.startScreen.displayFavoritePartner();
            this.checkComponentTypeOnPartnerName(partnerName, componentIconName, isDisplayed);
        } else {
            this.startScreen.tapRecentSegment();
            this.checkComponentTypeOnPartnerName(partnerName, componentIconName, isDisplayed)
        }

        return this;
    }

    expectNotDisplayErrorIconOnSegment(segmentName: string) {
        if (segmentName === SegmentName.Favorites) {
            this.startScreen.displayFavoritePartner();
            const totalErrors = this.startScreen.errorIcon.getTotalIcons(this.startScreen.errorIcon.errorSelector);
            expect(totalErrors).toEqual(0);
        } else {
            this.startScreen.tapRecentSegment();
            const totalErrors = this.startScreen.errorIcon.getTotalIcons(this.startScreen.errorIcon.errorSelector);
            expect(totalErrors).toEqual(0);
        }

        return this;
    }
}
