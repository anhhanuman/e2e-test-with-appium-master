import {PartnerClaims} from '../../screen-objects/partner-claims-list/partner-claims.action';
import {partnerClaimDetailsScreen} from '../../screen-objects/partner-claim-details/partner-claim-details.action';
import allureReporter from '@wdio/allure-reporter';
import {Precondition} from "@apps/iaa/precondition/precondition";

const partnerClaims = new PartnerClaims();
describe('Claims Screen', () => {
    beforeEach(() => {
        Precondition.displayClaimsScreen('P-1471-0550');
        partnerClaims.waitForDisplay();
    });
    afterEach(() => {
        browser.reloadSession();
    });

    xit('should display the proper pending/finished claims list', () => {
        allureReporter.addFeature('Claims List');
        allureReporter.addStory('HAN-1092: Implement new MCS Information Service. ');
        allureReporter.addStory('HAN-1129: Implement Coverage of the Partial Claim');
        allureReporter.addDescription('verify the claims list of pending and finished segment', 'test');
        allureReporter.addSeverity('critical');

        const expectedPendingClaimsList: Array<string> = [
            'Fahrzeug, 04.08.2020, CH\n04.08.2020, 12:00\nAlte Bernstrasse, 3075 Worb, CH',
            'MF Kasko,\nPendent, noch nicht beurteilt',
            'Fahrzeug, 16.10.2020, 3075 Rüfenacht BE\n16.10.2020, 09:00\nAlte Bernstrasse 69, 3075 Rüfenacht BE',
            'MF Haft, Betrieb des Fahrzeuges\nPendent, noch nicht beurteilt'
        ];

        const expectedFinishedClaimsList: Array<string> = [
            'Fahrzeug, 05.11.2019, 3075 Rüfenacht BE\n05.11.2019, 00:00\nBächimattstrasse 30, 3075 Rüfenacht BE',
            'MF Kasko, Normale Kollision, BE 634156, VW Golf+ 1.9 TDI Trend\nErledigt, gegeben',
            'Assistance, 03.09.2019, FR Les Diablerets\n03.09.2019, 00:00\nFR Les Diablerets',
            'MF Assistance, Reifen, BE 634156, VW Golf+ 1.9 TDI Trend\nErledigt, gegeben',
            'Fahrzeug, 14.06.2019, 3073 Gümligen\n14.06.2019, 00:00\nSpital Siloah längs der Strasse vor der Einfahrt bei der Baustelle, 3073 Gümligen',
            'MF Kasko, Normale Kollision, BE 634156, VW Golf+ 1.9 TDI Trend\nErledigt, gegeben'
        ];

        partnerClaims
            .verify()
            .expectedSegmentNames(['Pending (2)', 'Finished (3)'])
            .expectedNumberOfPendingFullClaims(2)
            .expectedFoundPendingClaimCardsList(expectedPendingClaimsList)
            .expectedNumberOfFinishedFullClaims(3)
            .expectedFoundFinishedClaimCardsList(expectedFinishedClaimsList);
    });

    it('should display the proper claim with further partial claims', () => {
        allureReporter.addFeature('Claims List');
        allureReporter.addStory('HAN-1092: Implement new MCS Information Service. ');
        allureReporter.addStory('HAN-1129: Implement Coverage of the Partial Claim');
        allureReporter.addDescription('verify the claims list of pending which has further partial claims', 'test');
        allureReporter.addSeverity('critical');

        partnerClaims
            .tapFurtherPartialClaim(0)
            .verify()
            .expectedClaimWithFurtherPartialClaimsContent(
                1,
                0,
                'Fahrzeug, 16.10.2020, 3075 Rüfenacht BE\n16.10.2020, 09:00\nAlte Bernstrasse 69, 3075 Rüfenacht BE\nMF Haft, Betrieb des Fahrzeuges\nPendent, noch nicht beurteilt\nMF Kasko, Diebstahl, BE 634156, VW Golf+ 1.9 TDI Trend\nPendent, noch nicht beurteilt\nHide partial claims'
            );
        partnerClaims
            .tapFurtherPartialClaim(0)
            .verify()
            .expectedClaimWithoutFurtherPartialClaimsContents(
                1,
                'Fahrzeug, 16.10.2020, 3075 Rüfenacht BE\n16.10.2020, 09:00\nAlte Bernstrasse 69, 3075 Rüfenacht BE\nMF Haft, Betrieb des Fahrzeuges\nPendent, noch nicht beurteilt\nFurther partial claims (1)'
            );
    });

    it('should display the proper finished claim details', () => {
        allureReporter.addFeature('Claim Overview - Finished claim details');
        allureReporter.addStory('HAN-1092: Implement new MCS Information Service. ');
        allureReporter.addStory('HAN-1129: Implement Coverage of the Partial Claim');
        allureReporter.addDescription('verify a claim details including: ', 'test');

        partnerClaims.tapSegment('finished').tapClaim(0);
        partnerClaimDetailsScreen
            .verify()
            .expectedClaimDetails([
                ['Claim Number', '8003.0724.7991'],
                ['Damage date', '05.11.2019, 00:00'],
                ['Place', 'Bächimattstrasse 30, 3075 Rüfenacht BE'],
                ['Course of events', 'VK Schaden; 1500.-'],
                ['Partial claim number', '8003.0724.8008'],
                ['Status', 'Erledigt, gegeben'],
                ['Roles', '']
            ])
            .expectedPaymentInformation([
                ['Compensation', 'CHF', '1’049.60'],
                ['Net costs', 'CHF', '0.00']
            ])
            .expectedResponsibleEmployeeForPartialClaim(['André Friedrich', 'U119077\nEmmental (409)']);
    });

    it('should display the proper pending claim details', () => {
        allureReporter.addFeature('Claim Overview - Pending claim details');
        allureReporter.addStory('HAN-1092: Implement new MCS Information Service. ');
        allureReporter.addStory('HAN-1129: Implement Coverage of the Partial Claim');
        allureReporter.addDescription('This is the allure reporter description', 'I dont know the type');

        partnerClaims.tapClaim(0);
        partnerClaimDetailsScreen
            .verify()
            .expectedClaimDetails([
                ['Claim Number', '8400.1153.1470'],
                ['Damage date', '04.08.2020, 12:00'],
                ['Place', 'Alte Bernstrasse, 3075 Worb, CH'],
                ['Course of events', 'jjj'],
                ['Partial claim number', '8400.1153.1484'],
                ['Status', 'Pendent, noch nicht beurteilt'],
                ['Roles', '']
            ])
            .expectedPaymentInformation([
                ['Compensation', 'CHF', '0.00'],
                ['Net costs', 'CHF', '0.00']
            ])
            .expectedResponsibleEmployeeForPartialClaim(['Katharina Gerber-Scheidegger', 'U101382\nEmmental (409)']);
    });
});
