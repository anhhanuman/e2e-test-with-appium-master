import {Precondition} from "@apps/xca/precondition/precondition";

describe('Screen: Expertise Details with QRCode', () => {
    beforeEach(() => {
        Precondition
            .turnOffChooseImagesFromGallery()
            .displayExpertiseDetails();
    });

    afterEach(() => {
        browser.reloadSession();
    });

    it('HAN-: should display the correct scanned dispatch number', () => {

    });
});
