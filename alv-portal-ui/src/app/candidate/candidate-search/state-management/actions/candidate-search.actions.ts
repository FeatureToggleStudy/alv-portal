import { Action } from '@ngrx/store';
import { CandidateProfile } from '../../../../shared/backend-services/candidate/candidate.types';

import { FilterPanelValues } from '../../candidate-search/filter-panel/filter-panel.component';
import { CandidateQueryPanelValues } from '../../../../widgets/candidate-search-widget/candidate-query-panel/candidate-query-panel-values';
import { OccupationTypeaheadItem } from '../../../../shared/occupations/occupation-typeahead-item';
import { CandidateSearchFilter, CandidateSearchResult } from '../state';
import { EffectErrorOccurredAction } from '../../../../core/state-management/actions/core.actions';
import { ResolvedCandidateSearchProfile } from '../../../../shared/backend-services/candidate-search-profiles/candidate-search-profiles.types';

export const INITIALIZE_RESULT_LIST = 'CANDIDATES:INITIALIZE_RESULT_LIST';
export const RESULT_LIST_INITIALIZED = 'CANDIDATES:RESULT_LIST_INITIALIZED';
export const APPLY_FILTER = 'CANDIDATES:APPLY_FILTER';
export const FILTER_APPLIED = 'CANDIDATES:FILTER_APPLIED';
export const LOAD_NEXT_PAGE = 'CANDIDATES:LOAD_NEXT_PAGE';
export const NEXT_PAGE_LOADED = 'CANDIDATES:NEXT_PAGE_LOADED';
export const CANDIDATE_PROFILE_DETAIL_LOADED = 'CANDIDATES:CANDIDATE_PROFILE_DETAIL_LOADED';
export const SELECT_CANDIDATE = 'CANDIDATES:SELECT_CANDIDATE';
export const LOAD_PREVIOUS_CANDIDATE_PROFILE_DETAIL = 'CANDIDATES:LOAD_PREVIOUS_CANDIDATE_PROFILE_DETAIL';
export const LOAD_NEXT_CANDIDATE_PROFILE_DETAIL = 'CANDIDATES:LOAD_NEXT_CANDIDATE_PROFILE_DETAIL';
export const PRINT_PAGE = 'CANDIDATES:PRINT_PAGE';
export const COPY_LINK = 'CANDIDATES:COPY_LINK';
export const SEND_LINK = 'CANDIDATES:SEND_LINK';
export const SELECT_RAV_PHONE = 'CANDIDATES:SELECT_RAV_PHONE';
export const SELECT_RAV_EMAIL = 'CANDIDATES:SELECT_RAV_EMAIL';
export const EXPAND_CONTACT_INFO = 'CANDIDATES:EXPAND_CONTACT_INFO';
export const SELECT_CANDIDATE_PHONE = 'CANDIDATES:SELECT_CANDIDATE_PHONE';
export const CONTACT_CANDIDATE_DIALOG_OPENED = 'CANDIDATES:CONTACT_CANDIDATE_DIALOG_OPENED';
export const CONTACT_CANDIDATE_DIALOG_SUBMITTED = 'CANDIDATES:CONTACT_CANDIDATE_DIALOG_SUBMITTED';
export const APPLY_FILTER_VALUES = 'CANDIDATES:APPLY_FILTER_VALUES';
export const APPLY_QUERY_VALUES = 'CANDIDATES:APPLY_QUERY_VALUES';
export const RESET_FILTER = 'CANDIDATES:RESET_FILTER';
export const FILTER_RESET = 'CANDIDATES:FILTER_RESET';
export const OCCUPATION_LANGUAGE_CHANGED_ACTION = 'CANDIDATES:OCCUPATION_LANGUAGE_CHANGED_ACTION';
export const RESET = 'CANDIDATES:RESET';
export const SEARCH_PROFILE_UPDATED = 'CANDIDATES:SEARCH_PROFILE_UPDATED';

export class InitializeResultListAction implements Action {
  readonly type = INITIALIZE_RESULT_LIST;

  constructor(public payload = {}) {
  }
}

export class ResultListInitializedAction implements Action {
  readonly type = RESULT_LIST_INITIALIZED;

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

  constructor(public payload: { page: CandidateSearchResult[], totalCount: number }) {
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

  constructor(public payload: {
    pageNumber: number,
    page: CandidateSearchResult[]
  }) {
  }
}

export class CandidateClickedAction implements Action {
  readonly type = SELECT_CANDIDATE;

  constructor(public payload: { candidateProfile: CandidateProfile }) {
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

export class PrintPageAction implements Action {
  readonly type = PRINT_PAGE;

  constructor(public payload = {}) {
  }
}

export class CopyLinkAction implements Action {
  readonly type = COPY_LINK;

  constructor(public payload = {}) {
  }
}


export class SendLinkAction implements Action {
  readonly type = SEND_LINK;

  constructor(public payload = {}) {
  }
}

export class ResetAction implements Action {
  readonly type = RESET;

  constructor(public payload = {}) {
  }
}

export class SelectRavPhoneAction implements Action {
  readonly type = SELECT_RAV_PHONE;

  constructor(public payload = {}) {
  }
}

export class SelectRavEmailAction implements Action {
  readonly type = SELECT_RAV_EMAIL;

  constructor(public payload = {}) {
  }
}

export class ExpandContactInfoAction implements Action {
  readonly type = EXPAND_CONTACT_INFO;

  constructor(public payload = {}) {
  }
}

export class ContactCandidateDialogOpenedAction implements Action {
  readonly type = CONTACT_CANDIDATE_DIALOG_OPENED;

  constructor(public payload = {}) {
  }
}

export class ContactCandidateDialogSubmittedAction implements Action {
  readonly type = CONTACT_CANDIDATE_DIALOG_SUBMITTED;

  constructor(public payload = {}) {
  }
}

export class SelectCandidatePhoneAction implements Action {
  readonly type = SELECT_CANDIDATE_PHONE;

  constructor(public payload = {}) {
  }
}

export class SearchProfileUpdatedAction implements Action {
  readonly type = SEARCH_PROFILE_UPDATED;

  constructor(public payload: { searchProfile: ResolvedCandidateSearchProfile }) {
  }
}

export type Actions = InitializeResultListAction
  | ResultListInitializedAction
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
  | EffectErrorOccurredAction
  | SearchProfileUpdatedAction
  | PrintPageAction
  | SendLinkAction
  | SelectRavPhoneAction
  | SelectCandidatePhoneAction
  | CopyLinkAction
  | ExpandContactInfoAction
  ;
