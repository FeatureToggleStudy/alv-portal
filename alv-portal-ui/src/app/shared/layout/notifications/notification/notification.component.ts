import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
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
export class NotificationComponent implements OnInit {

  @HostBinding('class') hostClass = 'empty';

  icon = '';

  @Input() notification: Notification;

  @Output() dismiss = new EventEmitter<Notification>(true);

  public decorateClass: ClassDecoration = {};

  constructor() {
    this.decorateClass[NotificationType.ERROR] = {
      icon: 'fas fa-ban',
      background: 'error'
    };
    this.decorateClass[NotificationType.INFO] = {
      icon: 'fas fa-info',
      background: 'info'
    };
    this.decorateClass[NotificationType.SUCCESS] = {
      icon: 'fas fa-check',
      background: 'success'
    };
    this.decorateClass[NotificationType.WARNING] = {
      icon: 'fas fa-exclamation',
      background: 'warning'
    };
  }

  ngOnInit() {
    this.icon = this.decorateClass[this.notification.type].icon;
    this.hostClass = this.decorateClass[this.notification.type].background;
  }

  doDismiss(notification) {
    this.dismiss.emit(notification);
  }
}

interface ClassDecoration {
  [s: number]: {
    icon: string;
    background: string;
  };
}
