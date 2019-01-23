import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AbstractSubscriber} from '../../../core/abstract-subscriber';
import {SystemNotification} from '../../../shared/backend-services/system-notifications/system-notification.types';
import {SystemNotificationRepository} from '../../../shared/backend-services/system-notifications/system-notification-repository';

@Component({
  selector: 'alv-system-notification-edit-modal',
  templateUrl: './system-notification-delete-modal.component.html',
})
export class SystemNotificationDeleteModalComponent extends AbstractSubscriber {

  @Input() systemNotification: SystemNotification;

  constructor(public activeModal: NgbActiveModal,
              private systemNotificationRepository: SystemNotificationRepository) {
    super();
  }

  onSubmit() {
    this.systemNotificationRepository.deleteSystemNotification(this.systemNotification).subscribe(() => this.activeModal.dismiss());
  }

}
