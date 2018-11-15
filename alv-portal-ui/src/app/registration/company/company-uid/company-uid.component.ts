import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { COMPANY_UID_REGEX } from '../../../shared/forms/regex-patterns';
import { AbstractRegistrationStep } from '../../abstract-registration-step';
import { RegistrationStep } from '../../registration-step.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'alv-company-uid',
  templateUrl: './company-uid.component.html',
  styleUrls: ['./company-uid.component.scss']
})
export class CompanyUidComponent extends AbstractRegistrationStep implements OnInit {

  companyUidForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router) {
    super();
  }

  ngOnInit() {
    this.companyUidForm = this.fb.group({
      uid: ['', [Validators.required, Validators.pattern(COMPANY_UID_REGEX)]]
    });

  }

  backAction() {
    this.updateStep.emit(RegistrationStep.SELECT_ROLE_STEP);
  }

  cancelAction() {
    this.router.navigate(['home']);
  }

}
