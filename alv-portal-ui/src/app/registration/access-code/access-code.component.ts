import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from '../registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'alv-access-code',
  templateUrl: './access-code.component.html',
  styleUrls: ['./access-code.component.scss']
})
export class AccessCodeComponent implements OnInit {

  readonly ACCESS_CODE_LENGTH = 8;

  accessCodeForm: FormGroup;

  companySteps = this.registrationService.companySteps;

  pavSteps = this.registrationService.companySteps;

  constructor(private fb: FormBuilder,
              private registrationService: RegistrationService,
              private router: Router) {
  }

  ngOnInit() {
    this.accessCodeForm = this.fb.group({
      accessCode: ['', [Validators.required, Validators.minLength(this.ACCESS_CODE_LENGTH), Validators.maxLength(this.ACCESS_CODE_LENGTH)]]
    });
  }

  submitAccessCode() {
    this.registrationService.registerEmployerOrAgent(this.accessCodeForm.get('accessCode').value).subscribe()
  }

  returnToHome() {
    this.router.navigate(['home']);
  }

  returnToRoleSelection() {
    this.router.navigate(['registration', 'finish']);
  }
}
