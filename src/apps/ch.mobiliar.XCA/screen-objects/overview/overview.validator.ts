export class OverviewValidator {
    constructor(private overviewScreen: any) {
    }

    expectedTheFirstReportDetails(expectedExpertiseReportsList: Array<string>) {
        const actual: Array<string> = this.overviewScreen.getTheFirstReportDetails();
        expect(actual).toEqual(expectedExpertiseReportsList);

        return this;
    }

    expectedFoundNumberOfExpertiseReports(expectedFoundNumberOfExpertiseReports: number) {
        const actual: number = this.overviewScreen.getNumberOfExpertiseReports();
        expect(actual).toEqual(expectedFoundNumberOfExpertiseReports);

        return this;
    }

    expectedNumberOfUploadedPhotos(reportPosition: number, expectedNumberOfPhotos: number) {
        const actual: number = this.overviewScreen.getNumberOfPhotosInReport(reportPosition);
        expect(actual).toEqual(expectedNumberOfPhotos);

        return this;
    }
}
