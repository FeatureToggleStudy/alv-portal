import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AbstractSubscriber} from "../../../core/abstract-subscriber";
import {SystemNotification} from "../../../shared/backend-services/system-notifications/system-notification.types";

@Component({
  selector: 'system-notification-edit-modal',
  templateUrl: './system-notification-delete-modal.component.html',
})
export class SystemNotificationDeleteModalComponent extends AbstractSubscriber {

  @Input() systemNotification: SystemNotification;
  @Output() deleteEvent = new EventEmitter<SystemNotification>();

  constructor(public activeModal: NgbActiveModal) {
    super();
  }

  onSubmit() {
    this.deleteEvent.emit(this.systemNotification);
    this.activeModal.dismiss();
  }

}
