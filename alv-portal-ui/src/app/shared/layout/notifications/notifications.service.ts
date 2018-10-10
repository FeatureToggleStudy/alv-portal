import {Injectable} from "@angular/core";
import { Notification, NotificationType } from './notification.model';

export const STICKY_TIMEOUT = 5000;

/**
 * A notification service holds the array of notifications of the types
 * default, success, info, warning and error
 * the notifications are added with `add` function and sorted with respect to their priority.
 * The notifications can be manually removed using `remove`.
 * Sticky notifications are removed automatically
 * @author pado in Panta project, minor modifications by iuka
 */
@Injectable()
export class NotificationsService {

  public notifications: Notification[] = [];

  private currentId = 0;

  private context = {
    timeout: STICKY_TIMEOUT
  };

  constructor() {
  }

  public default(messageKey: string, isSticky?: boolean) {
    this.add({
      id: this.currentId,
      type: NotificationType.DEFAULT,
      messageKey: messageKey,
      isSticky: isSticky
    });
  }

  public info(messageKey: string, isSticky?: boolean) {
    this.add({
      id: this.currentId,
      type: NotificationType.INFO,
      messageKey: messageKey,
      isSticky: isSticky
    });
  }

  public success(messageKey: string, isSticky?: boolean) {
    this.add({
      id: this.currentId,
      type: NotificationType.SUCCESS,
      messageKey: messageKey,
      isSticky: isSticky
    });
  }

  public warning(messageKey: string, isSticky?: boolean) {
    this.add({
      id: this.currentId,
      type: NotificationType.WARNING,
      messageKey: messageKey,
      isSticky: isSticky
    });
  }

  public error(messageKey: string, isSticky?: boolean) {
    this.add({
      id: this.currentId,
      type: NotificationType.ERROR,
      messageKey: messageKey,
      isSticky: (isSticky ? isSticky : true)
    });
  }

  public add(notification: Notification) {
    notification.id = this.currentId;
    this.notifications.unshift(notification);
    this.notifications.sort((n1: Notification, n2: Notification) => n1.type - n2.type);
    if (!notification.isSticky) {
      setTimeout(() => {
        this.remove(notification.id);
      }, this.context.timeout);
    }
    this.currentId++;
  }

  public clear() {
    this.notifications.length = 0;
  }

  public remove(notificationId: number) {
    this.notifications.forEach((notification, index) => {
      if (notificationId === notification.id) {
        this.notifications.splice(index, 1);
      }
    });
  }

}
