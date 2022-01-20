import {Screen} from '@shared/helpers/screen';
import {ContractDetailValidator} from '@apps/iaa/screen-objects/contract/contract-detail/contract-detail.validator';
import {ScreenName} from '@shared/helpers/testdata';
import {ContractDetailElement} from '@apps/iaa/screen-objects/contract/contract-detail/contract-detail.element';
import {LoadingContent} from '@shared/screen-object-components/loading-content/loading.content';
import {BaseScreen} from "@apps/iaa/screen-objects/base/base-screen.action";
import {Toolbar} from "@apps/iaa/screen-objects/components/header-toolbar/toolbar/toolbar.action";
import {Contexts} from "@shared/helpers";

export class ContractDetail extends BaseScreen {
    private readonly element: ContractDetailElement;
    private readonly _toolbar: Toolbar

    constructor() {
        super(ScreenName.ContractDetails)
        this._toolbar = new Toolbar(ScreenName.ContractDetails);
        this.element = new ContractDetailElement();
    }

    verify() {
        return new ContractDetailValidator(this);
    }

    getTotalContractDocuments() {
        return this.element.documentElements.length
    }

    getTotalDownloadedIcons(): number {
        const greenCheckIcons = this.element.successfulDownloadedIcons

        return Screen.getTotalDisplayingElements(greenCheckIcons);
    }

    downloadPolicy() {
        const cardSelector = this.element.mobiCardElement.cardSelector;
        const policyCardElement = this.element.mobiCardElement.getComponentElements(cardSelector)[0]
        Screen.tapToElement(policyCardElement);
        expect(Screen.getTextOfElement(LoadingContent.loadingContent)).toEqual('Downloading contract document. Please wait a moment...');
        LoadingContent.waitForLoadingContentDismiss();
        this.tapCloseButtonOnOpenedDocument();

        return this;
    }

    openDownloadedDocument(position: number) {
        this.element.mobiCardElement.tapMobiCardAt(position);
        this.tapCloseButtonOnOpenedDocument();

        return this;
    }

    tapCloseButtonOnOpenedDocument() {
        Contexts.doTasksInNativeContext(() => {
            const doneButtonSelector = '~Close';
            Screen.tapWhenDisplay($(doneButtonSelector));
        });
    }

    openDownloadedDocuments() {
        const elements = this.element.documentElements;
        for (const element of elements) {
            this.element.mobiCardElement.tapMobiCardElement(element);
            this.tapCloseButtonOnOpenedDocument();

        }

        return this;
    }

}

