import { JobAdvertisement } from '../../../shared/backend-services/job-advertisement/job-advertisement.types';
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
import { CompanyContactTemplateModel } from '../../../core/auth/company-contact-template-model';
import * as jobPublicationFormMapper from './job-publication-form.mapper';
import {
  mapToCompanyFormValue,
  mapToContactFormValue
} from './job-publication-form.mapper';

export interface InitialFormValueConfig {
  jobAdvertisement?: JobAdvertisement;
  jobAdvertisementTitle?: string;
  companyContactTemplateModel?: CompanyContactTemplateModel;
}

@Injectable()
export class JobPublicationFormValueFactory {

  public createJobPublicationFormValue(initialFormValueConfig: InitialFormValueConfig, currentLanguageIsoCode: string): JobPublicationFormValue {
    if (initialFormValueConfig.jobAdvertisement) {
      const duplicatedJobPublicationFormValue = jobPublicationFormMapper.mapToJobPublicationFormValue(initialFormValueConfig.jobAdvertisement, currentLanguageIsoCode);
      if (initialFormValueConfig.companyContactTemplateModel) {
        duplicatedJobPublicationFormValue.contact = mapToContactFormValue(initialFormValueConfig.companyContactTemplateModel, currentLanguageIsoCode);
      }

      return duplicatedJobPublicationFormValue;
    }

    const emptyJobPublicationFormValue = this.createEmpty(currentLanguageIsoCode);
    if (initialFormValueConfig.jobAdvertisementTitle) {
      emptyJobPublicationFormValue.jobDescription.title = initialFormValueConfig.jobAdvertisementTitle;
    }
    if (initialFormValueConfig.companyContactTemplateModel) {
      emptyJobPublicationFormValue.company = mapToCompanyFormValue(initialFormValueConfig.companyContactTemplateModel);
      emptyJobPublicationFormValue.contact = mapToContactFormValue(initialFormValueConfig.companyContactTemplateModel, currentLanguageIsoCode);
    }

    return emptyJobPublicationFormValue;
  }

  createEmpty(currentLanguageIsoCode: string): JobPublicationFormValue {
    return {
      jobDescription: emptyJobDescriptionFormValue(),
      occupation: emptyOccupationFormValue(),
      languageSkills: emptyLanguagesFormValue(),
      employment: emptyEmploymentFormValue(),
      location: emptyLocationFormValue(),
      company: emptyCompanyFormValue(),
      contact: emptyContactFormValue(currentLanguageIsoCode),
      publicContact: emptyPublicContactFormValue(),
      application: emptyApplicationFormValue(),
      publication: emptyPublicationFormValue(),
      surrogate: false,
      disclaimer: false
    };
  }
}
