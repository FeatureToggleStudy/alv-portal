import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractSubscriber } from '../../../core/abstract-subscriber';
import {
  SystemNotificationDto,
  SystemNotificationType
} from '../../../shared/backend-services/system-notifications/system-notification.types';
import { SystemNotificationRepository } from '../../../shared/backend-services/system-notifications/system-notification-repository';
import { mapFormToDto } from '../system-notifications-request-mapper';
import { SystemNotificationFormValue } from '../system-notification-form-value';
import { fromISODate } from '../../../shared/forms/input/ngb-date-utils';
import { of } from 'rxjs';

@Component({
  selector: 'alv-system-notification-modal',
  templateUrl: './system-notification-modal.component.html',

})
export class SystemNotificationModalComponent extends AbstractSubscriber implements OnInit {

  @Input() systemNotification: SystemNotificationDto;

  @Input() title: string;

  form: FormGroup;

  readonly 'TITLE_MAX_LENGTH' = 50;

  readonly 'TEXT_MAX_LENGTH' = 150;

  date: NgbDateStruct;

  typeOptions$ = of([
    ...Object.keys(SystemNotificationType).map(type => {
      return {
        value: type,
        label: 'systemNotificationsManagement.systemnotification.type.' + type.toLowerCase()
      };
    })]
  );

  constructor(public activeModal: NgbActiveModal,
              private fb: FormBuilder,
              private systemNotificationRepository: SystemNotificationRepository) {
    super();
  }

  ngOnInit() {
    const formValue = mapToFormValue(this.systemNotification);
    this.form = this.fb.group({
      title: [formValue.title, Validators.required],
      text_de: [formValue.text_de, Validators.required],
      text_fr: [formValue.text_fr, Validators.required],
      text_it: [formValue.text_it, Validators.required],
      text_en: [formValue.text_en, Validators.required],
      type: [formValue.type, Validators.required],
      startDate: [formValue.startDate, Validators.required],
      startTimeHours: [formValue.startTimeHours, [Validators.required, Validators.max(23), Validators.min(0)]],
      startTimeMinutes: [formValue.startTimeMinutes, [Validators.required, Validators.max(59), Validators.min(0)]],
      endDate: [formValue.endDate, Validators.required],
      endTimeHours: [formValue.endTimeHours, [Validators.required, Validators.max(23), Validators.min(0)]],
      endTimeMinutes: [formValue.endTimeMinutes, [Validators.required, Validators.max(59), Validators.min(0)]],
      active: [formValue.active, Validators.required]
    });
  }

  onSubmit(form: FormGroup) {
    const formValue = <SystemNotificationFormValue> form.value;
    if (this.systemNotification.id == null) {
      this.systemNotificationRepository.createSystemNotification(mapFormToDto(this.systemNotification.id, formValue))
        .subscribe(() => this.activeModal.close());
    }
    this.systemNotificationRepository.updateSystemNotification(mapFormToDto(this.systemNotification.id, formValue))
      .subscribe(() => this.activeModal.close());
  }

}

function mapToFormValue(systemNotification: SystemNotificationDto): SystemNotificationFormValue {
  const startDate = new Date(systemNotification.startDate);
  const endDate = new Date(systemNotification.endDate);
  return {
    title: systemNotification.title,
    text_de: systemNotification.text_de,
    text_fr: systemNotification.text_fr,
    text_it: systemNotification.text_it,
    text_en: systemNotification.text_en,
    type: systemNotification.type,
    startDate: fromISODate(systemNotification.startDate),
    startTimeHours: startDate.getHours().toString(),
    startTimeMinutes: startDate.getMinutes().toString(),
    endDate: fromISODate(systemNotification.endDate),
    endTimeHours: endDate.getHours().toString(),
    endTimeMinutes: endDate.getMinutes().toString(),
    active: systemNotification.active
  };
}
