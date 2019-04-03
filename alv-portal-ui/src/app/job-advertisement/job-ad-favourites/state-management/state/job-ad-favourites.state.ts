import { JobAdvertisement } from '../../../../shared/backend-services/job-advertisement/job-advertisement.types';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { JobAdFavouritesSearchFilter } from '../../job-ad-favourites/job-ad-favourites.types';

export interface JobAdFavouritesState {
  totalCount: number;
  page: number;
  filter: JobAdFavouritesSearchFilter;
  resultList: JobAdvertisement[];
  selectedJobAdvertisement: JobAdvertisement;
  resultsAreLoading: boolean;
}

export const initialState: JobAdFavouritesState = {
  totalCount: 0,
  page: 0,
  filter: {
    query: null
  },
  resultList: [],
  selectedJobAdvertisement: null,
  resultsAreLoading: false,
};

export const getJobAdFavouritesState = createFeatureSelector<JobAdFavouritesState>('jobAdFavourites');
export const getJobAdFavouritesSearchFilter = createSelector(getJobAdFavouritesState, (state: JobAdFavouritesState) => state.filter);
export const getJobAdFavouritesResults = createSelector(getJobAdFavouritesState, (state: JobAdFavouritesState) => state.resultList);
export const getJobAdFavouritesTotalCount = createSelector(getJobAdFavouritesState, (state: JobAdFavouritesState) => state.totalCount);
export const getSelectedJobAdvertisement = createSelector(getJobAdFavouritesState, (state: JobAdFavouritesState) => state.selectedJobAdvertisement);

export const getPrevId = createSelector(getJobAdFavouritesResults, getSelectedJobAdvertisement, (resultList, current) => {
  if (current) {
    const ids = resultList.map((item) => item.id);
    const idx = ids.findIndex(id => id === current.id);

    return idx > 0 ? ids[idx - 1] : null;
  }

  return null;
});

export const getNextId = createSelector(getJobAdFavouritesResults, getSelectedJobAdvertisement, (resultList, current) => {
  if (current) {
    const ids = resultList.map((item) => item.id);
    const idx = ids.findIndex(id => id === current.id);

    return idx < ids.length - 1 ? ids[idx + 1] : null;
  }

  return null;
});

export const isPrevVisible = createSelector(getJobAdFavouritesResults, getSelectedJobAdvertisement, (resultList, selectedJobAdvertisement) => {
  if (selectedJobAdvertisement) {
    return resultList
      .map((item) => item.id)
      .findIndex(id => id === selectedJobAdvertisement.id) > 0;
  }

  return false;
});

export const isNextVisible = createSelector(getJobAdFavouritesResults, getSelectedJobAdvertisement, getJobAdFavouritesTotalCount, (resultList, current, totalCount) => {
  if (current) {
    return resultList
      .map((item) => item.id)
      .findIndex(id => id === current.id) < totalCount - 1;
  }

  return false;
});

