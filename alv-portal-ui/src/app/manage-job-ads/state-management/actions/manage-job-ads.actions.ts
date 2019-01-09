import { Action } from '@ngrx/store';
import { JobAdvertisement } from '../../../shared/backend-services/job-advertisement/job-advertisement.types';
import { ManagedJobAdsSearchFilter } from '../state';

export const INIT_RESULT_LIST = 'MANAGEJOBADS:INIT_RESULT_LIST';
export const FILTER_APPLIED = 'MANAGEJOBADS:FILTER_APPLIED';
export const APPLY_FILTER = 'MANAGEJOBADS:APPLY_FILTER';
export const LOAD_NEXT_PAGE = 'MANAGEJOBADS:LOAD_NEXT_PAGE';
export const NEXT_PAGE_LOADED = 'MANAGEJOBADS:NEXT_PAGE_LOADED';

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

export class LoadNextPageAction implements Action {
  readonly type = LOAD_NEXT_PAGE;

  constructor(public payload = {}) {
  }
}

export class NextPageLoadedAction implements Action {
  readonly type = NEXT_PAGE_LOADED;

  constructor(public payload: { page: Array<JobAdvertisement> }) {
  }
}

export type Actions =
  | InitResultListAction
  | FilterAppliedAction
  | ApplyFilterAction
  | LoadNextPageAction
  | NextPageLoadedAction;
