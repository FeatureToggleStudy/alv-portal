import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output
} from '@angular/core';
import { Notification, NotificationType } from '../notification.model';

/**
 * Notifications are global messages for the website
 */
@Component({
  selector: 'alv-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationComponent {

  @HostBinding('class') hostClass = 'empty';

  @Input() hideDismiss?: boolean;

  @Output() dismiss = new EventEmitter<Notification>(true);

  @Input()
  set notification(value: Notification) {
    this._notification = value;
    this.setNotificationClasses();
  }

  get notification(): Notification {
    return this._notification;
  }

  decorateClass: ClassDecoration = {};

  icon = '';

  private _notification: Notification;

  constructor() {
    this.decorateClass[NotificationType.ERROR] = {
      icon: 'ban',
      background: 'error'
    };
    this.decorateClass[NotificationType.INFO] = {
      icon: 'info',
      background: 'info'
    };
    this.decorateClass[NotificationType.SUCCESS] = {
      icon: 'check',
      background: 'success'
    };
    this.decorateClass[NotificationType.WARNING] = {
      icon: 'exclamation',
      background: 'warning'
    };
  }

  doDismiss(notification) {
    this.dismiss.emit(notification);
  }

  private setNotificationClasses() {
    this.icon = this.decorateClass[this._notification.type].icon;
    this.hostClass = this.decorateClass[this._notification.type].background;
  }
}

interface ClassDecoration {
  [s: number]: {
    icon: string;
    background: string;
  };
}
