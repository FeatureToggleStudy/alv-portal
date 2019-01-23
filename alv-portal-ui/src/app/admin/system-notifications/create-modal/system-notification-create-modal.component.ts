import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AbstractSubscriber} from '../../../core/abstract-subscriber';
import {SystemNotificationRepository} from '../../../shared/backend-services/system-notifications/system-notification-repository';
import {LocaleAwareDatePipe} from '../../../shared/pipes/locale-aware-date.pipe';

@Component({
  selector: 'alv-system-notification-edit-modal',
  templateUrl: './system-notification-create-modal.component.html',
})
export class SystemNotificationCreateModalComponent extends AbstractSubscriber implements OnInit {

  constructor(public activeModal: NgbActiveModal,
              private fb: FormBuilder,
              private localeAwareDatePipe: LocaleAwareDatePipe,
              private systemNotificationRepository: SystemNotificationRepository) {
    super();
  }

  form: FormGroup;

  ngOnInit() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      text_de: ['', Validators.required],
      text_fr: ['', Validators.required],
      text_it: ['', Validators.required],
      text_en: ['', Validators.required],
      type: ['', Validators.required],
      startDate: ['', Validators.required],
      startTimeHours: ['', [Validators.required, Validators.max(23), Validators.min(0)]],
      startTimeMinutes: ['', [Validators.required, Validators.max(59), Validators.min(0)]],
      endDate: ['', Validators.required],
      endTimeHours: ['', [Validators.required, Validators.max(23), Validators.min(0)]],
      endTimeMinutes: ['', [Validators.required, Validators.max(59), Validators.min(0)]],
      active: [false, Validators.required]
    });
  }

  onSubmit(form: FormGroup) {
    this.systemNotificationRepository.createSystemNotification(form.value).subscribe(() => this.activeModal.dismiss());
  }

}
