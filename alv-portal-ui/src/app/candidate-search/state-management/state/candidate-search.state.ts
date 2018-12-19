import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  Availability,
  Canton,
  Degree,
  DrivingLicenceCategory,
  Experience,
  Graduation,
  LanguageSkill,
  WorkForm
} from '../../../shared/backend-services/shared.types';
import { Candidate } from '../../../shared/backend-services/candidate/candidate.types';


export interface CandidateSearchState {
  // todo: implement
  candidateSearchFilter: CandidateSearchFilter;
  resultList: Candidate[];
}

export const initialState: CandidateSearchState = {
  candidateSearchFilter: {},
  resultList: []
};

export interface CandidateSearchFilter {
  // todo: implement
  occupations?: string[];
  skills?: string[];
  experience?: Experience;
  workplace?: string[];
  residence?: Canton[];
  availability?: Availability;
  workload?: [number, number];
  workForm?: WorkForm;
  degree?: Degree;
  graduation?: Graduation;
  drivingLicenceCategory?: DrivingLicenceCategory;
  languageSkills?: LanguageSkill[];
}

export const getCandidateSearchState = createFeatureSelector<CandidateSearchState>('candidateSearch');
export const getCandidateSearchFilter = createSelector(getCandidateSearchState, (state: CandidateSearchState) => state.candidateSearchFilter);
