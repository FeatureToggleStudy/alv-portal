import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { Salutation } from '../../../shared/backend-services/shared.types';
import { AbstractSubscriber } from '../../../core/abstract-subscriber';
import { AuthenticationService } from '../../../core/auth/authentication.service';
import { ModalService } from '../../../shared/layout/modal/modal.service';
import { ComplaintRepository } from '../../../shared/backend-services/complaint/complaint.repository';
import { I18nService } from '../../../core/i18n.service';
import { phoneInputValidator } from '../../../shared/forms/input/input-field/phone-input.validator';
import { patternInputValidator } from '../../../shared/forms/input/input-field/pattern-input.validator';
import { EMAIL_REGEX } from '../../../shared/forms/regex-patterns';
import { flatMap, take, takeUntil } from 'rxjs/operators';
import { ConfirmModalConfig } from '../../../shared/layout/modal/confirm-modal/confirm-modal-config.model';
import { mapFormToDto } from './complaint-request-mapper';
import { CompanyContactTemplateModel } from '../../../core/auth/company-contact-template-model';


export interface ComplaintFormValue {
  salutation: Salutation;
  name: string;
  phone: string;
  email: string;
  contactLanguage: string;
  complaintMessage: string;
}

@Component({
  selector: 'alv-complaint-modal',
  templateUrl: './complaint-modal.component.html',
})
export class ComplaintModalComponent extends AbstractSubscriber implements OnInit {

  form: FormGroup;

  @Input() jobAdvertisementId: string;

  readonly MAX_LENGTH_255 = 255;

  readonly MAX_LENGTH_1000 = 1000;

  salutationOptions$ = of([
      {
        value: null,
        label: 'home.tools.job-publication.no-selection'
      },
      ...Object.keys(Salutation).map(gender => {
        return {
          value: gender,
          label: 'global.contactPerson.salutation.' + gender
        };
      })
    ]
  );

  constructor(public activeModal: NgbActiveModal,
              private authenticationService: AuthenticationService,
              private modalService: ModalService,
              private fb: FormBuilder,
              private complaintRepository: ComplaintRepository,
              private i18nService: I18nService) {
    super();
  }

  ngOnInit() {
    this.form = this.fb.group({
      salutation: [null, Validators.required],
      name: ['', [Validators.required, Validators.maxLength(this.MAX_LENGTH_255)]],
      phone: ['', phoneInputValidator()],
      email: ['', [Validators.required, Validators.maxLength(this.MAX_LENGTH_255), patternInputValidator(EMAIL_REGEX)]],
      complaintMessage: ['', [Validators.required, Validators.maxLength(this.MAX_LENGTH_1000)]]
    });

    this.authenticationService.getCurrentCompany().pipe(
      takeUntil(this.ngUnsubscribe))
      .subscribe((templateInfo) => {
        if (!!templateInfo) {
          this.patchTemplateValues(templateInfo);
        }
      });

  }

  onSubmit(form: FormGroup) {
    const formValue = <ComplaintFormValue>form.value;
    this.i18nService.currentLanguage$.pipe(
      take(1),
      flatMap(lang => this.complaintRepository.sendComplaint(mapFormToDto(this.jobAdvertisementId, lang, formValue)))
    ).subscribe(() => this.activeModal.close());
  }

  onCancel() {
    if (!this.form.dirty) {
      this.activeModal.dismiss();
      return;
    }
    this.modalService.openConfirm({
      title: 'job-detail.confirm-cancel-modal.title',
      content: 'job-detail.confirm-cancel-modal.content',
      confirmLabel: 'job-detail.confirm-cancel-modal.button.confirm',
      cancelLabel: 'job-detail.confirm-cancel-modal.button.cancel'
    } as ConfirmModalConfig).result
      .then(
        () => {

        },
        () => {
          this.activeModal.dismiss();
        });
  }

  private patchTemplateValues(templateInfo: CompanyContactTemplateModel): void {
    this.form.patchValue({
      salutation: templateInfo.salutation,
      name: templateInfo.displayName,
      phone: templateInfo.phone,
      email: templateInfo.email
    });
  }

}