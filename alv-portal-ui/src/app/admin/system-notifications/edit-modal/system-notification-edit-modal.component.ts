import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AbstractSubscriber} from '../../../core/abstract-subscriber';
import {SystemNotificationDto} from '../../../shared/backend-services/system-notifications/system-notification.types';
import {SystemNotificationRepository} from '../../../shared/backend-services/system-notifications/system-notification-repository';
import {mapFormToDto} from '../system-notifications-request-mapper';
import {SystemNotificationFormValue} from '../system-notification-form-value';
import {fromDateISO} from '../../../shared/forms/input/ngb-date-utils';

@Component({
  selector: 'alv-system-notification-edit-modal',
  templateUrl: './system-notification-edit-modal.component.html',
})
export class SystemNotificationEditModalComponent extends AbstractSubscriber implements OnInit {

  @Input() systemNotification: SystemNotificationDto;

  form: FormGroup;

  readonly 'TITLE_MAX_LENGTH' = 50;

  readonly 'TEXT_MAX_LENGTH' = 150;

  constructor(public activeModal: NgbActiveModal,
              private fb: FormBuilder,
              private systemNotificationRepository: SystemNotificationRepository) {
    super();
  }

  clear() {
    this.activeModal.dismiss('Cancel');
  }

  ngOnInit() {
    const formValue = mapToFormValue(this.systemNotification);
    this.form = this.fb.group({
      title: [formValue.title, Validators.required],
      text_de: [formValue.text_de, Validators.required],
      text_fr: [formValue.text_fr, Validators.required],
      text_it: [formValue.text_it, Validators.required],
      text_en: [formValue.text_en, Validators.required],
      type: [this.systemNotification.type, Validators.required],
      startDate: [formValue.startDate, Validators.required],
      startTimeHours: [formValue.startTimeHours, [Validators.required, Validators.max(23), Validators.min(0)]],
      startTimeMinutes: [formValue.startTimeMinutes, [Validators.required, Validators.max(59), Validators.min(0)]],
      endDate: [formValue.endDate, Validators.required],
      endTimeHours: [formValue.endTimeHours, [Validators.required, Validators.max(23), Validators.min(0)]],
      endTimeMinutes: [formValue.endTimeMinutes, [Validators.required, Validators.max(59), Validators.min(0)]],
      active: [this.systemNotification.active, Validators.required]
    });
  }

  onSubmit(form: FormGroup) {
    const formValue = <SystemNotificationFormValue> form.value;
    this.systemNotificationRepository.updateSystemNotification(mapFormToDto(this.systemNotification.id, formValue))
      .subscribe(() => this.activeModal.close());
  }

}

function mapToFormValue(systemNotification: SystemNotificationDto): SystemNotificationFormValue {
  let startDate = new Date(systemNotification.startDate);
  let endDate = new Date(systemNotification.endDate);
  return {
    title: systemNotification.title,
    text_de: systemNotification.text_de,
    text_fr: systemNotification.text_fr,
    text_it: systemNotification.text_it,
    text_en: systemNotification.text_en,
    type: systemNotification.type,
    startDate: fromDateISO(systemNotification.startDate),
    startTimeHours: startDate.getHours().toString(),
    startTimeMinutes: startDate.getMinutes().toString(),
    endDate: fromDateISO(systemNotification.endDate),
    endTimeHours: endDate.getHours().toString(),
    endTimeMinutes: endDate.getMinutes().toString(),
    active: systemNotification.active
  }
}
