import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AbstractSubscriber} from '../../../core/abstract-subscriber';
import {SystemNotification} from '../../../shared/backend-services/system-notifications/system-notification.types';

@Component({
  selector: 'alv-system-notification-edit-modal',
  templateUrl: './system-notification-edit-modal.component.html',
})
export class SystemNotificationEditModalComponent extends AbstractSubscriber implements OnInit {
  @Input() systemNotification: SystemNotification;

  form: FormGroup;

  readonly "TITLE_MAX_LENGTH" = 50;

  readonly "TEXT_MAX_LENGTH" = 150;

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) {
    super();
  }

  clear() {
    this.activeModal.dismiss('Cancel');
  }

  ngOnInit() {
    this.form = this.fb.group({
      title: [this.systemNotification.title, Validators.required],
      text_de: [this.systemNotification.text_de, Validators.required],
      text_fr: [this.systemNotification.text_fr, Validators.required],
      text_it: [this.systemNotification.text_it, Validators.required],
      text_en: [this.systemNotification.text_en, Validators.required],
      type: [this.systemNotification.type, Validators.required],
      startDate: [this.systemNotification.startDate, Validators.required],
      startDateTime: [this.systemNotification.startDate, Validators.required],
      endDate: [this.systemNotification.endDate, Validators.required],
      endDateTime: [this.systemNotification.endDate, Validators.required],
      active: [this.systemNotification.active, Validators.required]
    });
  }

  //FIXME fago:  clean up date handling
  onSubmit(form: FormGroup) {
    this.activeModal.dismiss();
  }

}
