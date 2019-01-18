import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
import { LanguageSkill } from '../../shared/backend-services/shared.types';
import { emptyLanguagesFormValue } from './languages/languages-form-value.types';
import {
  EmploymentFormValue,
  emptyEmploymentFormValue
} from './employment/employment-form-value.types';
import {
  ContactFormValue,
  emptyContactFormValue
} from './contact/contact-form-value.types';
import {
  emptyPublicContactFormValue,
  PublicContactFormValue
} from './public-contact/public-contact-form-value.types';
import {
  emptyPublicationFormValue,
  PublicationFormValue
} from './publication/publication-form-value.types';
import {
  EmployerFormValue,
  emptyEmployerFormValue
} from './employer/employer-form-value.types';
import {
  ApplicationFormValue,
  emptyApplicationFormValue
} from './application/application-form-value.types';

@Component({
  selector: 'alv-job-publication-form',
  templateUrl: './job-publication-form.component.html',
  styleUrls: ['./job-publication-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobPublicationFormComponent implements OnInit {

  @Output() jobPublicationCreated = new EventEmitter<null>();

  jobPublicationForm: FormGroup;

  jobPublicationFormPanelId = JobPublicationFormPanelId;

  jobDescriptionFormValue: JobDescriptionFormValue;

  occupationFormValue: OccupationFormValue;

  languagesFormValue: LanguageSkill[];

  employmentFormValue: EmploymentFormValue;

  locationFormValue: LocationFormValue;

  companyGroupValue: CompanyFormValue;

  employerFormValue: EmployerFormValue;

  contactFormValue: ContactFormValue;

  publicContactFormValue: PublicContactFormValue;

  applicationFormValue: ApplicationFormValue;

  publicationFormValue: PublicationFormValue;

  constructor(private fb: FormBuilder) {
    this.jobPublicationForm = this.fb.group({
      surrogate: [false, []],
      disclaimer: [false, [Validators.requiredTrue]]
    });
  }

  ngOnInit(): void {
    this.jobDescriptionFormValue = emptyJobDescriptionFormValue;
    this.occupationFormValue = emptyOccupationFormValue;
    this.languagesFormValue = emptyLanguagesFormValue;
    this.employmentFormValue = emptyEmploymentFormValue;
    this.locationFormValue = emptyLocationFormValue;
    this.companyGroupValue = emptyCompanyFormValue;
    this.employerFormValue = emptyEmployerFormValue;
    this.contactFormValue = emptyContactFormValue;
    this.publicContactFormValue = emptyPublicContactFormValue;
    this.applicationFormValue = emptyApplicationFormValue;
    this.publicationFormValue = emptyPublicationFormValue;
  }

  copyFromContact() {
    this.publicContactFormValue = { ...this.jobPublicationForm.get('contact').value };
  }

  submit() {
    alert('not yet implemented');
    // TODO: map the form value to the backend DTO structure
    this.jobPublicationCreated.emit();
  }

  reset() {
    alert('not yet implemented');
    // TODO: how does the reset work if there are "prefillable" values?
  }
}

