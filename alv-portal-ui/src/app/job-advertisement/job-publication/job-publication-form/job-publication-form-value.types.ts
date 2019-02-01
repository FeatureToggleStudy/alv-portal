import { JobDescriptionFormValue } from './job-description/job-description-form-value.types';
import { OccupationFormValue } from './occupation/occupation-form-value.types';
import { LanguageSkill } from '../../shared/backend-services/shared.types';
import { EmploymentFormValue } from './employment/employment-form-value.types';
import { LocationFormValue } from './location/location-form-value.types';
import { CompanyFormValue } from './company/company-form-value.types';
import { EmployerFormValue } from './employer/employer-form-value.types';
import { ContactFormValue } from './contact/contact-form-value.types';
import { PublicContactFormValue } from './public-contact/public-contact-form-value.types';
import { ApplicationFormValue } from './application/application-form-value.types';
import { PublicationFormValue } from './publication/publication-form-value.types';

export class JobPublicationFormValueKeys {
  public static jobDescription = 'jobDescription';
  public static occupation = 'occupation';
  public static languageSkills = 'languageSkills';
  public static employment = 'employment';
  public static location = 'location';
  public static company = 'company';
  public static employer = 'employer';
  public static contact = 'contact';
  public static publicContact = 'publicContact';
  public static application = 'application';
  public static publication = 'publication';
  public static surrogate = 'surrogate';
}

export interface JobPublicationFormValue {
  jobDescription: JobDescriptionFormValue;
  occupation: OccupationFormValue;
  languageSkills: LanguageSkill[];
  employment: EmploymentFormValue;
  location: LocationFormValue;
  company: CompanyFormValue;
  surrogate: boolean;
  employer?: EmployerFormValue;
  contact: ContactFormValue;
  publicContact: PublicContactFormValue;
  application: ApplicationFormValue;
  publication: PublicationFormValue;
  disclaimer: boolean;
}


