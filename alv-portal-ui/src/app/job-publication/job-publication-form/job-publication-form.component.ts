import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { JobPublicationFormPanelId } from './job-publication-form-panel-id.enum';
import { CompanyFormValue } from './company/company-form-value.types';
import { JobDescriptionFormValue } from './job-description/job-description-form-value.types';
import { LocationFormValue } from './location/location-form-value.types';
import { OccupationFormValue } from './occupation/occupation-form-value.types';
import { LanguageSkill } from '../../shared/backend-services/shared.types';
import { EmploymentFormValue } from './employment/employment-form-value.types';
import { ContactFormValue } from './contact/contact-form-value.types';
import { PublicContactFormValue } from './public-contact/public-contact-form-value.types';
import { PublicationFormValue } from './publication/publication-form-value.types';
import {
  EmployerFormValue,
  emptyEmployerFormValue
} from './employer/employer-form-value.types';
import { ApplicationFormValue } from './application/application-form-value.types';
import { AbstractSubscriber } from '../../core/abstract-subscriber';
import { distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';
import * as  jobPublicationFormMapper from './job-publication-form.mapper';
import { JobPublicationFormValueKeys } from './job-publication-form-value.types';
import { JobPublicationFormValueFactory } from './job-publication-form-value-factory';
import { JobAdvertisementRepository } from '../../shared/backend-services/job-advertisement/job-advertisement.repository';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JobCenter } from '../../shared/backend-services/reference-service/job-center.types';
import { JobCenterRepository } from '../../shared/backend-services/reference-service/job-center.repository';
import { JobAdvertisement } from '../../shared/backend-services/job-advertisement/job-advertisement.types';

@Component({
  selector: 'alv-job-publication-form',
  templateUrl: './job-publication-form.component.html',
  styleUrls: ['./job-publication-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobPublicationFormComponent extends AbstractSubscriber implements OnInit {

  @Output() jobPublicationCreated = new EventEmitter<JobAdvertisement>();

  jobPublicationForm: FormGroup;

  jobPublicationFormPanelId = JobPublicationFormPanelId;

  jobDescriptionFormValue: JobDescriptionFormValue;

  occupationFormValue: OccupationFormValue;

  languagesFormValue: LanguageSkill[];

  employmentFormValue: EmploymentFormValue;

  locationFormValue: LocationFormValue;

  companyFormValue: CompanyFormValue;

  employerFormValue: EmployerFormValue;

  contactFormValue: ContactFormValue;

  publicContactFormValue: PublicContactFormValue;

  applicationFormValue: ApplicationFormValue;

  publicationFormValue: PublicationFormValue;

  constructor(private fb: FormBuilder,
              private jobPublicationFormValueFactory: JobPublicationFormValueFactory,
              private jobAdvertisementRepository: JobAdvertisementRepository,
              private route: ActivatedRoute) {
    super();

    this.jobPublicationForm = this.fb.group({
      surrogate: [false, []],
      disclaimer: [false, [Validators.requiredTrue]]
    });
  }

  ngOnInit(): void {
    const initialFormValueConfig = this.route.snapshot.data.initialFormValueConfig;
    const initialJobPublicationFormValue = this.jobPublicationFormValueFactory.createJobPublicationFormValue(initialFormValueConfig);

    this.jobDescriptionFormValue = initialJobPublicationFormValue.jobDescription;
    this.occupationFormValue = initialJobPublicationFormValue.occupation;
    this.languagesFormValue = initialJobPublicationFormValue.languageSkills;
    this.employmentFormValue = initialJobPublicationFormValue.employment;
    this.locationFormValue = initialJobPublicationFormValue.location;
    this.companyFormValue = initialJobPublicationFormValue.company;
    this.employerFormValue = initialJobPublicationFormValue.employer;
    this.contactFormValue = initialJobPublicationFormValue.contact;
    this.publicContactFormValue = initialJobPublicationFormValue.publicContact;
    this.applicationFormValue = initialJobPublicationFormValue.application;
    this.publicationFormValue = initialJobPublicationFormValue.publication;

    const surrogateFormControl = this.jobPublicationForm.get(JobPublicationFormValueKeys.surrogate);
    surrogateFormControl.patchValue(initialJobPublicationFormValue.surrogate, { emitEvent: false });
    surrogateFormControl.valueChanges.pipe(
      distinctUntilChanged(),
      filter((value: boolean) => value),
      takeUntil(this.ngUnsubscribe)
    ).subscribe((_) => this.employerFormValue = emptyEmployerFormValue);
  }


  copyFromContact() {
    const contactValue = this.jobPublicationForm.get(JobPublicationFormValueKeys.contact).value;
    this.jobPublicationForm.get(JobPublicationFormValueKeys.publicContact).patchValue(contactValue, { emitEvent: false });
  }

  submit() {
    //todo: use the current language
    const createJobAdvertisement = jobPublicationFormMapper.mapToCreateJobAdvertisement(this.jobPublicationForm.value, 'de');
    this.jobAdvertisementRepository.save(createJobAdvertisement)
      .subscribe((resp) => {
        this.jobPublicationCreated.emit(resp.json);
      });
  }

  reset() {
    alert('not yet implemented');
    // TODO: how does the reset work if there are "prefillable" values?
  }
}

