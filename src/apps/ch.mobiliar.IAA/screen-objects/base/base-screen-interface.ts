import {Toolbar} from "@apps/iaa/screen-objects/components/header-toolbar/toolbar/toolbar.action";
import {ErrorIcon} from "@apps/iaa/screen-objects/components/error-icon/error-icon.action";

export interface BaseScreenInterface {
    _headerToolbar: Toolbar,
    _errorIcon: ErrorIcon
}
