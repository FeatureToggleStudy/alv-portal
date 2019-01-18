import { JobAdvertisement } from '../../shared/backend-services/job-advertisement/job-advertisement.types';
import { JobPublicationFormValue } from './job-publication-form-value.types';
import { emptyPublicContactFormValue } from './public-contact/public-contact-form-value.types';
import { emptyPublicationFormValue } from './publication/publication-form-value.types';
import { emptyJobDescriptionFormValue } from './job-description/job-description-form-value.types';
import { emptyOccupationFormValue } from './occupation/occupation-form-value.types';
import { emptyLanguagesFormValue } from './languages/languages-form-value.types';
import { emptyEmploymentFormValue } from './employment/employment-form-value.types';
import { emptyLocationFormValue } from './location/location-form-value.types';
import { emptyCompanyFormValue } from './company/company-form-value.types';
import { emptyContactFormValue } from './contact/contact-form-value.types';
import { emptyApplicationFormValue } from './application/application-form-value.types';
import { Injectable } from '@angular/core';
import { CompanyContactTemplateModel } from '../../core/auth/company-contact-template-model';
import * as jobPublicationFormMapper from './job-publication-form.mapper';

interface InitialValueConfig {
  jobAdvertisement: JobAdvertisement;
  jobAdvertisementTitle: string;
  companyContactTemplateModel: CompanyContactTemplateModel;
}

@Injectable()
export class JobPublicationFormValueFactory {

  public createJobPublicationFormValue(initialValueConfig: InitialValueConfig): JobPublicationFormValue {
    if (initialValueConfig.jobAdvertisement) {
      return jobPublicationFormMapper.mapToJobPublicationFormValue(initialValueConfig.jobAdvertisement);
    }

    const emptyJobPublicationFormValue = this.createEmpty();
    if (initialValueConfig.jobAdvertisementTitle) {
      emptyJobPublicationFormValue.jobDescription.title = initialValueConfig.jobAdvertisementTitle;
    }
    if (initialValueConfig.companyContactTemplateModel) {
      //todo: implement
    }

    return emptyJobPublicationFormValue;
  }

  createEmpty(): JobPublicationFormValue {
    return {
      jobDescription: emptyJobDescriptionFormValue,
      occupation: emptyOccupationFormValue,
      languageSkills: emptyLanguagesFormValue,
      employment: emptyEmploymentFormValue,
      location: emptyLocationFormValue,
      company: emptyCompanyFormValue,
      contact: emptyContactFormValue,
      publicContact: emptyPublicContactFormValue,
      application: emptyApplicationFormValue,
      publication: emptyPublicationFormValue,
      surrogate: false,
      disclaimer: false
    };
  }
}
