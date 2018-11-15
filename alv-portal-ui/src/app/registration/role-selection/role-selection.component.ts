import { Component, OnInit } from '@angular/core';
import { RegistrationStep } from '../registration-step.enum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { AbstractRegistrationStep } from '../abstract-registration-step';
import { Router } from '@angular/router';

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

  constructor(private fb: FormBuilder,
              private router: Router) {
    super();
  }

  ngOnInit() {
    this.roleSelectionForm = this.fb.group({
      role: ['', Validators.required],
    });
  }

  selectRole() {
    switch (this.roleSelectionForm.get('role').value) {
      case 'jobseeker':
        this.updateStep.emit(RegistrationStep.JOBSEEKER_PERSON_NR_STEP);
        break;
      case 'company':
        this.updateStep.emit(RegistrationStep.COMPANY_UID_STEP);
        break;
      case 'pav':
        this.updateStep.emit(RegistrationStep.PAV_ADDRESS);
        break;
    }
  }

  cancelAction() {
    this.router.navigate(['home']);
  }

}
