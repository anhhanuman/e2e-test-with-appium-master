import {Contexts} from '@shared/helpers';
import {NewFreeTextTaskModal} from '@apps/iaa/screen-objects/new-free-text-task/new-free-text-task.action';
import {AlertDialog} from '@shared/screen-object-components';
import {Precondition} from "@apps/iaa/precondition/precondition";
import {MenuNavigationScreen} from "@apps/iaa/static/menu-navigation-screen.action";
import {ButtonName} from "@shared/helpers/testdata";

const newFreeTextTaskModalScreen = new NewFreeTextTaskModal();

describe('Free text task suite', () => {
    beforeEach(() => {
        Contexts.switchToWebview();
        Precondition.doQuickSearchAndDisplayPartnerOverview('P-1175-2272')
            .displayNewFreeTextTaskForm();
    });
    afterEach(() => {
        browser.reloadSession();
    });

    xit('should be able to create a new free text task', () => {
        newFreeTextTaskModalScreen.inputSubject('Deck').verify().expectedFoundNumberOfAutoCompletesEqual(1);
        newFreeTextTaskModalScreen
            .selectValueInAutoCompleteBoxes(0)
            .verify()
            .expectedSelectingValueEqual('Deckungszusage abgegeben für:');
        newFreeTextTaskModalScreen
            .inputDescription('Automation text for the description field')
            .expandSection()
            .inputComment('Automation text for the comment field')
            .tapCreateButton();
        MenuNavigationScreen.verify().expectFoundFreeTextTaskCreatedNotification(
            'Creating free text task\nDeckungszusage abgegeben für:'
        );
    });

    it('should be able to close the free text task modal', () => {
        newFreeTextTaskModalScreen.toolbar.baseToolbar.tapToToolbarButton(ButtonName.Close)
        AlertDialog
            .verify()
            .expectAlertMessage([
                'Discard this task?',
                'You are about to discard the current task.',
                'Discard',
                'Keep'
            ]);
    });
});
