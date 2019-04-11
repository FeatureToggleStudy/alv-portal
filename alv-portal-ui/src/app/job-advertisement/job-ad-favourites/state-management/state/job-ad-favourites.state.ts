import {
  FavouriteItem,
  JobAdvertisement,
  JobAdvertisementWithFavourites
} from '../../../../shared/backend-services/job-advertisement/job-advertisement.types';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { JobAdFavouritesSearchFilter } from '../../job-ad-favourites/job-ad-favourites.types';

export interface JobAdFavouritesState {
  totalCount: number;
  page: number;
  filter: JobAdFavouritesSearchFilter;
  resultList: JobAdvertisementWithFavourites[];
  resultsAreLoading: boolean;
  visitedJobAds: { [id: string]: boolean; };
  lastVisitedJobAdId: string;
  isDirtyResultList: boolean;
  detail: JobAdFavouriteDetailState;
}

export interface JobAdFavouriteDetailState {
  jobAdvertisement: JobAdvertisement;
  favouriteItem: FavouriteItem;
  nextId: string;
  prevId: string;
  currentIndex: number;
}

export const initialState: JobAdFavouritesState = {
  totalCount: 0,
  page: 0,
  filter: {
    query: ''
  },
  resultList: undefined,
  resultsAreLoading: false,
  visitedJobAds: {},
  lastVisitedJobAdId: undefined,
  isDirtyResultList: true,
  detail: {
    currentIndex: undefined,
    favouriteItem: undefined,
    jobAdvertisement: undefined,
    nextId: undefined,
    prevId: undefined
  }
};

export const getJobAdFavouritesState = createFeatureSelector<JobAdFavouritesState>('jobAdFavourites');

export const getJobAdFavouritesSearchFilter = createSelector(getJobAdFavouritesState, (state: JobAdFavouritesState) => state.filter);

export const getResultList = createSelector(getJobAdFavouritesState, (state: JobAdFavouritesState) => state.resultList);

export const getVisitedJobAds = createSelector(getJobAdFavouritesState, (state: JobAdFavouritesState) => state.visitedJobAds);

export const getFavouriteItem = createSelector(getJobAdFavouritesState, (state: JobAdFavouritesState) => state.detail.favouriteItem);

export const getCurrentIndex = createSelector(getJobAdFavouritesState, (state: JobAdFavouritesState) => state.detail.currentIndex);

export const getJobAdFavouritesResults = createSelector(getResultList, getVisitedJobAds, (resultList, visitedJobAds) => {
  if (!resultList) {
    return undefined;
  }
  return resultList.map((item) => {
    return {
      jobAdvertisement: item.jobAdvertisement,
      favouriteItem: item.favouriteItem,
      visited: visitedJobAds[item.jobAdvertisement.id] || false
    };
  });
});

export const isLoading = createSelector(getJobAdFavouritesState, (state) => {
  return state.resultsAreLoading;
});

export const hasCustomFilterApplied = createSelector(getJobAdFavouritesSearchFilter, (filter) => {
  return filter.query !== initialState.filter.query;
});

export const getLastVisitedJobAdId = createSelector(getJobAdFavouritesState, (state: JobAdFavouritesState) => state.lastVisitedJobAdId);

export const getJobAdFavouritesTotalCount = createSelector(getJobAdFavouritesState, (state: JobAdFavouritesState) => state.totalCount);

export const getSelectedJobAdvertisement = createSelector(getJobAdFavouritesState, (state: JobAdFavouritesState) => state.detail.jobAdvertisement);

export const getNextId = createSelector(getJobAdFavouritesState, (state: JobAdFavouritesState) => state.detail.nextId);

export const getPrevId = createSelector(getJobAdFavouritesState, (state: JobAdFavouritesState) => state.detail.prevId);

export const isPrevVisible = createSelector(getCurrentIndex, (currentIndex) => {
  if (currentIndex !== undefined) {
    return currentIndex > 0;
  }
  return false;
});

export const isNextVisible = createSelector(getCurrentIndex, getJobAdFavouritesTotalCount, (currentIndex, totalCount) => {
  if (currentIndex !== undefined) {
    return currentIndex < totalCount - 1;
  }
  return false;
});

