import {
  Availability,
  Contact,
  Degree,
  Experience,
  Gender,
  Graduation,
  ISCED_1997,
  LanguageSkill
} from '../shared.types';
import { OccupationLabelSuggestion } from '../reference-service/occupation-label.types';

export interface CandidateSearchRequest {
  page: number;
  size: number;
  sort?: string;
  body: CandidateSearchRequestBody;
}

export interface CandidateSearchResponse {
  totalCount: number;
  result: CandidateProfile[];
}

export interface CandidateSearchRequestBody {
  occupationCodes?: OccupationLabelSuggestion[];
  skills?: Array<string>;
  experience?: string;
  workplace?: string;
  residence?: Array<string>;
  cantonCode?: string;
  regionCode?: string;
  availability?: string;
  workLoad?: WorkLoad;
  workForm?: string;
  degree?: string;
  graduation?: string;
  drivingLicenceCategory?: string;
  languageSkills?: LanguageSkill[];
}

export interface WorkLoad {
  min: number;
  max: number;
}

export interface Candidate {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  mobile: string;
  email: string;
  address: Address;
  nationalityCode: string;
  candidateProfile: CandidateProfile;
}

export interface CandidateProfile {
  id: string;
  gender: Gender;
  availability: Availability;
  externalId: string;
  residenceCantonCode: string;
  workLoad: number;
  isPublic: boolean;
  isProtected: boolean;
  showProtectedData: boolean;
  workForm: string[];
  preferredWorkRegions: string[];
  preferredWorkCantons: string[];
  jobExperiences: JobExperience[];
  languages: LanguageSkill[];
  drivingCategories: string[];
  highestEducationLevel: string;
  highestDegree: string;
  jobCenterCode: string;
  jobAdvisor: Contact;
  contactTypes?: string[];
}

export interface Address {
  street: string;
  zipCode: string;
  city: string;
}

export interface JobExperience {
  occupation: Occupation;
  occupationLabel: string;
  experience: Experience;
  graduation: Graduation;
  degree: Degree;
  education: ISCED_1997;
  remark: string;
  lastJob: boolean;
  wanted: boolean;
}

export interface Occupation {
  avamCode: number;
  bfsCode: number;
  sbn3Code: number;
  sbn5Code: number;
}
