import { Action } from '@ngrx/store';
import { JobAdvertisement } from '../../../shared/backend-services/job-advertisement/job-advertisement.types';

export const INIT_RESULT_LIST = 'MANAGEJOBADS:INIT_RESULT_LIST';

export const FILTER_APPLIED = 'MANAGEJOBADS:FILTER_APPLIED';

export class InitResultListAction implements Action {
  readonly type = INIT_RESULT_LIST;

  constructor(public payload = {}) {
  }
}

export class FilterAppliedAction implements Action {
  readonly type = FILTER_APPLIED;

  constructor(public payload: { page: Array<JobAdvertisement>, totalCount: number }) {
  }
}

export type Actions =
  | InitResultListAction;
