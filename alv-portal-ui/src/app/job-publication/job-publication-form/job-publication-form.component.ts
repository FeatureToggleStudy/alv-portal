import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { JobPublicationFormPanelId } from './job-publication-form-panel-id.enum';
import {
  CompanyFormValue,
  emptyCompanyFormValue
} from './company/company-form-value.types';
import {
  emptyJobDescriptionFormValue,
  JobDescriptionFormValue
} from './job-description/job-description-form-value.types';
import {
  emptyLocationFormValue,
  LocationFormValue
} from './location/location-form-value.types';
import {
  emptyOccupationFormValue,
  OccupationFormValue
} from './occupation/occupation-form-value.types';

@Component({
  selector: 'alv-job-publication-form',
  templateUrl: './job-publication-form.component.html',
  styleUrls: ['./job-publication-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobPublicationFormComponent implements OnInit {

  jobPublicationForm = new FormGroup({});

  jobPublicationFormPanelId = JobPublicationFormPanelId;

  companyGroupValue: CompanyFormValue;

  jobDescriptionFormValue: JobDescriptionFormValue;

  locationFormValue: LocationFormValue;

  occupationFormValue: OccupationFormValue;

  ngOnInit(): void {
    this.companyGroupValue = emptyCompanyFormValue;
    this.jobDescriptionFormValue = emptyJobDescriptionFormValue;
    this.locationFormValue = emptyLocationFormValue;
    this.occupationFormValue = emptyOccupationFormValue;
  }
}


