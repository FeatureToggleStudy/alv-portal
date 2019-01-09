import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'alv-job-publication-form',
  templateUrl: './job-publication-form.component.html',
  styleUrls: ['./job-publication-form.component.scss']
})
export class JobPublicationFormComponent implements OnInit {

  jobPublicationForm: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.jobPublicationForm = this.prepareForm();
  }

  private prepareForm(): FormGroup {
    return this.fb.group({
      title: [''],
      numberOfJobs: ['']
    });
  }
}


