import {BaseSelector} from '@shared/selectors/base-selector.selector';
import {ScreenName} from '@shared/helpers/testdata';

export class ContractDetailSelector {
    static readonly selectors = {
        contractDocuments: BaseSelector.getMobiCard(ScreenName.ContractDetails, false)
    };
}
