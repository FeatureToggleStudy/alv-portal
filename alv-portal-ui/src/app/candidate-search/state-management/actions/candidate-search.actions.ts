import { Action } from '@ngrx/store';
import { CandidateProfile } from '../../../shared/backend-services/candidate/candidate.types';

import { FilterPanelValues } from '../../candidate-search/filter-panel/filter-panel.component';
import { CandidateQueryPanelValues } from '../../../widgets/candidate-search-widget/candidate-query-panel/candidate-query-panel-values';
import { OccupationTypeaheadItem } from '../../../shared/occupations/occupation-typeahead-item';
import { CandidateSearchFilter } from '../state';

export const INIT_RESULT_LIST = 'CANDIDATES:INIT_RESULT_LIST';
export const APPLY_FILTER = 'CANDIDATES:APPLY_FILTER';
export const FILTER_APPLIED = 'CANDIDATES:FILTER_APPLIED';
export const LOAD_NEXT_PAGE = 'CANDIDATES:LOAD_NEXT_PAGE';
export const NEXT_PAGE_LOADED = 'CANDIDATES:NEXT_PAGE_LOADED';
export const CANDIDATE_PROFILE_DETAIL_LOADED = 'CANDIDATES:CANDIDATE_PROFILE_DETAIL_LOADED';
export const LOAD_PREVIOUS_CANDIDATE_PROFILE_DETAIL = 'CANDIDATES:LOAD_PREVIOUS_CANDIDATE_PROFILE_DETAIL';
export const LOAD_NEXT_CANDIDATE_PROFILE_DETAIL = 'CANDIDATES:LOAD_NEXT_CANDIDATE_PROFILE_DETAIL';
export const APPLY_FILTER_VALUES = 'CANDIDATES:APPLY_FILTER_VALUES';
export const APPLY_QUERY_VALUES = 'CANDIDATES:APPLY_QUERY_VALUES';
export const RESET_FILTER = 'CANDIDATES:RESET_FILTER';
export const FILTER_RESET = 'CANDIDATES:FILTER_RESET';
export const OCCUPATION_LANGUAGE_CHANGED_ACTION = 'CANDIDATES:OCCUPATION_LANGUAGE_CHANGED_ACTION';
export const RESET = 'CANDIDATES:RESET';

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

export class ApplyQueryValuesAction implements Action {
  readonly type = APPLY_QUERY_VALUES;

  constructor(public payload: CandidateQueryPanelValues, public init = false) {
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

/**
 * Action to reset the current filter to it's initial state
 */
export class ResetFilterAction implements Action {
  readonly type = RESET_FILTER;

  constructor(public payload: {}) {
  }
}

/**
 * Action after a filter has been reset
 */
export class FilterResetAction implements Action {
  readonly type = FILTER_RESET;

  constructor(public payload: CandidateSearchFilter) {
  }
}


/**
 * Action that is fired if the language changed and the selected occupations have been translated again
 */
export class OccupationLanguageChangedAction implements Action {
  readonly type = OCCUPATION_LANGUAGE_CHANGED_ACTION;

  constructor(public payload: { occupations: OccupationTypeaheadItem[] }) {
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

export class ResetAction implements Action {
  readonly type = RESET;

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
  | ApplyQueryValuesAction
  | FilterResetAction
  | ResetFilterAction
  | OccupationLanguageChangedAction
  | ResetAction
  ;
