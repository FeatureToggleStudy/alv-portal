import { Injectable } from '@angular/core';
import {
  Notification,
  NotificationType
} from '../shared/layout/notifications/notification.model';

export const STICKY_TIMEOUT = 5000;

/**
 * A notification service holds the array of notifications of the types
 * default, success, info, warning and error
 * the notifications are added with `add` function and sorted with respect to their priority.
 * The notifications can be manually removed using `remove`.
 * Sticky notifications are removed automatically
 * @author pado in Panta project, minor modifications by iuka
 */
@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  notifications: Notification[] = [];

  private currentId = 0;

  private context = {
    timeout: STICKY_TIMEOUT
  };

  constructor() {
  }

  default(messageKey: string, isSticky?: boolean) {
    this.addByKey(messageKey, NotificationType.DEFAULT, isSticky);
  }

  info(messageKey: string, isSticky?: boolean) {
    this.addByKey(messageKey, NotificationType.INFO, isSticky);
  }

  success(messageKey: string, isSticky?: boolean) {
    this.addByKey(messageKey, NotificationType.SUCCESS, isSticky);
  }

  warning(messageKey: string, isSticky?: boolean) {
    this.addByKey(messageKey, NotificationType.WARNING, isSticky);
  }

  error(messageKey: string, isSticky?: boolean) {
    this.addByKey(messageKey, NotificationType.ERROR, isSticky ? isSticky : true);
  }

  addByKey(messageKey: string, type: NotificationType, isSticky: boolean) {
    this.add({
      id: this.currentId,
      type: type,
      messageKey: messageKey,
      isSticky: isSticky
    });
  }

  add(notification: Notification) {
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

  clear() {
    this.notifications.length = 0;
  }

  remove(notificationId: number) {
    this.notifications.forEach((notification, index) => {
      if (notificationId === notification.id) {
        this.notifications.splice(index, 1);
      }
    });
  }

}
