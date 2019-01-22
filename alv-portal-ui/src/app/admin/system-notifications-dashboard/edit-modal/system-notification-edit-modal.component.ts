import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AbstractSubscriber} from "../../../core/abstract-subscriber";
import {SystemNotification} from "../../../shared/backend-services/system-notifications/system-notification.types";

@Component({
    selector: 'system-notification-edit-modal',
    templateUrl: './system-notification-edit-modal.component.html',
})
export class SystemNotificationEditModalComponent extends AbstractSubscriber implements OnInit {
    @Input() systemNotification: SystemNotification;
    @Output() updateEvent = new EventEmitter<SystemNotification>();

    form: FormGroup;

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

        this.configureDatePicker('startDate', 'startDateTime');
        this.configureDatePicker('endDate', 'endDateTime');
    }

    //FIXME fago:  clean up date handling
  onSubmit(form: FormGroup) {
        const { valid, touched } = form;
        const value = Object.assign({}, form.value, {
            startDate:  form.get('startDate'),
            endDate:  form.get('endDate'),
        });

        delete value.startDateTime;
        delete value.endDateTime;

        if (touched && valid) {
            this.updateEvent.emit({ ...this.systemNotification, ...value });
        }
        this.activeModal.dismiss();
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
}
