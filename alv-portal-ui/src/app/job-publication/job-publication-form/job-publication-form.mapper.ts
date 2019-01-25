import {
  ApplyChannel,
  Company,
  Contact,
  CreateJobAdvertisement,
  CreateLocation,
  Employer,
  Employment,
  JobAdvertisement,
  JobDescription,
  Location,
  Occupation,
  Publication,
  PublicContact,
  WorkExperience
} from '../../shared/backend-services/job-advertisement/job-advertisement.types';
import { JobPublicationFormValue } from './job-publication-form-value.types';
import {
  emptyJobDescriptionFormValue,
  JobDescriptionFormValue
} from './job-description/job-description-form-value.types';
import {
  Degree, DegreeMapping,
  EmploymentDuration,
  Experience,
  LanguageSkill,
  PostAddress,
  WorkForm
} from '../../shared/backend-services/shared.types';
import { EmploymentFormValue } from './employment/employment-form-value.types';
import { LocationFormValue } from './location/location-form-value.types';
import { CompanyFormValue } from './company/company-form-value.types';
import { PublicationFormValue } from './publication/publication-form-value.types';
import {
  ContactFormValue,
  emptyContactFormValue
} from './contact/contact-form-value.types';
import {
  emptyPublicContactFormValue,
  PublicContactFormValue
} from './public-contact/public-contact-form-value.types';
import {
  ApplicationFormValue,
  emptyApplicationFormValue
} from './application/application-form-value.types';
import {
  EmployerFormValue,
  emptyEmployerFormValue
} from './employer/employer-form-value.types';

import { PostAddressFormValue } from './post-address-form/post-address-form-value.types';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { formatDate } from '@angular/common';
import { ZipCityFormValue } from './zip-city-input/zip-city-form-value.types';

import { LanguagesFormValue } from './languages/languages-form-value.types';
import { LocalitySuggestionService } from '../../shared/localities/locality-suggestion.service';
import { IsoCountryService } from './iso-country.service';
import {
  emptyOccupationFormValue,
  OccupationFormValue
} from './occupation/occupation-form-value.types';


export function mapToJobPublicationFormValue(jobAdvertisement: JobAdvertisement): JobPublicationFormValue {
  const jobContent = jobAdvertisement.jobContent;

  return {
    jobDescription: mapToJobDescriptionFormValue(jobContent.jobDescriptions, jobContent.numberOfJobs),
    occupation: mapToOccupationFormValue(jobContent.occupations),
    languageSkills: mapToLanguagesFormValue(jobContent.languageSkills),
    employment: mapToEmploymentFormValue(jobContent.employment),
    location: mapToLocationFormValue(jobContent.location),
    company: mapToCompanyFormValue(jobContent.company),
    //todo: implement
    contact: emptyContactFormValue(),
    publicContact: mapToPublicContactFormValue(jobContent.publicContact),
    surrogate: jobContent.company.surrogate,
    employer: mapToEmployerFormValue(jobContent.employer),
    application: mapToApplicationFormValue(jobContent.applyChannel),
    publication: mapToPublicationFormValue(jobAdvertisement.publication),
    disclaimer: false
  };
}

function mapToJobDescriptionFormValue(jobDescriptions: JobDescription[], numberOfJobs: string): JobDescriptionFormValue {
  if (!jobDescriptions || jobDescriptions.length === 0) {
    return emptyJobDescriptionFormValue();
  }

  const jobDescription = jobDescriptions[0];

  return {
    title: jobDescription.title,
    jobDescription: jobDescription.title,
    numberOfJobs: +numberOfJobs,
  };
}

function mapToOccupationFormValue(occupations: Occupation[]): OccupationFormValue {
  if (!occupations || occupations.length === 0) {
    return emptyOccupationFormValue();
  }

  const occupation = occupations[0];
  return {
    degree: <Degree>DegreeMapping[occupation.educationCode],
    experience: <Experience>Experience[occupation.workExperience],
    //todo: create a SingleTypeaheadItem
    occupationSuggestion: null
  };
}

function mapToLanguagesFormValue(languageSkills: LanguageSkill[]): LanguagesFormValue {
  return languageSkills ? languageSkills : [];
}

