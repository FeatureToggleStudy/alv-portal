import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  COMPANY_UID_REGEX,
  PERSON_NUMBER_REGEX
} from '../../shared/forms/regex-patterns';
import { RegistrationStep } from '../registration-step.enum';
import { Step } from '../step-indicator/step.model';
import { Company } from '../registration.model';
import { OrganizationSuggestion } from '../../service/organization/organization.model';

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
