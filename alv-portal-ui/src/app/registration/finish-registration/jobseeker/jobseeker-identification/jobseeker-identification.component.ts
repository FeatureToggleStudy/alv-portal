import { Component, OnInit } from '@angular/core';
import { AbstractRegistrationStep } from '../../../abstract-registration-step';
import { RegistrationStep } from '../../../registration-step.enum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PERSON_NUMBER_REGEX } from '../../../../shared/forms/regex-patterns';
import { RegistrationService } from '../../../registration.service';
import { Router } from '@angular/router';
import { MappingService } from '../../../../service/mapping/mapping.service';

@Component({
  selector: 'alv-jobseeker-identification',
  templateUrl: './jobseeker-identification.component.html',
  styleUrls: ['./jobseeker-identification.component.scss']
})
export class JobseekerIdentificationComponent extends AbstractRegistrationStep implements OnInit {

  readonly BIRTHDAY_MIN_DATE = MappingService.toNgbDate(new Date(1900, 1, 1));

  readonly BIRTHDAY_MAX_DATE = MappingService.toNgbDate(new Date());

  readonly BIRTHDAY_START_DATE = MappingService.toNgbDate(new Date(new Date().getFullYear() - 30, 0));

  readonly PERSON_NR_MAX_LENGTH = 8;

  jobseekerIdentificationForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private registrationService: RegistrationService) {
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
    }, err => {
        this.jobseekerIdentificationForm.reset();
    });
  }

  backAction() {
    this.updateStep.emit(RegistrationStep.SELECT_ROLE_STEP);
  }

  cancelAction() {
    this.router.navigate(['home']);
  }

}
