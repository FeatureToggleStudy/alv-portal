import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PublicationFormValue } from './publication-form-value.types';
import { JobPublicationFormValueKeys } from '../job-publication-form-value.types';

@Component({
  selector: 'alv-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.scss']
})
export class PublicationComponent implements OnInit {

  @Input()
  parentForm: FormGroup;

  @Input()
  set publicationFormValue(value: PublicationFormValue) {
    this.publication.patchValue(value, { emitEvent: false });
  }

  publication: FormGroup;

  constructor(private fb: FormBuilder) {
    this.publication = this.fb.group({
      publicDisplay: [false, []],
      euresDisplay: [false, []],
    });
  }

  ngOnInit(): void {
    this.parentForm.addControl(JobPublicationFormValueKeys.publication, this.publication);
  }
}
