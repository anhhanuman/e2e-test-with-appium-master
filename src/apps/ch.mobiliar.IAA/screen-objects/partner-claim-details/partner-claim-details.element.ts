import {BaseSelector} from '@shared/selectors/base-selector.selector';

export class PartnerClaimDetailsElement {
    private readonly selectors = {
        appClaimDetails: 'app-claim-detail',
        paymentTitle: '',
        paymentErrorIcon: '',
        paymentErrorMessage: 'mobi-item-card mobi-hint div.container span',
        paymentSection: 'div.payment-container',
        compensation: 'div.payment-container ion-row:nth-of-type(1)',
        netCost: 'div.payment-container ion-row:nth-of-type(2)',
        responsibleEmployeeCard: 'app-responsible-employee mobi-item-card mobi-card',
        claimDetails: 'mobi-item-text'
    };

    get claimDetails() {
        return $$(this.selectors.appClaimDetails.concat(' ', this.selectors.claimDetails));
    }

    get claimLabels() {
        return $$(this.selectors.claimDetails.concat(' ion-label'));
    }

    get claimContents() {
        return $$(this.selectors.claimDetails.concat(BaseSelector.getItemContent()));
    }

    get claimNumber() {
        let claimNumberLabel = $$(this.selectors.claimDetails.concat(' ion-label'))[0];
        let claimNumber = $$(this.selectors.claimDetails.concat(BaseSelector.getItemContent()))[0];
        let claimNumberSelectors = [];
        claimNumberSelectors.push(claimNumberLabel, claimNumber);

        return claimNumberSelectors;
    }

    getClaimDetails() {
        let claimDetails
        [] = [];
        let label;
        let content;
        const size: number = this.claimDetails.length;

        for (let i = 0; i < size; i++) {
            label = this.claimLabels[i];
            content = this.claimContents[i];
            claimDetails.push([label, content]);
        }

        return claimDetails;
    }

    get damageDate() {
        return $$(this.selectors.claimDetails)[1];
    }

    get paymentTitle() {
        return $(this.selectors.paymentTitle);
    }

    get paymentErrorIcon() {
        return $(this.selectors.paymentErrorIcon);
    }

    get paymentErrorMessage() {
        const paymentErorMessage = this.selectors.paymentErrorMessage;
        const paymentErrorElement = $(paymentErorMessage);
        if (paymentErrorElement.isExisting()) {
            return paymentErrorElement;
        } else {
            return;
        }
    }

    get paymentSection() {
        return $(this.selectors.paymentSection);
    }

    get compensation() {
        return $$(this.selectors.compensation.concat(' ion-col'));
    }

    get netCost() {
        return $$(this.selectors.netCost.concat(' ion-col'));
    }

    get responsibleEmployeeCard() {
        return $(this.selectors.responsibleEmployeeCard);
    }

    get employeeCardTitleAndContent() {
        let title = $(this.selectors.responsibleEmployeeCard.concat(' span'));
        let contents = $(this.selectors.responsibleEmployeeCard.concat(' div.content div'));
        let titleAndContents = [];
        titleAndContents.push(title, contents);

        return titleAndContents;
    }
}
