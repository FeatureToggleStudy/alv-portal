import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RegistrationStep } from '../registration-step.enum';
import { UidCompany } from '../../shared/backend-services/uid-search/uid.types';
import { PavSuggestion } from '../../shared/backend-services/pav-search/pav-search.types';

@Component({
  selector: 'alv-finish-registration',
  templateUrl: './finish-registration.component.html',
  styleUrls: ['./finish-registration.component.scss']
})
export class FinishRegistrationComponent implements OnInit {

  registrationSteps = RegistrationStep;

  registrationStep = RegistrationStep.SELECT_ROLE_STEP;

  selectedCompany: UidCompany;

  selectedPav: PavSuggestion;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
  }

  updateStep(step: RegistrationStep) {
    this.registrationStep = step;
  }
}