function mapToEmploymentFormValue(employment: Employment): EmploymentFormValue {
  return {
    startDate: mapToNgbDateStruct(employment.startDate),
    endDate: mapToNgbDateStruct(employment.endDate),
    immediately: employment.immediately,
    workloadPercentageMin: parseInt(employment.workloadPercentageMin.toString(), 10),
    workloadPercentageMax: parseInt(employment.workloadPercentageMax.toString(), 10),
    duration: mapToDuration(employment),
    workForms: Object.keys(WorkForm).reduce((acc, curr) => {
      acc[curr] = !!employment.workForms[curr];
      return acc;
    }, {})
  };
}

function mapToDuration(employment: Employment): EmploymentDuration {
  if (employment.shortEmployment) {
    return EmploymentDuration.SHORT_EMPLOYMENT;
  }

  if (employment.permanent) {
    return EmploymentDuration.PERMANENT;
  }

  return EmploymentDuration.TEMPORARY;
}

function mapToNgbDateStruct(dateSting: string): NgbDateStruct {
  if (!dateSting) {
    return null;
  }

  const date = new Date(dateSting);
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate()
  };
}

function mapToLocationFormValue(location: Location): LocationFormValue {

  return {
    countryIsoCode: location.countryIsoCode,
    zipAndCity: mapToZipCityFormValue(location.countryIsoCode, location.postalCode, location.city),
    remarks: location.remarks,
  };
}

function mapToCompanyFormValue(company: Company): CompanyFormValue {
  return {
    name: company.name,
    postOfficeBoxNumberOrStreet: {
      street: company.street,
      //todo review type
      postOfficeBoxNumber: +company.postOfficeBoxPostalCode
    },
    zipAndCity: mapToZipCityFormValue(company.countryIsoCode, company.postalCode, company.city),
    houseNumber: company.houseNumber,
    countryIsoCode: company.countryIsoCode
  };
}

function mapToZipCityFormValue(countryIsoCode: string, zipCode: string, city: string): ZipCityFormValue {
  const zipAndCity = { zipCode, city };
  if (countryIsoCode === IsoCountryService.ISO_CODE_SWITZERLAND) {
    return LocalitySuggestionService.toZipAndCityTypeaheadItem(zipAndCity, 0);
  }

  return zipAndCity;
}

function mapToPublicContactFormValue(publicContact: PublicContact): PublicContactFormValue {
  if (!publicContact) {
    return emptyPublicContactFormValue();
  }

  return {
    salutation: publicContact.salutation,
    firstName: publicContact.firstName,
    lastName: publicContact.lastName,
    email: publicContact.email,
    phone: publicContact.phone
  };
}

function mapToEmployerFormValue(employer: Employer): EmployerFormValue {
  if (!employer) {
    return emptyEmployerFormValue();
  }

  return {
    name: employer.name,
    countryIsoCode: employer.countryIsoCode,
    zipAndCity: mapToZipCityFormValue(employer.countryIsoCode, employer.postalCode, employer.city)
  };
}

function mapToApplicationFormValue(applyChannel: ApplyChannel): ApplicationFormValue {
  if (!applyChannel) {
    return emptyApplicationFormValue();
  }

  const application: ApplicationFormValue = {
    selectedApplicationTypes: {
      form: false,
      email: false,
      phone: false,
      post: false
    },
    additionalInfo: applyChannel.additionalInfo
  };

  if (!!applyChannel.formUrl) {
    application.selectedApplicationTypes.form = true;
    application.formUrl = applyChannel.formUrl;
  }

  if (!!applyChannel.emailAddress) {
    application.selectedApplicationTypes.email = true;
    application.emailAddress = applyChannel.emailAddress;
  }

  if (!!applyChannel.phoneNumber) {
    application.selectedApplicationTypes.phone = true;
    application.phoneNumber = applyChannel.phoneNumber;
  }

  if (!!application.postAddress) {
    const postAddress = applyChannel.postAddress;
    application.selectedApplicationTypes.post = true;

    application.postAddress = {
      name: postAddress.name,
      countryIsoCode: postAddress.countryIsoCode,
      houseNumber: postAddress.houseNumber,
      postOfficeBoxNumberOrStreet: {
        street: postAddress.street,
        //todo review type
        postOfficeBoxNumber: +postAddress.postOfficeBoxNumber
      },
      zipAndCity: mapToZipCityFormValue(postAddress.countryIsoCode, postAddress.postalCode, postAddress.city)
    };
  }

  return application;
}

