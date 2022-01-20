import {ActionSheet} from "@apps/iaa/screen-objects/components/action-sheet/action-sheet-menu.action";
import {ToolbarElement} from "@apps/iaa/screen-objects/components/header-toolbar/toolbar/toolbar.element";
import {LoadingContent} from "@shared/screen-object-components/loading-content/loading.content";
import {NewFreeTextTaskModal} from "@apps/iaa/screen-objects/new-free-text-task/new-free-text-task.action";
import {Notification} from "@apps/iaa/screen-objects/components/header-toolbar/notification/notification.action";
import {HourGlassIcon} from "@apps/iaa/screen-objects/components/hour-glass/hour-glass.icon";

export class ActionMenu {
    private _actionMenuButton: WebdriverIO.Element;
    private element: ToolbarElement

    constructor(private screenName: string) {
        this.element = new ToolbarElement(this.screenName);
    }

    get actionMenuButton() {
        this._actionMenuButton = this.element.headerButtons[2];
        return this._actionMenuButton;
    }


    tapActionButton() {
        this.actionMenuButton.click()

        return new ActionSheet();
    }

    /* displayEditPartnerDataModal() {
         this.tapActionButton()
             .tapEditPartnerData()

         return new PartnerModification();
     }*/

    markAsFavorite() {
        this.tapActionButton()
            .tapMarkAsFavorite();
        LoadingContent.waitForLoadingContentDismiss();
    }

    unmarkAsFavorite() {
        this.tapActionButton()
            .tapUnMarkAsFavorite()
        LoadingContent.waitForLoadingContentDismiss();

    }

    displayNewFreeTextTaskModal() {
        this.tapActionButton()
            .tapCreateNewTask()

        return new NewFreeTextTaskModal();
    }

    syncPartnerData(waiting: boolean) {
        this.tapActionButton()
            .tapSyncPartnerData();
        if (waiting) {
            new Notification(this.screenName).waitForSpinnerDisplay();
            const hourGlassMenu = new HourGlassIcon(this.screenName);
            hourGlassMenu.waitForHourGlassIconsDisplay(hourGlassMenu.hourGlassSelector);
            hourGlassMenu.waitUntilHourGlassesNotDisplay(hourGlassMenu.hourGlassSelector);
        }

    }

    downloadAllDocuments(waitForStarting: boolean) {
        this.tapActionButton()
            .tapDownloadAllDocuments();
        if (waitForStarting) {
            new Notification(this.screenName).waitForSpinnerDisplay();
        }
    }

    downloadAllDocumentsAndWaitUntilCompletion() {
        this.downloadAllDocuments(true);
        new Notification(this.screenName).waitForSpinnerNotificationLoadingCompleted();

        return this;
    }

    /*waitForStartingDownloadingAllDocs() {
        const contractsMenuDetails = BaseMenuNavigationScreen.getMenuDetails('contracts');
        const documentMenuDetails = BaseMenuNavigationScreen.getMenuDetails('documents');
        const numberOfGreenIcons = BaseMenuNavigationScreen.getNumberSuccessfulDownloadedIcons();

        if (numberOfGreenIcons === 0) {
            if (contractsMenuDetails && documentMenuDetails === '') {
                return this;
            } else {
                Screen.waitForElementDisplay(HeaderToolbarElement.getHeaderSpinnerNotificationIcon('menu'));
                return this;
            }
        } else if (numberOfGreenIcons === 1) {
            const contractGreenIconDisplay = BaseMenuNavigationScreen.isDownloadedIconDisplayedOn();
            const documentGreenIconDisplay = BaseMenuNavigationScreen.isDownloadedIconDisplayedOnDocument();

            if (contractGreenIconDisplay === true || documentGreenIconDisplay === true) {
                Screen.waitForElementDisplay(HeaderToolbarElement.getHeaderSpinnerNotificationIcon('menu'));
            }
            return this;
        } else {
            return this;
        }
    }*/


}
