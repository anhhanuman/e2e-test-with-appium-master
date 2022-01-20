import {BaseSelector} from '@shared/selectors/base-selector.selector';

export class AddDocumentElement {
    private readonly selector = {
        closeModalButton: BaseSelector.getAddDocumentScreen(),
        addDocumentContent: 'app-add-document ion-content',
        selectedDocumentContainer: 'div.document-type-select-container',
        pickerWheel: '//XCUIElementTypePicker/XCUIElementTypePickerWheel',
        hintNoDocuments: 'app-document mobi-hint',
        hintTaskCreationIcon: 'div.create-task-container mobi-icon',
        hintTaskCreation: BaseSelector.getAddDocumentScreen().concat(' mobi-hint')
    };

    get hintTaskCreation() {
        return $(this.selector.hintTaskCreation);
    }

    get hintTaskCreationIcon() {
        return $(this.selector.hintTaskCreationIcon);
    }

    get pickerWheel() {
        return $(this.selector.pickerWheel);
    }

    get addDocumentContent() {
        return $(this.selector.addDocumentContent);
    }

    get addButton() {
        return $(this.selector.addDocumentContent.concat(' ', 'div.button-container button'));
    }

    get penIcon() {
        return $(this.selector.addDocumentContent.concat(' ', 'div.pencil-container mobi-icon'));
    }

    get toolTipContent() {
        return $(this.selector.addDocumentContent.concat(' ', 'mobi-tooltip', ' mobi-hint div.container'));
    }

    get errorIconDocumentCategory() {
        return $(this.selector.addDocumentContent.concat(' ', 'mobi-icon.error-icon ion-icon'));
    }

    get selectedDocumentContainer() {
        return $(this.selector.addDocumentContent.concat(' ', this.selector.selectedDocumentContainer, ' ', 'div.document-type-select'));

    }

    get documentIcon() {
        return $(this.selector.addDocumentContent.concat(' ', 'mobi-card mobi-icon'));
    }

    get selectedDocumentContent() {
        return $(
            this.selector.addDocumentContent.concat(
                ' ',
                this.selector.selectedDocumentContainer,
                ' ',
                'div.content'
            )
        );
    }

    get mappedDocumentCategory() {
        return $(
            this.selector.addDocumentContent.concat(
                ' ',
                this.selector.selectedDocumentContainer,
                ' ',
                'div.content b'
            )
        );
    }

    get documentPreviewCardContent() {
        return $(this.selector.addDocumentContent.concat(' ', 'mobi-item-card mobi-card div.container'));
    }

    get documentPreviewCardTitle() {
        return $(
            this.selector.addDocumentContent.concat(
                ' ',
                'mobi-item-card mobi-card div.container',
                ' span.title'
            )
        );
    }

    get documentNameInput() {
        return $(this.selector.addDocumentContent.concat(' ', 'input.native-input'));
    }

    get errorIconOnToolTip() {
        const errorIconToolTip: string = 'app-add-document ion-content mobi-tooltip mobi-hint  mobi-icon.icon-error ion-icon';

        return $(errorIconToolTip);
    }

    get hintNoDocumentsBox() {
        return $(this.selector.hintNoDocuments);
    }

    get hintNoDocumentsTitleContent() {
        return $(this.selector.hintNoDocuments.concat(' ', 'div.container'));
    }

    get hintIcon() {
        return $(this.selector.hintNoDocuments.concat(' ', 'mobi-icon'));
    }
}
