import {PartnerDetailsElement} from './partner-details.element';
import {Contexts} from '@shared/helpers';
import {Screen} from '@shared/helpers/screen';
import {PartnerDetailsValidator} from './partner-details.validator';
import {BaseScreen} from "@apps/iaa/screen-objects/base/base-screen.action";
import {ScreenName} from "@shared/helpers/testdata";
import {Error} from "ts-lint/lib/error";

export class PartnerDetailsScreen extends BaseScreen {
    private element: PartnerDetailsElement

    constructor() {
        super(ScreenName.BasicData);
        this.element = new PartnerDetailsElement();
    }

    verify() {
        return new PartnerDetailsValidator(this);
    }

    getPartnerNumber() {
        const partnerNumber = this.element.partnerNumber.getText().trim();
        if (partnerNumber === null) {
            throw new Error('Review test case because impact to the remove favorite partner test cases')
        } else {
            return partnerNumber

        }
    }

    getItemLabels(): Array<string> {
        const itemTextLabelElements = this.element.getMobiItemTextLabels();
        return Screen.getTextOfElements(itemTextLabelElements);
    }

    getMainCommunication(): Array<string>[] {
        const itemTextLabelElements = this.element.getMobiItemTextLabels();
        const itemTextElements = this.element.getMobiItemTextContents();
        const mainCommunicationSize: number = this.getMainCommunicationLabels().length;

        return Screen.getItemTextTitleAndContent(itemTextLabelElements, itemTextElements, mainCommunicationSize);
    }

    getMainCommunicationContents(): Array<string> {
        const itemTextElements = this.element.getMobiItemTextContents();

        let elementTexts = [];
        const actualMainCommunicationLabels = this.getMainCommunicationLabels();
        for (let index = 0; index < itemTextElements.length; index++) {
            if (index < actualMainCommunicationLabels.length) {
                elementTexts.push(itemTextElements[index].getText());
            }
        }

        return elementTexts;
    }

    getMainCommunicationLabels() {
        const possibleMainCommunication: Array<string> = [
            'Telephone number',
            'Mobile number',
            'Business number',
            'E-mail'
        ];
        let actualMainCommunication = [];
        const itemLabels = this.getItemLabels();

        for (const data of possibleMainCommunication) {
            if (itemLabels.includes(data)) {
                actualMainCommunication.push(data);
            }
        }

        return actualMainCommunication;
    }

    getContactInfo() {
        const contactInfo = this.element.mobiItemTextLabelAndContent;

        return Screen.getTextOfElements(contactInfo);
    }

    getTextOfMobiAccount(): Array<string> {
        const mobiAccountElements = this.element.getMobiItemCardTitleAndContent(1);

        return Screen.getTextOfElements(mobiAccountElements);
    }

    getTextBankAccount(): Array<string> {
        const bankAccountElements = this.element.getMobiItemCardTitleAndContent(
            2
        );

        return Screen.getTextOfElements(bankAccountElements);
    }

    getTextResponsibleAgent(): Array<string> {
        const MBA = this.element.getMobiItemCardTitleAndContent(3);

        return Screen.getTextOfElements(MBA);
    }

    displayResponsibleAgentCommunication() {
        const ellipsisIcons = this.element.ellipsisIcons;
        Screen.tapToElement(ellipsisIcons[1]);

        return this;
    }

    getMBAcommunicationDisplayingStates(): Array<boolean> {
        Contexts.switchToNative();
        let states: Array<boolean> = [];
        states.push(this.isMBALabelDisplayed(), this.isMBACallNumberDisplayed(), this.isMBAEmailDisplayed());
        Contexts.switchToWebview();
        return states;
    }

    tapToCallMBA() {
        Contexts.doTasksInNativeContext(() => {
            const callNumber = this.element.mbaCommunicationPhone;
            Screen.tapAndWaitForNotDisplay(callNumber);
        });

        return this;
    }

    isMBALabelDisplayed(): boolean {
        return this.element.mbaCommunicationLabel.isDisplayed();
    }

    isMBACallNumberDisplayed(): boolean {
        return this.element.mbaCommunicationPhone.isDisplayed();
    }

    isMBAEmailDisplayed(): boolean {
        return this.element.mbaCommunicationEmail.isDisplayed();
    }

    isCallWhenClickNativeDisplayed(): boolean {
        const mbaPhone = this.element.phoneWhenClick;
        mbaPhone.click();
        return mbaPhone.isDisplayed();
    }
}

export const PaulGloorMBA = ['Ricardo Da Costa', 'U120300\nLa Broye (173)'];
export const PaulEbenerMBA = ['Basel', 'Basel (125)'];

export const PaulGloorBankAccount = [
    'PostFinance AG',
    'Mingerstrasse 20, 3030 Bern\nCH57 0900 0000 1764 0409 6'
];
export const PaulEbenerBankAccount = [
    'UBS Switzerland AG',
    'Aeschenplatz 6, 4002 Basel\nCH89 0023 3233 2829 0500 0'
];
export const MobiAccount = ['MyMobiliar', 'C-1000376'];
export const NoCustomerPortalAccount = ['MyMobiliar', 'has no login'];
export const PaulGloorContactInfo = [
    'Telephone number',
    'Mobile number',
    'Address',
    'Partner Roles',
    '+41273169015',
    '+41752940930',
    'Wengliswil, 1715 Alterswil FR',
    'Kunde, Beziehungspartner'
];

export const PaulEbenerContactInfo = [
    'Telephone number',
    'Mobile number',
    'Business number',
    'E-mail',
    'Address',
    'Profession',
    'Partner Roles',
    '+41611961736',
    '+41756931098',
    '+41615493889',
    'Ebener@test3.xx',
    'Spitzwaldhof, 4123 Allschwil',
    'Archäologischer Grabungstechniker/Archäologische Grabungstechnikerin',
    'Schadenpartner, Beziehungspartner'
];
