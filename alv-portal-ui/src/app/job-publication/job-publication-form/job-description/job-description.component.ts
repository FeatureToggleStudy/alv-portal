import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobDescriptionFormValue } from './job-description-form-value.types';

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
  set jobDescriptionFormValue(value: JobDescriptionFormValue) {
    this.jobDescription.patchValue({ ...value }, { emitEvent: false });
  }

  jobDescription: FormGroup;

  constructor(private fb: FormBuilder) {
    this.jobDescription = this.fb.group({
      title: [, [
        Validators.required,
        Validators.maxLength(this.TITLE_MAX_LENGTH)
      ]],
      numberOfJobs: [, [
        Validators.required,
        Validators.min(this.NUMBER_OF_JOBS_MIN),
        Validators.max(this.NUMBER_OF_JOBS_MAX)
      ]],
      jobDescription: [, [
        Validators.maxLength(this.DESCRIPTION_MAX_LENGTH)
      ]]
    });
  }

  ngOnInit(): void {
    this.parentForm.addControl('jobDescription', this.jobDescription);
  }
}
