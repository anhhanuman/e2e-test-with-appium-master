import {AutoCompleteScreen} from '@shared/screen-object-components/auto-complete/auto-complete.screen';
import {AutoCompleteValidator} from '@shared/screen-object-components/auto-complete/auto-complete.validator';
import {BaseElement} from '@shared/screen-object-components/elements/base.element';
import {Screen} from '@shared/helpers/screen';
import {LoadingContent} from '@shared/screen-object-components/loading-content/loading.content';
import Input from '../../../../shared/helpers/input';
import {BaseScreen} from "@apps/iaa/screen-objects/base/base-screen.action";
import {ScreenName} from "@shared/helpers/testdata";

export class NewFreeTextTaskModal extends BaseScreen {

    constructor() {
        super(ScreenName.NewFreeTextTask);
    }

    inputSubject(whatToInput: string) {
        AutoCompleteScreen.inputValue(whatToInput);

        return this;
    }

    selectValueInAutoCompleteBoxes(position: number) {
        AutoCompleteScreen.selectValueInAutoComplete(position);

        return this;
    }

    getSubjectValue(): string {
        return AutoCompleteScreen.getSelectingAutoCompleteValue();
    }

    verify() {
        return new AutoCompleteValidator(AutoCompleteScreen);
    }

    inputDescription(whatToInput: string) {
        const description = BaseElement.textArea[0];
        Input.inputValue(description, whatToInput);
        browser.pause(5000);

        return this;
    }

    inputComment(whatToInput: string) {
        const comment = BaseElement.textArea[1];
        Input.inputValue(comment, whatToInput);
        browser.pause(5000);

        return this;
    }

    expandSection() {
        const expandButton = BaseElement.expandCollapse;
        const comment = BaseElement.textArea[1];
        Screen.tapToExpandSection(expandButton, comment);

        return this;
    }

    tapCreateButton() {
        Screen.tapToElement(BaseElement.submitButton);

        return this;
    }

    tapCreateButtonAndWaitForProcessing() {
        this.tapCreateButton();
        LoadingContent.waitForLoadingContentDismiss();

        return this;
    }
}


