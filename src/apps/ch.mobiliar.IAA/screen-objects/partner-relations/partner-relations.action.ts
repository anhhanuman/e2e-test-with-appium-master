import {PartnerRelationsElement} from './partner-relations.element';
import {PartnerRelationsValidator} from './partner-relations.validator';
import {Screen} from '@shared/helpers/screen';
import {BaseScreen} from "@apps/iaa/screen-objects/base/base-screen.action";
import {ScreenName} from "@shared/helpers/testdata";
import {Toolbar} from "@apps/iaa/screen-objects/components/header-toolbar/toolbar/toolbar.action";

export class PartnerRelationsScreen extends BaseScreen {
    private partnerRelationsElement = new PartnerRelationsElement();
    private readonly _toolbar: Toolbar

    constructor() {
        //super(ScreenName.PartnerRelation);
        super(ScreenName.PartnerRelation);
        this._toolbar = new Toolbar(ScreenName.PartnerRelation)
    }

    get toolbar() {
        return this._toolbar;
    }

    verify() {
        return new PartnerRelationsValidator(this);
    }

    getNumberOfPartnersInRelation() {
        return this.partnerRelationsElement.partners.length;
    }

    getPartnerRelationStates() {
        let states = this.partnerRelationsElement.relationStates;

        return Screen.getTextOfElements(states);
    }

    getPartnerRelationsInfo() {
        let partnerRelationTitleAndContent = this.partnerRelationsElement
            .partnerTitlesAndContents;

        return Screen.getTextOfElements(partnerRelationTitleAndContent);
    }

    getNumberOfPartnersInStates(whatState: string) {
        if (whatState === relationStates[0]) {
            return this.partnerRelationsElement.activePartners.length;
        } else {
            return this.partnerRelationsElement.terminatedPartners.length;
        }
    }
}

const relationStates = ['Active', 'Terminated'];
const numberOfPartnersInRelation = 6;
const partnerRelationsInfo = [
    'Fonseca Paul Müller',
    'Has contracts',
    'Mueller Kunz-Wagner Paul',
    'P-1009-2738\n02.12.1960 (59)',
    'P-1301-8718\n15.07.1986 (34)',
    'P-1332-4789\n18.03.1974 (46)',
    'P-1693-8914',
    'P-2047-8718\n15.05.1963 (57)',
    'P-2083-8050',
    'Paul Gloor',
    'Paul Gloor',
    'Paul Kenel',
    'Paul Wicki',
    'Role',
    'Role',
    'Role',
    'Role',
    'Role',
    'Role',
    'hat Kunde',
    'hat Makler von',
    'hat Zahlstelle',
    'ist Experte',
    'ist Kunde',
    'ist Zahlstelle zu'
];

export {relationStates, numberOfPartnersInRelation, partnerRelationsInfo};
