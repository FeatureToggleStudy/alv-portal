import { HostBinding, Input, OnInit } from '@angular/core';
import { MessageType } from './message-type.enum';

/**
 * Abstract message construct (message + messageType) used as a base for notification and stamp
 */
export abstract class AbstractMessage implements OnInit {

  @HostBinding('class.info') isInfo;
  @HostBinding('class.warning') isWarning;
  @HostBinding('class.success') isSuccess;
  @HostBinding('class.error') isError;
  @HostBinding('class.empty') isEmpty;

  @Input() message: string;
  @Input() type: MessageType;

  ngOnInit() {
    this.setMessageType(this.type);
  }

  getIconClass(type: MessageType): string {
    switch (type) {
      case MessageType.ERROR:
        return 'fas fa-ban';
      case MessageType.INFO:
        return 'fas fa-info';
      case MessageType.SUCCESS:
        return 'fas fa-check';
      case MessageType.WARNING:
        return 'fas fa-exclamation';
      default:
        return '';
    }
  }

  private setMessageType(type: MessageType): void {
    switch (type) {
      case MessageType.ERROR:
        this.isError = true;
        break;
      case MessageType.INFO:
        this.isInfo = true;
        break;
      case MessageType.SUCCESS:
        this.isSuccess = true;
        break;
      case MessageType.WARNING:
        this.isWarning = true;
        break;
      default:
        this.isEmpty = true;
        break;
    }
  }
}
