import { Component, OnInit } from '@angular/core';
import { AbstractRegistrationStep } from '../../../abstract-registration-step';
import { RegistrationStep } from '../../../registration-step.enum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PERSON_NUMBER_REGEX } from '../../../../shared/forms/regex-patterns';
import { Router } from '@angular/router';
import { NgbDate, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsService } from '../../../../core/notifications.service';
import { AuthenticationService } from '../../../../core/auth/authentication.service';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { EMPTY, throwError } from 'rxjs';
import { RegistrationRepository } from '../../../../shared/backend-services/registration/registration.repository';

@Component({
  selector: 'alv-jobseeker-identification',
  templateUrl: './jobseeker-identification.component.html',
  styleUrls: ['./jobseeker-identification.component.scss']
})
export class JobseekerIdentificationComponent extends AbstractRegistrationStep implements OnInit {

  readonly BIRTHDAY_MIN_DATE = NgbDate.from({ year: 1900, month: 1, day: 1 });

  readonly BIRTHDAY_MAX_DATE = NgbDate.from(this.ngbDateNativeAdapter.fromModel(new Date()));

  readonly BIRTHDAY_START_DATE = NgbDate.from({
    year: new Date().getFullYear() - 30,
    month: 1,
    day: 1
  });

  readonly PERSON_NR_MAX_LENGTH = 8;

  jobseekerIdentificationForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private authenticationService: AuthenticationService,
              private ngbDateNativeAdapter: NgbDateNativeAdapter,
              private notificationsService: NotificationsService,
              private registrationRepository: RegistrationRepository) {
    super();
  }

  ngOnInit() {
    this.jobseekerIdentificationForm = this.fb.group({
      personNr: ['', [Validators.required, Validators.pattern(PERSON_NUMBER_REGEX)]],
      birthDate: ['', Validators.required]
    });
  }

  registerJobSeeker() {
    this.registrationRepository.registerJobSeeker({
      personNumber: this.jobseekerIdentificationForm.get('personNr').value,
      birthdateDay: this.jobseekerIdentificationForm.get('birthDate').value.day,
      birthdateMonth: this.jobseekerIdentificationForm.get('birthDate').value.month,
      birthdateYear: this.jobseekerIdentificationForm.get('birthDate').value.year
    }).pipe(
      switchMap(() => {
        return this.authenticationService.refreshCurrentUser();
      }),
      tap(() => {
        this.router.navigate(['/dashboard']);
      }),
      catchError((error) => {
        this.jobseekerIdentificationForm.reset();
        if (error.error.reason) {
          if (error.error.reason === 'InvalidPersonenNumberException') {
            this.notificationsService.error('registration.customer.identificaton.mismatch.error');
            return EMPTY;
          }
          if (error.error.reason === 'StesPersonNumberAlreadyTaken') {
            this.notificationsService.error('registration.customer.identificaton.already-taken.error');
            return EMPTY;
          }
        }
        return throwError(error);
      }))
      .subscribe();
  }

  backAction() {
    this.updateStep.emit(RegistrationStep.SELECT_ROLE_STEP);
  }

  cancelAction() {
    this.router.navigate(['home']);
  }

}
