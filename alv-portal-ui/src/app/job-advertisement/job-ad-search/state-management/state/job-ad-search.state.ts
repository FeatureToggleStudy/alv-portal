import { ContractType, JobSearchFilter, Sort } from './job-search-filter.types';
import {
  FavouriteItem, JobAdSearchProfile,
  JobAdvertisement,
  JobAdvertisementWithFavourites
} from '../../../../shared/backend-services/job-advertisement/job-advertisement.types';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { JobSearchResult } from '../../../shared/job-search-result/job-search-result.component';

export interface JobAdSearchState {
  totalCount: number;
  page: number;
  jobSearchFilter: JobSearchFilter;
  resultList: JobAdvertisementWithFavourites[];
  resultsAreLoading: boolean;
  details: {
    jobAdvertisement: JobAdvertisement;
    favouriteItem: FavouriteItem;
  };
  visitedJobAds: { [id: string]: boolean; };
  lastVisitedJobAdId: string;
  isDirtyResultList: boolean;
  jobAdSearchProfile: JobAdSearchProfile;
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
  details: {
    favouriteItem: undefined,
    jobAdvertisement: undefined,
  },
  resultsAreLoading: false,
  visitedJobAds: {},
  lastVisitedJobAdId: undefined,
  isDirtyResultList: true,
  jobAdSearchProfile: undefined
};

export const getJobAdSearchState = createFeatureSelector<JobAdSearchState>('jobAdSearch');

export const getTotalCount = createSelector(getJobAdSearchState, (state: JobAdSearchState) => state.totalCount);

export const getVisitedJobAds = createSelector(getJobAdSearchState, (state: JobAdSearchState) => state.visitedJobAds);

export const getJobSearchFilter = createSelector(getJobAdSearchState, (state: JobAdSearchState) => state.jobSearchFilter);

export const getJobAdvertisement = createSelector(getJobAdSearchState, (state: JobAdSearchState) => state.details.jobAdvertisement);

export const getFavouriteItem = createSelector(getJobAdSearchState, (state: JobAdSearchState) => state.details.favouriteItem);

export const getLastVisitedJobAdId = createSelector(getJobAdSearchState, (state: JobAdSearchState) => state.lastVisitedJobAdId);

export const isLoading = createSelector(getJobAdSearchState, (state) => state.resultsAreLoading);

export const isDirtyResultList = createSelector(getJobAdSearchState, (state) => state.isDirtyResultList);

export const getJobAdSearchProfile = createSelector(getJobAdSearchState, (state) => state.jobAdSearchProfile);

const getResultList = createSelector(getJobAdSearchState, (state: JobAdSearchState) => state.resultList);

export const getJobSearchResults = createSelector(isDirtyResultList, getResultList, getVisitedJobAds, (dirty, resultList, visitedJobAds) => {
  if (dirty) {
    return undefined;
  }
  return resultList.map((item) => {
    return new JobSearchResult(item.jobAdvertisement, item.favouriteItem, visitedJobAds[item.jobAdvertisement.id] || false);
  });
});

export const hasNextPage = createSelector(getJobAdSearchState, (state) => {
  return state.resultList.length < state.totalCount;
});

export const getPrevId = createSelector(getResultList, getJobAdvertisement, (resultList, current) => {
  if (current) {
    const ids = resultList.map((item) => item.jobAdvertisement.id);
    const idx = ids.findIndex(id => id === current.id);

    return idx > 0 ? ids[idx - 1] : null;
  }

  return null;
});

export const getNextId = createSelector(getResultList, getJobAdvertisement, (resultList, current) => {
  if (current) {
    const ids = resultList.map((item) => item.jobAdvertisement.id);
    const idx = ids.findIndex(id => id === current.id);

    return idx < ids.length - 1 ? ids[idx + 1] : null;
  }

  return null;
});

export const isPrevVisible = createSelector(getResultList, getJobAdvertisement, (resultList, selectedJobAdvertisement) => {
  if (selectedJobAdvertisement) {
    return resultList
      .map((item) => item.jobAdvertisement.id)
      .findIndex(id => id === selectedJobAdvertisement.id) > 0;
  }

  return false;
});

export const isNextVisible = createSelector(getResultList, getJobAdvertisement, getTotalCount, (resultList, current, totalCount) => {
  if (current) {
    return resultList
      .map((item) => item.jobAdvertisement.id)
      .findIndex(id => id === current.id) < totalCount - 1;
  }

  return false;
});
