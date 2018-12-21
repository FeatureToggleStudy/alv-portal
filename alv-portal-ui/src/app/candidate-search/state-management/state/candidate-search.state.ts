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
import { CandidateProfile } from '../../../shared/backend-services/candidate/candidate.types';


export interface CandidateSearchState {
  totalCount: number;
  page: number;
  candidateSearchFilter: CandidateSearchFilter;
  resultList: CandidateProfile[];
  selectedCandidate: CandidateProfile;
  resultsAreLoading: boolean;
  visitedCandidates: { [id: string]: boolean; };
}

export const initialState: CandidateSearchState = {
  totalCount: 0,
  page: 0,
  candidateSearchFilter: {},
  resultList: [],
  selectedCandidate: null,
  resultsAreLoading: false,
  visitedCandidates: {}
};

export interface CandidateSearchFilter {
  // todo: implement
  occupations?: string[];
  skills?: string[];
  experience?: Experience;
  workplace?: string[];
  residence?: Canton[];
  availability?: Availability;
  workloadPercentageMin?: number;
  workloadPercentageMax?: number;
  workForm?: WorkForm;
  degree?: Degree;
  graduation?: Graduation;
  drivingLicenceCategory?: DrivingLicenceCategory;
  languageSkills?: LanguageSkill[];
}

export interface CandidateSearchResult {
  candidateProfile: CandidateProfile;
  visited: boolean;
}

export const getCandidateSearchState = createFeatureSelector<CandidateSearchState>('candidateSearch');
export const getCandidateSearchFilter = createSelector(getCandidateSearchState, (state: CandidateSearchState) => state.candidateSearchFilter);
export const getTotalCount = createSelector(getCandidateSearchState, (state: CandidateSearchState) => state.totalCount);
export const getResultList = createSelector(getCandidateSearchState, (state: CandidateSearchState) => state.resultList);
export const getVisitedCandidates = createSelector(getCandidateSearchState, (state: CandidateSearchState) => state.visitedCandidates);
export const getResultsAreLoading = createSelector(getCandidateSearchState, (state: CandidateSearchState) => state.resultsAreLoading);

export const getCandidateSearchResults = createSelector(getResultList, getVisitedCandidates, (resultList, visitedCandidates) => {
  return resultList.map((candidateProfile) => {
    return {
      candidateProfile: candidateProfile,
      visited: visitedCandidates[candidateProfile.id] || false
    };
  });
});
