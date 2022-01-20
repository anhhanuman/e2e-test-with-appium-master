export class ExpertiseImageElement {
    private readonly baseSelectors = {
        expertiseImages: 'div.expertise-images',
    }
    private readonly selectors = {
        addedImage: 'div.image-container',
        addedImageName: 'div.image-category',
        addedImageClaimName: 'div.image-category.claim-image',
        imageGreenIcon: 'div.button-status.button-status--uploaded',
        imageRedIcon: 'div.button-status.button-status--upload-failed',
        info_label: 'div.info-label',
        imagedCategoriesList: 'ion-row.ios ion-col.ion-margin-bottom div.image-category',
        addButton: this.baseSelectors.expertiseImages.concat(' ion-row ion-button'),
        uploadAllImagesAgain: 'ion-button.btn-upload-all-images'
    };

    get claimImageName() {
        return $(this.selectors.addedImageClaimName)
    }

    getAddedImage(positionIndex: number) {
        let addedPhoto = 'div.expertise-images ion-row ion-col:nth-child()'.concat(' ', this.selectors.addedImageName);
        addedPhoto = addedPhoto.replace('()', '(' + positionIndex + ')');

        return $(addedPhoto);
    }

    get uploadAllImagesAgain() {
        return $(this.selectors.uploadAllImagesAgain);
    }

    get addButton() {
        return $(this.selectors.addButton);
    }

    get imagedCategories() {
        return $$(this.selectors.imagedCategoriesList);
    }

    get uploadedGreenIcons() {
        return $$(this.selectors.imageGreenIcon);
    }

    get uploadedErrorRedIcons() {
        return $$(this.selectors.imageRedIcon);
    }

    get addedPhotos() {
        return $$(this.selectors.addedImage);
    }

    get addedPhotoCategoryNames() {
        return $$(this.selectors.addedImageName);
    }

    get expertiseImages() {
        return $(this.baseSelectors.expertiseImages);
    }

    get expertiseImagesRowLabel() {
        return $$(this.baseSelectors.expertiseImages.concat(' ', this.selectors.info_label));
    }
}
