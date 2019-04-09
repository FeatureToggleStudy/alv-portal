import {
  JobAdvertisement,
  JobAdvertisementWithFavourites
} from '../../../../shared/backend-services/job-advertisement/job-advertisement.types';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {JobAdFavouritesSearchFilter} from '../../job-ad-favourites/job-ad-favourites.types';

export interface JobAdFavouritesState {
  totalCount: number;
  page: number;
  filter: JobAdFavouritesSearchFilter;
  resultList: JobAdvertisementWithFavourites[];
  selectedJobAdvertisement: JobAdvertisement;
  resultsAreLoading: boolean;
  visitedJobAds: { [id: string]: boolean; };
  isDirtyResultList: boolean;
}

export const initialState: JobAdFavouritesState = {
  totalCount: 0,
  page: 0,
  filter: {
    query: ''
  },
  resultList: [],
  selectedJobAdvertisement: null,
  resultsAreLoading: false,
  visitedJobAds: {},
  isDirtyResultList: true
};

export const getJobAdFavouritesState = createFeatureSelector<JobAdFavouritesState>('jobAdFavourites');
export const getIsDirtyResultList = createSelector(getJobAdFavouritesState, (state: JobAdFavouritesState) => state.isDirtyResultList);
export const getJobAdFavouritesSearchFilter = createSelector(getJobAdFavouritesState, (state: JobAdFavouritesState) => state.filter);
export const getResultList = createSelector(getJobAdFavouritesState, (state: JobAdFavouritesState) => state.resultList);
export const getVisitedJobAds = createSelector(getJobAdFavouritesState, (state: JobAdFavouritesState) => state.visitedJobAds);
export const getJobAdFavouritesResults = createSelector(getResultList, getVisitedJobAds, (resultList, visitedJobAds) => {
  return resultList.map((item) => {
    return {
      jobAdvertisement: item.jobAdvertisement,
      favouriteItem: item.favouriteItem,
      visited: visitedJobAds[item.jobAdvertisement.id] || false
    };
  });
});

export const getJobAdFavouritesTotalCount = createSelector(getJobAdFavouritesState, (state: JobAdFavouritesState) => state.totalCount);
export const getSelectedJobAdvertisement = createSelector(getJobAdFavouritesState, (state: JobAdFavouritesState) => state.selectedJobAdvertisement);

export const getPrevId = createSelector(getJobAdFavouritesResults, getSelectedJobAdvertisement, (resultList, current) => {
  if (current) {
    const ids = resultList.map((item) => item.jobAdvertisement.id);
    const idx = ids.findIndex(id => id === current.id);

    return idx > 0 ? ids[idx - 1] : null;
  }

  return null;
});

export const getNextId = createSelector(getJobAdFavouritesResults, getSelectedJobAdvertisement, (resultList, current) => {
  if (current) {
    const ids = resultList.map((item) => item.jobAdvertisement.id);
    const idx = ids.findIndex(id => id === current.id);

    return idx < ids.length - 1 ? ids[idx + 1] : null;
  }

  return null;
});

export const isPrevVisible = createSelector(getJobAdFavouritesResults, getSelectedJobAdvertisement, (resultList, selectedJobAdvertisement) => {
  if (selectedJobAdvertisement) {
    return resultList
      .map((item) => item.jobAdvertisement.id)
      .findIndex(id => id === selectedJobAdvertisement.id) > 0;
  }

  return false;
});

export const isNextVisible = createSelector(getJobAdFavouritesResults, getSelectedJobAdvertisement, getJobAdFavouritesTotalCount, (resultList, current, totalCount) => {
  if (current) {
    return resultList
      .map((item) => item.jobAdvertisement.id)
      .findIndex(id => id === current.id) < totalCount - 1;
  }

  return false;
});

