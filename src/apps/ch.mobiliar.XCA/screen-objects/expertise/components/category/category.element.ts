export class CategoryElement {
    private readonly baseSelector = {
        category: 'div.add-inner',
        additionalCategory: 'div.add-container.other div.add-inner'
    }
    private readonly selectors = {
        categoryIcons: this.baseSelector.category.concat(' ion-icon'),
        categoryNames: this.baseSelector.category.concat(' span'),
        additionalCategoryIcon: this.baseSelector.additionalCategory.concat(' ion-icon'),
    }

    get categoryIcons() {
        return $$(this.selectors.categoryIcons);
    }

    get categoryNames() {
        return $$(this.selectors.categoryNames);
    }

    get namedCategoryIcons() {
        const numberOfCategoriesWithName = this.categoryNames.length;
        const allCategoryIconElement = this.categoryIcons;
        let allCategoryIconWithNameElements = [];

        for (let i = 0; i < numberOfCategoriesWithName; i++) {
            allCategoryIconWithNameElements.push(allCategoryIconElement[i]);
        }

        return allCategoryIconWithNameElements;
    }

    get additionalCategory() {
        return $$(this.baseSelector.additionalCategory);
    }

    get additionalCategoryIcons() {
        return $$(this.selectors.additionalCategoryIcon);
    }

    get categoryContainers() {
        return $$(this.baseSelector.category);
    }

    get additionalImageTypeIcon() {
        return this.additionalCategoryIcons[0];
    }

    get additionalDocTypeIcon() {
        return this.additionalCategoryIcons[1];
    }

    getClaimIcon(whichClaimNumber: number) {
        return this.additionalCategoryIcons[whichClaimNumber - 1];
    }
}
