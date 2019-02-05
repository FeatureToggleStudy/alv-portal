import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IconKey } from '../../shared/layout/custom-icon/custom-icon.component';

@Component({
  selector: 'alv-job-publication-widget',
  templateUrl: './job-publication-widget.component.html',
  styleUrls: ['./job-publication-widget.component.scss']
})
export class JobPublicationWidgetComponent implements OnInit {

  readonly TITLE_MAX_LENGTH = 255;

  IconKey = IconKey;

  form: FormGroup;

  constructor(private router: Router,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      jobPublicationTitle: ['', Validators.maxLength(this.TITLE_MAX_LENGTH)]
    });
  }

  onSubmit() {
    this.router.navigate(['job-publication'], {
      queryParams: {
        'job-title': this.form.value.jobPublicationTitle
      }
    });
  }

}
