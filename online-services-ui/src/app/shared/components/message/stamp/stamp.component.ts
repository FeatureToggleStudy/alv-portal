import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { AbstractMessage } from '../abstract-message';
import { MessageType } from '../message-type.enum';

/**
 *  Component for stamp type of message, e.g.
 *  <os-stamp
 *    type="warning"
 *    message="This is a stamp!">
 *  </os-stamp>
 */
@Component({
  selector: 'os-stamp',
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
