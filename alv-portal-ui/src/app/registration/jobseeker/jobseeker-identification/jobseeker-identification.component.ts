import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractRegistrationStep } from '../../abstract-registration-step';
import { RegistrationStep } from '../../registration-step.enum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PERSON_NUMBER_REGEX } from '../../../shared/forms/regex-patterns';
import { RegistrationService } from '../../registration.service';
import { catchError } from 'rxjs/operators';
import { NotificationsService } from '../../../core/notifications.service';
import { EMPTY } from 'rxjs';
import { Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'alv-jobseeker-identification',
  templateUrl: './jobseeker-identification.component.html',
  styleUrls: ['./jobseeker-identification.component.scss']
})
export class JobseekerIdentificationComponent extends AbstractRegistrationStep implements OnInit {

  readonly BIRTHDAY_MIN_DATE = this.toNgbDate(new Date(1900, 1, 1));
  readonly BIRTHDAY_MAX_DATE = this.toNgbDate(new Date());
  readonly BIRTHDAY_START_DATE = this.toNgbDate(new Date(new Date().getFullYear() - 30, 0));

  jobseekerIdentificationForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private registrationService: RegistrationService,
              private notificationsService: NotificationsService) {
    super();
  }

  ngOnInit() {
    this.jobseekerIdentificationForm = this.fb.group({
      personNr: ['', [Validators.required, Validators.pattern(PERSON_NUMBER_REGEX)]],
      birthDate: ['', Validators.required]
    });
  }

  registerJobSeeker() {
    this.registrationService.registerJobSeeker({
      personNumber: this.jobseekerIdentificationForm.get('personNr').value,
      birthdateDay: this.jobseekerIdentificationForm.get('birthDate').value.day,
      birthdateMonth: this.jobseekerIdentificationForm.get('birthDate').value.month,
      birthdateYear: this.jobseekerIdentificationForm.get('birthDate').value.year
    }).pipe(
        catchError((error) => {
          if (error.error.reason) {
            if (error.error.reason === 'InvalidPersonenNumberException') {
              this.notificationsService.error('registration.customer.identificaton.mismatch.error');
            }
            if (error.error.reason === 'StesPersonNumberAlreadyTaken') {
              this.notificationsService.error('registration.customer.identificaton.already-taken.error');
            }
          }
          this.notificationsService.error('registration.customer.identificaton.technical.error');
          return EMPTY;
        })
    ).subscribe(success => {
      if (success) {
        this.router.navigate(['home']);
      } else {
        this.notificationsService.error('registration.customer.identificaton.technical.error');
      }
    });
  }

  backAction() {
    this.updateStep.emit(RegistrationStep.SELECT_ROLE_STEP);
  }

  cancelAction() {
    this.router.navigate(['home']);
  }

  private toNgbDate(date: Date): NgbDateStruct {
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate()
    };
  }

}