function mapToPublicationFormValue(publication: Publication): PublicationFormValue {
  return {
    euresDisplay: publication.euresDisplay,
    publicDisplay: publication.publicDisplay
  };
}

export function mapToCreateJobAdvertisement(jobPublicationFormValue: JobPublicationFormValue, languageIsoCode: string): CreateJobAdvertisement {
  return {
    reportToAvam: true,
    jobDescriptions: mapToJobDescriptions(jobPublicationFormValue.jobDescription, languageIsoCode),
    numberOfJobs: jobPublicationFormValue.jobDescription.numberOfJobs.toString(),
    occupation: mapToOccupation(jobPublicationFormValue.occupation),
    languageSkills: mapToLanguageSkills(jobPublicationFormValue.languageSkills),
    employment: mapToEmployment(jobPublicationFormValue.employment),
    location: mapToLocation(jobPublicationFormValue.location),
    company: mapToCompany(jobPublicationFormValue.company, jobPublicationFormValue.surrogate),
    contact: mapToContact(jobPublicationFormValue.contact),
    publicContact: mapToPublicContact(jobPublicationFormValue.publicContact),
    publication: mapToPublication(jobPublicationFormValue.publication),
    applyChannel: mapToApplyChannel(jobPublicationFormValue.application),
    employer: mapToEmployer(jobPublicationFormValue.employer),
  };
}


function mapToJobDescriptions(jobDescriptionFormValue: JobDescriptionFormValue, languageIsoCode: string): JobDescription[] {
  const jobDescription = {
    title: jobDescriptionFormValue.title,
    description: jobDescriptionFormValue.jobDescription,
    languageIsoCode
  };

  return [jobDescription];
}

function mapToOccupation(occupationFormValue: OccupationFormValue): Occupation {
  return {
    avamOccupationCode: occupationFormValue.occupationSuggestion.payload.value,
    workExperience: occupationFormValue.experience
      ? WorkExperience[occupationFormValue.experience]
      : null,
    educationCode: occupationFormValue.degree
      ? Degree[occupationFormValue.degree]
      : null,
  };
}

function mapToLanguageSkills(languageSkills: LanguageSkill[]): LanguageSkill[] {
  return languageSkills.filter((languageSkill) => !!languageSkill.languageIsoCode);
}

function mapToEmployment(employmentFormValue: EmploymentFormValue): Employment {
  return {
    immediately: employmentFormValue.immediately,
    shortEmployment: employmentFormValue.duration === EmploymentDuration.SHORT_EMPLOYMENT,
    permanent: employmentFormValue.duration === EmploymentDuration.PERMANENT,
    workForms: mapToWorkForms(employmentFormValue.workForms),
    workloadPercentageMin: employmentFormValue.workloadPercentageMin,
    workloadPercentageMax: employmentFormValue.workloadPercentageMax,
    startDate: mapToLocalDateString(employmentFormValue.startDate),
    endDate: mapToLocalDateString(employmentFormValue.endDate),
  };
}

function mapToWorkForms(workFormsFormValue: { [p: string]: boolean }): string[] {
  return Object.keys(workFormsFormValue)
    .filter((workFormKey) => workFormsFormValue[workFormKey])
    .map((workFormKey) => WorkForm[workFormKey]);
}

function mapToLocation(locationFormValue: LocationFormValue): CreateLocation {
  return {
    remarks: locationFormValue.remarks,
    ...mapToPostalCodeAndCity(locationFormValue.zipAndCity),
    countryIsoCode: locationFormValue.countryIsoCode
  };
}

