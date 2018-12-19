import { Action } from '@ngrx/store';
import { CandidateSearchFilter } from '../state/candidate-search.state';

export const INIT_RESULT_LIST = 'CANDIDATES:INIT_RESULT_LIST';
export const APPLY_FILTER = 'CANDIDATES:APPLY_FILTER';

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

export type Actions = InitResultListAction
  | ApplyFilterAction
  ;
