import { Action } from '@ngrx/store';
import { CandidateProfile } from '../../../shared/backend-services/candidate/candidate.types';
import { CandidateSearchFilter } from '..';

export const INIT_RESULT_LIST = 'CANDIDATES:INIT_RESULT_LIST';
export const APPLY_FILTER = 'CANDIDATES:APPLY_FILTER';
export const FILTER_APPLIED = 'CANDIDATES:FILTER_APPLIED';
export const LOAD_NEXT_PAGE = 'CANDIDATES:LOAD_NEXT_PAGE';
export const NEXT_PAGE_LOADED = 'CANDIDATES:NEXT_PAGE_LOADED';

export class InitResultListAction implements Action {
  readonly type = INIT_RESULT_LIST;

  constructor(public payload = {}) {
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

export type Actions = InitResultListAction
  | ApplyFilterAction
  | FilterAppliedAction
  | LoadNextPageAction
  | NextPageLoadedAction
  ;
