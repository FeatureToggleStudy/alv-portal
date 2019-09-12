import { Component, OnInit } from '@angular/core';
import { RegistrationStep } from '../../registration-step.enum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { AbstractRegistrationStep } from '../../abstract-registration-step';
import { Router } from '@angular/router';
import { LegalTermsService } from '../../../shared/legal-terms/legal-terms.service';
import { LegalTermsUrls } from '../../../shared/backend-services/legal-terms-management/legal-terms-management.types';

@Component({
  selector: 'alv-role-selection',
  templateUrl: './role-selection.component.html',
  styleUrls: ['./role-selection.component.scss']
})
export class RoleSelectionComponent extends AbstractRegistrationStep implements OnInit {

  roleSelectionForm: FormGroup;

  registrationOptions$ = of([
    {
      label: 'registrationQuestionnaire.ravCustomer',
      value: 'jobseeker'
    },
    {
      label: 'registrationQuestionnaire.employer',
      value: 'company'
    },
    {
      label: 'registrationQuestionnaire.recruitmentAgency.message',
      value: 'pav'
    }
  ]);

  legalTermsUrls$: Observable<LegalTermsUrls>;

  constructor(private fb: FormBuilder,
              private router: Router,
              private legalTermsService: LegalTermsService) {
    super();
  }

  ngOnInit() {
    this.roleSelectionForm = this.fb.group({
      role: ['', Validators.required],
      termsAndConditions: [false, Validators.requiredTrue]
    });

    this.legalTermsUrls$ = this.legalTermsService.getLegalTermsUrls();
  }

  selectRole() {
    switch (this.roleSelectionForm.get('role').value) {
      case 'jobseeker':
        this.updateStep.emit(RegistrationStep.JOBSEEKER_IDENTIFICATION_STEP);
        break;
      case 'company':
        this.updateStep.emit(RegistrationStep.COMPANY_IDENTIFICATION_STEP);
        break;
      case 'pav':
        this.updateStep.emit(RegistrationStep.PAV_IDENTIFICATION_STEP);
        break;
    }
  }

  cancelAction() {
    this.router.navigate(['home']);
  }

}
