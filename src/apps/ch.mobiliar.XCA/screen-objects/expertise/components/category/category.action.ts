import {Screen} from '@shared/helpers/screen';
import {BaseCategory} from "@apps/xca/screen-objects/expertise/components/category/base-category.action";
import {Util} from "@shared/helpers/util";

export class Category extends BaseCategory {
    getExpertiseImagesRowLabel(): Array<string> {
        return Screen.getTextOfElements(this.expertiseImagesElement.expertiseImagesRowLabel);
    }

    getNumberOfRowLabels(): number {
        return this.expertiseImagesElement.expertiseImagesRowLabel.length;
    }

    tapAddButton() {
        Screen.tapToElement(this.expertiseImagesElement.addButton);

        return this;
    }

    tapClaimCategoryIcon(ofWhichClaimNumber: number) {
        const claimCategoryIcon = this.categoryElement.getClaimIcon(ofWhichClaimNumber);
        Screen.tapToElement(claimCategoryIcon);

        return this;
    }

    displayClaim(whichClaimNumber: number) {
        if (whichClaimNumber > 0) {
            const currentNumberOfRowLabel = this.getNumberOfRowLabels();
            let numberOfClaimToAdd = whichClaimNumber - currentNumberOfRowLabel;
            while (numberOfClaimToAdd > 0) {
                this.tapAddButton();
                numberOfClaimToAdd--;
            }
        } else {
            throw Error('Claim does not exist');
        }

        return this;
    }

    addPhotosToTheClaimByGallery(claimNumber: number, numberOfPhotos: number) {
        this.displayClaim(claimNumber)
            .tapClaimCategoryIcon(claimNumber)
            .selectManyPhotosForAdditionalCategory(numberOfPhotos);

        return this;
    }

    addPhotosToTheClaimByCamera(whatClaimNumber: number, numberOfPhotosToCapture: number, chooseImageFromGallerySetting: boolean) {
        if (whatClaimNumber > 0) {
            this.displayClaim(whatClaimNumber).findClaimAndAddPhotoByCamera(whatClaimNumber, numberOfPhotosToCapture, chooseImageFromGallerySetting);
        } else {
            throw Error('Claim does not exist');
        }
        return this;
    }

    findClaimAndAddPhotoByCamera(ofWhichClaimNumber: number, numberOfPhotosToAdd: number, isActionSheetForCameraDisplayed: boolean) {
        for (let photo = 1; photo <= numberOfPhotosToAdd; photo++) {
            this.tapClaimCategoryIcon(ofWhichClaimNumber)
                .capturePhotoAndUse(isActionSheetForCameraDisplayed);
        }
    }

    addPhotosToClaimsByCamera(numberOfClaimsToAddPhotos: number, numberOfPhotosToCapture: number, chooseImageFromGallerySetting: boolean) {
        for (let claimNumber = 1; claimNumber <= numberOfClaimsToAddPhotos; claimNumber++) {
            this.addPhotosToTheClaimByCamera(claimNumber, numberOfPhotosToCapture, chooseImageFromGallerySetting);
        }
        return this;
    }

    addPhotoToClaimsByGallery(desiredClaims: number, numberOfPhotos: number) {
        for (let claimNumber = 1; claimNumber <= desiredClaims; claimNumber++) {
            this.addPhotosToTheClaimByGallery(claimNumber, numberOfPhotos);
        }

        return this;
    }

    addRandomPhotosToRandomClaimsByCamera(isActionSheetForCameraDisplayed: boolean) {
        const randomNumberOfClaims = Util.getARandomIntegerNumber(1, 10);
        const randomNumberOfPhotosToAdd = Util.getARandomIntegerNumber(1, 20);
        this.addPhotosToClaimsByCamera(randomNumberOfClaims, randomNumberOfPhotosToAdd, isActionSheetForCameraDisplayed);

        return this;
    }
}
