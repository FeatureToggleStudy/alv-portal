import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'alv-job-publication-form',
  templateUrl: './job-publication-form.component.html',
  styleUrls: ['./job-publication-form.component.scss']
})
export class JobPublicationFormComponent implements OnInit {

  jobPublicationForm: FormGroup;

  ngOnInit(): void {
    this.jobPublicationForm = new FormGroup({});
  }
}


