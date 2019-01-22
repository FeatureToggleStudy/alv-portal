import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AbstractSubscriber} from "../../../core/abstract-subscriber";
import {SystemNotification} from "../../../shared/backend-services/system-notifications/system-notification.types";

@Component({
  selector: 'system-notification-edit-modal',
  templateUrl: './system-notification-create-modal.component.html',
})
export class SystemNotificationCreateModalComponent extends AbstractSubscriber implements OnInit {

  @Output() createEvent = new EventEmitter<SystemNotification>();

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) {
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
      startDateTime: [{
        value: '',
        disabled: true
      }, Validators.required],
      endDate: ['', Validators.required],
      endDateTime: [{
        value: '',
        disabled: true
      }, Validators.required],
      active: [false, Validators.required]
    });

    this.configureDatePicker('startDate', 'startDateTime');
    this.configureDatePicker('endDate', 'endDateTime');
  }

  private configureDatePicker(dateField, timeField) {
    this.form.get(dateField).valueChanges
      .subscribe((value) => {
        if (value) {
          this.form.get(timeField).enable();
        } else {
          this.form.get(timeField).disable();
        }
      });
  }

  //FIXME fago:  clean up date handling
  onSubmit(form: FormGroup) {
    const value = Object.assign({}, form.value, {
      startDate: form.get('startDate'),
      endDate: form.get('endDate')
    });

    delete value.startDateTime;
    delete value.endDateTime;

    this.createEvent.emit(value);
    this.activeModal.dismiss();
  }

}
