import { Action } from '@ngrx/store';
import {
  FavouriteItem,
  JobAdvertisement,
  JobAdvertisementWithFavourites
} from '../../../../shared/backend-services/job-advertisement/job-advertisement.types';
import {
  AddedJobAdFavouriteAction,
  EffectErrorOccurredAction,
  LazyLoadedModuleDestroyedAction,
  RemovedJobAdFavouriteAction,
  UpdatedJobAdFavouriteAction
} from '../../../../core/state-management/actions/core.actions';
import { JobAdFavouritesSearchFilter } from '../state';

export const INITIALIZE_RESULT_LIST = 'JOBADFAVOURITES:INITIALIZE_RESULT_LIST';
export const RESULT_LIST_ALREADY_INITIALIZED = 'JOBADFAVOURITES:RESULT_LIST_ALREADY_INITIALIZED';
export const FILTER_APPLIED = 'JOBADFAVOURITES:FILTER_APPLIED';
export const APPLY_FILTER = 'JOBADFAVOURITES:APPLY_FILTER';
export const LOAD_NEXT_PAGE = 'JOBADFAVOURITES:LOAD_NEXT_PAGE';
export const NEXT_PAGE_NOT_AVAILABLE = 'JOBADFAVOURITES:NEXT_PAGE_NOT_AVAILABLE';
export const NEXT_PAGE_LOADED = 'JOBADFAVOURITES:NEXT_PAGE_LOADED';
export const JOB_ADVERTISEMENT_DETAIL_LOADED = 'JOBADFAVOURITES:JOB_ADVERTISEMENT_DETAIL_LOADED';
export const JOB_ADVERTISEMENT_DETAIL_UNLOADED = 'JOBADFAVOURITES:JOB_ADVERTISEMENT_DETAIL_UNLOADED';
export const LOAD_PREVIOUS_JOB_ADVERTISEMENT_DETAIL = 'JOBADFAVOURITES:LOAD_PREVIOUS_JOB_ADVERTISEMENT_DETAIL';
export const LOAD_NEXT_JOB_ADVERTISEMENT_DETAIL = 'JOBADFAVOURITES:LOAD_NEXT_JOB_ADVERTISEMENT_DETAIL';
export const RESET = 'JOBADFAVOURITES:RESET';
export const FAVOURITE_ITEM_LOADED = 'JOBADFAVOURITES:FAVOURITE_ITEM_LOADED';

export class InitializeResultListAction implements Action {
  readonly type = INITIALIZE_RESULT_LIST;

  constructor(public payload = {}) {
  }
}

export class ResultListAlreadyInitializedAction implements Action {
  readonly type = RESULT_LIST_ALREADY_INITIALIZED;

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

export class NextPageNotAvailableAction implements Action {
  readonly type = NEXT_PAGE_NOT_AVAILABLE;

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

export class JobAdvertisementDetailUnloadAction implements Action {
  readonly type = JOB_ADVERTISEMENT_DETAIL_UNLOADED;

  constructor(public payload: {}) {
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

export class ResetAction implements Action {
  readonly type = RESET;

  constructor(public payload = {}) {
  }
}

export class FavouriteItemLoadedAction implements Action {
  readonly type = FAVOURITE_ITEM_LOADED;

  constructor(public payload: { favouriteItem: FavouriteItem }) {
  }
}

export type Actions =
  | InitializeResultListAction
  | ResultListAlreadyInitializedAction
  | NextPageNotAvailableAction
  | FilterAppliedAction
  | ApplyFilterAction
  | LoadNextPageAction
  | NextPageLoadedAction
  | JobAdvertisementDetailLoadedAction
  | JobAdvertisementDetailUnloadAction
  | RemovedJobAdFavouriteAction
  | UpdatedJobAdFavouriteAction
  | AddedJobAdFavouriteAction
  | ResetAction
  | LazyLoadedModuleDestroyedAction
  | FavouriteItemLoadedAction
  | FavouriteItemLoadedAction
  | EffectErrorOccurredAction;
