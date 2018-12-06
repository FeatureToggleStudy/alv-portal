import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RegistrationStep } from '../registration-step.enum';
import { OrganizationSuggestion } from '../../service/pav-search/pav-search.types';
import { Company } from '../../service/uid/uid.types';

@Component({
  selector: 'alv-finish-registration',
  templateUrl: './finish-registration.component.html',
  styleUrls: ['./finish-registration.component.scss']
})
export class FinishRegistrationComponent implements OnInit {

  registrationSteps = RegistrationStep;

  registrationStep = RegistrationStep.SELECT_ROLE_STEP;

  company: Company;

  organization: OrganizationSuggestion;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  updateStep(step: RegistrationStep) {
    this.registrationStep = step;
  }
}
