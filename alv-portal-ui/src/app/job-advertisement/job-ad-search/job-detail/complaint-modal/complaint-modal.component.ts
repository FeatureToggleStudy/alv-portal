import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { Salutation } from '../../../../shared/backend-services/shared.types';
import { ComplaintRepository } from '../../../../shared/backend-services/complaint/complaint.repository';
import { ComplaintDto } from '../../../../shared/backend-services/complaint/complaint.types';
import { switchMap } from 'rxjs/operators';

export interface ComplaintFormValue {
  salutation: Salutation;
  name: string;
  phone: string;
  email: string;
  complaintMessage: string;
}

@Component({
  selector: 'alv-complaint-modal',
  templateUrl: './complaint-modal.component.html',
})
export class ComplaintModalComponent implements OnInit {

  public form: FormGroup;

  @Input() complaint: ComplaintDto;

  @Input() jobAdvertisementId: Observable<string>;

  readonly MAX_LENGTH_255 = 255;

  readonly MAX_LENGTH_1000 = 1000;

  salutationOptions$ = of([
      {
        value: null,
        label: 'home.tools.job-publication.no-selection'
      },
      ...Object.keys(Salutation).map(language => {
        return {
          value: language,
          label: 'global.contactPerson.salutation.' + language
        };
      })
    ]
  );

  constructor(public activeModal: NgbActiveModal,
              private fb: FormBuilder,
              private complaintRepository: ComplaintRepository) {
  }

  ngOnInit() {
    const formValue = mapToFormValue(this.complaint);
    this.form = this.fb.group({
      salutation: [formValue.salutation, Validators.required],
      name: [formValue.name, [Validators.required, Validators.maxLength(this.MAX_LENGTH_255)]],
      phone: [formValue.phone],
      email: [formValue.email, Validators.required],
      complaintMessage: [formValue.complaintMessage, [Validators.required, Validators.maxLength(this.MAX_LENGTH_1000)]]
    });
  }

  onSubmit(form: FormGroup) {
    const formValue = <ComplaintFormValue>form.value;
    this.jobAdvertisementId.pipe(
      switchMap((id) => this.complaintRepository.sendComplaint(mapFormToDto(id, formValue)))
    ).subscribe(() => this.activeModal.close());
  }
}

function mapToFormValue(complaint: ComplaintDto): ComplaintFormValue {
  return {
    complaintMessage: complaint.complaintMessage,
    salutation: complaint.contactInformation.salutation,
    name: complaint.contactInformation.name,
    phone: complaint.contactInformation.phone,
    email: complaint.contactInformation.email
  };
}

export function mapFormToDto(id: string, formValue: ComplaintFormValue): ComplaintDto {
  return {
    jobAdvertisementId: id,
    contactInformation: {
      salutation: formValue.salutation,
      name: formValue.name,
      phone: formValue.phone,
      email: formValue.email,
    },
    complaintMessage: formValue.complaintMessage
  };
}
