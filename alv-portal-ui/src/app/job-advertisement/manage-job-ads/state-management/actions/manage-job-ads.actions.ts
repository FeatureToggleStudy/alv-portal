import { Action } from '@ngrx/store';
import { JobAdvertisement } from '../../../../shared/backend-services/job-advertisement/job-advertisement.types';
import { ManagedJobAdsSearchFilter } from '../../../../widgets/manage-job-ads-widget/job-ad-management-table/job-ad-management.table-types';

export const INIT_RESULT_LIST = 'MANAGEJOBADS:INIT_RESULT_LIST';
export const FILTER_APPLIED = 'MANAGEJOBADS:FILTER_APPLIED';
export const APPLY_FILTER = 'MANAGEJOBADS:APPLY_FILTER';
export const LOAD_NEXT_PAGE = 'MANAGEJOBADS:LOAD_NEXT_PAGE';
export const NEXT_PAGE_LOADED = 'MANAGEJOBADS:NEXT_PAGE_LOADED';
export const JOB_ADVERTISEMENT_DETAIL_LOADED = 'MANAGEJOBADS:JOB_ADVERTISEMENT_DETAIL_LOADED';
export const LOAD_PREVIOUS_JOB_ADVERTISEMENT_DETAIL = 'MANAGEJOBADS:LOAD_PREVIOUS_JOB_ADVERTISEMENT_DETAIL';
export const LOAD_NEXT_JOB_ADVERTISEMENT_DETAIL = 'MANAGEJOBADS:LOAD_NEXT_JOB_ADVERTISEMENT_DETAIL';

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

export class JobAdvertisementDetailLoadedAction implements Action {
  readonly type = JOB_ADVERTISEMENT_DETAIL_LOADED;

  constructor(public payload: { jobAdvertisement: JobAdvertisement }) {
  }
}

export class LoadPreviousJobAdvertisementDetailAction implements Action {
  readonly type = LOAD_PREVIOUS_JOB_ADVERTISEMENT_DETAIL;

  constructor(public payload = {}) {
  }
}

export class LoadNextJobAdvertisementDetailAction implements Action {
  readonly type = LOAD_NEXT_JOB_ADVERTISEMENT_DETAIL;

  constructor(public payload = {}) {
  }
}

export type Actions =
  | InitResultListAction
  | FilterAppliedAction
  | ApplyFilterAction
  | LoadNextPageAction
  | NextPageLoadedAction
  | JobAdvertisementDetailLoadedAction;
