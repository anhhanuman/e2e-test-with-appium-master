import {Contexts} from '@shared/helpers';

export class NewExpertiseElement {
    private readonly selectors = {
        title: 'page-new-expertise ion-header ion-toolbar ion-title',
        closeButton: '#btn-dismiss-qr-scanner-modal',
        optScanQRCodeLater: '~Scan QR code later',
        optAbortCreationExpertise: '~Abort creation of expertise',
        optCancel: ''
    };

    get title() {
        return $(this.selectors.title);
    }

    get closeButton() {
        return $(this.selectors.closeButton);
    }

    get optScanQRCodeLater() {
        Contexts.switchToNative();

        return $(this.selectors.optScanQRCodeLater);
    }

    get optAbortCreationExpertise() {
        Contexts.switchToNative();

        return $(this.selectors.optAbortCreationExpertise);
    }
}
