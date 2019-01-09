import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  jobPublicationForm: FormGroup;

  jobDescriptionGroup: FormGroup;


  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    //todo: Set initial value
    this.jobDescriptionGroup = this.fb.group({
      title: ['', [
        Validators.required,
        Validators.maxLength(this.TITLE_MAX_LENGTH)
      ]],
      numberOfJobs: [1, [
        Validators.required,
        Validators.min(this.NUMBER_OF_JOBS_MIN),
        Validators.max(this.NUMBER_OF_JOBS_MAX)
      ]],
      jobDescription: ['', [
        Validators.maxLength(this.DESCRIPTION_MAX_LENGTH)
      ]]
    });

    this.jobPublicationForm.addControl('jobDescription', this.jobDescriptionGroup);
  }

}
