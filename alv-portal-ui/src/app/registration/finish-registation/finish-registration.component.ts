import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  COMPANY_UID_REGEX,
  PERSON_NUMBER_REGEX
} from '../../shared/forms/regex-patterns';
import { RegistrationStep } from '../registration-step.enum';

@Component({
  selector: 'alv-finish-registration',
  templateUrl: './finish-registration.component.html',
  styleUrls: ['./finish-registration.component.scss']
})
export class FinishRegistrationComponent implements OnInit {

  registrationSteps = RegistrationStep;

  registrationStep = RegistrationStep.SELECT_ROLE_STEP;

  registrationSelection = new FormControl();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {


  }


}
