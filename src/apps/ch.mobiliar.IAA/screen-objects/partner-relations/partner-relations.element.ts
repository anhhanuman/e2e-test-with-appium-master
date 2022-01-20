export class PartnerRelationsElement {
    private readonly selectors = {
        relationStates: 'div.sub-header',
        partners: 'div.child-page-content mobi-card',
        activePartners: 'div.child-page-content div:nth-of-type(1) mobi-card',
        terminatedPartners: 'div.child-page-content div:nth-of-type(2) mobi-card'
    };

    get partners() {
        return $$(this.selectors.partners);
    }

    get relationStates() {
        return $$(this.selectors.relationStates);
    }

    get partnerTitlesAndContents() {
        const titles = $$(this.selectors.partners.concat(' div.main-container div.container span.title'));
        const partnerNumberAndDOB = $$(this.selectors.partners.concat(' div.content div'));
        const contractAndRole = $$(this.selectors.partners.concat(' mobi-icon-text div div.content'));
        const roleLabels = $$(this.selectors.partners.concat(' mobi-icon-text div span.title'));
        let titlesAndContents;
        titlesAndContents = titles.concat(partnerNumberAndDOB, contractAndRole, roleLabels);

        return titlesAndContents;
    }

    get activePartners() {
        return $$(this.selectors.activePartners);
    }

    get terminatedPartners() {
        return $$(this.selectors.activePartners);
    }
}
