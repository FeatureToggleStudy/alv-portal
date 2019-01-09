import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'alv-job-description',
  templateUrl: './job-description.component.html',
  styleUrls: ['./job-description.component.scss']
})
export class JobDescriptionComponent implements OnInit {
  @Input()
  jobPublicationForm: FormGroup;

  jobDescriptionGroup: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    //todo: Set initial value
    this.jobDescriptionGroup = this.fb.group({
      title: ['', Validators.required],
      numberOfJobs: [''],
    });

    this.jobPublicationForm.addControl('jobDescription', this.jobDescriptionGroup);
  }

}
