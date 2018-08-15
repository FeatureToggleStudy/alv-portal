import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { AbstractMessage } from '../abstract-message';

/**
 *  Component for notification type of message, e.g.
 *  <os-notification
 *    type="success"
 *    message="This is a notification!"
 *    additionalText="with additional text">
 *  </os-notification>
 */
@Component({
  selector: 'os-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['../abstract-message.scss', './notification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationComponent extends AbstractMessage {

  @Input() additionalText?: string;

  constructor() {
    super();
  }

}
