import { Component, Input, OnInit } from '@angular/core';
import { LegalTerms } from '../../../shared/backend-services/legal-terms-management/legal-terms-management.types';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { URL_REGEX } from '../../../shared/forms/regex-patterns';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LegalTermsManagementRepository } from '../../../shared/backend-services/legal-terms-management/legal-terms-management-repository';
import { LEGAL_ACTIONS } from '../legal-terms-management.component';

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

  constructor(private fb: FormBuilder,
              private legalTermsManagementRepository: LegalTermsManagementRepository,
              public activeModal: NgbActiveModal) {}

  ngOnInit() {
    this.prepareForm();
  }

  onSubmit() {
    this.activeModal.close(this.mapToLegalTerms(this.form.value));
  }

  onDismiss() {
    this.activeModal.dismiss();
  }

  private mapToLegalTerms(value: any): LegalTerms {
    return {
      id: (this.legalTerm == null) ? null : this.legalTerm.id,
      effectiveAt: value.effectiveAt,
      linkDe: value.linkDe,
      linkEn: value.linkEn,
      linkFr: value.linkFr,
      linkIt: value.linkIt
    }
  }

  private prepareForm() {
    this.form = this.fb.group({
      effectiveAt: [null, [Validators.required, this.effectiveAtValidator()]],
      linkDe: [null, [Validators.required, Validators.pattern(URL_REGEX)]],
      linkEn: [null, [Validators.required, Validators.pattern(URL_REGEX)]],
      linkFr: [null, [Validators.required, Validators.pattern(URL_REGEX)]],
      linkIt: [null, [Validators.required, Validators.pattern(URL_REGEX)]]
    });

    if(this.legalTerm) {
      this.patchFormValues();
    }
  }

  // TODO effectiveAt > now
  private effectiveAtValidator(): ValidatorFn {
    return control => {
      const effectiveAt = control.value;
      return effectiveAt != null ? null : { pastEffectiveAt: true }
    };
  }

  private patchFormValues() {
    this.form.patchValue({
      effectiveAt: this.legalTerm.effectiveAt,
      linkDe: this.legalTerm.linkDe,
      linkEn: this.legalTerm.linkEn,
      linkFr: this.legalTerm.linkFr,
      linkIt: this.legalTerm.linkIt
    });
  }

}
