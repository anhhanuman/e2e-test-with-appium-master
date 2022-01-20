export class LoadingContent {
    private static readonly loadingContentSelectors = {
        loadingContent: 'div.loading-content'
    };

    static get loadingContent() {
        return $(this.loadingContentSelectors.loadingContent);
    }

    static verify() {
        return this;
    }

    static expectedLoadingContentDisplayed(expectedLoadingContentDisplayed: boolean) {
        const actual = this.isLoadingContentDisplayed();
        expect(actual).toEqual(expectedLoadingContentDisplayed);

        return this;
    }

    private static isLoadingContentDisplayed() {
        return LoadingContent.loadingContent.isDisplayed();
    }

    static waitForLoadingContentDismiss() {
        const loadingContent = this.loadingContent;
        browser.waitUntil(
            () => {
                return !loadingContent.isExisting();
            },
            60000,
            `ERROR: ${loadingContent}'s existing state is still true after waiting for ${60000 / 1000}s. It should be false`,
            5000
        );

        return this;
    }


}
