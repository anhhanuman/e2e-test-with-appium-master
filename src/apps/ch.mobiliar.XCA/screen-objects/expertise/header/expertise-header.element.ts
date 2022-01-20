import {Selector} from '@apps/xca/selectors/selector';

export class ExpertiseHeaderElement {
    private readonly selectors = {
        uploadedStatus: 'ion-buttons:nth-of-type(2) span',
        penEdit: '#btn-edit-expertise',
        uploadButton: '#btn-upload',
        dispatchNumber: 'page-expertise-detail ion-header ion-toolbar ion-title span'
    };

    get uploadedStatus() {
        return $(this.selectors.uploadedStatus);
    }

    get dispatchNumber() {
        return $(this.selectors.dispatchNumber);
    }

    get penEdit() {
        return $(this.selectors.penEdit);
    }

    get uploadButton() {
        return $(this.selectors.uploadButton);
    }

    get greenTickedIconOnTopRight() {
        return $(Selector.getExpertiseDetailsScreen().concat(' ion-buttons:nth-of-type(2) mobi-icon ion-icon')).shadow$(' svg');
    }
}

