export class MenuElement {
    private readonly selectors = {
        detailsData: 'div.menu-item-detail',
        successfulCreatedTask: 'div.free-text-task-notification'
    }
    private _menuSelector = 'ion-list.menu-items ion-item';

    get menuSelector(): string {
        return this._menuSelector;
    }

    get menu(): WebdriverIO.Element[] {
        return $$(this._menuSelector);
    }

    get detailsData() {
        return $$(this.selectors.detailsData)
    }

    get createdFreeTextTaskAlert() {
        return $(this.selectors.successfulCreatedTask);
    }

}
