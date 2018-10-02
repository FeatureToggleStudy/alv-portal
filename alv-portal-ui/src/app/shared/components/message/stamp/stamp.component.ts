import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractMessage } from '../abstract-message';
import { MessageType } from '../message-type.enum';

/**
 * Component for stamp type of message
 * @example <alv-stamp
 *            type="warning"
 *            message="This is a stamp!">
 *          </alv-stamp>
 */
@Component({
  selector: 'alv-stamp',
  templateUrl: './stamp.component.html',
  styleUrls: ['../abstract-message.scss', './stamp.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StampComponent extends AbstractMessage {

  constructor() {
    super();
  }

  showIcon(type: MessageType): boolean {
    return type !== MessageType.EMPTY;
  }
}