function mapToCompany(companyFormValue: CompanyFormValue, surrogate: boolean): Company {
  return {
    surrogate,
    name: companyFormValue.name,
    street: companyFormValue.postOfficeBoxNumberOrStreet.street,
    houseNumber: companyFormValue.houseNumber,
    ...mapToPostalCodeAndCity(companyFormValue.zipAndCity),
    countryIsoCode: companyFormValue.countryIsoCode,
    postOfficeBoxNumber: !!companyFormValue.postOfficeBoxNumberOrStreet.postOfficeBoxNumber
      ? companyFormValue.postOfficeBoxNumberOrStreet.postOfficeBoxNumber.toString()
      : null,
    //todo postOfficeBoxCity, postOfficeBoxPostalCode?
  };
}

function mapToEmployer(employerFormValue: EmployerFormValue): Employer {
  if (!employerFormValue) {
    return null;
  }

  return {
    name: employerFormValue.name,
    ...mapToPostalCodeAndCity(employerFormValue.zipAndCity),
    countryIsoCode: employerFormValue.countryIsoCode
  };
}

function mapToContact(contactFormValue: ContactFormValue): Contact {
  return {
    salutation: contactFormValue.salutation,
    firstName: contactFormValue.firstName,
    lastName: contactFormValue.lastName,
    phone: contactFormValue.phone,
    email: contactFormValue.email,
    languageIsoCode: contactFormValue.languageIsoCode
  };
}

function mapToPublicContact(publicContactFormValue: PublicContactFormValue): PublicContact {
  return {
    salutation: publicContactFormValue.salutation,
    firstName: publicContactFormValue.firstName,
    lastName: publicContactFormValue.lastName,
    phone: publicContactFormValue.phone,
    email: publicContactFormValue.email
  };
}

function mapToPublication(publicationFormValue: PublicationFormValue): Publication {
  return {
    euresDisplay: publicationFormValue.euresDisplay,
    publicDisplay: publicationFormValue.publicDisplay,
    startDate: mapToLocalDateString(new Date())
  };
}

function mapToApplyChannel(applicationFormValue: ApplicationFormValue): ApplyChannel {
  return {
    formUrl: applicationFormValue.formUrl ? applicationFormValue.formUrl : null,
    emailAddress: applicationFormValue.emailAddress ? applicationFormValue.emailAddress : null,
    phoneNumber: applicationFormValue.phoneNumber ? applicationFormValue.phoneNumber : null,
    postAddress: mapToApplyChannelPostAddress(applicationFormValue.postAddress),
    additionalInfo: applicationFormValue.additionalInfo,
    rawPostAddress: null
  };
}

function mapToApplyChannelPostAddress(postAddressFormValue: PostAddressFormValue): PostAddress {
  if (!postAddressFormValue) {
    return null;
  }

  return {
    name: postAddressFormValue.name,
    street: postAddressFormValue.postOfficeBoxNumberOrStreet.street,
    houseNumber: postAddressFormValue.houseNumber,
    ...mapToPostalCodeAndCity(postAddressFormValue.zipAndCity),
    countryIsoCode: postAddressFormValue.countryIsoCode,
    postOfficeBoxNumber: !!postAddressFormValue.postOfficeBoxNumberOrStreet.postOfficeBoxNumber
      ? postAddressFormValue.postOfficeBoxNumberOrStreet.postOfficeBoxNumber.toString()
      : null,
    //todo postOfficeBoxCity, postOfficeBoxPostalCode?
  };
}

function mapToPostalCodeAndCity(zipCityFormValue: ZipCityFormValue): { postalCode: string, city: string } {
  const city = ('city' in zipCityFormValue)
    ? zipCityFormValue.city
    : zipCityFormValue.payload.city;

  const postalCode = ('zipCode' in zipCityFormValue)
    ? zipCityFormValue.zipCode
    : zipCityFormValue.payload.zipCode;

  return { city, postalCode };
}

function mapToLocalDateString(date: NgbDateStruct | Date) {
  if (!date) {
    return null;
  }

  const dateObj = (date instanceof Date)
    ? date
    : new Date(date.year, date.month - 1, date.day, 12);


  return formatDate(dateObj, 'yyyy-MM-dd', 'en-US');
}
