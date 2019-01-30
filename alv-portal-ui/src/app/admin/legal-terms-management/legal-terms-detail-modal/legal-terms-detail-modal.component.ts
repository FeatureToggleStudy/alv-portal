import { Component, Input, OnInit } from '@angular/core';
import { LegalTerms } from '../../../shared/backend-services/legal-terms-management/legal-terms-management.types';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { URL_REGEX } from '../../../shared/forms/regex-patterns';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LegalTermsManagementRepository } from '../../../shared/backend-services/legal-terms-management/legal-terms-management-repository';
import { patternInputValidator } from '../../../shared/forms/input/input-field/pattern-input.validator';
import {
  fromISODate,
  LEGAL_ACTIONS,
  mapToDateTime,
  todayDateTime,
  toISOLocalDate,
  tomorrow
} from '../legal-terms-management.types';

@Component({
  selector: 'alv-legal-terms-detail-modal',
  templateUrl: './legal-terms-detail-modal.component.html',
  styleUrls: ['./legal-terms-detail-modal.component.scss']
})
export class LegalTermsDetailModalComponent implements OnInit {

  @Input()
  legalTerm: LegalTerms;

  @Input()
  actionTyp: LEGAL_ACTIONS;

  @Input()
  readonly: boolean;

  form: FormGroup;

  minEffectiveAt = tomorrow();

  constructor(private fb: FormBuilder,
              private legalTermsManagementRepository: LegalTermsManagementRepository,
              public activeModal: NgbActiveModal) {}

  ngOnInit() {
    this.prepareForm();
  }

  onSubmit() {
    switch (this.actionTyp) {
      case LEGAL_ACTIONS.NEW:
        this.legalTermsManagementRepository.addLegalTermsEntry(this.mapToLegalTerms(this.form.value))
          .subscribe( () => this.activeModal.close());
        break;
      case LEGAL_ACTIONS.EDIT:
        this.legalTermsManagementRepository.updateLegalTermsEntry(this.mapToLegalTerms(this.form.value))
          .subscribe( () => this.activeModal.close());
        break;
      case LEGAL_ACTIONS.VIEW:
        this.activeModal.close();
        break;
    }
  }

  onDismiss() {
    this.activeModal.dismiss();
  }

  private mapToLegalTerms(value: any): LegalTerms {
    return {
      id: (this.legalTerm == null) ? null : this.legalTerm.id,
      effectiveAt: toISOLocalDate(value.effectiveAt),
      linkDe: value.linkDe,
      linkEn: value.linkEn,
      linkFr: value.linkFr,
      linkIt: value.linkIt
    };
  }

  private prepareForm() {

    const effectiveAtValidator: ValidatorFn = (formGroup: FormGroup) => {
      const effectiveAt = formGroup.get('effectiveAt').value;
      return effectiveAt != null && mapToDateTime(effectiveAt) > todayDateTime() ? null : { pastEffectiveAt: true };
    };
    this.form = this.fb.group({
      effectiveAt: [null, [Validators.required]],
      linkDe: [null, [Validators.required, patternInputValidator(URL_REGEX)]],
      linkEn: [null, [Validators.required, patternInputValidator(URL_REGEX)]],
      linkFr: [null, [Validators.required, patternInputValidator(URL_REGEX)]],
      linkIt: [null, [Validators.required, patternInputValidator(URL_REGEX)]]
    }, {
      validator: [effectiveAtValidator]
    });

    if (this.legalTerm) {
      this.patchFormValues();
    }
  }

  private patchFormValues() {
    this.form.patchValue({
      effectiveAt: (this.readonly) ? this.legalTerm.effectiveAt : fromISODate(this.legalTerm.effectiveAt),
      linkDe: this.legalTerm.linkDe,
      linkEn: this.legalTerm.linkEn,
      linkFr: this.legalTerm.linkFr,
      linkIt: this.legalTerm.linkIt
    });
  }

}
