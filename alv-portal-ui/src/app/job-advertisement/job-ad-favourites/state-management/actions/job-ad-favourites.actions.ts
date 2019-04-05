import { Action } from '@ngrx/store';
import {
  JobAdvertisement,
  JobAdvertisementWithFavourites
} from '../../../../shared/backend-services/job-advertisement/job-advertisement.types';
import { JobAdvertisementUpdatedAction } from '../../../../core/state-management/actions/core.actions';
import { JobAdFavouritesSearchFilter } from '../../job-ad-favourites/job-ad-favourites.types';

export const INIT_RESULT_LIST = 'JOBADFAVOURITES:INIT_RESULT_LIST';
export const FILTER_APPLIED = 'JOBADFAVOURITES:FILTER_APPLIED';
export const APPLY_FILTER = 'JOBADFAVOURITES:APPLY_FILTER';
export const LOAD_NEXT_PAGE = 'JOBADFAVOURITES:LOAD_NEXT_PAGE';
export const NEXT_PAGE_LOADED = 'JOBADFAVOURITES:NEXT_PAGE_LOADED';
export const JOB_ADVERTISEMENT_DETAIL_LOADED = 'JOBADFAVOURITES:JOB_ADVERTISEMENT_DETAIL_LOADED';
export const LOAD_PREVIOUS_JOB_ADVERTISEMENT_DETAIL = 'JOBADFAVOURITES:LOAD_PREVIOUS_JOB_ADVERTISEMENT_DETAIL';
export const LOAD_NEXT_JOB_ADVERTISEMENT_DETAIL = 'JOBADFAVOURITES:LOAD_NEXT_JOB_ADVERTISEMENT_DETAIL';
export const UPDATE_JOB_ADVERTISEMENT = 'JOBADFAVOURITES:UPDATE_JOB_ADVERTISEMENT';

export class InitResultListAction implements Action {
  readonly type = INIT_RESULT_LIST;

  constructor(public payload = {}) {
  }
}

export class ApplyFilterAction implements Action {
  readonly type = APPLY_FILTER;

  constructor(public payload: JobAdFavouritesSearchFilter) {
  }
}

export class FilterAppliedAction implements Action {
  readonly type = FILTER_APPLIED;

  constructor(public payload: { page: Array<JobAdvertisementWithFavourites>, totalCount: number }) {
  }
}

export class LoadNextPageAction implements Action {
  readonly type = LOAD_NEXT_PAGE;

  constructor(public payload = {}) {
  }
}

export class NextPageLoadedAction implements Action {
  readonly type = NEXT_PAGE_LOADED;

  constructor(public payload: { page: Array<JobAdvertisementWithFavourites> }) {
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

export class UpdateJobAdvertisementAction implements Action {
  readonly type = UPDATE_JOB_ADVERTISEMENT;

  constructor(public payload: { jobAdvertisementWithFavourites: JobAdvertisementWithFavourites }) {
  }
}

export type Actions =
  | InitResultListAction
  | FilterAppliedAction
  | ApplyFilterAction
  | LoadNextPageAction
  | NextPageLoadedAction
  | JobAdvertisementDetailLoadedAction
  | JobAdvertisementUpdatedAction
  | UpdateJobAdvertisementAction;
