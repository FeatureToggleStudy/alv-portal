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
  Occupation,
  Publication,
  PublicContact,
  WorkExperience
} from '../../shared/backend-services/job-advertisement/job-advertisement.types';
import { JobPublicationFormValue } from './job-publication-form-value.types';
import { JobDescriptionFormValue } from './job-description/job-description-form-value.types';
import { OccupationFormValue } from './occupation/occupation-form-value.types';
import {
  Degree,
  EmploymentDuration,
  LanguageSkill,
  PostAddress,
  WorkForm
} from '../../shared/backend-services/shared.types';
import { EmploymentFormValue } from './employment/employment-form-value.types';
import { LocationFormValue } from './location/location-form-value.types';
import { CompanyFormValue } from './company/company-form-value.types';
import { PublicationFormValue } from './publication/publication-form-value.types';
import { ContactFormValue } from './contact/contact-form-value.types';
import { PublicContactFormValue } from './public-contact/public-contact-form-value.types';
import { ApplicationFormValue } from './application/application-form-value.types';
import { EmployerFormValue } from './employer/employer-form-value.types';
import { PostAddressFormValue } from './post-address-form/post-address-form-value.types';
import { ZipCityFormValue } from './zip-city-input/zip-city-form-value.types';
import { now, toISOLocalDate } from '../../shared/forms/input/ngb-date-utils';


export function mapToJobPublicationFormValue(jobAdvertisement: JobAdvertisement): JobPublicationFormValue {
  //todo: DF-486 implements this
  return null;
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
    startDate: toISOLocalDate(employmentFormValue.startDate),
    endDate: toISOLocalDate(employmentFormValue.endDate),
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
    startDate: toISOLocalDate(now())
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
