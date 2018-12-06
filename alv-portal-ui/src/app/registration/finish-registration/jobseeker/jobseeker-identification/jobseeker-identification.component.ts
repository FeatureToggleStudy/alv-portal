import { Component, OnInit } from '@angular/core';
import { AbstractRegistrationStep } from '../../../abstract-registration-step';
import { RegistrationStep } from '../../../registration-step.enum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PERSON_NUMBER_REGEX } from '../../../../shared/forms/regex-patterns';
import { RegistrationRepository } from '../../../../service/registration/registration.repository';
import { Router } from '@angular/router';
import { NgbDate, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsService } from '../../../../core/notifications.service';

@Component({
  selector: 'alv-jobseeker-identification',
  templateUrl: './jobseeker-identification.component.html',
  styleUrls: ['./jobseeker-identification.component.scss']
})
export class JobseekerIdentificationComponent extends AbstractRegistrationStep implements OnInit {

  readonly BIRTHDAY_MIN_DATE = NgbDate.from({year: 1900, month: 1, day: 1});

  readonly BIRTHDAY_MAX_DATE = NgbDate.from(this.ngbDateNativeAdapter.fromModel(new Date()));

  readonly BIRTHDAY_START_DATE = NgbDate.from({year: new Date().getFullYear() - 30, month: 1, day: 1});

  readonly PERSON_NR_MAX_LENGTH = 8;

  jobseekerIdentificationForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private ngbDateNativeAdapter: NgbDateNativeAdapter,
              private notificationsService: NotificationsService,
              private registrationService: RegistrationRepository) {
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
    }).subscribe(success => {
      if (success) {
        this.router.navigate(['home']);
      }
    }, error => {
      this.jobseekerIdentificationForm.reset();
      if (error.error.reason) {
        if (error.error.reason === 'InvalidPersonenNumberException') {
          return this.notificationsService.error('registration.customer.identificaton.mismatch.error');
        }
        if (error.error.reason === 'StesPersonNumberAlreadyTaken') {
          return this.notificationsService.error('registration.customer.identificaton.already-taken.error');
        }
        return this.notificationsService.error('registration.customer.identificaton.technical.error');
      }
    });
  }

  backAction() {
    this.updateStep.emit(RegistrationStep.SELECT_ROLE_STEP);
  }

  cancelAction() {
    this.router.navigate(['home']);
  }

}
