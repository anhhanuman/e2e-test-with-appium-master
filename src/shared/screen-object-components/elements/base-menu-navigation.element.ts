export class BaseMenuNavigationElement {
    private static readonly selectors = {
        menuNavigation: 'ion-list.menu-items ion-item',
        menuTitleH2: 'ion-list.menu-items ion-item div.menu-item-title h2',
        dataDetailsParent: 'ion-list.menu-items ion-item div.menu-item-detail',
    };


    static get menuNavigation() {
        return $$(this.selectors.menuNavigation);
    }

    static get dataDetailsParent() {
        return $$(this.selectors.dataDetailsParent);
    }

    static get menuTitleH2() {
        return $$(this.selectors.menuTitleH2);
    }
}
