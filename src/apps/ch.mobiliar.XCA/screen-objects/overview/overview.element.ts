export class OverviewElement {
    private readonly selectors = {
        plusButton: 'page-overview mobi-area#add-new-expertise-area',
        expertiseReports: 'ion-item-sliding.ios',
        reportAtIndex: 'ion-list div.expertise__container:nth-child(index)'
    };

    private readonly reportDetailSelectors = {
        expertiseNumber: 'ion-item-sliding.ios ion-col span strong',
        expertiseStatus: 'ion-item-sliding.ios app-expertise-status span',
        carName: 'ion-item-sliding.ios ion-row:nth-of-type(2) ion-col:nth-of-type(1) span:nth-of-type(1)',
        licensePlate: 'ion-item-sliding.ios ion-row:nth-of-type(2) ion-col:nth-of-type(1) span:nth-of-type(2)',

        numberOfPhoto: 'ion-row:nth-of-type(2) ion-col:nth-of-type(2) span:nth-of-type(1)',

        date: 'ion-item-sliding.ios ion-row:nth-of-type(2) ion-col:nth-of-type(2) span:nth-of-type(2)'
    }

    get plusButton() {
        return $(this.selectors.plusButton);
    }

    get expertiseReports() {
        return $$(this.selectors.expertiseReports);
    }

    getExpertiseReport(position: number) {
        const numberOfPhotoSelector = this.selectors.reportAtIndex.replace('index', position.toString()).concat(' ', this.reportDetailSelectors.numberOfPhoto);

        return $(numberOfPhotoSelector)
    }

    get expertiseReportDetails() {
        let report = [];
        report.push(
            $(this.reportDetailSelectors.expertiseNumber),
            $(this.reportDetailSelectors.expertiseStatus),
            $(this.reportDetailSelectors.carName),
            $(this.reportDetailSelectors.licensePlate),
            $(this.reportDetailSelectors.numberOfPhoto),
            $(this.reportDetailSelectors.date)
        );
        return report;
    }

    //ion-list div.expertise__container:nth-child(2) ion-row:nth-of-type(2) ion-col:nth-of-type(2) span:nth-of-type(1)

    //div.expertise-content
}
