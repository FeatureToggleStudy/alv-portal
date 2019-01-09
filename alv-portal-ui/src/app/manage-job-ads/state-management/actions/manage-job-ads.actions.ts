import { Action } from '@ngrx/store';
import { JobAdvertisement } from '../../../shared/backend-services/job-advertisement/job-advertisement.types';
import { ManagedJobAdsSearchFilter } from '../state';

export const INIT_RESULT_LIST = 'MANAGEJOBADS:INIT_RESULT_LIST';
export const FILTER_APPLIED = 'MANAGEJOBADS:FILTER_APPLIED';
export const APPLY_FILTER = 'MANAGEJOBADS:APPLY_FILTER';

export class InitResultListAction implements Action {
  readonly type = INIT_RESULT_LIST;

  constructor(public payload = {}) {
  }
}

export class ApplyFilterAction implements Action {
  readonly type = APPLY_FILTER;

  constructor(public payload: ManagedJobAdsSearchFilter) {
  }
}

export class FilterAppliedAction implements Action {
  readonly type = FILTER_APPLIED;

  constructor(public payload: { page: Array<JobAdvertisement>, totalCount: number }) {
  }
}

export type Actions =
  | InitResultListAction
  | FilterAppliedAction
  | ApplyFilterAction;
