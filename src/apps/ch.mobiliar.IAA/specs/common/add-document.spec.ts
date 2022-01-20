import {Precondition} from "@apps/iaa/precondition/precondition";
import {AddDocument} from "@apps/iaa/screen-objects/document/add-document/add.document";

const addDocument = new AddDocument();
describe('Add document Modal suite: ', () => {
    beforeEach(() => {
        Precondition
            .removeAllRecentPartners()
            .displayDocumentsScreen('P-2047-8718')
            .displayAddDocumentModal();
    });
    afterEach(() => {
        browser.reloadSession();
    });

    xit('displays the proper add document modal screen after selected document and category', () => {
        addDocument.tapPenIcon();
        const defaultDocumentType: string = addDocument.getPickerWheelValue();
        addDocument
            .tapDoneButtonAfterSelectedDocumentType()
            .verify()
            .expectSelectedDocumentType(defaultDocumentType)
            .expectDocumentPreviewCardContent('Document 1\n' + defaultDocumentType)
            .expectDefaultDocumentName('Document 1')
            .expectDocumentPreviewCardContentCSSProperties(['16px', 'bold'])
            .expectMappedDocumentCategory();
        addDocument
            .inputDocumentName('Document name by automation test')
            .verify()
            .expectDocumentPreviewCardContent('Document name by automation test\n' + defaultDocumentType)
            .expectSelectedDocumentTypeCSSProperty('rgb(248,248,246)nonerepeatscroll0%0%/autopadding-boxborder-box')
            .expectDocumentIconCSSProperties(['30px', 'rgba(0,0,0,1)', 'flex-start', '15px'])
            .expectToggleStatus('Yes');
        addDocument
            .tapTaskHintIcon()
            .verify()
            .expectTaskCreationHint(
                'Create task\nThis will create a generic task as reminder which will be shown in your task list in the B2E portal'
            );
    });

    xit('displays the proper add document modal screen after close modal', () => {
        addDocument
            .tapCloseButton()
            .tapDoneButton();
        addDocument
            .verify()
            .expectDocumentPreviewCardContent('Document 1')
            .expectDefaultDocumentName('Document 1')
            .expectDocumentPreviewCardContentCSSProperties(['16px', 'bold'])
            .expectToggleStatus('Yes');
        addDocument
            .tapTaskHintIcon()
            .verify()
            .expectTaskCreationHint('Create task\nThis will create a generic task as reminder which will be shown in your task list in the B2E portal')
            .expectToggleStatus('Yes');
    });

    it('should display the validation', () => {
        addDocument
            .tapAddButton()
            .verify()
            .expectErrorToolTipContent('Incomplete partner document\nPlease fill out the incomplete fields, that the partner document can be submitted.')
            .expectFoundErrorIconOnToolTip()
            .expectFoundErrorIconOnDocumentCategory();
    });
});
