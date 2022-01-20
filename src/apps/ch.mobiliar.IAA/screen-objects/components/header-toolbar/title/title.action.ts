import {TitleElement} from "@apps/iaa/screen-objects/components/header-toolbar/title/title.element";

export class Title {
    private headerTitle: TitleElement

    constructor(private screenName: string) {
        this.headerTitle = new TitleElement(this.screenName)
    }

    getHeaderTitle() {
        return this.headerTitle.getHeaderTitle().getText().trim();
    }


}
