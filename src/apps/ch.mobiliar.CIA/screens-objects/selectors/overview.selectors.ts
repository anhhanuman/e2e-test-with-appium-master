export class OverviewElement {
    private readonly selectors = {
        emptyTitle: 'div.empty-title',
        emptyReportInformation: 'ion-grid ion-row ion-col p',
        emptyReportIcons: 'ion-grid ion-row ion-col mobi-icon',
        incompleteInspectionReports: 'mobi-item-sliding ion-item-sliding ion-item mobi-card span',
        deleteInspectionIcon: 'ion-item-option ion-icon#trash-btn'
    };

    get emptyTitle() {
        return $(this.selectors.emptyTitle);
    }

    get emptyReportInformation() {
        return $$(this.selectors.emptyReportInformation);
    }

    get emptyReportIcons() {
        return $$(this.selectors.emptyReportIcons);
    }

    get incompleteInspectionReports() {
        return $$(this.selectors.incompleteInspectionReports);
    }

    get incompleteInspectionReport() {
        return $(this.selectors.incompleteInspectionReports);
    }

    get deleteInspectionIcon() {
        return $(this.selectors.deleteInspectionIcon);
    }
}
