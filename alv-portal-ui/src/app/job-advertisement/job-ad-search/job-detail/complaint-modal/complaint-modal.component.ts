import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { combineLatest, Observable, of } from 'rxjs';
import { Salutation } from '../../../../shared/backend-services/shared.types';
import { ComplaintRepository } from '../../../../shared/backend-services/complaint/complaint.repository';
import { ComplaintDto } from '../../../../shared/backend-services/complaint/complaint.types';
import { switchMap, takeUntil } from 'rxjs/operators';
import { AuthenticationService } from '../../../../core/auth/authentication.service';
import { CompanyContactTemplateModel } from '../../../../core/auth/company-contact-template-model';
import { AbstractSubscriber } from '../../../../core/abstract-subscriber';
import { mapFormToDto, mapToFormValue } from './complaint-request-mapper';

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
export class ComplaintModalComponent extends AbstractSubscriber implements OnInit {

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
              private authenticationService: AuthenticationService,
              private fb: FormBuilder,
              private complaintRepository: ComplaintRepository) {
    super();
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

    combineLatest(this.authenticationService.getCurrentCompany()).pipe(
      takeUntil(this.ngUnsubscribe))
      .subscribe(([templateInfo]) => {
        if (!!templateInfo) {
          this.patchTemplateValues(templateInfo);
        }
      });
  }

  onSubmit(form: FormGroup) {
    const formValue = <ComplaintFormValue>form.value;
    this.jobAdvertisementId.pipe(
      switchMap((id) => this.complaintRepository.sendComplaint(mapFormToDto(id, formValue)))
    ).subscribe(() => this.activeModal.close());
  }

  private patchTemplateValues(templateInfo: CompanyContactTemplateModel): void {
    this.form.patchValue({
      salutation: templateInfo.salutation,
      name: templateInfo.companyName,
      phone: templateInfo.phone,
      email: templateInfo.email
    });
  }

}
