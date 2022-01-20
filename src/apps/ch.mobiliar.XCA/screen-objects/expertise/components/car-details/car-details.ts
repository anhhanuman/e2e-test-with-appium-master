import {Screen} from "@shared/helpers/screen";

export class CarDetails {
    private readonly selectors = {
        carLabels: 'div.expertise-detail ion-row:nth-of-type(1) ion-col.ios div.info-label',
        carInfo: 'div.expertise-detail ion-row:nth-of-type(1) ion-col.ios div.info-detail',
    }

    private get carLabelElements() {
        return $$(this.selectors.carLabels);
    }

    private get carInfoElements() {
        return $$(this.selectors.carInfo);
    }

    getCarLabels(): Array<string> {

        return Screen.getTextOfElements(this.carLabelElements);
    }

    getCarInfo(): Array<string> {

        return Screen.getTextOfElements(this.carInfoElements);
    }

    getCarDetails(): Array<string> {

        return this.getCarLabels().concat(this.getCarInfo())
    }

    verify() {
        return this;
    }

    expectedCarDetails(expectedCarDetails: Array<string>) {
        const actualScannedCarDetails: Array<string> = this.getCarDetails();
        expect(actualScannedCarDetails).toEqual(expectedCarDetails);

        return this;
    }

}
