import {BaseSearchPartnerScreen} from '@shared/screen-object-components/objects/base-search-partner.screen';
import {SearchClaimElement} from '../selectors/search-claim.seletors';
import {DeviceType} from '@shared/helpers';

const deviceType = browser.capabilities['deviceType'];

export class SearchClaimScreen extends BaseSearchPartnerScreen {
    private element = new SearchClaimElement();

    tapFoundClaimBySearchClaimNumberOnSearchResult(): void {
        this.element.searchClaimResults[0].click();
        super.waitForNotDisplay();
    }

    tapNumberType(whichType: string) {
        if (deviceType === DeviceType.iPad && whichType === expectedNumberTypes[2]) {
            super.tapPartnerNumberTab();
        } else if (deviceType === DeviceType.iPad && whichType === expectedNumberTypes[1]) {
            super.tapContractNumberTab();
        }

        return this;
    }
}

const expectedNumberTypes = ['Claim Number', 'Contract number', 'Partner number'];
export {expectedNumberTypes};
