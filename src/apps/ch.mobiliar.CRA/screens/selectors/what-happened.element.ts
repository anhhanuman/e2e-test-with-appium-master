export class WhatHappenedElement {
    private readonly selectors = {
        title: 'ion-header ion-title',
        backButton: '',
        nextButton: '',
        selectButton: '',
        descriptionInput: '',
        searchClaimCategoryInput: '',
        mainClaimEventCategories: 'app-claim-event ion-list ion-item',
        secondClaimEventCategories: 'ion-list app-tree-view app-tree-view ion-item',
        thirdClaimEventCategories: 'ion-list app-tree-view app-tree-view app-tree-view ion-item',
        fourClaimEventCategories: 'ion-list app-tree-view app-tree-view app-tree-view app-tree-view ion-item'
    };

    get secondClaimEventCategories() {
        return $$(this.selectors.secondClaimEventCategories);
    }

    get thirdClaimEventCategories() {
        return $$(this.selectors.thirdClaimEventCategories);
    }

    get fourClaimEventCategories() {
        return $$(this.selectors.fourClaimEventCategories);
    }

    get mainClaimEventCategories() {
        return $$(this.selectors.mainClaimEventCategories);
    }

    get headerTitle() {
        return $(this.selectors.title);
    }

    get backButton() {
        return $(this.selectors.backButton);
    }

    get nextButton() {
        return $(this.selectors.nextButton);
    }

    get selectButton() {
        return $(this.selectors.selectButton);
    }

    get descriptionInput() {
        return $(this.selectors.descriptionInput);
    }

    get searchClaimCategoryInput() {
        return $(this.selectors.searchClaimCategoryInput);
    }
}
