/*
import {PartnerModificationElement} from '@apps/iaa/screen-objects/partner-modification/partner-modification.element';
import {Screen} from '@shared/helpers/screen';
import Input from '@shared/helpers/input';
import {PartnerModificationValidator} from '@apps/iaa/screen-objects/partner-modification/partner-modification.validator';
import {ButtonName, ScreenName} from "@shared/helpers/testdata";
import {BaseScreen} from "@apps/iaa/screen-objects/base/base-screen.action";

export class PartnerModification extends BaseScreen {
    private element = new PartnerModificationElement();

    constructor() {
        super(ScreenName.EditPartner);
    }


    verify() {
        return new PartnerModificationValidator(this);
    }

    closeModal() {
        super.toolbar
            .tapToToolbarButton(ButtonName.Close);
    }

    tapPrivateNumberCard() {
        const privateNumberCardElement = this.element.communicationCards[0];
        privateNumberCardElement.click();

        return this;
    }

    tapMobileNumberCard() {
        const privateNumberCardElement = this.element.communicationCards[1];
        privateNumberCardElement.click();

        return this;
    }

    tapBusinessNumberCard() {
        const privateNumberCardElement = this.element.communicationCards[2];
        privateNumberCardElement.click();

        return this;
    }

    tapEmailNumberCard() {
        const privateNumberCardElement = this.element.communicationCards[3];
        privateNumberCardElement.click();

        return this;
    }

    inputNumber(whatInput: number) {
        const numberField = this.element.communicationInput;
        Input.inputValue(numberField, whatInput.toString());

        return this;
    }

    inputEmail(whatEmail: string) {
        const emailField = this.element.communicationInput;
        Input.inputValue(emailField, whatEmail);

        return this;
    }

    addPrivateNumber(whatPrivateNumber: number) {
        this.tapPrivateNumberCard().inputNumber(whatPrivateNumber);

        return this;
    }

    addMobileNumber(whatMobileNumber: number) {
        this.tapMobileNumberCard().inputNumber(whatMobileNumber);

        return this;
    }

    addBusinessNumber(whatBusinessNumber: number) {
        this.tapBusinessNumberCard().inputNumber(whatBusinessNumber);

        return this;
    }

    addEmail(whatEmail: string) {
        this.tapEmailNumberCard().inputEmail(whatEmail);

        return this;
    }

    getMainCommunicationCardDetails(): Array<string>[] {
        const titleElements = this.element.communicationCardTitles;
        const contentElements = this.element.communicationCardContents;
        const numberOfCommunicationCards = this.element.communicationCards.length;
        return Screen.getItemTextTitleAndContent(titleElements, contentElements, numberOfCommunicationCards);
    }

    getMainCommunicationInfo(): Array<string>[] {
        const communicationPosition = this.getCommunicationCardPositions();
        const titleElements = this.element.communicationCardTitles;
        const contentElements = this.element.communicationCardContents;

        return Screen.getItemTextTitleAndContentAtPositions(titleElements, contentElements, communicationPosition);
    }

    tapBackButton() {
        Screen.tapToElement(this.element.backButton);

        return this;
    }

    getCommunicationInputText(): string {
        return Screen.getTextOfElement(this.element.communicationInput);
    }

    getNonCommunicationInfo(): Array<string>[] {
        const nonCommunicationPosition = this.getNonCommunicationCardPositions();
        const titleElements = this.element.communicationCardTitles;
        const contentElements = this.element.communicationCardContents;

        return Screen.getItemTextTitleAndContentAtPositions(titleElements, contentElements, nonCommunicationPosition);
    }

    getNonCommunicationCardPositions() {
        const communicationDetails = this.getCommunicationTitles();
        let nonCommunicationInfoPositions = [];
        for (let i = 0; i < communicationDetails.length; i++) {
            if (communicationDetails[i].includes('No')) {
                nonCommunicationInfoPositions.push(i);
            }
        }

        return nonCommunicationInfoPositions;
    }

    getCommunicationCardPositions(): Array<number> {
        const communicationDetails = this.getCommunicationTitles();
        let communicationPositions = [];

        for (let i = 0; i < communicationDetails.length; i++) {
            if (!communicationDetails[i].includes('No')) {
                communicationPositions.push(i);
            }
        }

        return communicationPositions;
    }

    getCommunicationTitles() {
        return Screen.getTextOfElements(this.element.communicationCardTitles);
    }

    getPrivateNumberCard(): Array<string> {
        return Screen.getTextOfMobiCard(
            this.element.getCommunicationCardTitle(1),
            this.element.getCommunicationCardContent(1)
        );
    }

    getMobileNumberCard(): Array<string> {
        return Screen.getTextOfMobiCard(
            this.element.getCommunicationCardTitle(2),
            this.element.getCommunicationCardContent(2)
        );
    }

    getBusinessNumberCard(): Array<string> {
        return Screen.getTextOfMobiCard(
            this.element.getCommunicationCardTitle(3),
            this.element.getCommunicationCardContent(3)
        );
    }

    getEmailCard(): Array<string> {
        return Screen.getTextOfMobiCard(
            this.element.getCommunicationCardTitle(4),
            this.element.getCommunicationCardContent(4)
        );
    }
}

*/
