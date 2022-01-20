import {Screen} from '@shared/helpers/screen';
import {Util} from '@shared/helpers/util';
import {GalleryElement} from "@apps/xca/screen-objects/expertise/components/gallery/gallery.element";

export class Gallery {
    private galleryElement = new GalleryElement();

    tapCameraRoll() {
        this.galleryElement.cameraRoll.click();
        browser.pause(3000);
        return this;
    }

    selectOnePhoto(photoPositionInGrid: number) {
        if (photoPositionInGrid === undefined) {
            const randomPhoto = Util.getARandomIntegerNumber(1, 20);
            const photoInCameraRoll = this.galleryElement.getPhotoInCameraRoll(randomPhoto);
            photoInCameraRoll.click();
            browser.pause(2000);
        } else if (photoPositionInGrid > 0) {
            const photoInCameraRoll = this.galleryElement.getPhotoInCameraRoll(photoPositionInGrid);
            photoInCameraRoll.click();
            browser.pause(2000);
        } else {
            throw Error(
                'You specified the incorrect photo position in grid, must be start from 1 or there is no photo in the grid'
            );
        }
        return this;
    }

    openCameraRollAndSelectPhotos(numberOfPhotosToSelect: number) {
        this.tapCameraRoll()
            .selectPhotosInCameraRoll(numberOfPhotosToSelect);

        return this;
    }

    selectPhotosInCameraRoll(numberOfPhotosToSelect: number) {
        try {
            if (numberOfPhotosToSelect > 0 && numberOfPhotosToSelect < 16) {
                for (let i = 1; i <= numberOfPhotosToSelect; i++) {
                    this.galleryElement.getPhotoInCameraRoll(i).click();
                }
            }
        } catch (e) {
            throw new Error('You should select the proper number of photos');
        }
        return this;
    }

    tapDoneButtonOnCameraRoll() {
        Screen.tapAndWaitForNotExist(this.galleryElement.doneInCameraRoll);
        return this;
    }
}
