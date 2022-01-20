export class PartnerOffersElement {
    private readonly selectors = {
        offers: 'div mobi-card.view-only'
    };

    get offers() {
        return $$(this.selectors.offers);
    }

    get offerTitlesAndContents() {
        let titles = $$(this.selectors.offers.concat(' span.title'));
        let contents = $$(this.selectors.offers.concat(' div.content div'));
        let titlesAndContents;
        titlesAndContents = titles.concat(contents);

        return titlesAndContents;
    }
}
