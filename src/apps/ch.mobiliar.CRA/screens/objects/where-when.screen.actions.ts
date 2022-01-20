import {DeviceType} from '@shared/helpers';
import {WhereWhenSelector} from '../selectors/where-when.selector';
import Gestures from '../../../../shared/helpers/gestures';
import {Screen} from '@shared/helpers/screen';

const deviceType = browser.capabilities['deviceType'];

class WhereWhenScreen {
    private selector = new WhereWhenSelector();

    private defineScreenElements(): Array<WebdriverIO.Element> {
        const whereWhenScreenElements: Array<WebdriverIO.Element> = [];
        whereWhenScreenElements.push(
            this.selector.claimPlaceScreenIdentity
            //todo
        );
        return whereWhenScreenElements;
    }

    waitForDisplay() {
        Screen.waitForElementsDisplay(this.defineScreenElements());
    }

    isClaimPlaceScreenDisplayed(): boolean {
        return this.selector.claimPlaceScreenIdentity.isDisplayed();
    }

    tapSearchInput(): void {
        this.selector.searchInput.click();
    }

    tapNextButton(): void {
        this.selector.nextButton.click();
    }

    selectPartnerHomeAddress() {
        this.tapSearchInput();
        if (deviceType === DeviceType.iPad) {
            Gestures.dragAndDropWebviewElement(this.selector.suggestionTitle, 0, -150);
        }
        Gestures.tapWebviewElement(this.selector.partnerHomeAddressItem);
    }

    selectSuggestedItemAtIndex(index: number) {
        this.selector.suggestionItems[index].click();
    }

    selectDate() {
        this.selector.dateSelectBox.click();
        Gestures.dragAndDropWebviewElement(this.selector.getPickerColumnAtIndex(0), 0, -200, false);
        Gestures.dragAndDropWebviewElement(this.selector.getPickerColumnAtIndex(1), 0, -200, false);
        Gestures.dragAndDropWebviewElement(this.selector.getPickerColumnAtIndex(2), 0, -50, false);

        this.selector.donePickerButton.click();
    }

    selectTime() {
        this.selector.timeSelectBox.click();
        Gestures.dragAndDropWebviewElement(this.selector.getPickerColumnAtIndex(0), 0, -200, false);
        Gestures.dragAndDropWebviewElement(this.selector.getPickerColumnAtIndex(1), 0, -200, false);

        this.selector.donePickerButton.click();
    }

    selectDateTime() {
        this.selectDate();
        this.selectTime();
    }
}

export const whereWhenScreen = new WhereWhenScreen();
