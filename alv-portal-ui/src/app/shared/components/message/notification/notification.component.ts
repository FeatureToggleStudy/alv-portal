import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AbstractMessage } from '../abstract-message';

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
export class NotificationComponent extends AbstractMessage {

  /**
   * (optional) additional text to be displayed with less emphasis
   */
  @Input() additionalText?: string;

  constructor() {
    super();
  }

}
