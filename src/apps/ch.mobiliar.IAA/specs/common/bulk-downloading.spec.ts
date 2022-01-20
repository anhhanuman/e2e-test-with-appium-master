import {Precondition} from "@apps/iaa/precondition/precondition";
import {ComponentIcon, MenuName, ScreenName, SegmentName} from "@shared/helpers/testdata";
import {Toolbar} from "@apps/iaa/screen-objects/components/header-toolbar/toolbar/toolbar.action";
import {MenuNavigationScreen} from "@apps/iaa/static/menu-navigation-screen.action";
import {StartScreen} from "@apps/iaa/screen-objects/start/start.screen.actions";
import {Contract} from "@apps/iaa/screen-objects/contract/contract.action";
import {ContractDetail} from "@apps/iaa/screen-objects/contract/contract-detail/contract-detail.action";
import {AlertDialog} from "@shared/screen-object-components";
import {Workflow} from "@apps/iaa/screen-objects/workflow/workflow";
import {Notification} from "@apps/iaa/screen-objects/components/header-toolbar/notification/notification.action";

const workingPartnerNumber: string = 'P-1007-9196';
const workingPartnerName: string = 'Bruno Zebert';
const startScreen = new StartScreen();

describe('Bulk downloading docs workflow: spinner icons, hour glass icons ', () => {

    beforeEach(() => {
        browser.setImplicitTimeout(3000);
        Precondition.removeAllRecentPartners();
    });

    afterEach(() => {
        browser.reloadSession();
    });

    it('displays the spinner and hour glass for menu ', () => {
        Precondition.doQuickSearchAndDisplayPartnerOverview(workingPartnerNumber);
        const toolbar = new Toolbar(ScreenName.Menu);
        toolbar.actionMenu
            .downloadAllDocuments(true)
        MenuNavigationScreen
            .verify()
            .expectComponentIconDisplayedOn(ComponentIcon.HourGlassIcon, MenuName.Contracts, true)
            .expectComponentIconDisplayedOn(ComponentIcon.HourGlassIcon, MenuName.Documents, true);
        toolbar
            .verify()
            .expectSpinnerDisplayOnHeader(true);
    });

    it('displays the spinner on toolbar of start screen and hour glass on favorite partner  ', () => {
        Precondition.displayFavoritePartnerName(workingPartnerName)
            .downloadAllDocumentsAndBackToOverview();
        startScreen.toolbar
            .verify()
            .expectSpinnerDisplayOnHeader(true);
        startScreen
            .verify()
            .expectComponentIconDisplayOnPartnerName(SegmentName.Favorites, workingPartnerName, ComponentIcon.HourGlassIcon, true)
    });

    it('displays and hour glass on recent partner ', () => {
        Precondition.doQuickSearchAndDisplayPartnerOverview(workingPartnerNumber)
            .reSyncIfError()
            .downloadAllDocumentsAndBackToOverview();
        startScreen
            .verify()
            .expectComponentIconDisplayOnPartnerName(SegmentName.Recent, workingPartnerName, ComponentIcon.HourGlassIcon, true);
    });
});

describe('Bulk downloading docs workflow: errorIcon icons', () => {
    beforeEach(() => {
        Precondition.removeAllRecentPartners()
            .doQuickSearchAndDisplayPartnerOverview(workingPartnerNumber)
            .reSyncIfError()
            .downloadAllDocumentButSendBackground();
    });

    afterEach(() => {
        browser.reloadSession();
    });
    it('displays header error Icon and error Icon on working partner', () => {
        startScreen.toolbar
            .verify()
            .expectErrorDisplayOnHeader(true);
        startScreen
            .verify()
            .expectComponentIconDisplayOnPartnerName(SegmentName.Favorites, workingPartnerName, ComponentIcon.ErrorIcon, true)
            .expectComponentIconDisplayOnPartnerName(SegmentName.Recent, workingPartnerName, ComponentIcon.ErrorIcon, true)
        startScreen.tapToFirstPartner();
    });

    it('re-downloads documents successfully', () => {
        startScreen.tapRecentSegment()
            .tapToFirstPartner();
        const menuToolbar = new Toolbar(ScreenName.Menu);
        menuToolbar.actionMenu.downloadAllDocumentsAndWaitUntilCompletion();
        menuToolbar.verify().expectErrorDisplayOnHeader(false);
        MenuNavigationScreen.verify().expectComponentIconDisplayedOn(ComponentIcon.SuccessIcon, MenuName.Contracts, true);
        MenuNavigationScreen.verify().expectComponentIconDisplayedOn(ComponentIcon.SuccessIcon, MenuName.Documents, true)

    })
});

describe('Bulk downloading on specific screen suites: ', () => {
    const contract = new Contract();
    const contractDetails = new ContractDetail();
    beforeEach(() => {
        Precondition
            .removeAllRecentPartners()
            .doQuickSearchAndDisplayPartnerOverview('P-1175-2272')
            .reSyncIfError();
        MenuNavigationScreen.tapMenuName(MenuName.Contracts)
    });
    afterEach(() => {
        browser.reloadSession();
    });

    it('displays properly after bulk downloading successfully', () => {
        contract.toolbar.actionMenu.downloadAllDocuments(true);
        contract.toolbar.notification.waitForSpinnerNotificationLoadingCompleted();
        contract.verify().expectDownloadedContracts();
        contract.tapContract();
        contractDetails
            .verify()
            .expectDownloadedContractDocuments();
        contractDetails
            .openDownloadedDocuments()
            .toolbar
            .actionMenu
            .downloadAllDocuments(false)
        AlertDialog
            .verify()
            .expectAlertMessage([
                'Downloading all documents...',
                'There are no more documents to download',
                'OK'
            ]);

    });
});

describe('Bulk downloading docs workflow: download successfully, multiple partners bulk downloading', () => {
    const toolbar = new Toolbar(ScreenName.Menu);

    beforeEach(() => {
        Precondition.removeAllRecentPartners();
    });
    afterEach(() => {
        browser.reloadSession();
    });

    const workingPartnerName: string = 'Bruno Zebert';
    const workingPartners: Array<string> = [
        'P-1007-9196',
        'P-1175-2272',
        'P-1471-0550',
        'P-2047-8718'
    ];

    it('display proper downloading states and no errors while downloading docs for multiple partners', () => {
        Precondition.doQuickSearchAndDisplayPartnerOverview(workingPartners[0])
            .reSyncIfError();
        toolbar.actionMenu
            .downloadAllDocuments(true)
        toolbar.tapHomeButton(true);
        Precondition.doQuickSearchAndDisplayPartnerOverview(workingPartners[1]);
        toolbar.actionMenu
            .downloadAllDocuments(true)
        MenuNavigationScreen.verify()
            .expectComponentIconDisplayedOn(ComponentIcon.HourGlassIcon, MenuName.Contracts, true)
            .expectComponentIconDisplayedOn(ComponentIcon.HourGlassIcon, MenuName.Documents, true)
        toolbar.tapHomeButton(true)
        startScreen.tapToPartnerName(workingPartnerName, SegmentName.Favorites);
        toolbar.notification
            .waitForSpinnerNotDisplay();
        toolbar.verify()
            .expectErrorDisplayOnHeader(false)
    });

    it('should be able to download all the contracts and documents for multiple partners', () => {
        Workflow.downloadDocsForMultiplePartners(workingPartners);
        new Notification(ScreenName.Start).waitForSpinnerNotificationLoadingCompleted();
        Workflow.verifyDownloadingDocsForMultiplePartners(workingPartners);
    });
});
