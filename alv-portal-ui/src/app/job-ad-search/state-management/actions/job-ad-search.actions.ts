import { Action } from '@ngrx/store';
import { JobAdvertisement } from '../../../shared/backend-services/job-advertisement/job-advertisement.types';
import { JobSearchFilter } from '../../job-search-filter.types';

export const INIT_RESULT_LIST = 'JOBS:INIT_RESULT_LIST';
export const FILTER_APPLIED = 'JOBS:FILTER_APPLIED';
export const APPLY_FILTER = 'JOBS:APPLY_FILTER';
export const LOAD_NEXT_PAGE = 'JOBS:LOAD_NEXT_PAGE';
export const NEXT_PAGE_LOADED = 'JOBS:NEXT_PAGE_LOADED';

export const LOAD_JOB_ADVERTISEMENT_DETAIL = 'JOBS:LOAD_JOB_ADVERTISEMENT_DETAIL';
export const JOB_ADVERTISEMENT_DETAIL_LOADED = 'JOBS:JOB_ADVERTISEMENT_DETAIL_LOADED';
export const LOAD_PREVIOUS_JOB_ADVERTISEMENT_DETAIL = 'JOBS:LOAD_PREVIOUS_JOB_ADVERTISEMENT_DETAIL';
export const LOAD_NEXT_JOB_ADVERTISEMENT_DETAIL = 'JOBS:LOAD_NEXT_JOB_ADVERTISEMENT_DETAIL';

export class InitResultListAction implements Action {
  readonly type = INIT_RESULT_LIST;

  constructor(public payload = {}) {
  }
}

export class ApplyFilterAction implements Action {
  readonly type = APPLY_FILTER;

  constructor(public payload: JobSearchFilter) {
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

export class LoadJobAdvertisementDetailAction implements Action {
  readonly type = LOAD_JOB_ADVERTISEMENT_DETAIL;

  constructor(public payload: { id: string }) {
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
  | LoadJobAdvertisementDetailAction
  | JobAdvertisementDetailLoadedAction
  | LoadPreviousJobAdvertisementDetailAction
  | LoadNextJobAdvertisementDetailAction
  ;
