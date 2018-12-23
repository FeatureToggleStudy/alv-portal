import { Action } from '@ngrx/store';
import { JobAdvertisement } from '../../../shared/backend-services/job-advertisement/job-advertisement.types';
import { JobSearchFilter } from '../state/job-search-filter.types';
import { FilterPanelValues } from '../../job-search/filter-panel/filter-panel.component';
import { JobQueryPanelValues } from '../../../widgets/job-search-widget/job-query-panel/job-query-panel-values';
import { OccupationMultiTypeaheadItem } from '../../../shared/occupations/occupation-multi-typeahead-item';

export const INIT_RESULT_LIST = 'JOBS:INIT_RESULT_LIST';
export const FILTER_APPLIED = 'JOBS:FILTER_APPLIED';
export const APPLY_FILTER = 'JOBS:APPLY_FILTER';
export const RESET_FILTER = 'JOBS:RESET_FILTER';
export const FILTER_RESET = 'JOBS:FILTER_RESET';
export const LOAD_NEXT_PAGE = 'JOBS:LOAD_NEXT_PAGE';
export const NEXT_PAGE_LOADED = 'JOBS:NEXT_PAGE_LOADED';

export const JOB_ADVERTISEMENT_DETAIL_LOADED = 'JOBS:JOB_ADVERTISEMENT_DETAIL_LOADED';
export const LOAD_PREVIOUS_JOB_ADVERTISEMENT_DETAIL = 'JOBS:LOAD_PREVIOUS_JOB_ADVERTISEMENT_DETAIL';
export const LOAD_NEXT_JOB_ADVERTISEMENT_DETAIL = 'JOBS:LOAD_NEXT_JOB_ADVERTISEMENT_DETAIL';

export const APPLY_QUERY_VALUES = 'JOBS:APPLY_QUERY_VALUES';
export const APPLY_FILTER_VALUES = 'JOBS:APPLY_FILTER_VALUES';

export const OCCUPATION_LANGUAGE_CHANGED_ACTION = 'JOBS:OCCUPATION_LANGUAGE_CHANGED_ACTION';

export class InitResultListAction implements Action {
  readonly type = INIT_RESULT_LIST;

  constructor(public payload = {}) {
  }
}

/**
 * Action to reset the current filter to it's initial state
 */
export class ResetFilterAction implements Action {
  readonly type = RESET_FILTER;

  constructor(public payload: {}) {
  }
}

/**
 * Action after a filter has been reset
 */
export class FilterResetAction implements Action {
  readonly type = FILTER_RESET;

  constructor(public payload: JobSearchFilter) {
  }
}

/**
 * Action to Apply the Query Panel Values
 */
export class ApplyQueryValuesAction implements Action {
  readonly type = APPLY_QUERY_VALUES;

  constructor(public payload: JobQueryPanelValues, public init = false) {
  }
}

/**
 * Action to apply the Filter Panel Value
 */
export class ApplyFilterValuesAction implements Action {
  readonly type = APPLY_FILTER_VALUES;

  constructor(public payload: FilterPanelValues) {
  }
}

/**
 * Action in order to apply a new Filter
 */
export class ApplyFilterAction implements Action {
  readonly type = APPLY_FILTER;

  constructor(public payload: JobSearchFilter) {
  }
}

/**
 * Action after the Filter has been applied
 */
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

/**
 * Action that is fired if the language changed on the selected occupations have been translated again
 */
export class OccupationLanguageChangedAction implements Action {
  readonly type = OCCUPATION_LANGUAGE_CHANGED_ACTION;

  constructor(public payload: { occupations: OccupationMultiTypeaheadItem[] }) {
  }
}


export type Actions =
  | InitResultListAction
  | FilterAppliedAction
  | ApplyFilterAction
  | LoadNextPageAction
  | NextPageLoadedAction
  | JobAdvertisementDetailLoadedAction
  | LoadPreviousJobAdvertisementDetailAction
  | LoadNextJobAdvertisementDetailAction
  | ResetFilterAction
  | ApplyFilterValuesAction
  | ApplyQueryValuesAction
  | OccupationLanguageChangedAction;
