import {Contexts} from "@shared/helpers";
import {Screen} from "@shared/helpers/screen";

export class ActionSheet {
    tapEditPartnerData() {
        Contexts.doTasksInNativeContext(() => {
            const selector = '~Edit partner data'
            Screen.tapAndWaitForNotDisplay($(selector));
        });
    }

    tapMarkAsFavorite() {
        Contexts.doTasksInNativeContext(() => {
            const selector = '~Mark as favorite'
            Screen.tapAndWaitForNotDisplay($(selector));
        });
    }

    tapUnMarkAsFavorite() {
        Contexts.doTasksInNativeContext(() => {
            const selector = '~Unmark as favorite'
            Screen.tapAndWaitForNotDisplay($(selector));
        });
    }

    tapCreateNewTask() {
        Contexts.doTasksInNativeContext(() => {
            const selector = '~Create new task';
            Screen.tapAndWaitForNotDisplay($(selector));
        });
    }

    tapSyncPartnerData() {
        Contexts.doTasksInNativeContext(() => {
            const selector = '~Synchronize partner data';
            Screen.tapAndWaitForNotDisplay($(selector));
        });

    }

    tapDownloadAllDocuments() {
        Contexts.doTasksInNativeContext(() => {
            const selector = '~Download all documents';
            Screen.tapAndWaitForNotDisplay($(selector));
        });
    }
}
