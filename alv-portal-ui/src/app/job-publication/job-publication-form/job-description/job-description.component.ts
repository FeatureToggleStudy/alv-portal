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
  jobDescriptionFormValue: JobDescriptionFormValue;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.parentForm.addControl('jobDescription', this.buildJobDescriptionGroup(this.jobDescriptionFormValue));
  }

  private buildJobDescriptionGroup(value: JobDescriptionFormValue): FormGroup {
    const { title, numberOfJobs, jobDescription } = value;

    return this.fb.group({
      title: [title, [
        Validators.required,
        Validators.maxLength(this.TITLE_MAX_LENGTH)
      ]],
      numberOfJobs: [numberOfJobs, [
        Validators.required,
        Validators.min(this.NUMBER_OF_JOBS_MIN),
        Validators.max(this.NUMBER_OF_JOBS_MAX)
      ]],
      jobDescription: [jobDescription, [
        Validators.maxLength(this.DESCRIPTION_MAX_LENGTH)
      ]]
    });
  }

  get jobDescriptionGroup(): FormGroup {
    return <FormGroup>this.parentForm.get('jobDescription');
  }
}
