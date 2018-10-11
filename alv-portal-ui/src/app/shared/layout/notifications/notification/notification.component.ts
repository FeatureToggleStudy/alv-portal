import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input, OnInit,
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


  @HostBinding('class.info') isInfo;
  @HostBinding('class.warning') isWarning;
  @HostBinding('class.success') isSuccess;
  @HostBinding('class.error') isError;
  @HostBinding('class.empty') isEmpty;


  @Input() notification: Notification;

  @Output() dismiss = new EventEmitter<Notification>(true);

  ngOnInit() {
    this.setNotificationType(this.notification.type);
  }

  doDismiss(notification) {
    this.dismiss.emit(notification);
  }

  getIconClass(type: NotificationType): string {
    switch (type) {
      case NotificationType.ERROR:
        return 'fas fa-ban';
      case NotificationType.INFO:
        return 'fas fa-info';
      case NotificationType.SUCCESS:
        return 'fas fa-check';
      case NotificationType.WARNING:
        return 'fas fa-exclamation';
      default:
        return '';
    }
  }

  private setNotificationType(type: NotificationType): void {
    switch (type) {
      case NotificationType.ERROR:
        this.isError = true;
        break;
      case NotificationType.INFO:
        this.isInfo = true;
        break;
      case NotificationType.SUCCESS:
        this.isSuccess = true;
        break;
      case NotificationType.WARNING:
        this.isWarning = true;
        break;
      default:
        this.isEmpty = true;
        break;
    }
  }

}
