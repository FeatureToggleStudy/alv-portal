import { Action } from '@ngrx/store';

export const INIT_RESULT_LIST = 'CANDIDATES:INIT_RESULT_LIST';

export class InitResultListAction implements Action {
  readonly type = INIT_RESULT_LIST;

  constructor(public payload = {}) {
  }
}

export type Actions = InitResultListAction
  ;
