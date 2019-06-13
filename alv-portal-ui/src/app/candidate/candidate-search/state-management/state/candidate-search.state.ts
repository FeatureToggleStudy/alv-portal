import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  Availability,
  Canton,
  Degree,
  DrivingLicenceCategory,
  Experience,
  Graduation,
  WorkForm
} from '../../../../shared/backend-services/shared.types';
import {
  CandidateProfile,
  FilterLanguageSkill
} from '../../../../shared/backend-services/candidate/candidate.types';
import { OccupationTypeaheadItem } from '../../../../shared/occupations/occupation-typeahead-item';
import { StringTypeaheadItem } from '../../../../shared/forms/input/typeahead/string-typeahead-item';
import { LocalityTypeaheadItem } from '../../../../shared/localities/locality-typeahead-item';

export interface CandidateSearchState {
  totalCount: number;
  page: number;
  candidateSearchFilter: CandidateSearchFilter;
  resultList: CandidateProfile[];
  selectedCandidateProfile: CandidateProfile;
  resultsAreLoading: boolean;
  visitedCandidates: { [id: string]: boolean; };
  isDirtyResultList: boolean;
}

export const initialState: CandidateSearchState = {
  totalCount: 0,
  page: 0,
  candidateSearchFilter: {
    occupations: [],
    keywords: [],
    workplace: null,
    experience: null,
    residence: [],
    availability: null,
    workloadPercentageMin: 10,
    workloadPercentageMax: 100,
    workForm: null,
    degree: null,
    graduation: null,
    drivingLicenceCategory: null,
    languageSkills: []
  },
  resultList: [],
  selectedCandidateProfile: null,
  resultsAreLoading: false,
  visitedCandidates: {},
  isDirtyResultList: true
};

export interface CandidateSearchFilter {
  occupations: OccupationTypeaheadItem[];
  keywords: StringTypeaheadItem[];
  workplace: LocalityTypeaheadItem;
  experience: Experience;
  residence: Canton[];
  availability: Availability;
  workloadPercentageMin: number;
  workloadPercentageMax: number;
  workForm: WorkForm;
  degree: Degree;
  graduation: Graduation;
  drivingLicenceCategory: DrivingLicenceCategory;
  languageSkills: FilterLanguageSkill[];
}

export interface CandidateSearchResult {
  candidateProfile: CandidateProfile;
  visited: boolean;
}

export const getCandidateSearchState = createFeatureSelector<CandidateSearchState>('candidateSearch');

export const getCandidateSearchFilter = createSelector(getCandidateSearchState, (state: CandidateSearchState) => state.candidateSearchFilter);

export const getTotalCount = createSelector(getCandidateSearchState, (state: CandidateSearchState) => state.totalCount);

export const getVisitedCandidates = createSelector(getCandidateSearchState, (state: CandidateSearchState) => state.visitedCandidates);

export const getResultsAreLoading = createSelector(getCandidateSearchState, (state: CandidateSearchState) => state.resultsAreLoading);

export const getSelectedCandidateProfile = createSelector(getCandidateSearchState, (state: CandidateSearchState) => state.selectedCandidateProfile);

export const getSelectedOccupations = createSelector(getCandidateSearchState, (state: CandidateSearchState) => state.candidateSearchFilter.occupations);

const getResultList = createSelector(getCandidateSearchState, (state: CandidateSearchState) => state.resultList);

const isDirtyResultList = createSelector(getCandidateSearchState, (state: CandidateSearchState) => state.isDirtyResultList);

export const getCandidateSearchResults = createSelector(isDirtyResultList, getResultList, getVisitedCandidates, (dirty, resultList, visitedCandidates) => {
  if (dirty) {
    return undefined;
  }
  return resultList.map((candidateProfile) => {
    return {
      candidateProfile: candidateProfile,
      visited: visitedCandidates[candidateProfile.id] || false
    };
  });
});

export const getPrevId = createSelector(getResultList, getSelectedCandidateProfile, (resultList, current) => {
  if (current) {
    const ids = resultList.map((item) => item.id);
    const idx = ids.findIndex(id => id === current.id);

    return idx > 0 ? ids[idx - 1] : null;
  }

  return null;
});

export const getNextId = createSelector(getResultList, getSelectedCandidateProfile, (resultList, current) => {
  if (current) {
    const ids = resultList.map((item) => item.id);
    const idx = ids.findIndex(id => id === current.id);

    return idx < ids.length - 1 ? ids[idx + 1] : null;
  }

  return null;
});

export const isPrevVisible = createSelector(getResultList, getSelectedCandidateProfile, (resultList, selectedCandidateProfile) => {
  if (selectedCandidateProfile) {
    return resultList
      .map((item) => item.id)
      .findIndex(id => id === selectedCandidateProfile.id) > 0;
  }

  return false;
});

export const isNextVisible = createSelector(getResultList, getSelectedCandidateProfile, getTotalCount, (resultList, current, totalCount) => {
  if (current) {
    return resultList
      .map((item) => item.id)
      .findIndex(id => id === current.id) < totalCount - 1;
  }

  return false;
});
