import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { Notification, NotificationType } from '../notification.model';

/**
 * Component for notification type of message
 * @example <alv-notification
 *            type="success"
 *            message="This is a notification!"
 *            additionalText="with additional text">
 *          </alv-notification>
 */
@Component({
  selector: 'alv-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['../abstract-message.scss', './notification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationComponent {


  @HostBinding('class.info') isInfo;
  @HostBinding('class.warning') isWarning;
  @HostBinding('class.success') isSuccess;
  @HostBinding('class.error') isError;
  @HostBinding('class.empty') isEmpty;


  @Input() notification: Notification;

  ngOnInit() {
    this.setMessageType(this.notification.type);
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

  private setMessageType(type: NotificationType): void {
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
