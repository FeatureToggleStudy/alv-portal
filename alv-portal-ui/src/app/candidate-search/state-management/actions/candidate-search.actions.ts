import { Action } from '@ngrx/store';
import { CandidateProfile } from '../../../shared/backend-services/candidate/candidate.types';
import { CandidateSearchFilter } from '..';
import { FilterPanelValues } from '../../candidate-search/filter-panel/filter-panel.component';

export const INIT_RESULT_LIST = 'CANDIDATES:INIT_RESULT_LIST';
export const APPLY_FILTER = 'CANDIDATES:APPLY_FILTER';
export const FILTER_APPLIED = 'CANDIDATES:FILTER_APPLIED';
export const LOAD_NEXT_PAGE = 'CANDIDATES:LOAD_NEXT_PAGE';
export const NEXT_PAGE_LOADED = 'CANDIDATES:NEXT_PAGE_LOADED';
export const CANDIDATE_PROFILE_DETAIL_LOADED = 'CANDIDATES:CANDIDATE_PROFILE_DETAIL_LOADED';
export const LOAD_PREVIOUS_CANDIDATE_PROFILE_DETAIL = 'CANDIDATES:LOAD_PREVIOUS_CANDIDATE_PROFILE_DETAIL';
export const LOAD_NEXT_CANDIDATE_PROFILE_DETAIL = 'CANDIDATES:LOAD_NEXT_CANDIDATE_PROFILE_DETAIL';
export const APPLY_FILTER_VALUES = 'CANDIDATES:APPLY_FILTER_VALUES';


export class InitResultListAction implements Action {
  readonly type = INIT_RESULT_LIST;

  constructor(public payload = {}) {
  }
}

export class ApplyFilterValuesAction implements Action {
  readonly type = APPLY_FILTER_VALUES;

  constructor(public payload: FilterPanelValues) {
  }
}

export class ApplyFilterAction implements Action {
  readonly type = APPLY_FILTER;

  constructor(public payload: CandidateSearchFilter) {
  }
}

export class FilterAppliedAction implements Action {
  readonly type = FILTER_APPLIED;

  constructor(public payload: { page: CandidateProfile[], totalCount: number }) {
  }
}

export class LoadNextPageAction implements Action {
  readonly type = LOAD_NEXT_PAGE;

  constructor(public payload = {}) {
  }
}

export class NextPageLoadedAction implements Action {
  readonly type = NEXT_PAGE_LOADED;

  constructor(public payload: { page: CandidateProfile[] }) {
  }
}

export class CandidateProfileDetailLoadedAction implements Action {
  readonly type = CANDIDATE_PROFILE_DETAIL_LOADED;

  constructor(public payload: { candidateProfile: CandidateProfile }) {
  }
}

export class LoadPreviousCandidateProfileDetailAction implements Action {
  readonly type = LOAD_PREVIOUS_CANDIDATE_PROFILE_DETAIL;

  constructor(public payload = {}) {
  }
}

export class LoadNextCandidateProfileDetailAction implements Action {
  readonly type = LOAD_NEXT_CANDIDATE_PROFILE_DETAIL;

  constructor(public payload = {}) {
  }
}

export type Actions = InitResultListAction
  | ApplyFilterAction
  | FilterAppliedAction
  | LoadNextPageAction
  | NextPageLoadedAction
  | CandidateProfileDetailLoadedAction
  | LoadPreviousCandidateProfileDetailAction
  | LoadNextCandidateProfileDetailAction
  | ApplyFilterValuesAction
  ;
