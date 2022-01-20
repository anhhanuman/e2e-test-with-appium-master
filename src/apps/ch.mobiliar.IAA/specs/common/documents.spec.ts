import {Document} from '../../screen-objects/document/document.action';
import {Util} from '@shared/helpers/util';
import {AddDocument} from '@apps/iaa/screen-objects/document/add-document/add.document';
import {Precondition} from "@apps/iaa/precondition/precondition";
import {Toolbar} from "@apps/iaa/screen-objects/components/header-toolbar/toolbar/toolbar.action";
import {ComponentIcon, MenuName, ScreenName} from "@shared/helpers/testdata";
import {MenuNavigationScreen} from "@apps/iaa/static/menu-navigation-screen.action";
import {AlertDialog, discardDocumentAlert} from "@shared/screen-object-components";

const addDocument = new AddDocument();
const document = new Document();
xdescribe('Partner which has no documents', () => {
    beforeEach(() => {
        Precondition
            .displayDocumentsScreen('P-1022-4709')
            .displayAddDocumentModal();
    });
    afterEach(() => {
        browser.reloadSession();
    });
    xit('displays the hint no documents, ifo icon, title and content', () => {
        addDocument
            .verify()
            .expectHintNoDocsGroupDisplayed([true, true, true])
            .expectHintDocTitleContent('No documents\nThis partner does not have any documents. You can scan and add new documents belonging to this partner such as official files, termination letters, power of attorney etc..')
            .expectHintIconProperties(['30px', 'rgba(75,9,255,1)', 'flex-start', '10px', '3px'])
            .expectedHintBoxProperties([
                '1px solid rgb(234, 235, 236)',
                '15px 15px 20px',
                'rgba(0,0,0,0.1)0px0.546875px0px0px',
                'flex-start',
                '1 1 0%',
                'flex',
                '30px'
            ]);
    });
});

xdescribe('Add document Modal suite: ', () => {
    beforeEach(() => {
        Precondition
            .removeAllRecentPartners()
            .displayDocumentsScreen('P-2047-8718')
            .displayAddDocumentModal();
    });
    afterEach(() => {
        browser.reloadSession();
    });

    it('should be able to upload a document', () => {
        const uploadingDocumentName = 'Document name by automation test';
        addDocument.fillData(uploadingDocumentName);
        const selectedDocumentType = addDocument.getSelectedDocumentType();
        addDocument.uploadScannedDocument();
        const secondLineOfUploadingDocument = Util.getTodayAndTime();
        const expectedDocumentCardDetails = [
            uploadingDocumentName,
            selectedDocumentType,
            secondLineOfUploadingDocument
        ];
        document.verify().expectInProgressUploadingDocument();

        document.toolbar
            .verify()
            .expectTitle('Documents');
        document.toolbar.notification.waitForSpinnerNotificationLoadingCompleted()
        const dateTime: string = Util.getSwissDateTime();
        document
            .verify()
            .expectNumberOfGreenIconOnDocumentCards(1)
            .expectUploadingDocumentCardDetailsEqual(expectedDocumentCardDetails);
        document.tapBackButtonAndWait();
        new Toolbar(ScreenName.Menu).tapHomeButton(true)
        Precondition
            .removeAllRecentPartners()
            .displayDocumentsScreen('P-2047-8718');
        document
            .verify()
            .expectFoundMCMUploadedDocumentCardDetails(dateTime, [
                uploadingDocumentName,
                selectedDocumentType,
                dateTime
            ]);
    });
});

describe('Upload documents flow: ', () => {
    beforeEach(() => {
        Precondition.removeAllRecentPartners()
            .displayDocumentsScreen('P-2047-8718')
            .displayAddDocumentModal();
    });
    afterEach(() => {
        browser.reloadSession();
    });

    xit('uploads a document and task is created', () => {
        addDocument.fillDataAndUpload('Document name by automation test with task');
        document.tapBackButton();
        MenuNavigationScreen.verify()
            .expectFoundFreeTextTaskCreatedNotification('Creating free text task\nEdit new document')
            .expectFoundOneDocumentBeingUploaded();
        document.toolbar.notification.waitForSpinnerNotDisplay();
        MenuNavigationScreen.waitForMenuLoadedCompleted()
            .verify()
            .expectNotFoundDocumentBeingUploaded();
    });

    xit('uploads a document and task is not created', () => {
        addDocument.fillDataAndUpload('Document name by automation test, but with No task', undefined, 'no');
        document.tapBackButton();
        MenuNavigationScreen
            .verify()
            .expectFoundOneDocumentBeingUploaded()
            .expectCreatedFreeTextTaskAlertDisplayed(false)
            .expectComponentIconDisplayedOn(ComponentIcon.SuccessIcon, MenuName.Documents, false)
    });

    it('uploads document and sync - keep the green icon', () => {
        addDocument.fillDataAndUpload('Document name by automation test', undefined, 'no');
        document.toolbar.notification.waitForSpinnerNotDisplay();
        document.toolbar.actionMenu.syncPartnerData(true);
        document.verify().expectNumberOfGreenIconOnDocumentCards(1)
    })
});

xdescribe('Upload documents flow: ', () => {
    beforeEach(() => {
        Precondition.removeAllRecentPartners()
            .displayDocumentsScreen('P-2047-8718')
            .displayAddDocumentModal();
    });
    afterEach(() => {
        browser.reloadSession();
    });

    /*xit('should be able to select a specific document type in the picker wheel', () => {
        addDocument.tapPenIcon();
        const documentTypes = Screen.getPickerWheelList();

        for (const type of documentTypes) {
            addDocument
                .inputDocumentName('Name for type: ' + type)
                .tapPenIcon();
            Screen.scrollToType(type);
            addDocument.uploadScannedDocument();
            document.toolbar.notification.waitForSpinnerNotDisplay();
            Precondition.displayAddDocumentModal();
        }
        browser.pause(5000);
    });*/

    xit("does not display the document type Police because it's removed", () => {
        addDocument
            .tapPenIcon()
            .selectPickerWheelValue('Police');
        const actual = addDocument.getSelectedDocumentAndCategory();
        expect(actual).not.toEqual('Police');
    });

    it('close preview test', () => {
        addDocument.tapCloseButton()
            .tapCloseButton();
        expect(AlertDialog.getAlertDialog()).toEqual(discardDocumentAlert);
        AlertDialog.tapAlertDialogButtonFirst();
        const document = new Document();
        expect(document.toolbar.headerTitle.getHeaderTitle()).toEqual('Documents');
    });
});
