export class MenuSelectors {
    private readonly selectors = {
        homeButton: '',
        topRightRegisterButton: '',
        topRightDeleteClaimButton: '',
        topRightInspectionButton: '',
        topRightGetClaimNumberButton: '',
        bottomRegisterButton: '',
        bottomDeleteButton: '',
        bottomBeginInspectionButton: '',
        bottomGetClaimNumberButton: '',
        menuNavigation: 'ion-menu ion-list ion-item',
        menuNavigationContent: 'ion-menu ion-list ion-item h2',
        menuExpand: 'ion-split-pane#split-pane.split-pane-expanded'
    };

    get homeButton() {
        return $(this.selectors.homeButton);
    }

    get topRightDeleteClaimButton() {
        return $(this.selectors.topRightDeleteClaimButton);
    }

    get topRightRegisterButton() {
        return $(this.selectors.topRightRegisterButton);
    }

    get topRightInspectionButton() {
        return $(this.selectors.topRightInspectionButton);
    }

    get topRightGetClaimNumberButton() {
        return $(this.selectors.topRightGetClaimNumberButton);
    }

    get bottomRegisterButton() {
        return $(this.selectors.bottomRegisterButton);
    }

    get bottomBeginInspectionButton() {
        return $(this.selectors.bottomBeginInspectionButton);
    }

    get bottomGetClaimNumberButton() {
        return $(this.selectors.bottomGetClaimNumberButton);
    }

    get bottomDeleteButton() {
        return $(this.selectors.bottomDeleteButton);
    }

    get menuNavigationContent() {
        return $$(this.selectors.menuNavigationContent);
    }

    get menuNavigation() {
        return $$(this.selectors.menuNavigation);
    }

    get menuExpand() {
        return $(this.selectors.menuExpand);
    }
}
