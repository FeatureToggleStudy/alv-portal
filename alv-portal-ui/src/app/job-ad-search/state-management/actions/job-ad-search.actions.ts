import { Action } from '@ngrx/store';
import { JobAdvertisement } from '../../../shared/backend-services/job-advertisement/job-advertisement.model';
import { JobSearchFilter } from '../../job-search-filter.types';

export const INIT_JOB_SEARCH = 'JOBS:INIT_JOB_SEARCH';
export const JOB_SEARCH_INITIALIZED = 'JOBS:JOB_SEARCH_INITIALIZED';
export const JOB_LIST_LOADED = 'JOBS:JOB_LIST_LOADED';
export const FILTER_CHANGED = 'JOBS:FILTER_CHANGED';
export const LOAD_NEXT_PAGE = 'JOBS:LOAD_NEXT_PAGE';
export const NEXT_PAGE_LOADED = 'JOBS:NEXT_PAGE_LOADED';

export const LOAD_CURRENT = 'JOBS:LOAD_CURRENT';
export const CURRENT_LOADED = 'JOBS:CURRENT_LOADED';
export const LOAD_PREV = 'JOBS:LOAD_PREV';
export const LOAD_NEXT = 'JOBS:LOAD_NEXT';

export class InitJobSearchAction implements Action {
  readonly type = INIT_JOB_SEARCH;

  constructor(public payload: { onlineSince: number }) {
  }
}

export class JobSearchInitializedAction implements Action {
  readonly type = JOB_SEARCH_INITIALIZED;

  constructor(public payload: {
    jobList: Array<JobAdvertisement>,
    totalCount: number,
    jobSearchFilter: JobSearchFilter
  }) {
  }
}

export class FilterChangedAction implements Action {
  readonly type = FILTER_CHANGED;

  constructor(public payload: JobSearchFilter) {
  }
}

export class JobListLoadedAction implements Action {
  readonly type = JOB_LIST_LOADED;

  constructor(public payload: { jobList: Array<JobAdvertisement>, totalCount: number }) {
  }
}

export class LoadNextPageAction implements Action {
  readonly type = LOAD_NEXT_PAGE;

  constructor(public payload = {}) {
  }
}

export class NextPageLoadedAction implements Action {
  readonly type = NEXT_PAGE_LOADED;

  constructor(public payload: Array<JobAdvertisement>) {
  }
}

export class LoadCurrentAction implements Action {
  readonly type = LOAD_CURRENT;

  constructor(public payload: { id: string }) {
  }
}

export class CurrentLoadedAction implements Action {
  readonly type = CURRENT_LOADED;

  constructor(public payload: { jobAdvertisement: JobAdvertisement }) {
  }
}

export class LoadPrevAction implements Action {
  readonly type = LOAD_PREV;

  constructor(public payload = {}) {
  }
}

export class LoadNextAction implements Action {
  readonly type = LOAD_NEXT;

  constructor(public payload = {}) {
  }
}

export type Actions =
  | InitJobSearchAction
  | JobListLoadedAction
  | FilterChangedAction
  | LoadNextPageAction
  | NextPageLoadedAction
  | LoadCurrentAction
  | CurrentLoadedAction
  | LoadPrevAction
  | LoadNextAction
  ;
