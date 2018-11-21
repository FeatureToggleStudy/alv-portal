import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from '../registration.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../core/auth/authentication.service';
import { takeUntil } from 'rxjs/operators';
import { AbstractSubscriber } from '../../core/abstract-subscriber';
import { RegistrationStatus } from '../../core/auth/user.model';
import { StepIndicatorItem } from '../../shared/layout/step-indicator/step.model';
import { NotificationsService } from '../../core/notifications.service';

@Component({
  selector: 'alv-access-code',
  templateUrl: './access-code.component.html',
  styleUrls: ['./access-code.component.scss']
})
export class AccessCodeComponent extends AbstractSubscriber implements OnInit {

  readonly ACCESS_CODE_LENGTH = 8;

  accessCodeForm: FormGroup;

  steps: StepIndicatorItem[];

  constructor(private fb: FormBuilder,
              private registrationService: RegistrationService,
              private router: Router,
              private notificationsService: NotificationsService,
              private authenticationService: AuthenticationService) {
    super();
  }

  ngOnInit() {
    this.accessCodeForm = this.fb.group({
      accessCode: ['', [Validators.required, Validators.minLength(this.ACCESS_CODE_LENGTH), Validators.maxLength(this.ACCESS_CODE_LENGTH)]]
    });

    this.prepareStepIndicator();
  }

  submitAccessCode() {
    this.registrationService.registerEmployerOrAgent(this.accessCodeForm.get('accessCode').value)
        .subscribe((response: { success: boolean, type: string }) => {
          if (response.success) {
            // Force refresh current user from server
            this.authenticationService.getCurrentUser(true)
                .subscribe((user) => {
                  this.router.navigate(['/dashboard']);
                });
          } else {
            this.notificationsService.error('registrationAccessCode.accessCode.error.invalid');
            this.accessCodeForm.reset();
          }
        });
  }

  returnToHome() {
    this.router.navigate(['home']);
  }

  returnToRoleSelection() {
    this.router.navigate(['registration', 'finish']);
  }

  private prepareStepIndicator() {
    this.authenticationService.getCurrentUser()
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(user => {
          if (user.registrationStatus === RegistrationStatus.VALIDATION_PAV) {
            this.steps = this.registrationService.pavSteps;
          } else if (user.registrationStatus === RegistrationStatus.VALIDATION_EMP) {
            this.steps = this.registrationService.companySteps;
          } else {
            this.router.navigate(['home']);
          }
        });
  }
}
