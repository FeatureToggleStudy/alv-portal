import { ContractType, JobSearchFilter, Sort } from './job-search-filter.types';
import {
  FavouriteItem,
  JobAdvertisement,
  JobAdvertisementWithFavourites
} from '../../../../shared/backend-services/job-advertisement/job-advertisement.types';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface JobAdSearchState {
  totalCount: number;
  page: number;
  jobSearchFilter: JobSearchFilter;
  resultList: JobAdvertisementWithFavourites[];
  selectedJobAdvertisement: JobAdvertisement;
  favouriteItem: FavouriteItem;
  resultsAreLoading: boolean;
  visitedJobAds: { [id: string]: boolean; };
  isDirtyResultList: boolean;
}

export const initialState: JobAdSearchState = {
  totalCount: 0,
  page: 0,
  jobSearchFilter: {
    sort: Sort.RELEVANCE_DESC,
    displayRestricted: false,
    contractType: ContractType.ALL,
    workloadPercentageMin: 10,
    workloadPercentageMax: 100,
    company: null,
    onlineSince: 30,
    occupations: [],
    keywords: [],
    localities: []
  },
  resultList: [],
  selectedJobAdvertisement: null,
  favouriteItem: undefined,
  resultsAreLoading: false,
  visitedJobAds: {},
  isDirtyResultList: true
};


export const getJobAdSearchState = createFeatureSelector<JobAdSearchState>('jobAdSearch');

export const getTotalCount = createSelector(getJobAdSearchState, (state: JobAdSearchState) => state.totalCount);

export const getResultList = createSelector(getJobAdSearchState, (state: JobAdSearchState) => state.resultList);

export const getVisitedJobAds = createSelector(getJobAdSearchState, (state: JobAdSearchState) => state.visitedJobAds);

export const getJobSearchFilter = createSelector(getJobAdSearchState, (state: JobAdSearchState) => state.jobSearchFilter);

export const getSelectedJobAdvertisement = createSelector(getJobAdSearchState, (state: JobAdSearchState) => state.selectedJobAdvertisement);

export const getResultsAreLoading = createSelector(getJobAdSearchState, (state: JobAdSearchState) => state.resultsAreLoading);

export const getFavouriteItem = createSelector(getJobAdSearchState, (state: JobAdSearchState) => state.favouriteItem);

export const getJobSearchResults = createSelector(getResultList, getVisitedJobAds, (resultList, visitedJobAds) => {
  return resultList.map((item) => {
    return {
      jobAdvertisement: item.jobAdvertisement,
      favouriteItem: item.favouriteItem,
      visited: visitedJobAds[item.jobAdvertisement.id] || false
    };
  });
});

export const getPrevId = createSelector(getResultList, getSelectedJobAdvertisement, (resultList, current) => {
  if (current) {
    const ids = resultList.map((item) => item.jobAdvertisement.id);
    const idx = ids.findIndex(id => id === current.id);

    return idx > 0 ? ids[idx - 1] : null;
  }

  return null;
});

export const getNextId = createSelector(getResultList, getSelectedJobAdvertisement, (resultList, current) => {
  if (current) {
    const ids = resultList.map((item) => item.jobAdvertisement.id);
    const idx = ids.findIndex(id => id === current.id);

    return idx < ids.length - 1 ? ids[idx + 1] : null;
  }

  return null;
});

export const isPrevVisible = createSelector(getResultList, getSelectedJobAdvertisement, (resultList, selectedJobAdvertisement) => {
  if (selectedJobAdvertisement) {
    return resultList
      .map((item) => item.jobAdvertisement.id)
      .findIndex(id => id === selectedJobAdvertisement.id) > 0;
  }

  return false;
});

export const isNextVisible = createSelector(getResultList, getSelectedJobAdvertisement, getTotalCount, (resultList, current, totalCount) => {
  if (current) {
    return resultList
      .map((item) => item.jobAdvertisement.id)
      .findIndex(id => id === current.id) < totalCount - 1;
  }

  return false;
});
