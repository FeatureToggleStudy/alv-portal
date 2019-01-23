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
import { Salutation } from '../../shared/backend-services/shared.types';
import { IsoCountryService } from './iso-country.service';

export interface InitialFormValueConfig {
  jobAdvertisement?: JobAdvertisement;
  jobAdvertisementTitle?: string;
  companyContactTemplateModel?: CompanyContactTemplateModel;
}

@Injectable()
export class JobPublicationFormValueFactory {

  public createJobPublicationFormValue(initialFormValueConfig: InitialFormValueConfig): JobPublicationFormValue {
    if (initialFormValueConfig.jobAdvertisement) {
      return jobPublicationFormMapper.mapToJobPublicationFormValue(initialFormValueConfig.jobAdvertisement);
    }

    const emptyJobPublicationFormValue = this.createEmpty();
    if (initialFormValueConfig.jobAdvertisementTitle) {
      emptyJobPublicationFormValue.jobDescription.title = initialFormValueConfig.jobAdvertisementTitle;
    }
    if (initialFormValueConfig.companyContactTemplateModel) {
      const { companyName, companyStreet, companyZipCode, companyHouseNr } = initialFormValueConfig.companyContactTemplateModel;
      emptyJobPublicationFormValue.company.name = companyName;
      emptyJobPublicationFormValue.company.postOfficeBoxNumberOrStreet.street = companyStreet;
      //todo: review zip code type
      emptyJobPublicationFormValue.company.postOfficeBoxNumberOrStreet.postOfficeBoxNumber = +companyZipCode;
      emptyJobPublicationFormValue.company.houseNumber = companyHouseNr;
      //todo: set zipAndCity
      //emptyJobPublicationFormValue.company.zipAndCity
      emptyJobPublicationFormValue.company.countryIsoCode = IsoCountryService.ISO_CODE_SWITZERLAND;

      const { salutation, firstName, lastName, phone, email } = initialFormValueConfig.companyContactTemplateModel;
      emptyJobPublicationFormValue.contact.salutation = <Salutation>salutation;
      emptyJobPublicationFormValue.contact.firstName = firstName;
      emptyJobPublicationFormValue.contact.lastName = lastName;
      emptyJobPublicationFormValue.contact.phone = phone;
      emptyJobPublicationFormValue.contact.email = email;
    }

    return emptyJobPublicationFormValue;
  }

  createEmpty(): JobPublicationFormValue {
    return {
      jobDescription: emptyJobDescriptionFormValue(),
      occupation: emptyOccupationFormValue(),
      languageSkills: emptyLanguagesFormValue(),
      employment: emptyEmploymentFormValue(),
      location: emptyLocationFormValue(),
      company: emptyCompanyFormValue(),
      contact: emptyContactFormValue(),
      publicContact: emptyPublicContactFormValue(),
      application: emptyApplicationFormValue(),
      publication: emptyPublicationFormValue(),
      surrogate: false,
      disclaimer: false
    };
  }
}
