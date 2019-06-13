import {
  Availability,
  CantonFilter,
  Degree,
  DrivingLicenceCategory,
  Experience,
  Graduation,
  OccupationFilter,
  OccupationResolved,
  WorkForm
} from '../shared.types';
import { JobAdSearchProfileResult } from '../job-ad-search-profiles/job-ad-search-profiles.types';
import { LanguageSkill } from '../candidate/candidate.types';


export interface CandidateSearchProfilesSearchResponse {
  totalCount: number;
  result: JobAdSearchProfileResult[];
}

export interface ResolvedCandidateSearchProfile {
  id?: string;
  name: string;
  ownerUserId: string;
  createdTime?: Date;
  updatedTime?: Date;
  searchFilter: ResolvedCandidateSearchFilter;
}

export interface CreateCandidateSearchProfile {
  name: string;
  ownerUserId?: string;
  searchFilter?: CandidateSearchFilterRequest;
}


export interface UpdateCandidateSearchProfile {
  name: string;
  searchFilter?: CandidateSearchFilterRequest;
}

export interface CandidateSearchProfileResult {
  id?: string;
  name: string;
  createdTime?: Date;
}

export interface ResolvedCandidateSearchFilter {
  availability: Availability;
  degree: Degree;
  drivingLicenceCategory: DrivingLicenceCategory;
  experience: Experience;
  graduation: Graduation;
  workForm: WorkForm;
  workloadPercentageMax: number;
  workloadPercentageMin: number;
  workplaceLocation: ResolvedLocation;
  workplaceCantonFilter: CantonFilter;
  residences: string[];
  keywords: string[];
  occupationFilters: OccupationResolved[];
  languageSkillFilters: LanguageSkill[];
}

export interface CandidateSearchFilterRequest {
  availability: Availability;
  degree: Degree;
  drivingLicenceCategory: DrivingLicenceCategory;
  experience: Experience;
  graduation: Graduation;
  workForm: WorkForm;
  workloadPercentageMax: number;
  workloadPercentageMin: number;
  workplaceLocalityId: string;
  workplaceCantonFilter: CantonFilter;
  residences: string[];
  keywords: string[];
  occupationFilters: OccupationFilter[];
  languageSkillFilters: LanguageSkill[];
}

export interface ResolvedLocation {
  localityId: string;
  id: string;
  city: string;
  postalCode: string;
  communalCode: string;
  regionCode: string;
  cantonCode: string;
  countryIsoCode: string;
  geoPoints: string;
}

export enum SearchProfileErrors {
  PROFILE_ALREADY_EXISTS = 'http://www.job-room.ch/job-ad-service/problem/search-profile/already-exists'
}
