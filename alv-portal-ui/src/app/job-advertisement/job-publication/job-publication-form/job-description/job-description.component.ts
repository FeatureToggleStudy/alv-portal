import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobDescriptionFormValue } from './job-description-form-value.types';
import { JobPublicationFormValueKeys } from '../job-publication-form-value.types';

export const ONE_TWO_DIGIT_INTEGER_REGEX = /^[1-9][0-9]?$/;


@Component({
  selector: 'alv-job-description',
  templateUrl: './job-description.component.html',
  styleUrls: ['./job-description.component.scss']
})
export class JobDescriptionComponent implements OnInit {

  readonly TITLE_MAX_LENGTH = 255;

  readonly NUMBER_OF_JOBS_MIN = 1;

  readonly NUMBER_OF_JOBS_MAX = 99;

  readonly DESCRIPTION_MAX_LENGTH = 10000;

  @Input()
  parentForm: FormGroup;

  @Input()
  jobDescriptionFormValue: JobDescriptionFormValue;

  jobDescription: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    const { title, numberOfJobs, jobDescription } = this.jobDescriptionFormValue;

    this.jobDescription = this.fb.group({
      title: [title, [
        Validators.required,
        Validators.maxLength(this.TITLE_MAX_LENGTH)
      ]],
      numberOfJobs: [numberOfJobs, [
        Validators.required,
        Validators.min(this.NUMBER_OF_JOBS_MIN),
        Validators.max(this.NUMBER_OF_JOBS_MAX),
        Validators.pattern(ONE_TWO_DIGIT_INTEGER_REGEX)
      ]],
      jobDescription: [jobDescription, [
        Validators.required,
        Validators.maxLength(this.DESCRIPTION_MAX_LENGTH)
      ]]
    });

    this.parentForm.addControl(JobPublicationFormValueKeys.jobDescription, this.jobDescription);
  }
}
