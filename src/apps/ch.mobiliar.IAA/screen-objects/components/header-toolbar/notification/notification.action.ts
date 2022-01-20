import {BaseNotification} from "@apps/iaa/screen-objects/components/header-toolbar/notification/base-notification";
import {NotificationElement} from "@apps/iaa/screen-objects/components/header-toolbar/notification/notification.element";

export class Notification extends BaseNotification {
    private notificationElement = new NotificationElement(this.screenName);

    isErrorDisplayed() {
        const errorIcon = this.notificationElement.getErrorNotificationIcon();

        return errorIcon.isDisplayed();
    }

}
